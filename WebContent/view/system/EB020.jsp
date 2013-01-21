<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil"%>
<%@ page import="com.mindtree.framework.util.CommonUtil"%>
<%@ page import="com.das.fms.vo.UserVO"%>
<%
	UserVO _userSession2 = (UserVO)CommonUtil.getUserSession(request);
	String theme2       = getServletContext().getInitParameter("theme");
	Map resultSet = CommonUtil.getResultSet(request);
	List menu = null, buttonList = null, pwd_complex_use=null;
	if(resultSet!=null) {
		buttonList = (List)resultSet.get("BUTTON_LIST");
		pwd_complex_use = (List)resultSet.get("PWD_COMPLEX_USE");
	}
%>
<jsp:useBean id="cboPwduse" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboPwduse" property="dataSource" value="<%=pwd_complex_use%>"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript">
			//parent.window.resizeTo(1024,768);
			//parent.window.moveTo(0,0);
			$(document).ready(function(){
				readonly("#ENF_PW_HI",true);
				$("#btnSave").click(Save);
				Retrieve();
			});
			function Save() {
				if(!requiredValidate("#formData")) return false;
				$("#btnRetrieve").focus();
				//-----------------------------------------------------
			    var action = "system.do?method=EB020Save&call=xml";
			    var data   = $("#formData").serialize();

				$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
					success: function(result){
						if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
							return false;
						}
						alert("저장되었습니다.");
						Retrieve();
						message(I003);
					},
					error: function(xhr, ajaxOptions, thrownError){
						alert(xhr.statusText); 
//						alert(xhr.responseText); //for debuging 
					}
				});
			}
			function Retrieve() {
				var action = "system.do?method=EB020Retrieve";

				$.ajax({type: "post", url: action, dataType: "xml", cache: false,
					success: function(result){
						if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
							return false;
						}
						$(result).find("DATA_SET").find("ROW").each(function(){
							
							if($(this).find("CODE_ID").text() == "SEC_1")
							{
								$("#MAX_PW_AGE").val($(this).find("ETC1").text());
							}
							else if($(this).find("CODE_ID").text() == "SEC_2")
							{
								$("#ENF_PW_HI").val($(this).find("ETC1").text());
							}
							else if($(this).find("CODE_ID").text() == "SEC_3")
							{
								$("#MIN_PW_LEN").val($(this).find("ETC1").text());
								
							}
							else if($(this).find("CODE_ID").text() == "SEC_4")
							{
								$("#LOCK_FAIL_LOG").val($(this).find("ETC1").text());
							}
							else if($(this).find("CODE_ID").text() == "SEC_5")
							{
								$("#PWD_COMPLEX_USE").val($(this).find("ETC1").text());
							}
							else
							{
								$("#LOCK_USER_ACCESS").val($(this).find("ETC1").text());
							}
						});
						message(I003);
					},
					error: function(xhr, ajaxOptions, thrownError){
						alert(xhr.statusText); 
//						alert(xhr.responseText); //for debuging 
					}
				});
			}
		</script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<form id="formData" name="formData" method="post">
			<input type="hidden" id="rowIndex" name="rowIndex"/>
			<table class="formTable" id="fromTable1" style="width:800px">
				<tr>
					<th style="width:30%" id="lbMAX_PW_AGE">Maximum password age</th>
					<td>
						<input type="text" id="MAX_PW_AGE" name="MAX_PW_AGE" maxlength="3" class="number" style="width:20px">Days</input>
					</td>
					<th style="width:30%" id="lbENF_PW_HI">Enforce password history</th>
					<td>
						<input type="text" id="ENF_PW_HI" name="ENF_PW_HI" maxlength="2" class="number" style="width:20px">Passwords remembered</input>
					</td>
				</tr>
				<tr>
					<th style="width:30%" id="lbMIN_PW_LEN">Minimum password length</th>
					<td>
						<input type="text" id="MIN_PW_LEN" name="MIN_PW_LEN" maxlength="2" class="number" style="width:20px">Characters</input>
					</td>
					<th style="width:30%" id="lbLOCK_FAIL_LOG">Lock user after failed log in</th>
					<td>
						<input type="text" id="LOCK_FAIL_LOG" name="LOCK_FAIL_LOG" maxlength="2" class="number" style="width:20px">Failed attempts</input>
					</td>
				</tr>
				<tr>
					<th style="width:30%" id="lbLOCK_FAIL_LOG">Password must complexity requirement</th>
					<td>
						<jsp:setProperty name="cboPwduse" property="id" value="PWD_COMPLEX_USE"/>
						<jsp:setProperty name="cboPwduse" property="isBlank" value="true"/>
						<jsp:getProperty name="cboPwduse" property="bindData" />
					</td>
					<th style="width:30%" id="lbLOCK_USER_ACCESS">Lock out users that has not accessed</th>
					<td>
						<input type="text" id="LOCK_USER_ACCESS" name="LOCK_USER_ACCESS" maxlength="3" class="number" style="width:20px">Days</input>
					</td>
				</tr>
			</table>
		</form>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>