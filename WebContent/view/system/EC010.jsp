<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<%
	Map resultSet = CommonUtil.getResultSet(request);
	List buttonList = null;
	if(resultSet != null) {
		buttonList = (List)resultSet.get("BUTTON_LIST");
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/system/EC010.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th>권한ID</th>
			<td>
				<input type="text" id="AUTH_ID2" />
			</td>
			<th>권한명</th>
			<td>
				<input type="text" id="AUTH_NAME2" />
			</td>
		</tr></table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable">
				<thead>
					<tr>
						<th width="40px">순번</th>
						<th width="80px">권한ID</th>
						<th width="100px">권한명</th>
						<th width="300px">비고</th>
						<th width="80px">상태</th>
						<th style="display:none">입력일자</th>
						<th style="display:none">일력자</th>
						<th style="display:none">수정일자</th>
						<th style="display:none">수정자</th>
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
					<th id="lblAUTH_ID">권한ID</th>
					<td>
						<input type="text" id="AUTH_ID" name="AUTH_ID"/>
					</td>
					<th id="lblAUTH_NAME">권한명</th>
					<td>
						<input type="text" id="AUTH_NAME" name="AUTH_NAME"/>
					</td>
					<th>상태</th>
					<td>
						<jsp:setProperty name="radiobox" property="name" value="STATUS"/>
						<jsp:setProperty name="radiobox" property="dataType" value="YesNo"/>
						<jsp:getProperty name="radiobox" property="bindData" />
					</td>
				</tr>
				<tr>
					<th>비고</th>
					<td colspan="5">
						<input type="text" id="REMARK" name="REMARK" style="width:99%"/>
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