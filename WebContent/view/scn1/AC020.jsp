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
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AC020.js"></script>
	</head>
	<body>
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
				<th style="width:15%">TSC Deal</th>
				<td style="width:35%">
					<input type="text" id="TSC_DEAL" name="TSC_DEAL" style="width:100px" />
				</td>
			</tr>
			<tr>
				<th style="width:15%">Tr. Date</th>
				<td style="width:35%" colspan="3">
					<input type="text" id="TR_FROM_DATE" name="TR_FROM_DATE" style="width:80px" />&nbsp;~&nbsp;<input type="text" id="TR_TO_DATE" name="TR_TO_DATE" style="width:80px" />
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<table style="width:1100px" class="dataTable" id="dataTable1">
				<col width="80px"/><col width="80px"/><col width="250px"/><col width="100px"/><col width="80px"/><col width="100px"/><col width="110px"/><col width="110px"/><col width="110px"/>
				<thead>
					<tr>
						<th><nobr>Acct Code</nobr></th>
						<th><nobr>Tr. Date</nobr></th>
						<th><nobr>Description</nobr></th>
						<th><nobr>TSC Deal Code</nobr></th>
						<th><nobr>USD</nobr></th>
						<th><nobr>Initial FX</nobr></th>
						<th><nobr>Initial Price(KRW)</nobr></th>
						<th><nobr>Settlement(KRW)</nobr></th>
						<th><nobr>Realized(KRW)</nobr></th>
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
