<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil,com.das.fms.vo.UserVO" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AB092.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
			<th>계정명</th>
			<td>
				가수금-기타
			</td>
			<th>계정코드</th>
			<td>
				2312999
			</td>
			</tr>
		</table>
		<div class="main" id="divMain1" style="height:400px">
			<table class="dataTable" id="dataTable1" style="width:1000px">
				<colgroup>
					<col width=40/><col width=40/><col width=200/><col width=80/><col width=80/><col width=80/><col width=80/><col width=80/>
				</colgroup>
				<thead>
					<tr>
						<th class="seq"></th>
						<th><nobr>선택</nobr></th>
						<th><nobr>적요</nobr></th>
						<th><nobr>입금일자</nobr></th>
						<th><nobr>금액</nobr></th>
						<th><nobr>차대</nobr></th>
						<th><nobr>부서명</nobr></th>
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
