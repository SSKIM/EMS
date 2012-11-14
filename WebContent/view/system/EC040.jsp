<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/system/EC040.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="mainForm" cellpadding="0" cellspacing="0" style="width:100%"><tr><td valign="top">
			[선택 : <span id="AUTH_ID"></span> <span id="AUTH_NAME"></span>]
			<div class="main" style="height:246px">
			<table id="dataTable" class="dataTable">
				<colgroup>
					<col width="40"/><col width="80"/><col/>
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
			[선택 : <span id="BUTTON_ID"></span> <span id="BUTTON_NAME"></span>]
			<div class="main" style="height:200px">
			<table id="dataTable2" class="dataTable">
				<colgroup>
					<col width="20"/><col width="50"/><col width="60"/><col width="80"/>
				</colgroup>
				<thead>
					<tr>
						<th>선택</th>
						<th>화면ID</th>
						<th>버튼ID</th>
						<th>버튼명</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			</div>
		</td>
		<td valign="top">
			[선택 : <span id="SCREEN_ID"></span> <span id="SCREEN_NAME"></span>]
			<div class="main" id="divMain2">
			<table id="dataTable1" class="dataTable">
				<colgroup>
					<col width="30"/><col width="40"/><col width="150"/><col width="40"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>화면ID</th>
						<th>화면명</th>
						<th>화면구분</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="4"></td></tr>
				</tbody>
			</table>
			</div>
		</td></tr></table>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>