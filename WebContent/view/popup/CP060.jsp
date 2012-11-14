<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/popup/CP060.js"></script>
		<script type="text/javascript">
		  		var str1 = "RN";
		  		var str2 = "VENDOR_CODE";
		  		var str3 = "VENDOR_NAME";
		  		var str4 = "LOOKUP";
		</script>
	</head>
	<body style="margin: 0px 5px 0px 5px">
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable" style=""><tr>
			<th>사원ID</th>
			<td>
				<input type="text" id="S_VENDOR_CODE" maxlength="20" />
			</td>
			<th>사원명</th>
			<td>
				<input type="text" id="S_VENDOR_NAME" maxlength="40" style="width:99%" />
			</td>
		</tr></table>
		<div id="divMain" class="main">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40"/><col width="100px"/><col width="140px"/><col width="140px"/>
				</colgroup>
				<thead>
					<tr>
						<th id="RN" onclick ="Retrieve(1)">순번</th>
						<th id="VENDOR_CODE" onclick="Retrieve2(1,str2,VENDOR_CODE)">사원ID</th>
						<th id="VENDOR_NAME" onclick="Retrieve2(1,str3,VENDOR_NAME)">사원명</th>
						<th id="LOOKUP" onclick="Retrieve2(1,str4,LOOKUP)">부서명</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="4"></td></tr>
				</tbody>
			</table>
		</div>
		<div style="width:100%;height:30px;margin:5px" align=center>
			<span id="pager1"></span>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
