<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil"%>
<%
	Map resultSet = CommonUtil.getResultSet(request);
	List buttonList = null;
	if(resultSet != null) {
		buttonList = (List)resultSet.get("BUTTON_LIST");
	}
%>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/system/EA010.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th>코드그룹</th>
			<td>
				<input type="text" id="CODE_GRP2" />
			</td>
			<th>코드ID</th>
			<td>
				<input type="text" id="CODE_ID2" />
			</td>
			<th>코드명</th>
			<td>
				<input type="text" id="CODE_NAME2" />
			</td>
		</tr></table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable" style="width:800px">
				<thead>
					<tr>
						<th width="40px">순번</th>
						<th width="80px">코드그룹</th>
						<th width="80px">코드ID</th>
						<th width="200px">코드명</th>
						<th width="80px">기타1</th>
						<th width="80px">기타2</th>
						<th width="80px">기타3</th>
						<th width="60px">정렬순서</th>
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
					<th id="lblCODE_GRP">코드그룹</th>
					<td>
						<input type="text" id="CODE_GRP" name="CODE_GRP"/>
					</td>
					<th id="lblCODE_ID">코드ID</th>
					<td>
						<input type="text" id="CODE_ID" name="CODE_ID"/>
					</td>
					<th id="lblCODE_NAME">코드명</th>
					<td>
						<input type="text" id="CODE_NAME" name="CODE_NAME"/>
					</td>
				</tr>
				<tr>
					<th>기타1</th>
					<td>
						<input type="text" id="ETC1" name="ETC1"/>
					</td>
					<th>기타2</th>
					<td>
						<input type="text" id="ETC2" name="ETC2"/>
					</td>
					<th>기타3</th>
					<td>
						<input type="text" id="ETC3" name="ETC3"/>
					</td>
				</tr>
				<tr>
					<th>정렬순서</th>
					<td>
						<input type="text" id="SORT_SEQ" name="SORT_SEQ"/>
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