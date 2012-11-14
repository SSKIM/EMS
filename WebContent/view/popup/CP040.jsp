<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/popup/CP040.js"></script>
	</head>
	<body style="margin: 0px 5px 0px 5px">
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>버튼ID</th>
				<td>
					<input type="text" id="BUTTON_ID2" maxlength="40"/><input type="hidden" id="SCREEN_ID2"/>
				</td>
				<th>버튼명</th>
				<td>
					<input type="text" id="BUTTON_NAME2" maxlength="100" style="width:99%"/>
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1" style="width:1000px">
				<colgroup>
					<col width="20"/><col width="80px"/><col width="100px"/><col width="80px"/><col width="50px"/><col width="50px"/><col width="80px"/><col width="100px"/><col width="55px"/><col width="55px"/>
				</colgroup>
				<thead>
					<tr>
						<th width="20"><input type="checkbox" id="chkAll"/></th>
						<th width="80px">버튼ID</th>
						<th width="100px">버튼명</th>
						<th width="80px">이미지경로</th>
						<th width="50px">이미지넓이</th>
						<th width="50px">이미지높이</th>
						<th width="80px">스타일시트</th>
						<th width="100px">비고</th>
						<th width="55px">정렬순서</th>
						<th width="55px">상태</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="10"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
