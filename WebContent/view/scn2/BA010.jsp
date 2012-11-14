<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	List buttonList = null;
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet != null) {
		buttonList = (List)resultSet.get("BUTTON_LIST");
	}
%>
<jsp:useBean id="ucoButton2" class="com.mindtree.framework.control.Button" scope="page"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn2/BA010.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th style="width:15%" id="lblS_TRANS_DATE">처리일자</th>
			<td style="width:35%">
				<input type="text" id="S_TRANS_DATE_FROM" class=date maxlength=10 /> ~ 
				<input type="text" id="S_TRANS_DATE_TO" class=date maxlength=10 />
			</td>
			<th style="width:15%">전표번호</th>
			<td style="width:35%">
				<input type="text" id="S_JRNL_NO" maxlength=9 />
			</td>
		</tr></table>
		<div class="main" style="height:200px;width:500px">
			<input type="hidden" id="HIST_GRP"/>
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40"/><col width="80"/><col width="80"/><col width="60"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>배치그룹</th>
						<th>처리일자</th>
						<th>건수</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="4"></td></tr>
				</tbody>
			</table>
		</div>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable2" style="width:2500px">
				<colgroup>
					<col width="70"/><col width="70"/><col width="90"/><col width="70"/><col width="90"/><col width="90"/><col width="70"/><col width="80"/><col width="70"/><col width="40"/><col width="450"/><col width="70"/><col width="90"/><col width="70"/><col width="70"/><col width="80"/><col width="140"/><col width="70"/><col width="130"/><col width="70"/><col width="100"/><col width="90"/><col width="70"/><col width="70"/><col width="40"/><col width="70"/>
				</colgroup>
				<thead>
					<tr>
						<th>배치그룹</th>
						<th>처리일자</th>
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
						<th>전표번호(SUN)</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="25"></td></tr>
				</tbody>
			</table>
		</div>
		<div style="width:100%;height:30px;margin:5px" align=center>
			<span id="pager1"></span> &nbsp;&nbsp;<span id="total"/>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
