<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil"%>
<jsp:useBean id="combobox1" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:useBean id="combobox2" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:useBean id="combobox3" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<%
	Map resultSet = CommonUtil.getResultSet(request);
	List buttonList = null, bondType = null, deptList = null;
	if(resultSet != null) {
		buttonList  = (List)resultSet.get("BUTTON_LIST");
		bondType    = (List)resultSet.get("BOND_LIST");
		deptList    = (List)resultSet.get("DEPT_LIST");
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AB080.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th>기준일자</th>
			<td id="lblS_BASE_DATE">
				<input type="text" id="S_BASE_DATE" name="S_BASE_DATE" maxlength="10" class="date" />
			</td>
			<th>채권코드</th>
			<td>
				<jsp:setProperty name="combobox1" property="id" value="S_BOND_CODE"/>
				<jsp:setProperty name="combobox1" property="isAll" value="true"/>
				<jsp:setProperty name="combobox1" property="dataSource" value="<%=bondType%>"/>
				<jsp:getProperty name="combobox1" property="bindData" />
			</td>
		</tr></table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1" style="width:1500px">
				<colgroup>
					<col width="25"/>
				</colgroup>
				<thead>
					<tr>
						<th class="seq"></th>
						<th>선택</th>
						<th><nobr>일련번호</nobr></th>
						<th><nobr>거래일자</nobr></th>
						<th><nobr>채권코드</nobr></th>
						<th><nobr>채권명</nobr></th>
						<th><nobr>적요</nobr></th>
						<th><nobr>계정코드</nobr></th>
						<th><nobr>계정명</nobr></th>
						<th><nobr>부서코드</nobr></th>
						<th><nobr>차변금액</nobr></th>
						<th><nobr>대변금액</nobr></th>
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
			<input type="text" id="rowIndex" name="rowIndex"/>
			<input type="text" id="BOND_NO" name="BOND_NO" />
			<input type="text" id="BOND_SEQ" name="BOND_SEQ" />
			<table class="formTable" id="formTable1">
				<tr>
					<th id="lblTRANS_DATE" class="required">거래일자</th>
					<td>
						<input type="text" id="TRANS_DATE" name="TRANS_DATE" maxlength="8" class="date" />
					</td>
					<th id="lblACCOUNT_NO" class="required">채권코드</th>
					<td>
						<jsp:setProperty name="combobox2" property="id" value="BOND_CODE"/>
						<jsp:setProperty name="combobox2" property="isBlank" value="true"/>
						<jsp:setProperty name="combobox2" property="dataSource" value="<%=bondType%>"/>
						<jsp:getProperty name="combobox2" property="bindData" />
					</td>
					<th>비고</th>
					<td colspan="3">
						<input type="text" id="REMARK" name="REMARK" maxlength="40" style="width:99%" />
					</td>
				</tr>
				<tr>
					<th id="lblACCT_CODE" class="required">계정과목</th>
					<td>
						<input type="text" id="ACCT_CODE" name="ACCT_CODE" style="width:60px" maxlength="7"/><input type="text" id="ACCT_NAME" name="ACCT_NAME" style="width:200px" maxlength="40"/>
						<img id="btnPopupAcct" src="./theme/default/image/button/search.png" class="popup"/>
					</td>
					<th>부서</th>
					<td>
						<jsp:setProperty name="combobox3" property="id" value="DEPT_CODE"/>
						<jsp:setProperty name="combobox3" property="isBlank" value="true"/>
						<jsp:setProperty name="combobox3" property="dataSource" value="<%=deptList%>"/>
						<jsp:getProperty name="combobox3" property="bindData" />
					</td>
					<th>차변금액</th>
					<td>
						<input type="text" id="DEBIT_AMT" name="DEBIT_AMT" maxlength="25" />
					</td>
					<th>대변금액</th>
					<td>
						<input type="text" id="CREDIT_AMT" name="CREDIT_AMT" maxlength="25"/>
					</td>
				</tr>
			</table>
		</form>
		<div style="height:150px;margin-top:2px;overflow:scroll">
			<table class="dataTable" id="dataTable2" style="width:1500px">
				<colgroup>
					<col width="25"/>
				</colgroup>
				<thead>
					<tr>
						<th class="seq"></th>
						<th><nobr>거래일자</nobr></th>
						<th><nobr>채권코드</nobr></th>
						<th><nobr>채권명</nobr></th>
						<th><nobr>적요</nobr></th>
						<th><nobr>계정코드</nobr></th>
						<th><nobr>계정명</nobr></th>
						<th><nobr>부서코드</nobr></th>
						<th><nobr>차변금액</nobr></th>
						<th><nobr>대변금액</nobr></th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>