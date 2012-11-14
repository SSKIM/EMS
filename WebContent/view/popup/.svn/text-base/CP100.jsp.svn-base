<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/popup/CP100.js"></script>
				<script type="text/javascript">
		  		var str1 = "RN";
		  		var str2 = "VENDOR_CODE";
		  		var str3 = "VENDOR_NAME";
		  		var str4 = "BUSI_NO";
		  		var str5 = "BANK_NAME";
		  		var str6 = "BANK_ACNT_NUM";
		</script>
	</head>
	<body style="margin: 0px 5px 0px 5px">
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th style="width:15%">거래처코드</th>
			<td style="width:35%">
				<input type="text" id="S_VENDOR_CODE" maxlength="20" />
			</td>
			<th style="width:15%">거래처명</th>
			<td style="width:35%">
				<input type="text" id="S_VENDOR_NAME" maxlength="40" style="width:99%" />
			</td>
		</tr></table>
		<div id="divMain" class="main">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40"/><col width="120px"/><col/><col width="120px"/><col width="120px"/><col width="120px"/><col width="100px"/>
				</colgroup>
				<thead>
					<tr>
						<th id="RN" onclick ="Retrieve(1)">순번</th>
						<th id="VENDOR_CODE" onclick="Retrieve2(1,str2,VENDOR_CODE)">거래처코드</th>
						<th id="VENDOR_NAME" onclick="Retrieve2(1,str3,VENDOR_NAME)">거래처명</th>
						<th id="BUSI_NO" onclick="Retrieve2(1,str3,BUSI_NO)">사업자번호</th>
						<th id="BANK_NAME" onclick="Retrieve2(1,str3,BANK_NAME)">은행명</th>
						<th id="BANK_ACNT_NUM" onclick="Retrieve2(1,str3,BANK_ACNT_NUM)">계좌번호</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="6"></td></tr>
				</tbody>
			</table>
		</div>
		<div style="width:100%;height:30px;margin:5px" align=center>
			<span id="pager1"></span>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
