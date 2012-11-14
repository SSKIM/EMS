<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil,com.das.fms.vo.UserVO" %>
<%
	UserVO userVO = (UserVO)CommonUtil.getUserSession(request);
	Map appvData = null;
	Map resultSet = CommonUtil.getResultSet(request);
	List payMethod = null; Map bankInfo = null;
	if(resultSet!=null) {
		payMethod = (List)resultSet.get("PAY_METHOD_LIST");
		bankInfo  = (Map)resultSet.get("BANK_INFO");
		appvData  = (Map)resultSet.get("APPV_DATA");
	}
	String appvLine = (String)appvData.get("APPV_LINE");
%>
<jsp:useBean id="cboPayMethod" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboPayMethod" property="dataSource" value="<%=payMethod%>"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript">
			var ssEmplId = "<%=CommonUtil.nvl(userVO.getEmplId())%>";
			var appvLine = "<%=appvLine%>";
		</script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AB040.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable" id="searchTable1">
			<tr>
				<th style="width:10%">지급방법</th>
				<td style="width:20%">
					<jsp:setProperty name="cboPayMethod" property="id" value="S_PAY_METHOD_TYPE"/>
					<jsp:setProperty name="cboPayMethod" property="isAll" value="true"/>
					<jsp:getProperty name="cboPayMethod" property="bindData" />
				</td>
				<th style="width:10%">지급요청일자</th>
				<td style="width:20%">
					<input type="text" id="S_PAY_DUE_DATE" class="date" />
				</td>
				<th style="width:10%">전표상태</th>
				<td style="width:30%">
					<input type="radio" name="S_STATUS" value=""><span class="radio">전체</span>
					<input type="radio" name="S_STATUS" value="U"><span class="radio">미처리</span>
					<input type="radio" name="S_STATUS" value="Y"><span class="radio">지급대상</span>
					<input type="radio" name="S_STATUS" value="W"><span class="radio">지급보류</span>
				</td>
			</tr>
			<tr>
				<td colspan="4" align=right>
					<span class="" id="TOTAL_CNT"></span> <span class="" id="TOTAL_AMT"></span>
					<span class="hidden" id="S_ACCOUNT_NO"><%=CommonUtil.nvl(bankInfo.get("BANK_ACNT_NUM"))%></span>
					<span class=title>합계 : </span>
					<input type="text" id="TOTAL" class="labelLine number" value="0"/>
				</td>
				<th style="width:10%">저장구분</th>
				<td>
					<input type="radio" name="STATUS" value="Y"><span class="radio">지급대상</span>
					<input type="radio" name="STATUS" value="W"><span class="radio">지급보류</span>
					<input type="radio" name="STATUS" value="U"><span class="radio">해제</span>
					<input type="radio" name="STATUS" value="A"><span class="radio">지급완료</span>
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1" style="width:1500px">
				<colgroup>
					<col width=30><col width=60><col width=80><col width=30><col width=120><col width=80><col width=140><col width=80><col><col width=100><col width=100><col width=100><col width=80>
				</colgroup>
				<thead>
					<tr>
						<th>선택</th>
						<th>상태</th>
						<th>전표번호</th>
						<th>Seq</th>
						<th>전표발행부서</th>
						<th>거래일자</th>
						<th>거래처</th>
						<th>금액</th>
						<th>적요</th>
						<th>지급요청일자</th>
						<th>지급방법</th>
						<th>은행명</th>
						<th>계좌번호</th>
						<th>예금주</th>
						<th>지급내용</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="15"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
