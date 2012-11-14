<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AA030.js"></script>
	</head>
	
		<%@ include file="../include/button.jsp" %><body>
		<table class="searchTable">
			<tr>
				<th>전표번호</th>
				<td style="width:30%">
					<input type="text" id="S_JRNL_NO" maxlength="9"/>
				</td>
				<th>전표상태</th>
				<td>
					<input type="radio" name="S_STATUS" value=""><span class="radio">전체</span>
					<input type="radio" name="S_STATUS" value="T"><span class="radio">저장</span>
					<input type="radio" name="S_STATUS" value="D"><span class="radio">삭제</span>
					<input type="radio" name="S_STATUS" value="S"><span class="radio">제출</span>
				</td>
			</tr>
			<tr>
				<th>작성일자</th>
				<td colspan="3">
					<input type="text" id="S_WRITE_DATE_FROM" name="S_WRITE_DATE_FROM" maxlength="10" class="date" /> ~ 
					<input type="text" id="S_WRITE_DATE_TO" name="S_WRITE_DATE_TO" maxlength="10" class="date" />
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40px"/><col width="40px"/><col width="100px"/><col width="80px"/><col width="100px"/><col width="100px"/><col width="80px"/><col width="80px"/><col width="80px"/><col width="80px"/><col width="230px"/>
				</colgroup>
				<thead>
					<tr>
						<th><nobr>순번</nobr></th>
						<th><nobr>선택</nobr></th>
						<th><nobr>전표번호</nobr></th>
						<th><nobr>전표구분</nobr></th>
						<th><nobr>거래일자</nobr></th>
						<th><nobr>작성일자</nobr></th>
						<th><nobr>작성자</nobr></th>
						<th><nobr>출력일자</nobr></th>
						<th><nobr>제출일자</nobr></th>
						<th><nobr>상태</nobr></th>
						<th><nobr>적요</nobr></th>
						<th><nobr>취소/반려 사유</nobr></th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="12"></td></tr>
				</tbody>
			</table>
		</div>
		<div class="main" style="height:300px;">
			<span id="JRNL_NO" class="hidden"></span>
			<table class="dataTable" id="dataTable2" style="width:1500px">
				<col width="40px"/><col width="80px"/><col width="100px"/><col width="150px"/><col width="80px"/><col width="200px"/><col width="80px"/><col width="100px"/><col width="80px"/><col/>
				<thead>
					<tr>
						<th>순번</th>
						<th>거래일자</th>
						<th>증빙구분</th>
						<th>비용구분</th>
						<th>금액</th>
						<th>거래처</th>
						<th>지급일자</th>
						<th>지급방법</th>
						<th>상태</th>
						<th>적요</th>
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