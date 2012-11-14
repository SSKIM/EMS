<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String screenId = request.getParameter("screenId"); 
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
				required("#CANCEL_REASON",true);
				// GET PARAMETER
				var param = window.dialogArguments;
				$("#JRNL_NO").html(param.JRNL_NO);

				$("#statusTable").css("top",$(window).height()-24);
				$("#statusTable").css("left",0);
			});
			function Save() {
				if(!requiredValidate("#formData")) return false;

				var action = "scn1.do?method=AA021Save";
				var params = "&CANCEL_REASON="+getString("#CANCEL_REASON")
			               + "&DATATABLE="+$("#JRNL_NO").html()
						   + "&call=xml";

				$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
					success: function(result){
						if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
							return false;
						}
						var jrnlNo = $(result).find("dataPK").find("JRNL_NO").text();
						alert(I003);

						var returnParam = new Object();
						returnParam.RESULT  = "OK";
						returnParam.JRNL_NO = jrnlNo;

						window.returnValue  = returnParam;
						window.close();
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
		<table class="searchTable" style="height:100px">
			<tr>
				<th style="width:30%" id="lblJRNL_NO">전표번호</th>
				<td style="width:70%">
					<span id="JRNL_NO"></span>
				</td>
			</tr>
			<tr>
				<th id="lblCANCEL_REASON">취소사유</th>
				<td>
					<textarea id="CANCEL_REASON" style="width:99%;height:50px"></textarea>
				</td>
			</tr>
		</table>
		<table style="width:100%;height:40px">
			<tr>
				<td colspan=2 align=center>
					<input type="button" id="btnSave" name="btnSave" value="생성" width="48px" height="24px" class="command">
					<input type="button" id="btnCancel" name="btnCancel" value="닫기" width="48px" height="24px" class="command">
				</td>
			</tr>
		</table>
		</form>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
