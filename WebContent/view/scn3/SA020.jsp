<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<%
	Map resultSet = CommonUtil.getResultSet(request);
	List buttonList = null;
	if(resultSet != null) {
		buttonList = (List)resultSet.get("BUTTON_LIST");
	}
%>
<jsp:useBean id="rdoAsstPurchaseYn" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<jsp:useBean id="rdoAsstPurchaseTi" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<jsp:useBean id="rdoCcCardInputYn" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<jsp:useBean id="rdoTrafficExpsYn" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn3/SA020.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table id="searchTable1" class="searchTable">
			<tr>
				<th>비용구분명1</th>
				<td style="width:35%">
					<input type="text" id="S_EXPS_TYPE_NAME1" />
				</td>
				<th>비용구분명2</th>
				<td style="width:35%">
					<input type="text" id="S_EXPS_TYPE_NAME2" />
				</td>
			</tr>
		</table>
		<div id="divMain" class="main" style="height:400px">
			<table class="dataTable" id="dataTable1" style="width:1600px">
				<colgroup>
					<col width="40"/><col width="70"/><col width="120"/><col width="120"/><col width="80"/><col width="160"/><col width="80"/><col width="80"/><col width="80"/><col width="80"/><col width="80"/><col width="80"/><col width="80"/><col width="80"/><col width="80"/>
				</colgroup>
				<thead>
					<tr>
						<th><nobr>순번</nobr></th>
						<th><nobr>비용구분</nobr></th>
						<th><nobr>비용구분명1</nobr></th>
						<th><nobr>비용구분명2</nobr></th>
						<th><nobr>계정과목코드</nobr></th>
						<th><nobr>계정과목명</nobr></th>
						<th><nobr>비고1</nobr></th>
						<th><nobr>비고2</nobr></th>
						<th><nobr>비고3</nobr></th>
						<th><nobr>비고4</nobr></th>
						<th><nobr>자산구매여부</nobr></th>
						<th><nobr>유무형자산여부</nobr></th>
						<th><nobr>거래처입력</nobr></th>
						<th><nobr>교통비명세서</nobr></th>
						<th><nobr>상태</nobr></th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="15"></td></tr>
				</tbody>
			</table>
		</div>
		<div class="button">
			<jsp:setProperty name="button" property="buttonGroup" value="2"/>
			<jsp:setProperty name="button" property="dataSource" value="<%=buttonList%>"/>
			<jsp:getProperty name="button" property="dataBind" />
		</div>
		<form id="formData" name="formData" method="post">
			<table class="formTable" id="fromTable1">
				<tr>
					<th id="lblEXPS_TYPE_ID" class="required">비용구분ID</th>
					<td colspan="5">
						<input type="text" id="EXPS_TYPE_ID" name="EXPS_TYPE_ID" maxlength=5 />
					</td>
				</tr>
				<tr>
					<th id="lblEXPS_TYPE_NAME1" style="width:15%">비용구분명1</th>
					<td style="width:35%">
						<input type="text" id="EXPS_TYPE_NAME1" name="EXPS_TYPE_NAME1" style="width:99%" />
					</td>
					<th id="lblEXPS_TYPE_NAME2" style="width:15%">비용구분명2</th>
					<td style="width:35%" colspan="3">
						<input type="text" id="EXPS_TYPE_NAME2" name="EXPS_TYPE_NAME2" style="width:99%" />
					</td>
				</tr>
				<tr>
					<th id="lblACCT_CODE">계정과목</th>
					<td>
						<input type="text" id="ACCT_CODE" name="ACCT_CODE" style="width:80px"/>
						<input type="text" id="ACCT_NAME" name="ACCT_NAME" style="width:200px"/>
						<img id="btnPopupAcct" src="./theme/default/image/button/search.png" class="popup"/>
					</td>
					<th>상태</th>
					<td colspan="3">
						<jsp:setProperty name="radiobox" property="name" value="STATUS"/>
						<jsp:setProperty name="radiobox" property="dataType" value="YesNo"/>
						<jsp:getProperty name="radiobox" property="bindData" />
					</td>
				</tr>
				<tr>
					<th>비고1</th>
					<td>
						<input type="text" id="REMARK1" name="REMARK1" style="width:99%" />
					</td>
					<th>비고2</th>
					<td colspan="3">
						<input type="text" id="REMARK2" name="REMARK2" style="width:99%" />
					</td>
				</tr>
				<tr>
					<th>비고3</th>
					<td>
						<input type="text" id="REMARK3" name="REMARK3" style="width:99%" />
					</td>
					<th>비고4</th>
					<td colspan="3">
						<input type="text" id="REMARK4" name="REMARK4" style="width:99%" />
					</td>
				</tr>
				<tr>
					<th style="width:15%"><nobr>자산구매여부</nobr></th>
					<td><nobr>
						<jsp:setProperty name="rdoAsstPurchaseYn" property="name" value="ASST_PURCHASE_YN"/>
						<jsp:setProperty name="rdoAsstPurchaseYn" property="dataType" value="YesNo"/>
						<jsp:getProperty name="rdoAsstPurchaseYn" property="bindData" />
					</nobr></td>
					<th style="width:15%"><nobr>유무형자산여부(Y:무형, N:유형)</nobr></th>
					<td><nobr>
						<jsp:setProperty name="rdoAsstPurchaseTi" property="name" value="ASST_PURCHASE_TI"/>
						<jsp:setProperty name="rdoAsstPurchaseTi" property="dataType" value="YesNo"/>
						<jsp:getProperty name="rdoAsstPurchaseTi" property="bindData" />
					</nobr></td>
				</tr>
				<tr>
					<th style="width:15%"><nobr>법인카드여부</nobr></th>
					<td><nobr>
						<jsp:setProperty name="rdoCcCardInputYn" property="name" value="CC_CARD_INPUT_YN"/>
						<jsp:setProperty name="rdoCcCardInputYn" property="dataType" value="YesNo"/>
						<jsp:getProperty name="rdoCcCardInputYn" property="bindData" />
					</nobr></td>
					<th style="width:15%"><nobr>교통비명세서</nobr></th>
					<td><nobr>
						<jsp:setProperty name="rdoTrafficExpsYn" property="name" value="TRAFFIC_EXPS_YN"/>
						<jsp:setProperty name="rdoTrafficExpsYn" property="dataType" value="YesNo"/>
						<jsp:getProperty name="rdoTrafficExpsYn" property="bindData" />
					</nobr></td>
				</tr>
			</table>
			<table class="historyTable" style="width:100%">
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
