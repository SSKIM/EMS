<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/system/EB011.js"></script>
		<script type="text/javascript">
		  		var str1 = "RN";
		  		var str2 = "DOMAIN_USER";
		  		var str3 = "DOMAIN_NMAE";
		</script>
	</head>
	<body style="margin: 0px 5px 0px 5px">
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>User Name</th>
				<td>
					<input type="text" id="S_DOMAIN_USER"/>
				</td>
				<th>Domain Name</th>
				<td>
					<input type="text" style="width:60%" id="S_DOMAIN_NAME"/>
				</td>
			</tr>
			<tr>
				<th>Organizational Unit</th>
				<td colspan="3">
					<input type="text" id="S_OU"/>
				</td>
			</tr>			
		</table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40"/><col width="120px"/><col width="120px"/><col width="120px"/><col width="120px"/><col width="120px"/>
				</colgroup>
				<thead>
					<tr>
						<th>No.</th>
						<th>User Name</th>
						<th>Display Name</th>
						<th>Description</th>
						<th>Department</th>
						<th>Domain_Name</th>
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
