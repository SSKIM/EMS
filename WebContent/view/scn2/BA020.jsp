<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn2/BA020.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th style="width:120px" id="S_TRANS_DATE">처리일자</th>
			<td>
				<input type="text" id="S_TRANS_DATE_FROM" class=date maxlength=10 /> ~ 
				<input type="text" id="S_TRANS_DATE_TO" class=date maxlength=10 />
			</td>
		</tr></table>
		<div class="main" style="height:200px;width:500px">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40"/><col width="80"/><col width="80"/><col width="60"/><col width="60"/><col width="60"/><col width="60"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>배치그룹</th>
						<th>처리일자</th>
						<th>전송구분</th>
						<th>시작시간</th>
						<th>종료시간</th>
						<th>건수</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="7"></td></tr>
				</tbody>
			</table>
		</div>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable2">
				<colgroup>
					<col width="40"/><col width="80"/><col width="80"/><col width="60"/><col width="60"/><col width="70"/><col width="60"/><col width="80"/><col/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>배치그룹</th>
						<th>처리일자</th>
						<th>처리일시</th>
						<th>전송구분</th>
						<th>전송플래그</th>
						<th>건수</th>
						<th>에러코드</th>
						<th>로그내용</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="9"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
