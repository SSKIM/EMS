<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil,com.das.fms.vo.UserVO" %>
<%
	UserVO userVO = (UserVO)CommonUtil.getUserSession(request);
	Map resultSet = CommonUtil.getResultSet(request);
	Map appvData = null;
	if(resultSet!=null) {
		appvData = (Map)resultSet.get("APPV_DATA");
	}
	String appvLine = (String)appvData.get("APPV_LINE");
%>
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
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AA060.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th>전표구분</th>
				<td style="width:35%">
					<input type="radio" name="S_JRNL_TYPE" value="G"><span class="radio">일반전표</span>
					<input type="radio" name="S_JRNL_TYPE" value="C"><span class="radio">취소전표</span>
				</td>
				<th>전표상태</th>
				<td style="width:35%">
					<input type="radio" name="S_STATUS" value=""><span class="radio">전체</span>
					<input type="radio" name="S_STATUS" value="S"><span class="radio">제출</span>
					<input type="radio" name="S_STATUS" value="R"><span class="radio">반려</span>
					<input type="radio" name="S_STATUS" value="P"><span class="radio">승인</span>
				</td>
			</tr>
			<tr>
				<th>전표번호</th>
				<td style="width:35%">
					<input type="text" id="S_JRNL_NO" />
				</td>
				<th id="lblS_WRITE_DATE">마감월</th>
				<td style="width:35%">
					<input type="text" id="S_WRITE_DATE_FROM" name="S_WRITE_DATE_FROM" style="width:80px" maxlength="10"/> ~ <input type="text" id="S_WRITE_DATE_TO" name="S_WRITE_DATE_TO" style="width:80px" maxlength="10"/>
				</td>
			</tr>
		</table>
		<div class="main" id="divMain">
			<input type="hidden" id="JRNL_NO" /><input type="hidden" id="STATUS_NAME" /><input type="hidden" id="SUBMIT_DATE" /><input type="hidden" id="SUBMIT_USER_NAME" /><input type="hidden" id="SUBMIT_USER_DEPT_NAME" />
			<table class="dataTable" id="dataTable1" style="width:1380px">
				<colgroup>
					<col width=40/><col width=100/><col width=50/><col width=80/><col width=80/><col width=100/><col width=100/><col width=80/><col width=80/><col width=100/><col width=230/><col width=100/><col width=80/><col width=80/><col width=60/>
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
						<th><nobr>마감월</nobr></th>
						<th><nobr>적요</nobr></th>
						<th><nobr>반려일자</nobr></th>
						<th><nobr>취소/반려사유</nobr></th>
						<th><nobr>참조번호</nobr></th>
						<th><nobr>상태</nobr></th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="15"></td></tr>
				</tbody>
			</table>
		</div>
		<div class="main" style="height:200px">
			<table class="dataTable" id="dataTable2" style="width:1200px">
				<colgroup>
					<col width=40/><col width=80/><col width=120/><col width=140/><col width=80/><col width=200/><col width=100/><col width=100/><col width=100/><col width=80/><col width=300/>
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
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
