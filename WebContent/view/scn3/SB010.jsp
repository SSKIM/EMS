<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil"%>
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
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn3/SB010.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable" id="searchTable1"><tr>
			<th>기준정보ID</th>
			<td>
				<input type="text" id="S_CODE_ID" />
			</td>
			<th>기준정보명</th>
			<td>
				<input type="text" id="S_CODE_NAME" />
			</td>
		</tr></table>
		<div id="divMain" class="main">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width=40><col width=120><col width=200><col width=120><col width=120><col width=100><col width=40>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th><th>기준정보ID</th><th>기준정보명</th><th>설정값1</th><th>설정값2</th><th>설정값3</th><th>상태</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="8"></td></tr>
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
					<th id="lblCODE_ID">기준정보ID</th>
					<td>
						<input type="text" id="CODE_ID" name="CODE_ID"/>
					</td>
					<th id="lblCODE_NAME">기준정보명</th>
					<td>
						<input type="text" id="CODE_NAME" name="CODE_NAME" style="width:99%"/>
					</td>
				</tr>
				<tr>
					<th>설정값1</th>
					<td>
						<input type="text" id="ETC1" name="ETC1" style="width:99%"/>
					</td>
					<th>설정값2</th>
					<td>
						<input type="text" id="ETC2" name="ETC2" style="width:99%"/>
					</td>
				</tr>
				<tr>
					<th>설정값3</th>
					<td>
						<input type="text" id="ETC3" name="ETC3" style="width:99%"/>
					</td>
					<th>상태</th>
					<td>
						<jsp:setProperty name="radiobox" property="name" value="STATUS"/>
						<jsp:setProperty name="radiobox" property="dataType" value="YesNo"/>
						<jsp:getProperty name="radiobox" property="bindData" />
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