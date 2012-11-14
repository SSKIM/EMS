<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map" %>
<%@ page import="com.mindtree.framework.util.CommonUtil,com.das.fms.vo.UserVO"%>
<%
	UserVO userVO = (UserVO)CommonUtil.getUserSession(request);
	String telNo = "", hpNo = "", email= "", deptCode = "", deptName = "";
	String appvUser1 = "", appvUser2 = "", appvUser3 = "", appvUser4 = "", appvUser5 = "";
	String appvUseYn1 = "", appvUseYn2 = "", appvUseYn3 = "", appvUseYn4 = "", appvUseYn5 = "";
	Map userInof = null, appvLine = null;
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet!=null) {
		userInof = (Map)resultSet.get("USER_INFO");
		appvLine = (Map)resultSet.get("APPV_LINE");

		if(userInof!=null) {
			telNo    = (String)userInof.get("TEL_NO");
			hpNo     = (String)userInof.get("HP_NO");
			email    = (String)userInof.get("EMAIL");
			deptCode = (String)userInof.get("DEPT_CODE");
			deptName = (String)userInof.get("DEPT_NAME");
		}

		if(appvLine!=null) {
			appvUser1  = CommonUtil.nvl(appvLine.get("APPV_USER1"));
			appvUser2  = CommonUtil.nvl(appvLine.get("APPV_USER2"));
			appvUser3  = CommonUtil.nvl(appvLine.get("APPV_USER3"));
			appvUser4  = CommonUtil.nvl(appvLine.get("APPV_USER4"));
			appvUser5  = CommonUtil.nvl(appvLine.get("APPV_USER5"));

			if("Y".equals((String)appvLine.get("APPV_USE_YN1"))) appvUseYn1 = "checked";
			if("Y".equals((String)appvLine.get("APPV_USE_YN2"))) appvUseYn2 = "checked";
			if("Y".equals((String)appvLine.get("APPV_USE_YN3"))) appvUseYn3 = "checked";
			if("Y".equals((String)appvLine.get("APPV_USE_YN4"))) appvUseYn4 = "checked";
			if("Y".equals((String)appvLine.get("APPV_USE_YN5"))) appvUseYn5 = "checked";
		}
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript">
			var W001 = "<%=CommonUtil.getMessage(request,"W001")%>"; //필수 항목을 입력해주세요!
			var I002 = "<%=CommonUtil.getMessage(request,"I002")%>"; //조회 되었습니다.
			var I003 = "<%=CommonUtil.getMessage(request,"I003")%>"; //처리 되었습니다.
			var W013 = "<%=CommonUtil.getMessage(request,"W013")%>";
			$(document).ready(function(){
			    required("#PASSWORD",true);
			    $("#btnChangePwd").click(Change);
			    $("#btnUpdate").click(Update);
			    $("#btnAppvLine").click(AppvLine);
			});
			function Change() {
				requiredClear();
			    required("#PASSWORD_NEW,#PASSWORD_REP",true);
				$("#message").empty();
				if(!requiredValidate("#formData")) return;

				if($("#PASSWORD_NEW").val() != $("#PASSWORD_REP").val()) {
					alert(W013);
					$("#PASSWORD_REP").focus().select();
					return false;
				}
			    var action = "index.do?method=userEditChange&call=xml";
			    var data   = "&USER_ID="+$("#USER_ID").val()
				           + "&PASSWORD="+$("#PASSWORD").val()
				           + "&PASSWORD_NEW="+$("#PASSWORD_NEW").val();

				$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
					success: function(result){
						var msg = $(result).find("RETURN_MESSAGE").text();
						if(msg == '') {
							$("#message").html(I003);
							alert(I003);
						} else {
							$("#message").html(msg);
							alert(msg);
						}
					},
					error: function(xhr, ajaxOptions, thrownError){
						alert(xhr.statusText); 
//						alert(xhr.responseText); //for debuging 
					}
				});
			}
			function Update() {
				requiredClear();
				required("#PASSWORD_NEW,#PASSWORD_REP",false);
				$("#message").empty();
				if(!requiredValidate("#formData")) return;

			    var action = "index.do?method=userEditUpdate&call=xml";
			    var data   = $("#formData").serialize()
			               + "&USER_ID="+$("#USER_ID").val();

				$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
					success: function(result){
						var msg = $(result).find("RETURN_MESSAGE").text();
						if(msg == '') {
							$("#message").html(I003);
							alert(I003);
						} else {
							$("#message").html(msg);
							alert(msg);
						}
					},
					error: function(xhr, ajaxOptions, thrownError){
						alert(xhr.statusText); 
//						alert(xhr.responseText); //for debuging 
					}
				});
			}
			function AppvLine() {
				for(var i=1;i<=5;i++) {
					if($("#APPV_USE_YN"+i).attr("checked") && $("#APPV_USER"+i).val()=="") {
						alert("결재자"+i+"를  입력해주세요!");
						$("#APPV_USER"+i).focus();
						return;
					}
				}
					
			    var action = "index.do?method=userEditAppvLine&call=xml";
			    var data   = "&APPV_USE_YN1="+$("#APPV_USE_YN1").attr("checked")
			               + "&APPV_USE_YN2="+$("#APPV_USE_YN2").attr("checked")
			               + "&APPV_USE_YN3="+$("#APPV_USE_YN3").attr("checked")
			               + "&APPV_USE_YN4="+$("#APPV_USE_YN4").attr("checked")
			               + "&APPV_USE_YN5="+$("#APPV_USE_YN5").attr("checked")
			               + "&APPV_USER1="+getString("#APPV_USER1")
			               + "&APPV_USER2="+getString("#APPV_USER2")
			               + "&APPV_USER3="+getString("#APPV_USER3")
			               + "&APPV_USER4="+getString("#APPV_USER4")
			               + "&APPV_USER5="+getString("#APPV_USER5")
						   ;

				$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
					success: function(result){
						var msg = $(result).find("RETURN_MESSAGE").text();
						if(msg == '') {
							$("#message").html(I003);
						} else {
							$("#message").html(msg);
						}
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
		<table width="700px" align="center">
			<tr>
				<td align=center><form id="formData" name="formData" method="post">
			        <input type="hidden" id="USER_ID" name="USER_ID" value="<%=userVO.getUserId()%>"/>
			        <table width="100%" class="img" border="0" cellspacing="0" cellpadding="0">
			          <tr>
			            <td align="right"><img src="./theme/default/image/user_img.gif"></td>
			          </tr>
			          <tr>
			            <td><table width="100%" border="0" cellpadding="0" cellspacing="0">
			                <tr>
			                  <td width="14"><img src="./theme/default/image/bar_left.gif" width="14" height="33"></td>
			                  <td align="center" background="./theme/default/image/bar_bg.gif"><img src="./theme/default/image/user_title01.gif" width="86" height="33"></td>
			                  <td width="14"><img src="./theme/default/image/bar_right.gif" width="14" height="33"></td>
			                </tr>
			              </table></td>
			          </tr>
			        </table>
			        <table width="100%" class="formTable" style="width:100%">
			          <tr>
			            <th style="width:120px">USER ID</th>
			            <td><%=userVO.getUserId()%></td>
			          </tr>
			          <tr>
			            <th>USER NAME</th>
			            <td><%=userVO.getUserName()%></td>
			          </tr>
			          <tr>
			            <th id="lblPASSWORD">PASSWORD(Old)</th>
			            <td><input type="password" id="PASSWORD" name="PASSWORD" style="width:100px" maxlength="20"/></td>
			          </tr>
			        </table>
			        <table width="100%" class="img" border="0" cellpadding="0" cellspacing="0">
			          <tr>
			            <td width="3"><img src="./theme/default/image/bar_left.gif" width="14" height="33"></td>
			            <td align="center" background="./theme/default/image/bar_bg.gif"><img src="./theme/default/image/user_title02.gif" width="94" height="33"></td>
			            <td width="14"><img src="./theme/default/image/bar_right.gif" width="14" height="33"></td>
			          </tr>
			        </table>
			        <table class="formTable" width="100%">
			          <tr>
			            <th id="lblPASSWORD_NEW" style="width:120px">PASSWORD(NWE))</th>
			            <td><input type="password" id="PASSWORD_NEW" name="PASSWORD_NEW" style="width:100px" maxlength="20"/></td>
			            <th id="lblPASSWORD_REP" style="width:120px">PASSWORD(RE)</th>
			            <td><input type="password" id="PASSWORD_REP" name="PASSWORD_REP" style="width:100px" maxlength="20"/></td>
			          </tr>
			        </table>
			        <table width="100%" class="img" border="0" cellpadding="0" cellspacing="0">
			          <tr>
			            <td width="3"><img src="./theme/default/image/bar_left.gif" width="14" height="33"></td>
			            <td align="center" background="./theme/default/image/bar_bg.gif"><img src="./theme/default/image/user_title03.gif" width="97" height="33"></td>
			            <td width="14"><img src="./theme/default/image/bar_right.gif" width="14" height="33"></td>
			          </tr>
			        </table>
					<table class="formTable" width="100%">
						<tr>
							<th style="width:120px">Telephone</th>
							<td><input type="text" id="TEL_NO" name="TEL_NO" value="<%=telNo%>" maxlength="14"/></td>
							<th style="width:120px">Mobile</th>
							<td><input type="text" id="HP_NO" name="HP_NO" value="<%=hpNo%>" maxlength="14"/></td>
						</tr>
					</table><br/>
			        <input type="button" id="btnChangePwd" name="btnChangePwd" value="비밀번호수정" width="48px" height="24px" class="command">
			        <input type="button" id="btnUpdate" name="btnUpdate" value="기본정보수정" width="48px" height="24px" class="command">
			      </form>
<table class="appvLineTable" id="dataTable1" align=center style="width:700px">
	<colgroup>
		<col width=80><col width=120><col width=300>
	</colgroup>
	<thead>
		<tr>
			<th>사용여부</th>
			<th>결재단계</th>
			<th>결재자</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th><input type='checkbox' id='APPV_USE_YN1' <%=appvUseYn1%> /></th>
			<th>결재1</th>
			<td><input type='text' id='APPV_USER1' value="<%=appvUser1%>" style="width:99%;margin:1px" maxlength="40"/></td>
		</tr>
		<tr>
			<th><input type='checkbox' id='APPV_USE_YN2' <%=appvUseYn2%> /></th>
			<th>결재2</th>
			<td><input type='text' id='APPV_USER2' value="<%=appvUser2%>" style="width:99%;margin:1px" maxlength="40"/></td>
		</tr>
		<tr>
			<th><input type='checkbox' id='APPV_USE_YN3' <%=appvUseYn3%> /></th>
			<th>결재3</th>
			<td><input type='text' id='APPV_USER3' value="<%=appvUser3%>" style="width:99%;margin:1px" maxlength="40"/></td>
		</tr>
		<tr>
			<th><input type='checkbox' id='APPV_USE_YN4' <%=appvUseYn4%> /></th>
			<th>결재4</th>
			<td><input type='text' id='APPV_USER4' value="<%=appvUser4%>" style="width:99%;margin:1px" maxlength="40"/></td>
		</tr>
		<tr>
			<th><input type='checkbox' id='APPV_USE_YN5' <%=appvUseYn5%> /></th>
			<th>결재5</th>
			<td><input type='text' id='APPV_USER5' value="<%=appvUser5%>" style="width:99%;margin:1px" maxlength="40"/></td>
		</tr>
	</tbody>
</table>
<input type="button" id="btnAppvLine" name="btnAppvLine" value="결재라인저장" width="48px" height="24px" class="command">
			      <br/>
			      <br/>
			      <div id="message" style="height:30px;color:red;"></div>
				</td>
			</tr>
		</table>
	</body>
</html>