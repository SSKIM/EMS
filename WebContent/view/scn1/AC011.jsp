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
				$("#btnSave").click(CurrentCheck);
				$("#btnCancel").click(Close);
				// DEFAULT
				$("#POSTING_PERIOD").mask("9999/999");
				required("#POSTING_PERIOD,#TRANS_DATE, #TSC_DEAL,#DEPT_CODE",true);
				// GET PARAMETER
				var param = window.dialogArguments;
				$("#ANL_CODE_ID").html(param.ANL_CODE);
				$("#ACCT_CODE1").html(param.ACT_NAME);
				$("#TOTAL").html(param.TOTAL_AMT);

				$("#output").unbind('dblclick');
				
				$("#statusTable").css("top",$(window).height()-24);
				$("#statusTable").css("left",0);
				date("#TRANS_DATE");
			});
			function Save() {
					if(!requiredValidate("#formData")) return false;
					disabled("#btnSave",true);
					
					var action = "scn1.do?method=AC011Positing";
					var params = "&POSTING_PERIOD="+$("#POSTING_PERIOD").val().replaceAll("/","")
							   + "&TRANS_DATE="+$("#TRANS_DATE").val().replaceAll("-","")
				               + "&ANL_CODE_ID="+$("#ANL_CODE_ID").html()
				               + "&ACCT_CODE1="+$("#ACCT_CODE1").html()
				               + "&DEPT_CODE="+$("#DEPT_CODE").val()
				               + "&TOTAL="+$("#TOTAL").html()
							   + "&call=xml";

					$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
						success: function(result){
							$("#JRNL_NO").html($(result).find("dataPK").find("JRNL_NO").text());
							Save2();
						},
						error: function(xhr, ajaxOptions, thrownError){
							alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//							alert(xhr.responseText); //for debuging
						}
					});
			}
			
			function CurrentCheck() {
				var action = "scn1.do?method=AC011CurrnCheck";
				var params = "&TRANS_DATE="+$("#TRANS_DATE").val().replaceAll("-","")
						   + "&call=xml";
				$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
					success: function(result){
						
						var CNT = $(result).find("dataPK").find("CNT").text();
						if(CNT == "0"){
							alert($("#TRANS_DATE").val()+" Exchange rate does not exist!");
							return false;
						}
						else{
							Save();
						}
					},
					error: function(xhr, ajaxOptions, thrownError){
						alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
					}
				});
			}
			
			function Save2() {
				if(!requiredValidate("#formData")) return false;
				disabled("#btnSave",true);
				
				var action = "scn1.do?method=AC011Positing2";
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
						var ssResult = ((ssStatus=="true") ? "Success" : "Fail");

						if(msage==null || msage=="") {
							msage = "[ Result  : " + ssResult + " ]";
						}
						$('#tree1').append("<li>"+msage+"<ul id=result1>");
						$('#result1').append("<li>Message Code : "+$(result).find("RETURN_CODE").text()+"</li>");
						$('#result1').append("<li>Message Detail : "+$(result).find("RETURN_DETAIL").text()+"</li>");
						$('#result1').append("<li>SunSystems Journal Process Result Infor.<ul>"+ssInfo+"</ul></li>");
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
		<%@ include file="../include/button.jsp" %>
		<table class="titleTable" id="titleTable">
			<tr>
				<td><span class="hidden" id="ANL_CODE_ID"></span><span class="hidden" id="ACCT_CODE1"></span><span class="hidden" id="TOTAL"></span></span><span class="hidden" id="JRNL_NO"></span></td>
			</tr>
		</table>
		<form id="formData" name="formData" method="post">
		<span id="JRNL_NO" style="display:none"></span>
		<table class="searchTable" style="height:150px">
			<tr>
				<th style="width:30%;text-align:left" id="lblPOSTING_PERIOD">&nbsp;&nbsp;Posting Period:</th>
				<td style="width:25%">
					<input type="text" id="POSTING_PERIOD" style="width:70px;text-align:center"/>
				</td>
				<th style="width:20%;text-align:left" id="lblPOSTING_PERIOD">&nbsp;&nbsp;Transaction Date:</th>
				<td style="width:25%">
					<input type="text" id="TRANS_DATE" style="width:70px;text-align:center"/>
				</td>
			</tr>
			<tr>
				<th style="width:30%;text-align:left" id="lblACCT_NO">&nbsp;&nbsp;Unrealized Exchange &nbsp;&nbsp;Account:</th>
				<td style="width:25%">
					<span id="lblACCT_NO">410-532</span>
				</td>
				<th style="width:20%;text-align:left" id="lblDEPT_CODE">&nbsp;&nbsp;Dept Code:</th>
				<td style="width:25%">
					<input type="text" id="DEPT_CODE" style="width:70px;"/>
				</td>
			</tr>
			<tr>
				<td style="width:100%;text-align:center" id="lblTSC_DEAL" colspan="4">-- Result --</td>
			</tr>
			<tr>
				<th style="width:30%;text-align:left" id="lblSS_JRNL_NO">&nbsp;&nbsp;SUN Journal No:</th>
				<td style="width:25%">
					<span id="SS_JRNL_NO"></span>
				</td>
				<th style="width:20%;text-align:left" id="lblSS_JRNL_NO">&nbsp;&nbsp;Status:</th>
				<td style="width:25%">
					<span id="SS_STATUS"></span>
				</td>
			</tr>
			<tr style="height:35px">
				<td colspan="4" align=center>
					<input type="button" id="btnSave" name="btnSave" value="OK" width="48px" height="24px" class="command">
					<input type="button" id="btnCancel" name="btnCancel" value="Cancel" width="48px" height="24px" class="command">
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
