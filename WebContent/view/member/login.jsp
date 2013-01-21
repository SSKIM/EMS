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
			var logcnt = "";
			var last_logon_date = "";
			var last_pwc_date = "";
			var To_date = "";
			
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

				goCommand2();
				//parent.window.resizeTo(1024,768);

				//window.moveTo(0,0);
				//window.resizeTo(1280,860); 
			});
			
			Date.prototype.yyyymmdd = function() {
				   var yyyy = this.getFullYear().toString();
				   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
				   var dd  = this.getDate().toString();
				   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
			};
				
			function goCommand2()
			{
				var action = "index.do?method=login_domain&call=xml";

				$.ajax({type: "post", url: action, dataType: "xml", cache: false,
					success: function(result){
						var msg    = $(result).find("RETURN_MESSAGE").text();
						var detail = $(result).find("RETURN_DETAIL").text();
						var msg_code = $(result).find("RETURN_CODE").text();
						if(msg != '') {
							$(result).find("DATA_SET").find("ROW").each(function(){
								if($(this).find("CODE_ID").text() == "SEC_4")
								{
									logcnt= $(this).find("ETC1").text();
								}
								else if($(this).find("CODE_ID").text() == "SEC_1")
								{
									last_pwc_date = $(this).find("ETC1").text();
								}
								else if($(this).find("CODE_ID").text() == "SEC_6")
								{
									last_logon_date = $(this).find("ETC1").text();
								}
							});
						}
						else if(msg_code == "N")
						{
							$(result).find("DATA_SET").find("ROW").each(function(){
								if($(this).find("CODE_ID").text() == "SEC_4")
								{
									logcnt= $(this).find("ETC1").text();
								}
								else if($(this).find("CODE_ID").text() == "SEC_1")
								{
									last_pwc_date = $(this).find("ETC1").text();
								}
								else if($(this).find("CODE_ID").text() == "SEC_6")
								{
									last_logon_date = $(this).find("ETC1").text();
								}
							});
							$.alert("해당 계정은 LOCK 되었습니다!\n전산실에 문의해주세요!");
							$("#passwd").focus();
						}
						else {
 							window.location.href = "<%=returnPage%>";
								//closeWindow("MainForm");
 						}
					},
					error: function(xhr, ajaxOptions, thrownError){
						$.alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError);
//						$.alert(xhr.responseText); //for debuging 
					}
				});
			}
			
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
				var data   = "&userid="+$("#userid").val()+"&passwd="+$("#passwd").val()+"&logcnt="+logcnt;

				$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
					success: function(result){
						var msg    = $(result).find("RETURN_MESSAGE").text();
						var detail = $(result).find("RETURN_DETAIL").text();
						var user_status = $(result).find("DATA").find("STATE").text();

						var lockstatus = $(result).find("DATA").find("LOG_STATE").text();
						
						if(msg != '') {
							$("#message").html(msg+"<br/>"+detail);
							var failcnt = $(result).find("DATA").find("FAIL_CNT").text();
 							if(user_status !="N")
 							{
 								if(parseInt(failcnt)>=logcnt) {
 									$.alert("비밀번호 "+logcnt+"회 실패하여 LOCK 되었습니다. \n전산실에 문의해주세요!");
 									$("#passwd").focus();
 									//$.alert("해당 계정은 LOCK 되었습니다.!");
									return;
 								}
 							} else {
 	 							alert("TEST");
 								$.alert("해당 계정은 LOCK 되었습니다!\n전산실에 문의해주세요!");
 								$("#passwd").focus();
 							}
						}	
						else {
 							var pwdChngType = $(result).find("DATA").find("LOGIN").find("PWD_CHNG_TYPE").text();
 							var lastlogondate = $(result).find("DATA").find("LOGIN").find("LAST_LOGON_DATE").text();
 							var lastpwdchangedate= $(result).find("DATA").find("LOGIN").find("LAST_PASSWORD_CHANGE_DATE").text();
 							To_date = getTimeStamp();

 							if(user_status !="N" && lockstatus != "Y")
 							{
 	 							if(setDaysRange(lastlogondate,To_date) >= last_logon_date)
 	 	 						{
 	 								$.alert("해당 계정은 "+last_logon_date+"일 이상 사용되지 않아 LOCK 되었습니다!\n전산실에 문의해주세요!");
 	 								$("#passwd").focus();
									/*
									var action = "index.do?method=lastlogin&call=xml";
									var data   = "&userid="+$("#userid").val();

									$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
										success: function(result){
										var msg    = $(result).find("RETURN_MESSAGE").text();
										var detail = $(result).find("RETURN_DETAIL").text();
										}
									});
									*/
 								} else{
 									if(pwdChngType=="Y" || parseInt(To_date-lastpwdchangedate) >=last_pwc_date)
 	 								{
 	 									if(setDaysRange(lastpwdchangedate, To_date) >=last_pwc_date)
 	 									{
 	 										$.alert("비밀번호 사용기간이 만료되었습니다.");
 	 										$("#passwd").focus();
 	 									}
 										var param = new Object();
 										param.USER_ID = $("#userid").val();
 										var url   = "index.do?method=chngPwd";
 										var style = "dialogWidth:600px;dialogHeight:350px;status:off;scroll:no";

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
 							} else{
 								$.alert('Account was locked out. Please contact your system administrator for more information!');
 								$("#passwd").focus();
 							}
						}
					},
					error: function(xhr, ajaxOptions, thrownError){
						$.alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//						$.alert(xhr.responseText); //for debuging 
					}
				});
			}
			
			function getTimeStamp() {
				var d = new Date();

				var s =
					leadingZeros(d.getFullYear(), 4) + '-' +
				    leadingZeros(d.getMonth() + 1, 2) + '-' +
				    leadingZeros(d.getDate(), 2);
			    return s;
			}

			function leadingZeros(n, digits) {
				var zero = '';
				n = n.toString();
				if (n.length < digits) {
					for (i = 0; i < digits - n.length; i++)
						zero += '0';
				}
				return zero + n;
			}				

			function setDaysRange(as_Date1, as_Date2) 
			{
			 // 년도, 월, 일로 분리 
			 var as_DT1 = as_Date1.split("-"); 
			 var as_DT2   = as_Date2.split("-");
			 
			 // Number()를 이용하여 월을 2자리로 포맷
			 as_DT1[1] = (Number(as_DT1[1]) - 1) + ""; 
			 as_DT2[1] = (Number(as_DT2[1]) - 1) + "";
			 
			 var s_DT = new Date(as_DT1[0], as_DT1[1], as_DT1[2]); 
			 var e_DT   = new Date(as_DT2[0], as_DT2[1], as_DT2[2]);
			 
			 return (e_DT.getTime() - s_DT.getTime()) / 1000 / 60 / 60 / 24; 
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
