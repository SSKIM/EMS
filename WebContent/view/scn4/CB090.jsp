<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AB090.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<form id="formData" name="formData" method="post" enctype="multipart/form-data">
		<table class="searchTable">
			<tr>
				<th style="width:120px">카드내역 파일</th>
				<td>
					<input type="file" id="filename" name="filename" style="width:99%" />
				</td>
			</tr>
		</table>
		</form>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1" style="width:1600px">
				<colgroup>
					<col width=40><col width=80><col width=80><col width=80><col width=120><col width=120><col width=200><col width=80><col width=120><col width=120><col width=120><col width=80><col width=80><col width=80><col width=80><col width=80><col width=80><col width=80>
				</colgroup>
				<thead>
					<tr>
						<th><nobr>순번</nobr></th>
						<th><nobr>기업명</nobr></th>
						<th><nobr>그룹명</nobr></th>
						<th><nobr>은행</nobr></th>
						<th><nobr>계좌</nobr></th>
						<th><nobr>계좌별칭</nobr></th>
						<th><nobr>거래일자</nobr></th>
						<th><nobr>적요</nobr></th>
						<th><nobr>통화</nobr></th>
						<th><nobr>입금액</nobr></th>
						<th><nobr>출금액</nobr></th>
						<th><nobr>거래후잔액</nobr></th>
						<th><nobr>거래구분</nobr></th>
						<th><nobr>거래점</nobr></th>
						<th><nobr>거래일시</nobr></th>
						<th><nobr>메모</nobr></th>
						<th><nobr>최종조회일</nobr></th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="17"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
