<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil,com.das.fms.vo.UserVO" %>
<%
	UserVO userVO = (UserVO)CommonUtil.getUserSession(request);
	Map resultSet = CommonUtil.getResultSet(request);
	List anlcode = null, acctcode = null;
	if(resultSet!=null) {
		anlcode	= (List)resultSet.get("ANL_CODE_LIST");
		acctcode = (List)resultSet.get("ACCT_CODE_LIST");
	}
%>
<jsp:useBean id="cboAnl" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboAnl" property="dataSource" value="<%=anlcode%>"/>
<jsp:useBean id="cboAcct" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboAcct" property="dataSource" value="<%=acctcode%>"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AC030.js"></script>
	</head>
	<body id="mainBD">
		<%@ include file="../include/button.jsp" %>
		<table style="width:100%" class="searchTable">
			<tr>
				<th style="width:15%" id="lblANL_CODE_ID">Category</th>
				<td style="width:35%">
					<jsp:setProperty name="cboAnl" property="id" value="ANL_CODE_ID"/>
					<jsp:setProperty name="cboAnl" property="isAll" value="true"/>
					<jsp:getProperty name="cboAnl" property="bindData" />
				</td>
				<th style="width:15%">Curr. Code</th>
				<td style="width:35%">USD
				</td>
			</tr>
			<tr>
				<th style="width:15%">Account Code</th>
				<td style="width:35%">
					<jsp:setProperty name="cboAcct" property="id" value="ACCT_CODE1"/>
					<jsp:setProperty name="cboAcct" property="isBlank" value="true"/>
					<jsp:getProperty name="cboAcct" property="bindData" />
				</td>
				<th style="width:15%" id="lblTOTAL">Total USD</th>
				<td style="width:35%">
					<span id="USD_TOTAL"></span>
				</td>
			</tr>
			<tr>
				<th style="width:15%">Tr. Date</th>
				<td style="width:35%">
					<input type="text" id="TR_FROM_DATE" name="TR_FROM_DATE" style="width:80px" />&nbsp;~&nbsp;<input type="text" id="TR_TO_DATE" name="TR_TO_DATE" style="width:80px" />
				</td>
				<th style="width:15%" id="lblTOTAL">Total Initial Price(KRW)</th>
				<td style="width:35%">
					<span id="INITIAL_PRICE"></span>
				</td>
			</tr>
			<tr>
				<th style="width:15%">TSC Deal</th>
				<td style="width:35%">
					<input type="text" id="TSC_DEAL" name="TSC_DEAL" style="width:100px" />
				</td>
				<th style="width:15%" id="lblTOTAL">Total Unrealized(KRW)</th>
				<td style="width:35%">
					<span id="UNREALIZED"></span>
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<table style="width:2500px" class="dataTable" id="dataTable1">
				<col width="90px"/><col width="90px"/><col width="260px"/><col width="150px"/><col width="80px"/><col width="150px"/><col width="150px"/><col width="150px"/><col width="100px"/><col width="100px"/><col width="100px"/><col width="230px"/><col width="130px"/><col width="120px"/><col width="100px"/><col width="100px"/><col width="100px"/><col width="100px"/><col width="100px"/><col width="140px"/><col width="100px"/><col width="80px"/>
				<thead>
					<tr>
						<th><nobr>Acct Code</nobr></th>
						<th><nobr>Tr. Date</nobr></th>
						<th><nobr>Description</nobr></th>
						<th><nobr>TSC Deal Code</nobr></th>
						<th><nobr>USD</nobr></th>
						<th><nobr>Initial FX</nobr></th>
						<th><nobr>Initial Price(KRW)</nobr></th>
						<th><nobr>Unrealized(KRW)</nobr></th>
						<th><nobr>Trade Date</nobr></th>
						<th><nobr>Value Date</nobr></th>
						<th><nobr>Maturity Date</nobr></th>
						<th><nobr>Counterparty</nobr></th>
						<th><nobr>Primary/Secondary</nobr></th>
						<th><nobr>Price/Yield</nobr></th>
						<th><nobr>Nominal</nobr></th>
						<th><nobr>VA(USD)</nobr></th>
						<th><nobr>PC(USD)</nobr></th>
						<th><nobr>TSC(USD)</nobr></th>
						<th><nobr>TSC(CCY)</nobr></th>
						<th><nobr>Treats Security ID</nobr></th>
						<th><nobr>Security ID</nobr></th>
						<th><nobr>Jrnl No.</nobr></th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="22"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
