<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil,com.das.fms.vo.UserVO" %>
<%
	UserVO userVO = (UserVO)CommonUtil.getUserSession(request);
	Map resultSet = CommonUtil.getResultSet(request);
	List deptList = null;
	if(resultSet!=null) {
		deptList      = (List)resultSet.get("DEPT_LIST");

	}
%>
<jsp:useBean id="cboDept" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboDept" property="dataSource" value="<%=deptList%>"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AA080.js"></script>
		<script type="text/javascript">
			var ssDeptCode     = "<%=CommonUtil.nvl(userVO.getDeptCode())%>";
		</script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>부서 명</th>
				<td style="width:150%">
					<jsp:setProperty name="cboDept" property="id" value="S_DEPT_CODE"/>
					<jsp:setProperty name="cboDept" property="isAll" value="true"/>
					<jsp:getProperty name="cboDept" property="bindData" />
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable1">
				<col width="40px"/><col width="60px"/><col width="60px"/><col width="100px"/><col width="80px"/><col width="200px"/><col width="60px"/><col width="60px"/><col width="60px"/>
				<thead>
					<tr>
						<th><nobr>순번</nobr></th>
						<th><nobr>거래일자</nobr></th>
						<th><nobr>전표번호</nobr></th>
						<th><nobr>거래처</nobr></th>
						<th><nobr>금액</nobr></th>
						<th><nobr>적 요</nobr></th>
						<th><nobr>계정코드</nobr></th>
						<th><nobr>지급방법</nobr></th>
						<th><nobr>부가세코드</nobr></th>
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
