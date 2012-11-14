<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Enumeration,com.mindtree.framework.util.CommonUtil" %>
<%@ page import="java.util.*" %>
<%
	String returnPage = (String)CommonUtil.getParameter(request, "returnPage");
	if(CommonUtil.nullOrEmpty(returnPage))
		returnPage = "index.do";
	String W004 = CommonUtil.getMessage(request,"W004");
	String W005 = CommonUtil.getMessage(request,"W005");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header2.jsp"%>
		<script type="text/javascript">
			var W004 = "<%=W004%>";
			var W005 = "<%=W005%>";
			$(document).ready(function(){
				$("#userid").keyup(function(event) {
					if (event.keyCode == 13) {
						if($("#userid").val().trim() == "") {
							$("#message").text(W004);
							$("#userid").focus().select();
						} else {
							$("#passwd").focus().select();
						}
					}
					event.preventDefault();
					return false;
				});
				$("#passwd").keyup(function(event) {
					if (event.keyCode == 13) {
						goCommand();
					}
				});
				$("#userid").focus();
				//parent.window.resizeTo(1024,768);

				//window.moveTo(0,0);
				//window.resizeTo(1280,860); 
			});
			function goCommand() {
				$("#message").text("");
				if($("#userid").val().trim() == "") {
					$("#message").html(W004);
					$("#userid").focus();
					return;
				}
				else if($("#passwd").val().trim() == "") {
					$("#message").html(W005);
					$("#passwd").focus();
					return;
				}

				var action = "index.do?method=login&call=xml";
				var data   = "&userid="+$("#userid").val()+"&passwd="+$("#passwd").val();

				$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
					success: function(result){
						var msg    = $(result).find("RETURN_MESSAGE").text();
						var detail = $(result).find("RETURN_DETAIL").text();
						if(msg != '') {
							$("#message").html(msg+"<br/>"+detail);
 							var failcnt = $(result).find("DATA").find("FAIL_CNT").text();
 							if(parseInt(failcnt)>4) {
								alert("비밀번호 5회 실패했습니다.\n전산실에 문의해주세요!");
								return;
 							}
						} else {

 							var pwdChngType = $(result).find("DATA").find("LOGIN").find("PWD_CHNG_TYPE").text();
 							if(pwdChngType=="Y") {
 								var param = new Object();
 								param.USER_ID = $("#userid").val();

 								var url   = "index.do?method=chngPwd";
 								var style = "dialogWidth:600px;dialogHeight:350px;status:no;scroll:no";

 								var retVal = window.showModalDialog(url, param, style);
 								if(retVal != null) {
 	 								if(retVal.RESULT == "OK") {
 	 									window.location.href = "<%=returnPage%>";
 	 									//closeWindow("MainForm");
 	 								}
 								}
 							} else {
 								window.location.href = "<%=returnPage%>";
								//closeWindow("MainForm");
 							}
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
	<body>
		<iframe class="loading" src="<%=request.getContextPath()%>/common/html/loading.html" frameBorder="0"></iframe>
		<table style="width:100%;height:100%;" border="0" cellspacing="0" cellpadding="0">
		  <tr>
		    <td align="center" valign="middle"><table width="100" border="0" cellspacing="0" cellpadding="0">
		        <tr>
		          <td align="center"><img src="./theme/default/image/login/text.gif" width="329" height="102"></td>
		        </tr>
		        <tr>
		          <td>&nbsp;</td>
		        </tr>
		        <tr>
		          <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
		              <tr>
		                <td width="283"><img src="./theme/default/image/login/bg_left.gif" width="283" height="172"></td>
		                <td valign="top"><table width="478" border="0" cellspacing="0" cellpadding="0">
		                    <tr>
		                      <td height="99" background="./theme/default/image/login/bg.gif"><table width="325" border="0" cellspacing="0" cellpadding="0">
		                          <tr>
		                            <td width="63" height="26">I&nbsp;&nbsp;&nbsp;D</td>
		                            <td>
		                            	<input type="text" name="userid" id="userid" style="width:150px" title="<%=W004%>">
		                            </td>
		                            <td width="96" rowspan="2"><img src="./theme/default/image/button/login2.gif" width="96" height="52" id="btnLogin" onclick="goCommand()" style="cursor:pointer"></a></td>
		                          </tr>
		                          <tr>
		                            <td height="26">PASSWORD</td>
		                            <td>
		                            	<input type="password" name="passwd" id="passwd" style="width:150px" title="<%=W005%>">
		                            </td>
		                          </tr>
		                        </table></td>
		                    </tr>
		                  </table></td>
		              </tr>
		            </table></td>
		        </tr>
		        <tr>
					<td align=center>
		          		<img src="./theme/default/image/login/arrow.gif" width="13" height="10" align="absmiddle">
		          		<span id="message" style="height:30px;color:red;">Please enter your ID and password!</span>
		  				<br/><br/>* This program is optimized for Web browser: Internet Explorer 8, Resolution: 1280 * 800.
					</td>
		        </tr>
		      </table></td>
		  </tr>
		</table>
	</body>
</html>
