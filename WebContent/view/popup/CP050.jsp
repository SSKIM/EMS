<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/popup/CP050.js"></script>
		<script type="text/javascript">
		  		var str1 = "RN";
		  		var str2 = "ACCT_CODE";
		  		var str3 = "ACCT_NAME";
		  		var str4 = "LOOKUP";
		</script>
	</head>
	<body style="margin: 0px 5px 0px 5px">
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>계정과목코드</th>
				<td>
					<input type="text" id="S_ACCT_CODE" maxlength="7"/>
				</td>
				<th>계정과목명</th>
				<td>
					<input type="text" id="S_ACCT_NAME" maxlength="40"/>
				</td>
				<th>LOOKUP코드</th>
				<td>
					<input type="text" id="S_LOOKUP" maxlength="40"/>
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40"/><col width="120px"/><col/><col width="120px"/>
				</colgroup>
				<thead>
					<tr>
						<th id="RN" onclick ="Retrieve(1)">순번</th>
						<th id="ACCT_CODE" onclick ="Retrieve2(1,str2,ACCT_CODE)">계정과목코드</th>
						<th id="ACCT_NAME" onclick ="Retrieve2(1,str3,ACCT_NAME)">계정과목명</th>
						<th id="LOOKUP" onclick ="Retrieve2(1,str4,LOOKUP)">LOOKUP</th>
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
