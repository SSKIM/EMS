<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/system/EC050.js"></script>
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
			[선택 : <span id="TAB_ID"></span> <span id="TAB_NAME"></span>]
			<div class="main" style="height:200px">
			<table id="dataTable2" class="dataTable">
				<colgroup>
					<col width="20"/><col width="50"/><col width="60"/><col width="80"/>
				</colgroup>
				<thead>
					<tr>
						<th>선택</th>
						<th>화면ID</th>
						<th>탭ID</th>
						<th>탭명</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			</div>
		</td>
		</tr></table>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>