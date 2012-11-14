<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<jsp:useBean id="combobox" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<%
	Map resultSet = CommonUtil.getResultSet(request);
	List menuGroup = null;
	if(resultSet != null) {
		menuGroup  = (List)resultSet.get("MENU_GROUP_LIST");
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/system/EC030.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th>메뉴 그룹</th>
			<td>
				<jsp:setProperty name="combobox" property="id" value="MENU_GRP2"/>
				<jsp:setProperty name="combobox" property="dataSource" value="<%=menuGroup%>"/>
				<jsp:getProperty name="combobox" property="bindData" />
			</td>
		</tr></table>
		<table class="mainForm" cellpadding="0" cellspacing="0" style="width:100%"><tr><td valign="top">
			[선택 : <span id="AUTH_ID"></span> <span id="AUTH_NAME"></span>]
			<div class="main" id="divMain1">
			<table id="dataTable" class="dataTable">
				<colgroup>
					<col width="50"/><col width="80"/><col width="200"/>
				</colgroup>
				<thead>
					<tr>
						<th>권한ID</th>
						<th>권한명</th>
						<th>비고</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			</div>
		</td>
		<td valign="top">
			[선택 : <span id="MENU_ID"></span> <span id="MENU_NAME"></span>]
			<div class="main" id="divMain2">
			<table id="dataTable1" class="dataTable">
				<colgroup>
					<col width="40"/><col width="40"/><col width="40"/><col width="40"/><col width="60"/><col width="160"/><col width="50"/><col width="50"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>선택</th>
						<th>메뉴구분</th>
						<th>메뉴레벨</th>
						<th>메뉴ID</th>
						<th>메뉴명</th>
						<th>메뉴참조</th>
						<th>화면ID</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			</div>
		</td></tr></table>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>