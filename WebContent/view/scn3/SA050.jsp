<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil"%>
<%
	Map resultSet = CommonUtil.getResultSet(request);
	List buttonList = null, deptList= null;
	if(resultSet != null) {
		buttonList = (List)resultSet.get("BUTTON_LIST");
		deptList   = (List)resultSet.get("DEPT_LIST");
	}
%>
<jsp:useBean id="cboDept" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboDept" property="dataSource" value="<%=deptList%>"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn3/SA050.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable" id="searchTable1">
			<tr>
				<th>DMS조직코드</th>
				<td>
					<input type="text" id="S_ORGC_CODE" maxlength="6"/>
				</td>
				<th>DMS팀코드</th>
				<td>
					<input type="text" id="S_TEAM_CODE" maxlength="4"/>
				</td>
			</tr>
			<tr>
				<th>DFS부서코드</th>
				<td>
					<input type="text" id="S_DEPT_CODE" maxlength="3"/>
				</td>
				<th>DFS부서명</th>
				<td>
					<input type="text" id="S_DEPT_NAME" maxlength="100"/>
				</td>
			</tr>
		</table>
		<div id="divMain" class="main">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width=40><col width=40><col width=120><col width=250/><col width=120><col width=120>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th><th>Seq</th><th>DFS부서코드</th><th>DFS부서명</th><th>DMS조직코드</th><th>DMS팀코드</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="6"></td></tr>
				</tbody>
			</table>
		</div>
		<div class="button">
			<jsp:setProperty name="button" property="buttonGroup" value="2"/>
			<jsp:setProperty name="button" property="dataSource" value="<%=buttonList%>"/>
			<jsp:getProperty name="button" property="dataBind" />
		</div>
		<form id="formData1" name="formData" method="post">
			<input type="hidden" id="rowIndex" name="rowIndex"/>
			<table class="formTable" id="formTable1">
				<tr>
					<th>Seq</th>
					<td>
						<input type="text" id="SEQ" name="SEQ" maxlength="10"/>
					</td>
					<th>DFS부서코드</th>
					<td>
						<jsp:setProperty name="cboDept" property="id" value="DEPT_CODE"/>
						<jsp:setProperty name="cboDept" property="isAll" value="true"/>
						<jsp:getProperty name="cboDept" property="bindData" />
					</td>
				</tr>
				<tr>
					<th id="lblCODE_ID">DMS조직코드</th>
					<td>
						<input type="text" id="ORGC_CODE" name="ORGC_CODE" maxlength="6"/>
					</td>
					<th id="lblCODE_NAME">DMS팀코드</th>
					<td>
						<input type="text" id="TEAM_CODE" name="TEAM_CODE" maxlength="4"/>
					</td>
				</tr>
			</table>
			<table class="historyTable">
				<tr>
					<th>입력일자</th><td><span id="INS_DATE"></span></td>
					<th>입력자</th><td><span id="INS_USER"></span></td>
					<th>수정일자</th><td><span id="UPD_DATE"></span></td>
					<th>수정자</th><td><span id="UPD_USER"></span></td>
				</tr>
			</table>
		</form>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>