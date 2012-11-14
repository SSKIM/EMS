<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/system/EA041.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>화면ID</th>
				<td>
					<input type="text" id="SCREEN_ID2" maxlength="10"/>
				</td>
				<th>화면명</th>
				<td>
					<input type="text" id="SCREEN_NAME2" maxlength="10" style="width:99%"/>
				</td>
			</tr>
		</table>
		<table class="mainForm" style="width:100%"><tr><td class="data">
			[선택 : <span id="SCREEN_ID"></span> <span id="SCREEN_NAME"></span>]
			<div class="main" id="divMain1">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40"/><col width="60"/><col width="150"/><col width="60"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>화면ID</th>
						<th>화면명</th>
						<th>화면구분</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			</div>
		</td>
		<td class="data">
			[선택 : <span id="BUTTON_ID"></span> <span id="BUTTON_NAME"></span>]
			<div class="main" id="divMain2">
			<form id="formData" name="formData" method="post">
			<table class="dataTable" id="dataTable2">
				<colgroup>
					<col width="40"/><col width="40"/><col width="80"/><col width="100"/><col width="40"/><col width="40"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>화면ID</th>
						<th>버튼ID</th>
						<th>버튼명</th>
						<th>버튼그룹</th>
						<th>정렬순서</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			</form>
			</div>
		</td></tr></table>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>