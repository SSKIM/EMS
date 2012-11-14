<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AB081.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<form id="formData" name="formData" method="post" enctype="multipart/form-data">
		<table class="searchTable">
			<tr>
				<th style="width:120px">채권정보 파일 선택</th>
				<td>
					<input type="file" id="filename" name="filename" style="width:99%" />
				</td>
			</tr>
		</table>
		</form>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1" style="width:1500px">
				<colgroup>
					<col width=25><col width=80>
				</colgroup>
				<thead>
					<tr>
						<th rowspan="2"></th>
						<th rowspan="2"><nobr>거래일자</nobr></th>
						<th rowspan="2"><nobr>채권코드</nobr></th>
						<th rowspan="2"><nobr>채권명</nobr></th>
						<th rowspan="2"><nobr>적요</nobr></th>
						<th rowspan="2"><nobr>계정코드</nobr></th>
						<th rowspan="2"><nobr>계정명</nobr></th>
						<th rowspan="2"><nobr>부서코드</nobr></th>
						<th rowspan="2"><nobr>차변금액</nobr></th>
						<th rowspan="2"><nobr>대변금액</nobr></th>
						<th colspan="4"><nobr>유효성검사</nobr></th>
					</tr>
					<tr>
						<th><nobr>거래일자</nobr></th>
						<th><nobr>채권코드</nobr></th>
						<th><nobr>계정코드</nobr></th>
						<th><nobr>부서코드</nobr></th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
