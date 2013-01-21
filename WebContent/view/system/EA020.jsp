<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil"%>
<jsp:useBean id="combobox" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<%
	Map resultSet = CommonUtil.getResultSet(request);
	List buttonList = null, screenType = null;
	if(resultSet != null) {
		buttonList = (List)resultSet.get("BUTTON_LIST");
		screenType = (List)resultSet.get("SCREEN_TYPE_LIST");
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/system/EA020.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th>화면ID</th>
			<td>
				<input type="text" id="SCREEN_ID2" maxlength="10"/>
			</td>
			<th>화면명</th>
			<td>
				<input type="text" id="SCREEN_NAME2" maxlength="100" style="width:99%"/>
			</td>
		</tr></table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1" style="width:1300px">
				<thead>
					<tr>
						<th width="40px">순번</th>
						<th width="80px">화면ID</th>
						<th width="200px">화면명</th>
						<th width="200px">화면명-영문</th>
						<th width="60px">화면구분</th>
						<th>화면URL</th>
						<th>비고</th>
						<th width="60px">상태</th>
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
					<th id="lblSCREEN_ID">화면ID</th>
					<td>
						<input type="text" id="SCREEN_ID" name="SCREEN_ID"/>
					</td>
					<th id="lblSCREEN_NAME">화면명</th>
					<td>
						<input type="text" id="SCREEN_NAME" name="SCREEN_NAME"/>
					</td>
					<th id="lblSCREEN_NAME3">화면명-영문</th>
					<td>
						<input type="text" id="SCREEN_NAME3" name="SCREEN_NAME3"/>
					</td>
				</tr>
				<tr>
					<th id="lblSCREEN_TYPE">화면구분</th>
					<td>
						<jsp:setProperty name="combobox" property="id" value="SCREEN_TYPE"/>
						<jsp:setProperty name="combobox" property="isBlank" value="true"/>
						<jsp:setProperty name="combobox" property="dataSource" value="<%=screenType%>"/>
						<jsp:getProperty name="combobox" property="bindData" />
					</td>
					<th>화면 URL</th>
					<td>
						<input type="text" id="SCREEN_URL" name="SCREEN_URL"/>
					</td>
					<th>비고</th>
					<td>
						<input type="text" id="REMARK" name="REMARK" style="width:99%"/>
					</td>
				</tr>
				<tr>
					<th id="lblSTATUS">상태</th>
					<td colspan="5">
						<jsp:setProperty name="radiobox" property="name" value="STATUS"/>
						<jsp:setProperty name="radiobox" property="dataType" value="YesNo"/>
						<jsp:getProperty name="radiobox" property="bindData" />
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