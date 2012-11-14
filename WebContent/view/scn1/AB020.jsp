<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
List deptList = null, emplList = null;
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet!=null) {
		emplList = (List)resultSet.get("EMPL_LIST");
		deptList = (List)resultSet.get("DEPT_LIST");
	}
%>
<jsp:useBean id="cboEmpl" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboEmpl" property="dataSource" value="<%=emplList%>"/>
<jsp:useBean id="cboDept" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboDept" property="dataSource" value="<%=deptList%>"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AB020.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th style="width:15%">전표번호</th>
				<td style="width:30%">
					<input type="text" id="S_JRNL_NO" maxlength="9" />
				</td>
				<th style="width:15%">제출일자</th>
				<td style="width:30%">
					<input type="text" id="S_SUBMIT_DATE_FROM" name="S_SUBMIT_DATE_FROM" class=date maxlength="10"/> ~ 
					<input type="text" id="S_SUBMIT_DATE_TO" name="S_SUBMIT_DATE_TO" class=date maxlength="10"/>
				</td>
			</tr>
			<tr>
				<th>전표발행자</th>
				<td>
					<jsp:setProperty name="cboEmpl" property="id" value="S_EMPL_ID"/>
					<jsp:setProperty name="cboEmpl" property="isAll" value="true"/>
					<jsp:getProperty name="cboEmpl" property="bindData" />
				</td>
				<th>전표발행부서</th>
				<td>
					<jsp:setProperty name="cboDept" property="id" value="S_DEPT_CODE"/>
					<jsp:setProperty name="cboDept" property="isAll" value="true"/>
					<jsp:getProperty name="cboDept" property="bindData" />
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1" style="width:800px">
				<colgroup>
					<col width=40/><col width=100/><col width=60/><col width=80/><col width=80/><col width=100/><col width=150/><col width=100/>
				</colgroup>
				<thead>
					<tr>
						<th>선택</th>
						<th>전표번호</th>
						<th>구분</th>
						<th>거래일자</th>
						<th>제출일자</th>
						<th>제출자</th>
						<th>제출부서</th>
						<th>합계</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="8"></td></tr>
				</tbody>
			</table>
		</div>
		<div class="main" style="height:250px">
			<table class="dataTable" id="dataTable2" style="width:1500px">
				<colgroup>
					<col width="40"/><col width="80"/><col width="120"/><col width="160"/><col width="80"/><col width="160"/><col width="100"/><col width="100"/><col/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>거래일자</th>
						<th>증빙구분</th>
						<th>비용구분</th>
						<th>금액</th>
						<th>거래처</th>
						<th>지급요청일자</th>
						<th>지급방법</th>
						<th>적요</th>
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
