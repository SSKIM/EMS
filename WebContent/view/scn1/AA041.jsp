<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<%
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet!=null) {
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AA041.js"></script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/component/jquery/jquery.tabs.pack.js"></script>
	</head>
	<body style="margin: 0px 5px 0px 5px">
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable">
			<tr>
				<th style="width:15%">전표번호</th>
				<td style="width:35%">
					<span id="S_JRNL_NO"></span>-<span id="S_JRNL_SEQ"></span>
				</td>
				<th style="width:15%">전표상태</th>
				<td style="width:35%">
					<span id="S_STATUS_NAME"></span> <span id="S_STATUS" class=hidden />
				</td>
			</tr>
			<tr>
				<th>증빙구분</th>
				<td colspan=3>
					<span id="S_EVID_NAME"></span> <span id="S_EVID_TYPE" class=hidden />
				</td>
			</tr>
		</table>
		<div id="evidTabs" class="tabs">
			<table class="tabTable">
				<tr>
					<td>
						<ul class="tabs-nav">
							<li id="tab1" class="tabs-selected"><a href="#tab-1" onclick="tab_onClick(1)">1.Item</a></li>
							<li id="tab2"><a href="#tab-2" onclick="tab_onClick(2)">2.Journal</a></li>
						</ul>
					</td>
				</tr>
			</table>
			<div id="tab-1" class="tabs-selected">			
<div id="expsType1">
				<table class="formTable" id="fromTable1">
					<tr>
						<th style="width:10%" id="lblEXPS_TYPE_ID">비용구분</th>
						<td style="width:50%" colspan="5">
							<span id="EXPS_TYPE_NAME"></span>
						</td>
						<th style="width:10%" id="lblVENDOR_CODE">미지급처</th>
						<td style="width:30%" colspan="3">
							<span id="VENDOR_CODE"></span>&nbsp;<span id="VENDOR_NAME"></span>
						</td>
					</tr>
					<tr>
						<th style="width:10%" id="lblTRANS_DATE">거래일자</th>
						<td style="width:10%">
							<span id="TRANS_DATE"></span>
						</td>
						<th style="width:10%" id="lblPAY_DUE_DATE">지급일자</th>
						<td style="width:10%">
							<span id="PAY_DUE_DATE"></span>
						</td>
						<th style="width:10%" id="lblPAY_METHOD_TYPE">지급방법</th>
						<td style="width:10%">
							<span id="PAY_METHOD_NAME"></span>
						</td>
						<th style="width:10%" id="lblCOMPANY_NAME">거래처명</th>
						<td style="width:30%" colspan="3">
							<span id="COMPANY_NAME"></span>
						</td>
					</tr>
					<tr>
						<th id="lblREMARK">적요</th>
						<td colspan="5">
							<span id="REMARK"></span>
						</td>
						<th style="width:12%" id="lblBUSI_NO">사업자번호</th>
						<td style="width:28%" colspan="3">
							<span id="BUSI_NO"></span>
						</td>
					</tr>
					<tr>
						<th id="lblREMARK1">추가 Desc1</th>
						<td colspan="5">
							<span id="REMARK1"></span>
						</td>
						<th id="lblREMARK3">추가 Desc3</th>
						<td colspan="3">
							<span id="REMARK3"></span>
						</td>
					</tr>
					<tr>
						<th id="lblREMARK2">추가 Desc2</th>
						<td colspan="5">
							<span id="REMARK2"></span>
						</td>
						<th id="lblREMARK4">추가 Desc4</th>
						<td colspan="3">
							<span id="REMARK4"></span>
						</td>
					</tr>
					<tr>
						<th id="lblTOTAL_AMT">총금액</th>
						<td colspan="5">
							<span id="TOTAL_AMT" class="labelLine number"></span>
						</td>
						<th style="width:10%" id="lblSUPPLY_AMT">공급가액</th>
						<td style="width:10%">
							<span id="SUPPLY_AMT" class="labelLine number"></span>&nbsp;
						</td>
						<th style="width:10%" id=lblVAT_AMT>세액</th>
						<td style="width:10%">
							<span id="VAT_AMT" class="labelLine number"></span>
						</td>
					</tr>
				</table>
				<div style="height:280px;margin-top:2px">
					<table class="dataTable" id="deptTable1">
						<colgroup>
							<col width=40><col width=100><col width=100><col width=200><col width=100><col width=200><col width=100><col width=200>
						</colgroup>
						<thead>
							<tr>
								<th>순번</th><th>금액</th><th class=hidden>부서코드</th><th>부서명</th><th class=hidden>채널코드</th><th>채널명</th><th class=hidden>자산코드</th><th>자산명</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
</div>
<div id="expsType2">
				<table class="formTable" id="fromTable2">
					<tr>
						<th style="width:10%" id="lblTRANS_DATE2">거래일자</th>
						<td style="width:15%">
							<span id="TRANS_DATE2"></span>
						</td>
						<th style="width:10%" id="lblPAY_DUE_DATE2">지급일자</th>
						<td style="width:15%">
							<span id="PAY_DUE_DATE2"></span>
						</td>
						<th style="width:10%" id="lblPAY_METHOD_TYPE2">지급방법</th>
						<td style="width:15%">
							<span id="PAY_METHOD_TYPE2"></span>
						</td>
						<th style="width:10%" id="lblDEBIT_TOTAL2">차변 합계:</th>
						<td style="width:80px">
							<input type="text" id="DEBIT_TOTAL2" name="DEBIT_TOTAL" class="labelLine number" maxlength="23" style="width:99%"/>
						</td>
					</tr>
					<tr>
						<th id="lblREMARK6">적요</th>
						<td colspan="5">
							<span id="REMARK6"></span>
						</td>
						<th id="lblCREDIT_TOTAL2">대변 합계:</th>
						<td style="width:80px">
							<input type="text" id="CREDIT_TOTAL2" name="CREDIT_TOTAL" class="labelLine number" maxlength="23" style="width:99%"/>
						</td>
					</tr>
				</table>
				<div style="height:472px;margin-top:2px">
					<table class="dataTable" id="deptTable2">
						<colgroup>
							<col width=40><col width=60><col width=60><col width=140><col width=60><col width=60><col width=100><col width=60><col width=100>
						</colgroup>
						<thead>
							<tr>
								<th>순번</th><th>PERIED</th><th>계정과목</th><th>계정과목명</th><th>차대금액</th><th>대변금액</th><th class=hidden>부서코드</th><th>부서명</th><th class=hidden>채널코드</th><th>채널명</th><th class=hidden>차대구분</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
</div>
			</div>
			<div id="tab-2">
				<div style="height:472px">
					<table style="width:100%">
						<thead>
							<tr>
								<th id="lblDEBIT_TOTAL3">차변 합계:</th>
								<td style="width:30%">
									<input type="text" id="DEBIT_TOTAL3" name="DEBIT_TOTAL" class="labelLine number" maxlength="23" style="width:120px"/>
								</td>
								<th id="lblCREDIT_TOTAL3">대변 합계:</th>
								<td style="width:30%">
									<input type="text" id="CREDIT_TOTAL3" name="CREDIT_TOTAL" class="labelLine number" maxlength="23" style="width:120px"/>
								</td>
							</tr>
						</thead>
					</table>
					<table class="dataTable" id="deptTable3">
						<colgroup>
							<col width=40><col width=60><col width=6><col width=140><col width=60><col width=60><col width=100><col width=60><col width=100>
						</colgroup>
						<thead>
							<tr>
								<th>순번</th><th>PERIED</th><th>계정과목</th><th>계정과목명</th><th>차대금액</th><th>대변금액</th><th class=hidden>부서코드</th><th>부서명</th><th class=hidden>채널코드</th><th>채널명</th><th class=hidden>차대구분</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
