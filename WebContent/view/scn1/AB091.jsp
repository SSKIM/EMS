<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil,com.das.fms.vo.UserVO" %>
<jsp:useBean id="combobox1" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<%
	Map resultSet = CommonUtil.getResultSet(request);
	List ACCT_Type = null;
	if(resultSet != null) {
		ACCT_Type    = (List)resultSet.get("BOND_LIST");
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AB091.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
			<th>계좌</th>
			<td>
				<jsp:setProperty name="combobox1" property="id" value="ACCT_CODE"/>
				<jsp:setProperty name="combobox1" property="dataSource" value="<%=ACCT_Type%>"/>
				<jsp:getProperty name="combobox1" property="bindData" />
			</td>
			<th>거래일자</th>
				<td>
					<input type="text" id="TRADE_DATE_FROM" name="TRADE_DATE_FROM" class=date maxlength="10"/> ~ 
					<input type="text" id="TRADE_DATE_TO" name="TRADE_DATE_TO" class=date maxlength="10"/>
				</td>
			<th>상태</th>
				<td colspan="4">
					<div id="divStatus">
						<input type="radio" name="S_STATUS" value=""><span class="radio">전체</span>
						<input type="radio" name="S_STATUS" value="R"><span class="radio">미처리</span>
						<input type="radio" name="S_STATUS" value="G"><span class="radio">가수금</span>
						<input type="radio" name="S_STATUS" value="I"><span class="radio">이자수익</span>
					</div>
			</tr>
		</table>
		<div class="main" id="divMain" style="height:200px">
			<table class="dataTable" id="dataTable1" style="width:1000px">
					<colgroup>
							<col width=40><col width=80><col width=80><col width=80><col width=150><col width=100><col width=80><col width=80><col width=80>
						</colgroup>
						<thead>
							<tr>
								<th class="seq"><nobr></nobr></th>
								<th><nobr>기업명</nobr></th>
								<th><nobr>그룹명</nobr></th>
								<th><nobr>은행</nobr></th>
								<th><nobr>계좌</nobr></th>
								<th><nobr>계좌별칭</nobr></th>
								<th><nobr>본계정</nobr></th>
								<th><nobr>가수금계정</nobr></th>
								<th><nobr>예금이자계정</nobr></th>
							</tr>
						</thead>
				<tbody>
					<tr><td colspan="9"></td></tr>
				</tbody>
					</table>
		</div>
		<div class="main" id="divMain2" style="height:400px">
			<table class="dataTable" id="dataTable2" style="width:1400px">
				<colgroup>
					<col width=40/><col width=80/><col width=80/><col width=200/><col width=80/><col width=80/><col width=80/><col width=80/><col width=80/><col width=60/>
				</colgroup>
				<thead>
					<tr>
						<th class="seq"></th>
						<th><nobr>선택</nobr></th>
						<th><nobr>거래일자</nobr></th>
						<th><nobr>적요</nobr></th>
						<th><nobr>입금액</nobr></th>
						<th><nobr>출금액</nobr></th>
						<th><nobr>거래후잔액</nobr></th>
						<th><nobr>거래구분</nobr></th>
						<th><nobr>거래점</nobr></th>
						<th><nobr>거래일시</nobr></th>
						<th><nobr>메모</nobr></th>
						<th><nobr>최종조회일</nobr></th>
						<th><nobr>상태</nobr></th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="13"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
