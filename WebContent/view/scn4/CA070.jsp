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
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AA070.js"></script>
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
				<th>계정과목</th>
					<td>
					<input type="hidden" id="rowIndex2" name="rowIndex"/>
					<input type="text" id="ACCT_CODE2" name="ACCT_CODE" style="width:50px" maxlength="7"/><input type="text" id="ACCT_NAME2" name="ACCT_NAME" style="width:100px" maxlength="40"/>
					<img id="btnPopupAcct" src="./theme/default/image/button/search.png" class="popup"/>
					 ~ 
					<input type="hidden" id="rowIndex3" name="rowIndex2"/>
					<input type="text" id="ACCT_CODE3" name="ACCT_CODE2" style="width:50px" maxlength="7"/><input type="text" id="ACCT_NAME3" name="ACCT_NAME2" style="width:100px" maxlength="40"/>
					<img id="btnPopupAcct2" src="./theme/default/image/button/search.png" class="popup"/>
					</td>
				<th id="lblS_WRITE_DATE">마감월</th>
				<td style="width:35%">
					<input type="text" id="S_WRITE_DATE_FROM" name="S_WRITE_DATE_FROM" style="width:80px" maxlength="10"/> ~ <input type="text" id="S_WRITE_DATE_TO" name="S_WRITE_DATE_TO" style="width:80px" maxlength="10"/>
				</td>
			</tr>
		</table>
		<div class="main" id="divMain" style="height:900px">
			<input type="hidden" id="JRNL_NO" /><input type="hidden" id="STATUS_NAME" /><input type="hidden" id="SUBMIT_DATE" />
			<table class="dataTable" id="dataTable1" style="width:1860px">
					<colgroup>
							<col width=40><col width=70><col width=40><col width=70><col width=140><col width=60><col width=60><col width=60><col width=60><col width=230/><col width=80><col width=80><col width=60><col width=80><col width=60><col width=60><col width=80><col width=200><col width=80><col width=60>
						</colgroup>
						<thead>
							<tr>
								<th>순번</th>
								<th>전표번호</th>
								<th>구분</th>
								<th>계정과목</th>
								<th>계정과목명</th>
								<th>차변금액</th>
								<th>대변금액</th>
								<th class=hidden>부서코드</th><th>부서명</th>
								<th class=hidden>채널코드</th><th>채널명</th>
								<th>적요</th>
								<th class=hidden>차대구분</th>
								<th>거래일자</th>
								<th>제출일자</th>
								<th>제출자</th>
								<th>승인일자</th>
								<th>승인자</th>
								<th>마감월</th>
								<th>반려일자</th>
								<th>취소/반려사유</th>
								<th>참조번호</th>
								<th>상태</th>
							</tr>
						</thead>
				<tbody>
					<tr><td colspan="19"></td></tr>
				</tbody>
					</table>
		</div>
				<div class="main" style="height:200px">
			<table class="dataTable" id="dataTable2" style="width:1200px">
				<colgroup>
					<col width=40/><col width=80/><col width=120/><col width=140/><col width=80/><col width=200/><col width=100/><col width=100/><col width=100/><col width=60/><col/>
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
						<th>참조번호</th>
						<th>상태</th>
						<th>적요</th>
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
