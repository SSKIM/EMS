<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/popup/CP020.js"></script>
		<script type="text/javascript">
		
		</script>
	</head>
	<body style="margin: 0px 5px 0px 5px">
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>화면ID</th>
				<td>
					<input type="text" id="SCREEN_ID2" maxlength="10"/>
				</td>
				<th>화면명</th>
				<td>
					<input type="text" id="SCREEN_NAME2" maxlength="100" style="width:99%"/>
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40px"/><col width="80px"/><col width="140px"/><col width="40px"/><col width="240px"/><col width="80px"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>화면ID</th>
						<th>화면명</th>
						<th>화면구분</th>
						<th>화면URL</th>
						<th>상태</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="6"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
