<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<%
	List evidList = null, cardList = null, emplList = null;
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet!=null) {
		evidList = (List)resultSet.get("EVID_LIST");
		cardList = (List)resultSet.get("CARD_LIST");
		emplList = (List)resultSet.get("EMPL_LIST");
	}
%>
<jsp:useBean id="cboEvid" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboEvid" property="dataSource" value="<%=evidList%>"/>
<jsp:useBean id="cboCard" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboCard" property="dataSource" value="<%=cardList%>"/>
<jsp:useBean id="cboEmpl" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboEmpl" property="dataSource" value="<%=emplList%>"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn3/SA011.js"></script>
	</head>
	<body style="margin: 0px 5px 0px 5px">
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>거래일자</th>
				<td colspan="3">
					<input type="text" id="S_TRANS_DATE_FROM" class=date maxlength=10 /> ~
					<input type="text" id="S_TRANS_DATE_TO" class=date maxlength=10 />
				</td>
			</tr>
			<tr>
				<th>증빙구분</th>
				<td style="width:35%">
					<jsp:setProperty name="cboEvid" property="id" value="S_EVID_TYPE"/>
					<jsp:setProperty name="cboEvid" property="isAll" value="true"/>
					<jsp:getProperty name="cboEvid" property="bindData" />
				</td>
				<th id="lblVENDOR_CODE">거래처</th>
				<td style="width:35%">
					<div id="divVENDOR_CODE1">
						<span id="lblVENDOR_CODE1" class=hidden>카드번호</span>
						<jsp:setProperty name="cboCard" property="id" value="VENDOR_CODE1"/>
						<jsp:setProperty name="cboCard" property="isBlank" value="true"/>
						<jsp:getProperty name="cboCard" property="bindData" />
					</div>
					<div id="divVENDOR_CODE2">
						<span id="lblVENDOR_CODE2" class=hidden>거래처</span>
						<input type="text" id="VENDOR_CODE2" name="VENDOR_CODE" style="width:65px" maxlength="7"/><input type="text" id="VENDOR_NAME2" name="VENDOR_NAME" style="width:140px" maxlength="40"/>
						<img id="btnPopupVndr" src="./theme/default/image/button/search.png" class="popup"/>
					</div>
					<div id="divVENDOR_CODE3">
						<span id="lblVENDOR_CODE3" class=hidden>사원</span>
						<jsp:setProperty name="cboEmpl" property="id" value="VENDOR_CODE3"/>
						<jsp:setProperty name="cboEmpl" property="isBlank" value="true"/>
						<jsp:getProperty name="cboEmpl" property="bindData" />
					</div>
				</td>
			</tr>
		</table>
		<div id="divMain1" class="main" style="height:200px">
			<table class="dataTable" id="dataTable1" style="width:1500px">
				<colgroup>
					<col width="40"/><col width="80"/><col width="30"/><col width="80"/><col width="100"/><col width="160"/><col width="100"/><col width="140"/><col width="100"/><col width="100"/><col/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>전표번호</th>
						<th>Seq</th>
						<th>거래일자</th>
						<th>증빙구분</th>
						<th>비용구분</th>
						<th>지급방법</th>
						<th>거래처/사원</th>
						<th>상호/사용구분</th>
						<th>사업자번호</th>
						<th>적요</th>
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
					<col width="40px"/><col width="80"/><col width="240"/><col width="80"/><col width="80"/><col width="80"/><col width="120"/><col width="80"/><col width="120"/><col width="80"/><col width="120"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>계정코드</th>
						<th>계정명</th>
						<th>차변금액</th>
						<th>대변금액</th>
						<th class=hidden>부서코드</th>
						<th>부서명</th>
						<th class=hidden>채널코드</th>
						<th>채널명</th>
						<th class=hidden>자산코드</th>
						<th>자산명</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="11"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
