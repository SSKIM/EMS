<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil,com.das.fms.vo.UserVO" %>
<%
	UserVO userVO = (UserVO)CommonUtil.getUserSession(request);
	Map resultSet = CommonUtil.getResultSet(request);
	List deptList = null;
	Map appvData = null;
	if(resultSet!=null) {
		deptList = (List)resultSet.get("DEPT_LIST");
		appvData = (Map)resultSet.get("APPV_DATA");
	}
	String appvLine = (String)appvData.get("APPV_LINE");
%>
<jsp:useBean id="cboDept" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboDept" property="dataSource" value="<%=deptList%>"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript">
			var ssUserName     = "<%=CommonUtil.nvl(userVO.getUserName())%>";
			var ssDeptCode     = "<%=CommonUtil.nvl(userVO.getDeptCode())%>";
			var ssDeptName     = "<%=CommonUtil.nvl(userVO.getDeptName())%>";
			var ssEmplId       = "<%=CommonUtil.nvl(userVO.getEmplId())%>";
			var ssBusiUnitType = "<%=CommonUtil.nvl(userVO.getBusiUnitType())%>";
			var appvLine       = "<%=appvLine%>";
		</script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AB010.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>전표구분</th>
				<td>
					<input type="radio" name="S_JRNL_TYPE" value="G"><span class="radio">일반전표</span>
					<input type="radio" name="S_JRNL_TYPE" value="C"><span class="radio">취소전표</span>
					<input type="radio" name="S_JRNL_TYPE" value="P"><span class="radio">지급전표</span>
				</td>
				<th>전표상태</th>
				<td colspan="3">
					<div id="divStatus">
						<input type="radio" name="S_STATUS" value=""><span class="radio">전체</span>
						<input type="radio" name="S_STATUS" value="S"><span class="radio">제출</span>
						<input type="radio" name="S_STATUS" value="R"><span class="radio">반려</span>
						<input type="radio" name="S_STATUS" value="P"><span class="radio">승인</span>
					</div>
				</td>
			</tr>
			<tr>
				<th style="width:10%">전표번호</th>
				<td style="width:20%">
					<input type="text" id="S_JRNL_NO" />
				</td>
				<th style="width:10%">제출일자</th>
				<td style="width:30%">
					<input type="text" id="S_SUBMIT_DATE_FROM" name="S_SUBMIT_DATE_FROM" class=date maxlength="10"/> ~ 
					<input type="text" id="S_SUBMIT_DATE_TO" name="S_SUBMIT_DATE_TO" class=date maxlength="10"/>
				</td>
				<th style="width:10%">전표발행부서</th>
				<td style="width:20%">
					<jsp:setProperty name="cboDept" property="id" value="S_DEPT_CODE"/>
					<jsp:setProperty name="cboDept" property="isAll" value="true"/>
					<jsp:getProperty name="cboDept" property="bindData" />
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<input type="hidden" id="JRNL_NO" /><input type="hidden" id="STATUS_NAME" /><input type="hidden" id="SUBMIT_DATE" /><input type="hidden" id="SUBMIT_USER_NAME" /><input type="hidden" id="SUBMIT_USER_DEPT_NAME" />
			<table class="dataTable" id="dataTable1" style="width:1350px">
				<colgroup>
					<col width=40/><col width=100/><col width=50/><col width=80/><col width=80/><col width=100/><col width=100/><col width=80/><col width=100/><col width=230/><col/><col width=100/><col width=80/><col width=80/><col width=60/>
				</colgroup>
				<thead>
					<tr>
						<th><nobr>순번</nobr></th>
						<th><nobr>전표번호</nobr></th>
						<th><nobr>구분</nobr></th>
						<th><nobr>거래일자</nobr></th>
						<th><nobr>제출일자</nobr></th>
						<th><nobr>제출자</nobr></th>
						<th><nobr>전표발행부서</nobr></th>
						<th><nobr>승인일자</nobr></th>
						<th><nobr>승인자</nobr></th>
						<th><nobr>적요</nobr></th>
						<th><nobr>반려일자</nobr></th>
						<th><nobr>취소/반려사유</nobr></th>
						<th><nobr>참조번호</nobr></th>
						<th><nobr>상태</nobr></th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="14"></td></tr>
				</tbody>
			</table>
		</div>
		<div class="main" style="height:310px">
			<table class="dataTable" id="dataTable2" style="width:1500px">
				<colgroup>
					<col width=40/><col width=80/><col width=100/><col width=200/><col width=80/><col width=200/><col width=100/><col width=100/><col width="100"/><col width="80"/><col/>
				</colgroup>
				<thead>
					<tr>
						<th><nobr>순번</nobr></th>
						<th><nobr>거래일자</nobr></th>
						<th><nobr>증빙구분</nobr></th>
						<th><nobr>비용구분</nobr></th>
						<th><nobr>금액</nobr></th>
						<th><nobr>거래처</nobr></th>
						<th><nobr>지급요청일자</nobr></th>
						<th><nobr>지급방법</nobr></th>
						<th><nobr>참조번호</nobr></th>
						<th><nobr>상태</nobr></th>
						<th><nobr>적요</nobr></th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="11"></td></tr>
				</tbody>
			</table>
			<table class="dataTable" id="dataTable3">
				<colgroup>
					<col width=80><col width=200><col width=80><col width=80><col width=80><col width=120><col width=80><col width=120><col width=100><col width=80>
				</colgroup>
				<thead>
					<tr>
						<th><nobr>계정과목</nobr></th>
						<th><nobr>계정과목명</nobr></th>
						<th><nobr>차변금액</nobr></th>
						<th><nobr>대변금액</nobr></th>
						<th><nobr>부서코드</nobr></th>
						<th><nobr>부서명</nobr></th>
						<th><nobr>채널코드</nobr></th>
						<th><nobr>채널명</nobr></th>
						<th><nobr>근거전표번호</nobr></th>
						<th><nobr>상태</nobr></th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="10"></td></tr>
				</tbody>
			</table>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
