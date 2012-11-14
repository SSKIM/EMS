<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AA020.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1" style="width:1500px">
				<colgroup>
					<col width=40><col width=80><col width=30><col width=80><col width=120><col width=160><col width=80><col width=100><col width=110><col width=100><col width=80><col>
				</colgroup>
				<thead>
					<tr>
						<th>선택</th>
						<th>전표번호</th>
						<th>Seq</th>
						<th>거래일자</th>
						<th>증빙구분</th>
						<th>비용구분</th>
						<th>금액</th>
						<th>거래처</th>
						<th>지급요청일자</th>
						<th>지급방법</th>
						<th>적요</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="11"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
