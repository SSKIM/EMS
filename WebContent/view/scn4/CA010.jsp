<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil,com.das.fms.vo.UserVO" %>
<%
	UserVO userVO = (UserVO)CommonUtil.getUserSession(request);
	Map resultSet = CommonUtil.getResultSet(request);
	Map fuelUnitPrice = null, vatRate = null, appvData = null;
	List expsType = null, payMethod = null, deptList = null, chnlList = null, asstList = null, cardList = null;
	List vatType = null, prdList = null, afsList = null, supList= null;
	if(resultSet!=null) {
		expsType      = (List)resultSet.get("EXPS_TYPE_LIST");
		payMethod     = (List)resultSet.get("PAY_METHOD_LIST");
		deptList      = (List)resultSet.get("DEPT_LIST");
		chnlList      = (List)resultSet.get("CHNL_LIST");
		asstList      = (List)resultSet.get("ASST_LIST");
		cardList      = (List)resultSet.get("CARD_LIST");
		fuelUnitPrice = (Map)resultSet.get("FUEL_INFO");
		vatRate       = (Map)resultSet.get("VAT_RATE_INFO");
		appvData      = (Map)resultSet.get("APPV_DATA");
		vatType       = (List)resultSet.get("VAT_LIST");
		prdList       = (List)resultSet.get("PRD_LIST");
		afsList       = (List)resultSet.get("AFS_LIST");
		supList       = (List)resultSet.get("SUP_LIST");
	}
	String appvLine = (String)appvData.get("APPV_LINE");
	String jrnlNo   = (String)CommonUtil.getParameter(request,"JRNL_NO");
%>
<jsp:useBean id="cboExpsType" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboExpsType"  property="dataSource" value="<%=expsType%>"/>
<jsp:useBean id="cboPayMethod" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboPayMethod" property="dataSource" value="<%=payMethod%>"/>
<jsp:useBean id="cboDept" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboDept" property="dataSource" value="<%=deptList%>"/>
<jsp:useBean id="cboChnl" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboChnl" property="dataSource" value="<%=chnlList%>"/>
<jsp:useBean id="cboAsst" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboAsst" property="dataSource" value="<%=asstList%>"/>
<jsp:useBean id="cboCard" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboCard" property="dataSource" value="<%=cardList%>"/>
<jsp:useBean id="cboVat" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboVat" property="dataSource" value="<%=vatType%>"/>
<jsp:useBean id="cboPrd" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboPrd" property="dataSource" value="<%=prdList%>"/>
<jsp:useBean id="cboAfs" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboAfs" property="dataSource" value="<%=afsList%>"/>
<jsp:useBean id="cboSup" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboSup" property="dataSource" value="<%=supList%>"/>
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
			var jrnlNo         = "<%=jrnlNo%>";
			var fuelUnitPrice  = "", fuelAcctNo = "";
			<%if(!CommonUtil.nullOrEmpty(fuelUnitPrice)) {%>
				fuelUnitPrice = "<%=fuelUnitPrice.get("ETC1")%>";
				fuelExpsType  = "<%=fuelUnitPrice.get("ETC2")%>";
			<%}%>
			var vatRate = 0;
			<%if(!CommonUtil.nullOrEmpty(vatRate)) {%>
				vatRate = "<%=vatRate.get("ETC1")%>";
			<%}%>
			var appvLine = "<%=appvLine%>";
		</script>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn1/AA010.js"></script>
		<script type="text/javascript" src="../component/jquery/jquery.ui.core.js"></script>
		<script type="text/javascript" src="../component/jquery/jquery.ui.widget.js"></script>
		<script type="text/javascript" src="../component/jquery/jquery.ui.tabs.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable" id="searchTable1">
			<tr>
				<th style="width:120px">전표번호</th>
				<td>
					<span id="S_JRNL_NO"></span>
				</td>
				<th style="width:120px">전표구분</th>
				<td>
					<span id="S_JRNL_TYPE"></span>&nbsp;<span id="S_JRNL_TYPE_NAME"></span>
				</td>
				<th style="width:120px">작성일자</th>
				<td>
					<span id="S_WRITE_DATE"></span>
				</td>
				<th style="width:120px">전표상태</th>
				<td style="width:10%">
					<span id="S_STATUS"></span>&nbsp;<span id="S_STATUS_NAME"></span>
				</td>
			</tr>
			<tr>
				<th style="width:120px">비고</th>
				<td colspan="5">
					<input type="text" id="S_REMARK" name="S_REMARK" style="width:99%" />
				</td>
				<th style="width:120px" id="lblTOTAL">전체합계</th>
				<td	>
					<input type="text" id="TOTAL" name="TOTAL" class="labelLine number" maxlength="23"/>
				</td>
			</tr>
		</table>
		<div class="main" style="height:200px;margin-top:3px" id="divMain">
			<table class="dataTable" id="dataTable" style="width:1200px">
				<colgroup>
					<col width=40><col width=100><col width=120><col width=180><col width=100><col width=120><col width=100><col width=120>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th><th>거래일자</th><th>증빙구분</th><th>비용구분</th><th>금액</th><th>거래처</th><th>지급예정일자</th><th>지급방법</th><th>적요</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="9"></td></tr>
				</tbody>
			</table>
		</div>
		<form id="formData" name="formData" method="post">
		<input type="hidden" id="JRNL_NO" name="JRNL_NO"/>
		<input type="hidden" id="JRNL_SEQ" name="JRNL_SEQ"/>
		<input type="hidden" id="EVID_TYPE" name="EVID_TYPE"/>
		<input type="hidden" id="ASST_PURCHASE_YN" />
		<input type="hidden" id="ASST_PURCHASE_TI" />
		<input type="hidden" id="CC_CARD_INPUT_YN" />
		<input type="hidden" id="ENTER_ANL_1" /><input type="hidden" id="ENTER_ANL_2" /><input type="hidden" id="ENTER_ANL_3" /><input type="hidden" id="ENTER_ANL_4" /><input type="hidden" id="ENTER_ANL_5" />
		<input type="hidden" id="ENTER_ANL_6" /><input type="hidden" id="ENTER_ANL_7" /><input type="hidden" id="ENTER_ANL_8" /><input type="hidden" id="ENTER_ANL_9" /><input type="hidden" id="ENTER_ANL_10" />
		<input type="hidden" id="ACCT_CODE" />
		<div id="evidTabs">
			<table class="tabTable" cellpadding="0" cellspacing="0">
				<tr>
					<td>
						<ul>
							<li class="tabs-selected"><a href="#tab-1">1.법인카드</a></li>
							<li><a href="#tab-1">2.세금계산서</a></li>
							<li><a href="#tab-1">3.계산서</a></li>
							<li><a href="#tab-1">4.기타영수증</a></li>
							<li><a href="#tab-1">5.개인경비</a></li>
							<li><a href="#tab-6">6.기타</a></li>
						</ul>
					</td>
					<td class="button">
						<input type="button" id="btnTemplate" name="btnTemplate" value="템플릿" width="48px" height="24px" class="command">
						<input type="button" id="btnInsert" name="btnInsert" value="추가" width="48px" height="24px" class="command">
						<input type="button" id="btnUpdate" name="btnUpdate" value="수정" width="48px" height="24px" class="command">
						<input type="button" id="btnDelete" name="btnDelete" value="삭제" width="48px" height="24px" class="command">
					</td>
				</tr>
			</table>
			<div id="tab-1" class="tabs-selected">
				<table class="formTable" id="fromTable1">
					<tr>
						<th style="width:10%" id="lblEXPS_TYPE_ID">비용구분</th>
						<td style="width:50%" colspan="5">
							<jsp:setProperty name="cboExpsType" property="id" value="EXPS_TYPE_ID"/>
							<jsp:setProperty name="cboExpsType" property="isBlank" value="true"/>
							<jsp:getProperty name="cboExpsType" property="bindData" />
						</td>
						<th style="width:10%" id="lblVENDOR_CODE">카드번호</th>
						<td style="width:30%" colspan="3">
							<div id="divVENDOR_CODE1">
								<span id="lblVENDOR_CODE1" class="hidden">카드번호</span>
								<jsp:setProperty name="cboCard" property="id" value="VENDOR_CODE1"/>
								<jsp:setProperty name="cboCard" property="isBlank" value="true"/>
								<jsp:getProperty name="cboCard" property="bindData" />
							</div>
							<div id="divVENDOR_CODE2">
								<span id="lblVENDOR_CODE2" class="hidden">거래처</span>
								<input type="hidden" id="validVENDOR_CODE2">
								<input type="text" id="VENDOR_CODE2" name="VENDOR_CODE" style="width:65px" maxlength="7"/>
								<input type="text" id="VENDOR_NAME2" name="VENDOR_NAME" style="width:140px" maxlength="40"/>
								<img id="btnPopupVndr" src="./theme/default/image/button/search.png" class="popup"/>
							</div>
							<div id="divVENDOR_CODE3">
								<span id="lblVENDOR_CODE3" class=hidden>사원</span>
								<input type="hidden" id="validVENDOR_CODE3">
								<input type="text" id="VENDOR_CODE3" name="VENDOR_CODE" style="width:65px" maxlength="7"/>
								<input type="text" id="VENDOR_NAME3" name="VENDOR_NAME" style="width:140px" maxlength="40"/>
								<img id="btnPopupEmpl" src="./theme/default/image/button/search.png" class="popup"/>
							</div>
						</td>
					</tr>
					<tr>
						<th style="width:10%" id="lblTRANS_DATE">거래일자</th>
						<td style="width:10%">
							<input type="text" id="TRANS_DATE" name="TRANS_DATE" class=date maxlength="10"/>
						</td>
						<th style="width:10%" id="lblPAY_DUE_DATE">지급요청일자</th>
						<td style="width:10%">
							<input type="text" id="PAY_DUE_DATE" name="PAY_DUE_DATE" class=date maxlength="10"/>
						</td>
						<th style="width:10%" id="lblPAY_METHOD_TYPE">지급방법</th>
						<td style="width:10%">
							<jsp:setProperty name="cboPayMethod" property="id" value="PAY_METHOD_TYPE"/>
							<jsp:setProperty name="cboPayMethod" property="isBlank" value="true"/>
							<jsp:getProperty name="cboPayMethod" property="bindData" />
						</td>
						<th style="width:10%" id="lblCOMPANY_NAME">거래처명</th>
						<td colspan="3">
							<input type="text" id="COMPANY_NAME" name="COMPANY_NAME" style="width:99%" maxlength="40"/>
							<div id="divUSE_TYPE">
								<input type="radio" name="USE_TYPE" value="CH"><span class="radio">현금</span>
								<input type="radio" name="USE_TYPE" value="CC"><span class="radio">개인신용카드</span>
							</div>
						</td>
					</tr>
					<tr>
						<th id="lblREMARK">적요</th>
						<td colspan="5">
							<input type="text" id="REMARK" name="REMARK" style="width:80%" maxlength="40"/>
							&nbsp;<span id="byteREMARK">0</span> Bytes
						</td>
						<th style="width:10%" id="lblBUSI_NO">사업자번호</th>
						<td style="width:30%" colspan="3">
							<input type="text" id="BUSI_NO" name="BUSI_NO" style="text-align:center;width:160px" maxlength="20"/>
						</td>
					</tr>
					<tr>
						<th id="lblREMARK1">추가 Desc1</th>
						<td colspan="5">
							<input type="text" id="REMARK1" name="REMARK1" style="width:80%" maxlength="40"/>
							&nbsp;<span id="byteREMARK1">0</span> Bytes
						</td>
						<th id="lblREMARK3">추가 Desc3</th>
						<td colspan="3">
							<input type="text" id="REMARK3" name="REMARK3" style="width:80%" maxlength="40"/>
							&nbsp;<span id="byteREMARK3">0</span> Bytes
						</td>
					</tr>
					<tr>
						<th id="lblREMARK2">추가 Desc2</th>
						<td colspan="5">
							<input type="text" id="REMARK2" name="REMARK2" style="width:80%" maxlength="40"/>
							&nbsp;<span id="byteREMARK2">0</span> Bytes
						</td>
						<th id="lblREMARK4">추가 Desc4</th>
						<td colspan="3">
							<input type="text" id="REMARK4" name="REMARK4" style="width:80%" maxlength="40"/>
							&nbsp;<span id="byteREMARK4">0</span> Bytes
						</td>
					</tr>
					<tr>
						<th id="lblTOTAL_AMT">총금액</th>
						<td colspan="5">
							<input type="text" id="TOTAL_AMT" name="TOTAL_AMT" class="labelLine number" maxlength="18"/>
						</td>
						<th style="width:10%" id="lblSUPPLY_AMT">공급가액</th>
						<td style="width:10%">
							<input type="text" id="SUPPLY_AMT" name="SUPPLY_AMT" style="width:99%" maxlength="18"/>
						</td>
						<th style="width:10%" id=lblVAT_AMT>세액</th>
						<td style="width:10%">
							<input type="text" id="VAT_AMT" name="VAT_AMT" style="width:99%" maxlength="18"/>
						</td>
					</tr>
				</table>
				<hr style="width:100%;height:1px solid;padding:0;margin: 4px 0px 0px 0px" />
				<table id="deptForm1" style="width:100%;" cellpadding="0" cellspacing="0" border="0">
					<thead>
						<tr>
							<td>
								<span id="lblDEPT_AMT1" class="title">금액</span>
								<input type="hidden" id="rowIndex1" name="rowIndex"/>
								<input type="text" id="DEPT_AMT1" name="DEPT_AMT" style="width:90px" maxlength="18"/> 
							</td>
							<td>
								<div id="divDEPT_CODE1">
									<span id="lblDEPT_CODE1" class="title">부서</span>
									<jsp:setProperty name="cboDept" property="id" value="DEPT_CODE1"/>
									<jsp:setProperty name="cboDept" property="isBlank" value="true"/>
									<jsp:getProperty name="cboDept" property="bindData" />
								</div>
							</td>
							<td>
								<div id="divCHNL_CODE1">
									<span id="lblCHNL_CODE1" class="title">채널</span>
									<jsp:setProperty name="cboChnl" property="id" value="CHNL_CODE1"/>
									<jsp:setProperty name="cboChnl" property="isBlank" value="true"/>
									<jsp:getProperty name="cboChnl" property="bindData" />
								</div>
							</td>
							<td>
								<div id="divASST_CODE1">
									<span id="lblASST_CODE1" class="title">자산</span>
									<jsp:setProperty name="cboAsst" property="id" value="ASST_CODE1"/>
									<jsp:setProperty name="cboAsst" property="isBlank" value="true"/>
									<jsp:getProperty name="cboAsst" property="bindData" />
								</div>
							</td>
							<td class="button">
								<input type="button" id="btnAdd1" name="btnAdd" value="추가" width="48px" height="24px" class="command">
								<input type="button" id="btnEdit1" name="btnEdit" value="수정" width="48px" height="24px" class="command">
								<input type="button" id="btnRemove1" name="btnRemove" value="삭제" width="48px" height="24px" class="command">
							</td>
						</tr>
					</thead>
				</table>
				<div class="main" style="height:92px">
					<table class="dataTable" id="deptTable1">
						<colgroup>
							<col width=100><col width=200><col width=100><col width=200><col width=100><col width=200><col width=100>
						</colgroup>
						<thead>
							<tr>
								<th>금액</th>
								<th class=hidden>부서코드</th><th>부서명</th>
								<th class=hidden>채널코드</th><th>채널명</th>
								<th class=hidden>자산코드</th><th>자산명</th>
							</tr>
						</thead>
						<tbody>
							<tr><td colspan="7"></td></tr>
						</tbody>
					</table>
				</div>
			</div>
			<div id="tab-6">
				<table class="formTable" id="fromTable2">
					<tr>
						<th style="width:10%" id="lblTRANS_DATE2">거래일자</th>
						<td style="width:15%">
							<input type="text" id="TRANS_DATE2" name="TRANS_DATE" class=date maxlength="10"/>
						</td>
						<th style="width:10%" id="lblPAY_DUE_DATE2">지급요청일자</th>
						<td style="width:15%">
							<input type="text" id="PAY_DUE_DATE2" name="PAY_DUE_DATE" class=date maxlength="10"/>
						</td>
						<th style="width:10%" id="lblPAY_METHOD_TYPE2">지급방법</th>
						<td style="width:15%">
							<jsp:setProperty name="cboPayMethod" property="id" value="PAY_METHOD_TYPE2"/>
							<jsp:setProperty name="cboPayMethod" property="isBlank" value="true"/>
							<jsp:getProperty name="cboPayMethod" property="bindData" />
						</td>
						<th style="width:10%" id="lblDEBIT_TOTAL2">차변 합계:</th>
						<td style="width:80px">
							<input type="text" id="DEBIT_TOTAL2" name="DEBIT_TOTAL" class="labelLine number" maxlength="23" style="width:99%"/>
						</td>
					</tr>
					<tr>
						<th id="lblREMARK6">적요</th>
						<td colspan="5">
							<input type="text" id="REMARK6" name="REMARK" style="width:80%" maxlength="40"/>
							&nbsp;<span id="byteREMARK6">0</span> Bytes
						</td>
						<th id="lblCREDIT_TOTAL2">대변 합계:</th>
						<td style="width:80px">
							<input type="text" id="CREDIT_TOTAL2" name="CREDIT_TOTAL" class="labelLine number" maxlength="23" style="width:99%"/>
						</td>
					</tr>
				</table>
				<table id="deptForm2" style="width:100%">
					<thead>
						<tr>
							<td>
								<span id="lblACCT_CODE2" class="title">계정과목</span>
								<input type="hidden" id="rowIndex2" name="rowIndex"/>
								<input type="hidden" id="validACCT_CODE2">
								<input type="text" id="ACCT_CODE2" name="ACCT_CODE" style="width:65px" maxlength="7"/><input type="text" id="ACCT_NAME2" name="ACCT_NAME" style="width:150px" maxlength="40"/>
								<img id="btnPopupAcct" src="./theme/default/image/button/search.png" class="popup"/>
							</td>
							<td>
								<span id="lblDEPT_AMT2" class="title">금액</span>
								<input type="text" id="DEPT_AMT2" name="DEPT_AMT" style="width:90px" maxlength="18"/> 
								<span id="lblDRCR_TYPE2" class="hidden">차대구분</span>
								<select id="DRCR_TYPE2" name="DRCR_TYPE">
									<option value=""></option>
									<option value="D">차변</option>
									<option value="C">대변</option>
								</select>
							</td>
							<td>
								<div id="divDEPT_CODE2">
									<span id="lblDEPT_CODE2" class="title">부서</span>
									<jsp:setProperty name="cboDept" property="id" value="DEPT_CODE2"/>
									<jsp:setProperty name="cboDept" property="isBlank" value="true"/>
									<jsp:getProperty name="cboDept" property="bindData" />
								</div>
							</td>
							<td>
								<div id="divCHNL_CODE2">
									<span id="lblCHNL_CODE2" class="title">채널</span>
									<jsp:setProperty name="cboChnl" property="id" value="CHNL_CODE2"/>
									<jsp:setProperty name="cboChnl" property="isBlank" value="true"/>
									<jsp:getProperty name="cboChnl" property="bindData" />
								</div>
							</td>
							<td class="button">
								<input type="button" id="btnAdd2" name="btnAdd" value="추가" width="48px" height="24px" class="command">
								<input type="button" id="btnEdit2" name="btnEdit" value="수정" width="48px" height="24px" class="command">
								<input type="button" id="btnRemove2" name="btnRemove" value="삭제" width="48px" height="24px" class="command">
							</td>
						</tr>
						<tr>
							<td colspan="5">
								<div id="divPRD_CODE2" style="display:inline">
									<span id="lblPRD_CODE2" class="title">상품</span>
									<jsp:setProperty name="cboPrd" property="id" value="PRD_CODE2"/>
									<jsp:setProperty name="cboPrd" property="isBlank" value="true"/>
									<jsp:getProperty name="cboPrd" property="bindData" />
								</div>
								<div id="divAFS_TYPE2" style="display:inline">
									<span id="lblAFS_TYPE2" class="title">채권구분</span>
									<jsp:setProperty name="cboAfs" property="id" value="AFS_TYPE2"/>
									<jsp:setProperty name="cboAfs" property="isBlank" value="true"/>
									<jsp:getProperty name="cboAfs" property="bindData" />
								</div>
								<div id="divSUP_CODE2" style="display:inline">
									<span id="lblSUP_CODE2" class="title">거래처</span>
									<jsp:setProperty name="cboSup" property="id" value="SUP_CODE2"/>
									<jsp:setProperty name="cboSup" property="isBlank" value="true"/>
									<jsp:getProperty name="cboSup" property="bindData" />
								</div>
								<div id="divVAT_TYPE2" style="display:inline">
									<span id="lblVAT_TYPE2" class="title">부가세구분</span>
									<jsp:setProperty name="cboVat" property="id" value="VAT_TYPE2"/>
									<jsp:setProperty name="cboVat" property="isBlank" value="true"/>
									<jsp:getProperty name="cboVat" property="bindData" />
								</div>
							</td>
						</tr>
					</thead>
				</table>
				<div class="main" style="height:165px">
						<table class="dataTable" id="deptTable2" style="width:1400px;">
						<colgroup>
							<col width=60><col width=240><col width=80><col width=80><col width=80><col width=120><col width=80><col width=120>
						</colgroup>
						<thead>
							<tr>
								<th>계정과목</th><th>계정과목명</th><th>차변금액</th><th>대변금액</th>
								<th>부서명</th><th>상품명</th><th>채널명</th><th class=hidden></th><th>채권구분명</th><th>거래처명</th><th class=hidden></th><th>부가세구분</th><th class=hidden></th><th class=hidden></th>
							</tr>
						</thead>
						<tbody>
							<tr><td colspan="14"></td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		</form>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        