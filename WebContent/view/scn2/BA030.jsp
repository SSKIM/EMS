<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<jsp:useBean id="combobox" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn2/BA030.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th></th>
			<td style="width:35%">
			
			</td>
			<th></th>
			<td style="width:35%">
			
			</td>
		</tr></table>
		<div class="main" style="height:200px;width:500px">
			<input type="hidden" id="HIST_GRP"/>
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40"/><col width="80"/><col width="80"/><col width="60"/><col width="100"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>배치그룹</th>
						<th>처리일자</th>
						<th>건수</th>
						<th>상태</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="5"></td></tr>
				</tbody>
			</table>
		</div>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable2" style="width:2000px">
				<colgroup>
					<col width="40"/><col width="80"/><col width="60"/><col width="40"/><col width="100"/><col width="100"/><col width="70"/><col width="40"/><col width="80"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>전표발행일자</th>
						<th>전표번호</th>
						<th>전표발생순번</th>
						<th>전표발행조직</th>
						<th>전표발행팀</th>
						<th>계정코드</th>
						<th>차대구분</th>
						<th>금액</th>
						<th>적요</th>
						<th>참조사항</th>
						<th>증권번호</th>
						<th>사고번호</th>
						<th>사용유무</th>
						<th>증빙서유무</th>
						<th>최종변경일자</th>
						<th>최종변경자</th>
						<th>최종변경프로그램ID</th>
						<th>조정여부</th>
						<th>조정전표정보</th>
						<th>I/F일자</th>
						<th>부서코드</th>
						<th>채널코드</th>
						<th>상태</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="24"></td></tr>
				</tbody>
			</table>
		</div>
		<div style="width:100%;height:30px;margin:5px" align=center>
			<span id="pager1"></span> &nbsp;&nbsp;<span id="total"/>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
