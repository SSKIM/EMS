<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<%
	String screenId = request.getParameter("screenId");
	Map postingPeriod = null;
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet!=null) {
		postingPeriod = (Map)resultSet.get("POSTING_PERIOD");
		
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript">
			$(document).ready(function() {
				// EVENT
				$("#btnSave").click(Save);
				$("#btnCancel").click(Close);
				// DEFAULT
				$("#POSTING_PERIOD").mask("9999/999");
				required("#POSTING_PERIOD",true);
				$("#POSTING_PERIOD").val("<%=postingPeriod.get("ETC1")%>").blur();
				// GET PARAMETER
				var param = window.dialogArguments;
				$("#JRNL_NO").html(param.JRNL_NO);

				$("#output").unbind('dblclick');
				
				$("#statusTable").css("top",$(window).height()-24);
				$("#statusTable").css("left",0);
			});
			function Save() {
				if(!requiredValidate("#formData")) return false;
				disabled("#btnSave",true);
				
				var action = "scn1.do?method=AB021Save";
				var params = "&POSTING_PERIOD="+$("#POSTING_PERIOD").val().replaceAll("/","")
			               + "&DATATABLE="+$("#JRNL_NO").html()
						   + "&call=xml";

				$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
					success: function(result){
						//if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
						//	return false;
						//}
						$('#tree1').empty();
						var ssInfo = "";
						$(result).find("DATA").find("LINE_LIST").find("ROW").each(function(){
							var userText = $(this).find("UserText").text();
							var ut       = userText.split("|");
							var msg      = "";

							for(var i=0; i<ut.length; i++) {
								msg += "<li>"+ut[i]+"</li>";
							}
							
							ssInfo += "<li>Line No : "+$(this).find("LINE_NO").text()+" Status : "+$(this).find("STATUS").text()+"<ul>"+msg+"</ul></li>";
						});

						var ssStatus = $(result).find("DATA").find("SS_STATUS").text();
						var msage    = $(result).find("RETURN_MESSAGE").text();
						var ssResult = ((ssStatus=="true") ? "성공" : "실패");

						if(msage==null || msage=="") {
							msage = "[ 실행 결과  : " + ssResult + " ]";
						}
						$('#tree1').append("<li>"+msage+"<ul id=result1>");
						$('#result1').append("<li>Message Code : "+$(result).find("RETURN_CODE").text()+"</li>");
						$('#result1').append("<li>Message Detail : "+$(result).find("RETURN_DETAIL").text()+"</li>");
						$('#result1').append("<li>SunSystems 전표처리 결과정보<ul>"+ssInfo+"</ul></li>");
						convertTrees();
						
						$("#SS_JRNL_NO").html($(result).find("DATA").find("SS_JRNL_NO").text());
						$("#SS_STATUS").html(ssResult);

						if(ssStatus=="true") {
							alert(I003);
	
							var returnParam = new Object();
							returnParam.RESULT = "OK";
	
							window.returnValue = returnParam;
							//window.close();
						}
					},
					error: function(xhr, ajaxOptions, thrownError){
						alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//						alert(xhr.responseText); //for debuging 
					}
				});
			}
		</script>
	</head>
	<body style="margin: 0px 5px 0px 5px">
		<table class="titleTable" id="titleTable">
			<tr>
				<td><img src="./theme/default/image/title/<%=screenId%>.gif" alt="" /></td>
			</tr>
		</table>
		<form id="formData" name="formData" method="post">
		<span id="JRNL_NO" style="display:none"></span>
		<table class="searchTable" style="height:150px">
			<tr>
				<th style="width:30%" id="lblPOSTING_PERIOD">Posting 기간</th>
				<td style="width:70%" colspan="3">
					<input type="text" id="POSTING_PERIOD" style="width:70px;text-align:center"/>
				</td>
			</tr>
			<tr>
				<th style="width:20%" id="lblJRNL_NO">SS 전표번호</th>
				<td style="width:30%">
					<span id="SS_JRNL_NO"></span>
				</td>
				<th style="width:20%" id="lblJRNL_NO">SS 전표상태</th>
				<td style="width:30%">
					<span id="SS_STATUS"></span>
				</td>
			</tr>
			<tr style="height:35px">
				<td colspan="4" align=center>
					<input type="button" id="btnSave" name="btnSave" value="승인" width="48px" height="24px" class="command">
					<input type="button" id="btnCancel" name="btnCancel" value="닫기" width="48px" height="24px" class="command">
				</td>
			</tr>
			<tr>
				<td colspan="4" valign=top>
					<div id="output" style="display:block;overflow:auto;height:290px;margin-top:2px">
						<ul class="mktree" id="tree1"></ul> 
			        </div>
				</td>
			</tr>
		</table>
		</form>
	</body>
</html>
