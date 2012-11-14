<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn3/SA030.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table id="searchTable1" class="searchTable">
			<tr>
				<th>비용구분명1</th>
				<td style="width:35%">
					<input type="text" id="S_EXPS_TYPE_NAME1" style="width:99%" maxlength="40" />
				</td>
				<th>비용구분명2</th>
				<td style="width:35%">
					<input type="text" id="S_EXPS_TYPE_NAME2" style="width:99%" maxlength="40" />
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40"/><col width="80"/><col width="200"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>비용구분ID</th>
						<th>비용구분명</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="3"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
