<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<jsp:useBean id="combobox" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<%
	Map resultSet = CommonUtil.getResultSet(request);
	List buttonList = null, comboMenuGroup = null, comboMenuType  = null;
	if(resultSet != null) {
		buttonList     = (List)resultSet.get("BUTTON_LIST");
		comboMenuGroup = (List)resultSet.get("MENU_GROUP_LIST");
		comboMenuType  = (List)resultSet.get("MENU_TYPE_LIST");
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/system/EA030.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th>메뉴 그룹</th>
			<td>
				<jsp:setProperty name="combobox" property="id" value="MENU_GRP2"/>
				<jsp:setProperty name="combobox" property="dataSource" value="<%=comboMenuGroup%>"/>
				<jsp:getProperty name="combobox" property="bindData" />
			</td>
			<th>메뉴ID</th>
			<td>
				<input type="text" id="MENU_ID2" />
			</td>
			<th>메뉴명</th>
			<td>
				<input type="text" id="MENU_NAME3" />
			</td>
		</tr></table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable" style="width:100%">
				<thead>
					<tr>
						<th width="40px">순번</th>
						<th width="80px">메뉴ID</th>
						<th width="200px">메뉴명</th>
						<th width="200px">메뉴명2</th>
						<th width="100px">메뉴참조</th>
						<th width="60px">메뉴구분</th>
						<th width="180px">메뉴URL</th>
						<th width="100px">메뉴경로</th>
						<th width="60px">메뉴Level</th>
						<th width="100px">화면ID</th>
						<th width="100px">정렬순서</th>
						<th width="100px">상태</th>
						<th style="display:none">입력일자</th>
						<th style="display:none">일력자</th>
						<th style="display:none">수정일자</th>
						<th style="display:none">수정자</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
		<div class="button">
			<jsp:setProperty name="button" property="buttonGroup" value="2"/>
			<jsp:setProperty name="button" property="dataSource" value="<%=buttonList%>"/>
			<jsp:getProperty name="button" property="dataBind" />
		</div>
		<form id="formData" name="formData" method="post">
			<input type="hidden" id="rowIndex" name="rowIndex"/>
			<table width="100%" id="formTable" class="formTable">
				<tr>
					<th id="lblMENU_ID">메뉴ID</th>
					<td>
						<input type="text" id="MENU_ID" name="MENU_ID" maxlength="10"/>
					</td>
					<th id="lblMENU_NAME">메뉴명</th>
					<td>
						<input type="text" id="MENU_NAME" name="MENU_NAME" maxlength="100" style="width:99%"/>
					</td>
					<th id="lblMENU_NAME2">메뉴명2</th>
					<td>
						<input type="text" id="MENU_NAME2" name="MENU_NAME2" maxlength="100" style="width:99%"/>
					</td>
					<th id="lblMENU_REF">메뉴참조</th>
					<td>
						<input type="text" id="MENU_REF" name="MENU_REF" maxlength="10"/>
						<img id="btnPopupMenuRef" src="./theme/default/image/button/search.png" class="popup"/>
					</td>
				</tr>
				<tr>
					<th id="lblMENU_TYPE">메뉴구분</th>
					<td>
						<jsp:setProperty name="combobox" property="id" value="MENU_TYPE"/>
						<jsp:setProperty name="combobox" property="isBlank" value="true"/>
						<jsp:setProperty name="combobox" property="dataSource" value="<%=comboMenuType%>"/>
						<jsp:getProperty name="combobox" property="bindData" />
					</td>
					<th id="lblMENU_URL">메뉴 URL</th>
					<td>
						<input type="text" id="MENU_URL" name="MENU_URL" style="width:99%"/>
					</td>
					<th id="lblMENU_LEVEL">메뉴 Level</th>
					<td>
						<input type="text" id="MENU_LEVEL" name="MENU_LEVEL"/>
					</td>
				</tr>
				<tr>
					<th id="lblSCREEN_ID">화면ID</th>
					<td>
						<input type="text" id="SCREEN_ID" name="SCREEN_ID"/>
						<img id="btnPopupScreenID" src="./theme/default/image/button/search.png" class="popup"/>
					</td>
					<th id="lblSORT_SEQ">정렬순서</th>
					<td>
						<input type="text" id="SORT_SEQ" name="SORT_SEQ" maxlength="4"/>
					</td>
					<th id="lblSTATUS">상태</th>
					<td>
						<jsp:setProperty name="radiobox" property="name" value="STATUS"/>
						<jsp:setProperty name="radiobox" property="dataType" value="YesNo"/>
						<jsp:getProperty name="radiobox" property="bindData" />
					</td>
				</tr>
			</table>
			<table class="historyTable">
				<tr>
					<th>입력일자</th><td><span id="INS_DATE"></span></td>
					<th>입력자</th><td><span id="INS_USER"></span></td>
					<th>수정일자</th><td><span id="UPD_DATE"></span></td>
					<th>수정자</th><td><span id="UPD_USER"></span></td>
				</tr>
			</table>
		</form>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>