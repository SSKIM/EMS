<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<%
	List buttonList = null, userType = null, deptList = null, busiUnitType = null, ledgerType = null, pwdChngType = null, lan_type = null;
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet != null) {
		buttonList   = (List)resultSet.get("BUTTON_LIST");
		userType     = (List)resultSet.get("USER_TYPE_LIST");
		deptList     = (List)resultSet.get("DEPT_LIST");
		busiUnitType = (List)resultSet.get("BUSI_UNIT_TYPE_LIST");
		ledgerType   = (List)resultSet.get("LEDGER_TYPE_LIST");
		pwdChngType  = (List)resultSet.get("PWD_CHNG_TYPE_LIST");
		lan_type	 = (List)resultSet.get("LAN_TYPE_LIST");
	}
%>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<jsp:useBean id="rdoPwdChngType" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<jsp:setProperty name="rdoPwdChngType" property="dataSource" value="<%=pwdChngType%>"/>
<jsp:useBean id="combobox" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="combobox" property="dataSource" value="<%=userType%>"/>
<jsp:useBean id="cboDept" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboDept" property="dataSource" value="<%=deptList%>"/>
<jsp:useBean id="cboBusiUnitType" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboBusiUnitType" property="dataSource" value="<%=busiUnitType%>"/>
<jsp:useBean id="cboLedgerType" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboLedgerType" property="dataSource" value="<%=ledgerType%>"/>
<jsp:useBean id="cboLanType" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboLanType" property="dataSource" value="<%=lan_type%>"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/system/EB010.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th>사용자ID</th>
			<td>
				<input type="text" id="USER_ID2" />
			</td>
			<th>사용자명</th>
			<td>
				<input type="text" id="USER_NAME2" />
			</td>
		</tr></table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable" style="width:1400px">
				<colgroup>
					<col width="40"/><col width="70"/><col width="70"/><col width="80"/><col width="80"/><col width="80"/><col width="80"/><col width="120"/><col width="60"/><col width="120"/><col width="60"/><col width="60"/><col width="40"/><col width="100"/><col width="100"/><col width="40"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>사용자ID</th>
						<th>사용자명</th>
						<th>사용자구분</th>
						<th>사원ID</th>
						<th>전화번호</th>
						<th>휴대폰번호</th>
						<th>이메일</th>
						<th>부서코드</th>
						<th>부서명</th>
						<th>Business
						UnitType</th>
						<th>Ledger
						Type</th>
						<th>상태</th>
						<th>비밀번호
						변경구분</th>
						<th>로그인
						실패횟수</th>
						<th>언어</th>
						<th class=hidden>입력일자</th>
						<th class=hidden>일력자</th>
						<th class=hidden>수정일자</th>
						<th class=hidden>수정자</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
		<div class="button">
			<jsp:setProperty name="button" property="buttonGroup" value="2"/>
			<jsp:setProperty name="button" property="dataSource" value="<%=buttonList%>"/>
			<jsp:getProperty name="button" property="dataBind" />
		</div>
		<form id="formData" name="formData" method="post">
			<input type="hidden" id="rowIndex" name="rowIndex"/>
			<table class="formTable">
				<tr>
					<th style="width:10%" id="lblUSER_ID">사용자ID</th>
					<td>
						<input type="text" id="USER_ID" name="USER_ID"/>
					</td>
					<th style="width:10%" id="lblUSER_NAME">사용자명</th>
					<td>
						<input type="text" id="USER_NAME" name="USER_NAME"/>
					</td>
					<th style="width:10%">비밀번호</th>
					<td>
						<input type="password" id="PASSWORD" name="PASSWORD" style="width:80px"/>
					</td>
				</tr>
				<tr>
					<th id="lblUSER_TYPE">사용자구분</th>
					<td>
						<jsp:setProperty name="combobox" property="id" value="USER_TYPE"/>
						<jsp:setProperty name="combobox" property="isBlank" value="true"/>
						<jsp:getProperty name="combobox" property="bindData" />
					</td>
					<th>사원ID</th>
					<td>
						<input type="text" id="EMPL_ID" name="EMPL_ID"/>
					</td>
					<th>부서코드</th>
					<td>
						<jsp:setProperty name="cboDept" property="id" value="DEPT_CODE"/>
						<jsp:setProperty name="cboDept" property="isBlank" value="true"/>
						<jsp:getProperty name="cboDept" property="bindData" />
					</td>
				</tr>
				<tr>
					<th>전화번호</th>
					<td>
						<input type="text" id="TEL_NO" name="TEL_NO"/>
					</td>
					<th>휴대폰번호</th>
					<td>
						<input type="text" id="HP_NO" name="HP_NO"/>
					</td>
					<th>이메일</th>
					<td>
						<input type="text" id="EMAIL" name="EMAIL" style="width:99%"/>
					</td>
				</tr>
				<tr>
					<th>Business Unit</th>
					<td>
						<jsp:setProperty name="cboBusiUnitType" property="id" value="BUSI_UNIT_TYPE"/>
						<jsp:setProperty name="cboBusiUnitType" property="isBlank" value="true"/>
						<jsp:getProperty name="cboBusiUnitType" property="bindData" />
					</td>
					<th>Ledger</th>
					<td>
						<jsp:setProperty name="cboLedgerType"   property="id" value="LEDGER_TYPE"/>
						<jsp:setProperty name="cboLedgerType"   property="isBlank" value="true"/>
						<jsp:getProperty name="cboLedgerType"   property="bindData" />
					</td>
					<th>상태</th>
					<td>
						<jsp:setProperty name="radiobox" property="name" value="STATUS"/>
						<jsp:setProperty name="radiobox" property="dataType" value="YesNo"/>
						<jsp:getProperty name="radiobox" property="bindData" />
					</td>
				</tr>
				<tr>
					<th>비밀번호변경구분</th>
					<td>
						<jsp:setProperty name="rdoPwdChngType" property="name" value="PWD_CHNG_TYPE"/>
						<jsp:getProperty name="rdoPwdChngType" property="bindData" />
					</td>
					<th>로그인 실패횟수</th>
					<td>
						<input type="text" id="LOGIN_FAIL_CNT" name="LOGIN_FAIL_CNT" maxlength="1" class="number" style="width:20px"/>
					</td>
					<th>Language</th>
					<td>
						<jsp:setProperty name="cboLanType"   property="id" value="LAN_TYPE"/>
						<jsp:setProperty name="cboLanType"   property="isBlank" value="true"/>
						<jsp:getProperty name="cboLanType"   property="bindData" />
					</td>
				</tr>
			</table>
			<table class="historyTable">
				<tr>
					<th>입력일자</th><td><span id="INS_DATE"></span></td><th>입력자</th><td><span id="INS_USER"></span></td><th>수정일자</th><td><span id="UPD_DATE"></span></td><th>수정자</th><td><span id="UPD_USER"></span></td>
				</tr>
			</table>
		</form>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>