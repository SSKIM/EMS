<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn3/SA040.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table id="searchTable1" class="searchTable"><tr>
			<th></th>
			<td style="width:35%">
				<input type="text" id="VOUCHER_NO2" />
			</td>
			<th></th>
			<td style="width:35%">
				<input type="text" id="VOUCHER_NO2" />
			</td>
		</tr></table>
		<div id="divMain" class="main" style="height:400px">
			<table class="dataTable" id="dataTable">
				<col width="40px"/>
				<thead>
					<tr>
						<th>순번</th>
						<th>구분</th>
						<th>일자</th>
						<th>증빙구분</th>
						<th>금액</th>
						<th>내용</th>
						<th>비고</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="7"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
