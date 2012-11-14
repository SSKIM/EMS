<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<jsp:useBean id="combobox" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn2/BA010.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>전표번호</th>
				<td style="width:35%">
					<input type="text" id="VOUCHER_NO2" />
				</td>
				<th>전표발행일자</th>
				<td style="width:35%">
	
				</td>
			</tr>
			<tr>
				<th>전표발행조직</th>
				<td>
					<input type="text" id="VOUCHER_NO2" />
				</td>
				<th>전표발행팀</th>
				<td>
	
				</td>
			</tr>
			<tr>
				<th>비고</th>
				<td>
					<input type="text" id="VOUCHER_NO2" />
				</td>
			</tr>
		</table>
		<div class="main" style="height:400px">
			<table class="dataTable" id="dataTable">
				<col width="40px"/>
				<thead>
					<tr>
						<th>Seq</th>
						<th>계정과목코드</th>
						<th>계정과목명</th>
						<th>금액</th>
						<th>차대구분</th>
						<th>적요</th>
						<th>증권번호</th>
						<th>사고번호</th>
						<th>증빙</th>
						<th>최종변경일자</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="10"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
