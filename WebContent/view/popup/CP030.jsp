<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/popup/CP030.js"></script>
	</head>
	<body style="margin: 0px 5px 0px 5px">
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>메뉴ID</th>
				<td>
					<input type="text" id="MENU_ID2" maxlength="10"/>
				</td>
				<th>메뉴명</th>
				<td>
					<input type="text" id="MENU_NAME2" maxlength="100" style="width:99%"/>
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40px"/><col width="80px"/><col width="140px"/><col width="80px"/><col width="40px"/><col width="240px"/><col width="80px"/><col width="40px"/><col width="80px"/><col width="80px"/><col width="80px"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>메뉴ID</th>
						<th>메뉴명</th>
						<th>메뉴참조</th>
						<th>메뉴구분</th>
						<th>메뉴URL</th>
						<th>메뉴경로</th>
						<th>메뉴Level</th>
						<th>화면ID</th>
						<th>정렬순서</th>
						<th>상태</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="11"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
