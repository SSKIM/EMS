<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AA040.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>전표번호</th>
				<td style="width:30%">
					<input type="text" id="S_JRNL_NO" maxlength="9"/>
				</td>
				<th>전표상태</th>
				<td>
					<input type="radio" name="S_STATUS" value=""><span class="radio">전체</span>
					<input type="radio" name="S_STATUS" value="U"><span class="radio">미지급</span>
					<input type="radio" name="S_STATUS" value="C"><span class="radio">취소</span>
					<input type="radio" name="S_STATUS" value="W"><span class="radio">지급보류</span>
					<input type="radio" name="S_STATUS" value="W"><span class="radio">지급대상</span>
					<input type="radio" name="S_STATUS" value="O"><span class="radio">일부지급</span>
					<input type="radio" name="S_STATUS" value="A"><span class="radio">지급완료</span>
				</td>
			</tr>
			<tr>
				<th id="lblS_SUBMIT_DATE">제출일자</th>
				<td colspan="3">
					<input type="text" id="S_SUBMIT_DATE_FROM" name="S_SUBMIT_DATE_FROM" class=date maxlength="10"/> ~ 
					<input type="text" id="S_SUBMIT_DATE_TO" name="S_SUBMIT_DATE_TO" class=date maxlength="10"/>
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1" style="width:1800px">
				<colgroup>
					<col width="40"/><col width="80"/><col width="30"/><col width="80"/><col width="80"/><col width="120"/><col width="160"/><col width="150"/><col width="100"/><col width="100"/><col width=""/><col width="80"/><col width="100"/><col width="60"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>전표번호</th>
						<th>Seq</th>
						<th>제출일자</th>
						<th>거래일자</th>
						<th>증빙구분</th>
						<th>비용구분</th>
						<th>거래처</th>
						<th>지급요청일자</th>
						<th>지급방법</th>
						<th>적요</th>
						<th>지급일자</th>
						<th>지급전표번호</th>
						<th>상태</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="14"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
