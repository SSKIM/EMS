<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<%
	List expsList = null, evidList = null;
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet!=null) {
		evidList = (List)resultSet.get("EVID_LIST");
		expsList = (List)resultSet.get("EXPS_TYPE_LIST");
	}
%>
<jsp:useBean id="cboS_EvidType" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboS_EvidType" property="dataSource" value="<%=evidList%>"/>
<jsp:useBean id="cboS_ExpsType" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboS_ExpsType" property="dataSource" value="<%=expsList%>"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AA011.js"></script>
	</head>
	<body style="margin: 0px 5px 0px 5px">
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>템플릿명</th>
				<td colspan="3">
					<input type="text" id="S_TPLT_NAME" />
				</td>
			</tr>
			<tr>
				<th>증빙구분</th>
				<td style="width:35%">
					<jsp:setProperty name="cboS_EvidType" property="id" value="S_EVID_TYPE"/>
					<jsp:setProperty name="cboS_EvidType" property="isAll" value="true"/>
					<jsp:getProperty name="cboS_EvidType" property="bindData" />
				</td>
				<th>비용구분</th>
				<td style="width:35%">
					<jsp:setProperty name="cboS_ExpsType" property="id" value="S_EXPS_TYPE_ID"/>
					<jsp:setProperty name="cboS_ExpsType" property="isBlank" value="true"/>
					<jsp:getProperty name="cboS_ExpsType" property="bindData" />
				</td>
			</tr>
		</table>
		<div id="divMain1" class="main" style="height:200px">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40px"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>거래일자</th>
						<th>증빙구분</th>
						<th>비용구분</th>
						<th>지급방법</th>
						<th>거래처/사원</th>
						<th>상호/사용구분</th>
						<th>사업자등록번호</th>
						<th>비고</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="11"></td></tr>
				</tbody>
			</table>
		</div>
		<div id="divMain2" class="main" style="height:300px">
			<table class="dataTable" id="dataTable2">
				<colgroup>
					<col width="40"/><col width="80"/><col width="140"/><col width="80"/><col width="80"/>
					<col width="120"/><col width="120"/><col width="120"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>계정과목코드</th>
						<th>계정과목명</th>
						<th>차변금액</th>
						<th>대변금액</th>
						<th>부서명</th>
						<th>채널명</th>
						<th>자산명</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="8"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
