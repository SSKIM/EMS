<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AA050.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>전표번호</th>
				<td style="width:35%">
					<input type="text" id="S_JRNL_NO" maxlength="9"/>
				</td>
				<th>작성일자</th>
				<td style="width:35%">
					<input type="text" id="S_WRITE_DATE_FROM" name="S_WRITE_DATE_FROM" style="width:80px" maxlength="10"/> ~ <input type="text" id="S_WRITE_DATE_TO" name="S_WRITE_DATE_TO" style="width:80px" maxlength="10"/>
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1">
				<col width="40px"/><col width="40px"/><col width="100px"/><col width="80px"/><col width="80px"/><col width="100px"/><col width="100px"/><col width="230px"/><col width="80px">
				<thead>
					<tr>
						<th>순번</th>
						<th>선택</th>
						<th>전표번호</th>
						<th>전표구분</th>
						<th>작성일자</th>
						<th>작성자</th>
						<th>재무 담당자</th>
						<th>적요</th>
						<th>반려일자</th>
						<th>반려사유</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="10"></td></tr>
				</tbody>
			</table>
		</div>
		<form id="formData" name="formData" method="post">
		<table class="formTable" id="fromTable1" style="height:40px">
			<tr>
				<th>전표번호</th>
				<td colspan=3>
					<span id="JRNL_NO"></span>
				</td>
			</tr>
			<tr>
				<th style="width:10%">반려일자</th>
				<td style="width:35%">
					<span id="REJECT_DATE"></span>
				</td>
				<th style="width:10%">재무 담당자</th>
				<td style="width:35%">
					<span id="REJECT_USER_NAME"></span>
				</td>
			</tr>
			<tr>
				<th>반려사유</th>
				<td colspan="3">
					<textarea id="REJECT_REASON" name="REJECT_REASON" rows="2" style="width:99%" disabled></textarea>
				</td>
			</tr>
		</table>
		</form>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
