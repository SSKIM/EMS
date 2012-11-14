<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil"%>
<jsp:useBean id="combobox" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<%
	Map resultSet = CommonUtil.getResultSet(request);
	List buttonList = null, depositType = null, bankType = null;
	if(resultSet != null) {
		buttonList  = (List)resultSet.get("BUTTON_LIST");
		depositType = (List)resultSet.get("DEPOSIT_LIST");
		bankType    = (List)resultSet.get("BANK_LIST");
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AB070.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th>기준일자</th>
			<td>
				<input type="text" id="S_DEPOSIT_DATE" name="S_DEPOSIT_DATE" maxlength="10" class="date" />
			</td>
		</tr></table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1" style="width:1300px">
				<colgroup>
					<col width="25"/>
				</colgroup>
				<thead>
					<tr>
						<th rowspan="2" class="seq"></th>
						<th rowspan="2">선택</th>
						<th rowspan="2"><nobr>예금번호</nobr></th>
						<th rowspan="2"><nobr>계좌번호</nobr></th>
						<th rowspan="2">거래<br>은행</th>
						<th rowspan="2">거래<br>은행명</th>
						<th rowspan="2"><nobr>예치일</nobr></th>
						<th rowspan="2"><nobr>만기일</nobr></th>
						<th rowspan="2">운용<br>기간</th>
						<th rowspan="2"><nobr>이자율</nobr></th>
						<th rowspan="2"><nobr>금액</nobr></th>
						<th colspan="3"><nobr>Actual(SUN)</nobr></th>
						<th colspan="2"><nobr>추정</nobr></th>
						<th rowspan="2">정기예금<br>계정</th>
						<th rowspan="2">미수수익<br>계정</th>
					</tr>
					<tr>
						<th><nobr>정기예금</nobr></th>
						<th><nobr>미수이자</nobr></th>
						<th><nobr>예금이자</nobr></th>
						<th><nobr>미수이자누계</nobr></th>
						<th><nobr>미수이자당월</nobr></th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
		<div class="button" id="button">
			<jsp:setProperty name="button" property="buttonGroup" value="2"/>
			<jsp:setProperty name="button" property="dataSource" value="<%=buttonList%>"/>
			<jsp:getProperty name="button" property="dataBind" />
		</div>
		<form id="formData" name="formData" method="post">
			<input type="hidden" id="rowIndex" name="rowIndex"/>
			<table class="formTable" id="formTable1">
				<tr>
					<th id="lblFIXED_DEPOSIT_NO" class="required">정기예금번호</th>
					<td>
						<jsp:setProperty name="combobox" property="id" value="FIXED_DEPOSIT_NO"/>
						<jsp:setProperty name="combobox" property="isBlank" value="true"/>
						<jsp:setProperty name="combobox" property="dataSource" value="<%=depositType%>"/>
						<jsp:getProperty name="combobox" property="bindData" />
					</td>
					<th id="lblACCOUNT_NO" class="required">계좌번호</th>
					<td>
						<input type="text" id="ACCOUNT_NO" name="ACCOUNT_NO"/>
					</td>
					<th id="lblBANK_CODE" class="required">거래은행</th>
					<td>
						<jsp:setProperty name="combobox" property="id" value="BANK_CODE"/>
						<jsp:setProperty name="combobox" property="isBlank" value="true"/>
						<jsp:setProperty name="combobox" property="dataSource" value="<%=bankType%>"/>
						<jsp:getProperty name="combobox" property="bindData" />
					</td>
				</tr>
				<tr>
					<th id="lblDEPOSIT_DATE" class="required">예치일(A)</th>
					<td>
						<input type="text" id="DEPOSIT_DATE" name="DEPOSIT_DATE" maxlength="8" class="date" />
					</td>
					<th id="lblDUE_DATE" class="required">만기일(B)</th>
					<td>
						<input type="text" id="DUE_DATE" name="DUE_DATE" maxlength="8" class="date" />
					</td>
					<th id="lblOPERATION_DAYS" class="required">운용기간(일)</th>
					<td>
						<input type="text" id="OPERATION_DAYS" name="OPERATION_DAYS" style="width:40px" maxlength="5"/>
					</td>
				</tr>
				<tr>
					<th id="lblINTEREST_RATE" class="required">이자율(%)</th>
					<td>
						<input type="text" id="INTEREST_RATE" name="INTEREST_RATE" style="width:40px;text-align:right" maxlength="5"/>
					</td>
					<th id="lblAMT" class="required">금액</th>
					<td>
						<input type="text" id="AMT" name="AMT" maxlength="18"/>
					</td>
					<td colspan="2"></td>
				</tr>
				<tr>
					<th id="lblFIXED_DEPOSIT_ACCOUNTS" class="required">정기예금계정</th>
					<td>
						<input type="hidden" id="validFIXED_DEPOSIT_ACCOUNTS">
						<input type="text" id="FIXED_DEPOSIT_ACCOUNTS" name="FIXED_DEPOSIT_ACCOUNTS" style="width:60px" maxlength="7"/><input type="text" id="FIXED_DEPOSIT_ACCOUNTS_NAME" name="FIXED_DEPOSIT_ACCOUNTS_NAME" style="width:200px" maxlength="40"/>
						<img id="btnPopupAcct1" src="./theme/default/image/button/search.png" class="popup"/>
					</td>
					<th id="lblUNEARNED_REVENUE_ACCOUNTS" class="required">미수수익계정</th>
					<td>
						<input type="hidden" id="validUNEARNED_REVENUE_ACCOUNTS">
						<input type="text" id="UNEARNED_REVENUE_ACCOUNTS" name="UNEARNED_REVENUE_ACCOUNTS" style="width:60px" maxlength="7"/><input type="text" id="UNEARNED_REVENUE_ACCOUNTS_NAME" name="UNEARNED_REVENUE_ACCOUNTS_NAME" style="width:200px" maxlength="40"/>
						<img id="btnPopupAcct2" src="./theme/default/image/button/search.png" class="popup"/>
					</td>
					<td colspan="2"></td>
				</tr>
			</table>
			<%@ include file="../include/historyTable.jsp" %>
		</form>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>