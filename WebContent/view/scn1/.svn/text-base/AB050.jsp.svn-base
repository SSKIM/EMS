<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AB050.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<div style="margin:5px">
			<font color="red"><b>* 이전에 업로드된 카드내역을 중복하여 업로드 할 경우 연결건을 제외한 미연결 건에 대해서만 업데이트되면서 업로드 됩니다.</b></font><br/>
		</div>
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
			<table class="dataTable" id="dataTable1" style="width:1000px">
				<colgroup>
					<col width=40><col width=200><col width=80><col width=80><col width=100><col width=100><col width=300><col width=80>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>카드번호</th>
						<th>거래일자</th>
						<th>승인시간</th>
						<th>승인번호</th>
						<th>가맹점번호</th>
						<th>가맹점명</th>
						<th>청구금액</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="8"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
