<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil,com.das.fms.vo.UserVO" %>
<%
	UserVO userVO = (UserVO)CommonUtil.getUserSession(request);
	Map resultSet = CommonUtil.getResultSet(request);
	Map fuelUnitPrice = null, vatRate = null, appvData = null;
	List expsType = null, payMethod = null, deptList = null, chnlList = null, asstList = null, cardList = null;
	List vatType = null, prdList = null, afsList = null, supList= null, TAB = null;
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
		TAB			  = (List)resultSet.get("TAB_LIST");
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
			var ssuserId	   = "<%=CommonUtil.nvl(userVO.getUserId())%>";
			var jrnlNo         = "<%=jrnlNo%>";
			var fuelUnitPrice  = "", fuelAcctNo = "";
			var S001 = "<%=objRb.getString("S001")%>";
			var S002 = "<%=objRb.getString("S002")%>";
			var S003 = "<%=objRb.getString("S003")%>";
			var S004 = "<%=objRb.getString("S004")%>";
			var S005 = "<%=objRb.getString("S005")%>";
			var S006 = "<%=objRb.getString("S006")%>";
			var S007 = "<%=objRb.getString("S007")%>";
			var S008 = "<%=objRb.getString("S008")%>";
			var S009 = "<%=objRb.getString("S009")%>";
			var S010 = "<%=objRb.getString("S010")%>";
			var S011 = "<%=objRb.getString("S011")%>";
			var S012 = "<%=objRb.getString("S012")%>";
			var S013 = "<%=objRb.getString("S013")%>";
			var S014 = "<%=objRb.getString("S014")%>";
			var S015 = "<%=objRb.getString("S015")%>";
			var S016 = "<%=objRb.getString("S016")%>";
			var S017 = "<%=objRb.getString("S017")%>";
			var S018 = "<%=objRb.getString("S018")%>";
			var S019 = "<%=objRb.getString("S019")%>";
			var S020 = "<%=objRb.getString("S020")%>";
			var S021 = "<%=objRb.getString("S021")%>";
			var S022 = "<%=objRb.getString("S022")%>";
			var S023 = "<%=objRb.getString("S023")%>";
			var S024 = "<%=objRb.getString("S024")%>";
			var S025 = "<%=objRb.getString("S025")%>";
			var S026 = "<%=objRb.getString("S026")%>";
			var S027 = "<%=objRb.getString("S027")%>";
			var S028 = "<%=objRb.getString("S028")%>";
			var S029 = "<%=objRb.getString("S029")%>";
			var S030 = "<%=objRb.getString("S030")%>";

			var T001 = "<%=objRb.getString("T001")%>";
			var T002 = "<%=objRb.getString("T002")%>";
			var T003 = "<%=objRb.getString("T003")%>";
			var T004 = "<%=objRb.getString("T004")%>";
			var T005 = "<%=objRb.getString("T005")%>";
			var T006 = "<%=objRb.getString("T006")%>";
			var T007 = "<%=objRb.getString("T007")%>";
			var T008 = "<%=objRb.getString("T008")%>";
			var T009 = "<%=objRb.getString("T009")%>";
			var T010 = "<%=objRb.getString("T010")%>";
			var T011 = "<%=objRb.getString("T011")%>";
			var T012 = "<%=objRb.getString("T012")%>";
			var T013 = "<%=objRb.getString("T013")%>";
			var T014 = "<%=objRb.getString("T014")%>";
			var T015 = "<%=objRb.getString("T015")%>";
			var T016 = "<%=objRb.getString("T016")%>";
			var T017 = "<%=objRb.getString("T017")%>";
			var T018 = "<%=objRb.getString("T018")%>";
			var T019 = "<%=objRb.getString("T019")%>";
			var T020 = "<%=objRb.getString("T020")%>";
			var T021 = "<%=objRb.getString("T021")%>";

			var B001 = "<%=objRb.getString("B001")%>";
			var B002 = "<%=objRb.getString("B002")%>";
			var B003 = "<%=objRb.getString("B003")%>";
			var B004 = "<%=objRb.getString("B004")%>";
			var B005 = "<%=objRb.getString("B005")%>";
			var B006 = "<%=objRb.getString("B006")%>";
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
				<th style="width:120px"><div id="S001"></div></th>
				<td>
					<span id="S_JRNL_NO"></span>
				</td>
				<th style="width:120px"><div id="S002"></div></th>
				<td>
					<span id="S_JRNL_TYPE"></span>&nbsp;<span id="S_JRNL_TYPE_NAME"></span>
				</td>
				<th style="width:120px"><div id="S003"></div></th>
				<td>
					<span id="S_WRITE_DATE"></span>
				</td>
				<th style="width:120px"><div id="S004"></div></th>
				<td style="width:10%">
					<span id="S_STATUS"></span>&nbsp;<span id="S_STATUS_NAME"></span>
				</td>
			</tr>
			<tr>
				<th style="width:120px"><div id="S005"></div></th>
				<td colspan="5">
					<input type="text" id="S_REMARK" name="S_REMARK" style="width:99%" />
				</td>
				<th style="width:120px" id="lblTOTAL"></th>
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
						<th><div id="T001"></div></th><th><div id="T002"></div></th><th><div id="T003"></div></th><th><div id="T004"></div></th>
						<th><div id="T005"></div></th><th><div id="T006"></div></th><th><div id="T007"></div></th>
						<th><div id="T008"></div></th><th><div id="T009"></div></th>
					</tr>
				</thead>
				<tbody></tbody>
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
						    <%if(TAB != null) {%>
							<%
								int i=0,j=0;
								ListIterator m = TAB.listIterator();
								while(m.hasNext()) 	{

									Map item = (Map)m.next();
									String MENU_NAME = (String)item.get("TAB_NAME");
									String REMARK    = (String)item.get("REMARK");
									String CHECKED   = (String)item.get("CHECKED");
									String MENU_ID   = (String)item.get("TAB_ID");
									j++;
									if(REMARK.equals("CC")){
										if(CHECKED.equals("1")){ i++; 
											if(i == 1)
											{ %>
												<li class="tabs-selected"><a href="#tab-1"><%=i%>. <%=MENU_NAME%></a></li>
											<% }
											else { %>
												<li><a href="#tab-1"><%=i%>. <%=MENU_NAME%></a></li>
											<% }
										}
										else { %>
											<li class="hidden"><a href="#tab-1"><%=i%>. <%=MENU_NAME%></a></li>			
										<% } %>
									<% } else if(REMARK.equals("CH")) { %>						
										<% if(CHECKED.equals("1")){ i++;
											if(i == 1)
											{%>
												<li class="tabs-selected"><a href="#tab-6"><%=i%>. <%=MENU_NAME%></a></li>
											<%}
											else {%>
												<li><a href="#tab-6"><%=i%>. <%=MENU_NAME%></a></li>
											<% }
										}else {%>
											<li class="hidden"><a href="#tab-6"><%=i%>. <%=MENU_NAME%></a></li>			
										<%}
									}
								}
								%>
						    <%}%>
						</ul>
					</td>
					<td class="button">
						<input type="button" id="btnTemplate" name="btnTemplate" width="48px" height="24px" class="command">
						<input type="button" id="btnInsert" name="btnInsert" width="48px" height="24px" class="command">
						<input type="button" id="btnUpdate" name="btnUpdate" width="48px" height="24px" class="command">
						<input type="button" id="btnDelete" name="btnDelete" width="48px" height="24px" class="command">
					</td>
				</tr>
			</table>
			<div id="tab-1" class="tabs-selected">
				<table class="formTable" id="fromTable1">
					<tr>
						<th style="width:10%" id="lblEXPS_TYPE_ID"></th>
						<td style="width:50%" colspan="5">
							<jsp:setProperty name="cboExpsType" property="id" value="EXPS_TYPE_ID"/>
							<jsp:setProperty name="cboExpsType" property="isBlank" value="true"/>
							<jsp:getProperty name="cboExpsType" property="bindData" />
						</td>
						<th style="width:10%" id="lblVENDOR_CODE"></th>
						<td style="width:30%" colspan="3">
							<div id="divVENDOR_CODE1">
								<span id="lblVENDOR_CODE1" class="hidden"></span>
								<jsp:setProperty name="cboCard" property="id" value="VENDOR_CODE1"/>
								<jsp:setProperty name="cboCard" property="isBlank" value="true"/>
								<jsp:getProperty name="cboCard" property="bindData" />
							</div>
							<div id="divVENDOR_CODE2">
								<span id="lblVENDOR_CODE2" class="hidden"></span>
								<input type="hidden" id="validVENDOR_CODE2">
								<input type="text" id="VENDOR_CODE2" name="VENDOR_CODE" style="width:65px" maxlength="7"/>
								<input type="text" id="VENDOR_NAME2" name="VENDOR_NAME" style="width:140px" maxlength="40"/>
								<img id="btnPopupVndr" src="./theme/default/image/button/search.png" class="popup"/>
							</div>
							<div id="divVENDOR_CODE3">
								<span id="lblVENDOR_CODE3" class=hidden></span>
								<input type="hidden" id="validVENDOR_CODE3">
								<input type="text" id="VENDOR_CODE3" name="VENDOR_CODE" style="width:65px" maxlength="7"/>
								<input type="text" id="VENDOR_NAME3" name="VENDOR_NAME" style="width:140px" maxlength="40"/>
								<img id="btnPopupEmpl" src="./theme/default/image/button/search.png" class="popup"/>
							</div>
						</td>
					</tr>
					<tr>
						<th style="width:10%" id="lblTRANS_DATE"></th>
						<td style="width:10%">
							<input type="text" id="TRANS_DATE" name="TRANS_DATE" class=date maxlength="10"/>
						</td>
						<th style="width:10%" id="lblPAY_DUE_DATE"></th>
						<td style="width:10%">
							<input type="text" id="PAY_DUE_DATE" name="PAY_DUE_DATE" class=date maxlength="10"/>
						</td>
						<th style="width:10%" id="lblPAY_METHOD_TYPE"></th>
						<td style="width:10%">
							<jsp:setProperty name="cboPayMethod" property="id" value="PAY_METHOD_TYPE"/>
							<jsp:setProperty name="cboPayMethod" property="isBlank" value="true"/>
							<jsp:getProperty name="cboPayMethod" property="bindData" />
						</td>
						<th style="width:10%" id="lblCOMPANY_NAME"></th>
						<td colspan="3">
							<input type="text" id="COMPANY_NAME" name="COMPANY_NAME" style="width:99%" maxlength="40"/>
							<div id="divUSE_TYPE">
								<input type="radio" name="USE_TYPE" value="CH"><span id="B005" class="radio"></span>
								<input type="radio" name="USE_TYPE" value="CC"><span id="B006" class="radio"></span>
							</div>
						</td>
					</tr>
					<tr>
						<th id="lblREMARK"></th>
						<td colspan="5">
							<input type="text" id="REMARK" name="REMARK" style="width:80%" maxlength="40"/>
							&nbsp;<span id="byteREMARK">0</span> Bytes
						</td>
						<th style="width:10%" id="lblBUSI_NO"></th>
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
						<th id="lblTOTAL_AMT"><div id="S013"></div></th>
						<td colspan="5">
							<input type="text" id="TOTAL_AMT" name="TOTAL_AMT" class="labelLine number" maxlength="18"/>
						</td>
						<th style="width:10%" id="lblSUPPLY_AMT"></th>
						<td style="width:10%">
							<input type="text" id="SUPPLY_AMT" name="SUPPLY_AMT" style="width:99%" maxlength="18"/>
						</td>
						<th style="width:10%" id=lblVAT_AMT></th>
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
								<span id="lblDEPT_AMT1" class="title"></span>
								<input type="hidden" id="rowIndex1" name="rowIndex"/>
								<input type="text" id="DEPT_AMT1" name="DEPT_AMT" style="width:90px" maxlength="18"/> 
							</td>
							<td>
								<div id="divDEPT_CODE1">
									<span id="lblDEPT_CODE1" class="title"></span>
									<jsp:setProperty name="cboDept" property="id" value="DEPT_CODE1"/>
									<jsp:setProperty name="cboDept" property="isBlank" value="true"/>
									<jsp:getProperty name="cboDept" property="bindData" />
								</div>
							</td>
							<td>
								<div id="divCHNL_CODE1">
									<span id="lblCHNL_CODE1" class="title"></span>
									<jsp:setProperty name="cboChnl" property="id" value="CHNL_CODE1"/>
									<jsp:setProperty name="cboChnl" property="isBlank" value="true"/>
									<jsp:getProperty name="cboChnl" property="bindData" />
								</div>
							</td>
							<td>
								<div id="divASST_CODE1">
									<span id="lblASST_CODE1" class="title"></span>
									<jsp:setProperty name="cboAsst" property="id" value="ASST_CODE1"/>
									<jsp:setProperty name="cboAsst" property="isBlank" value="true"/>
									<jsp:getProperty name="cboAsst" property="bindData" />
								</div>
							</td>
							<td class="button">
								<input type="button" id="btnAdd1" name="btnAdd" width="48px" height="24px" class="command">
								<input type="button" id="btnEdit1" name="btnEdit"  width="48px" height="24px" class="command">
								<input type="button" id="btnRemove1" name="btnRemove" width="48px" height="24px" class="command">
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
								<th id="lblREMARK5"></th>
								<th class=hidden>부서코드</th><th id="lblREMARK7"></th>
								<th class=hidden>채널코드</th><th id="lblREMARK8"></th>
								<th class=hidden>자산코드</th><th id="lblREMARK9"></th>
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
						<th style="width:10%" id="lblTRANS_DATE2"></th>
						<td style="width:15%">
							<input type="text" id="TRANS_DATE2" name="TRANS_DATE2" class=date maxlength="10"/>
						</td>
						<th style="width:10%" id="lblPAY_DUE_DATE2"></th>
						<td style="width:15%">
							<input type="text" id="PAY_DUE_DATE2" name="PAY_DUE_DATE2" class=date maxlength="10"/>
						</td>
						<th style="width:10%" id="lblPAY_METHOD_TYPE2"></th>
						<td style="width:15%">
							<jsp:setProperty name="cboPayMethod" property="id" value="PAY_METHOD_TYPE2"/>
							<jsp:setProperty name="cboPayMethod" property="isBlank" value="true"/>
							<jsp:getProperty name="cboPayMethod" property="bindData" />
						</td>
						<th style="width:10%" id="lblDEBIT_TOTAL2"></th>
						<td style="width:80px">
							<input type="text" id="DEBIT_TOTAL2" name="DEBIT_TOTAL" class="labelLine number" maxlength="23" style="width:99%"/>
						</td>
					</tr>
					<tr>
						<th id="lblREMARK6"></th>
						<td colspan="5">
							<input type="text" id="REMARK6" name="REMARK" style="width:80%" maxlength="40"/>
							&nbsp;<span id="byteREMARK6">0</span> Bytes
						</td>
						<th id="lblCREDIT_TOTAL2"></th>
						<td style="width:80px">
							<input type="text" id="CREDIT_TOTAL2" name="CREDIT_TOTAL" class="labelLine number" maxlength="23" style="width:99%"/>
						</td>
					</tr>
				</table>
				<table id="deptForm2" style="width:100%">
					<thead>
						<tr>
							<td>
								<span id="lblACCT_CODE2" class="title"></span>
								<input type="hidden" id="rowIndex2" name="rowIndex"/>
								<input type="hidden" id="validACCT_CODE2">
								<input type="text" id="ACCT_CODE2" name="ACCT_CODE" style="width:65px" maxlength="7"/><input type="text" id="ACCT_NAME2" name="ACCT_NAME" style="width:150px" maxlength="40"/>
								<img id="btnPopupAcct" src="./theme/default/image/button/search.png" class="popup"/>
							</td>
							<td>
								<span id="lblDEPT_AMT2" class="title"></span>
								<input type="text" id="DEPT_AMT2" name="DEPT_AMT" style="width:90px" maxlength="18"/> 
								<span id="lblDRCR_TYPE2" class="hidden">차대구분</span>
								<select id="DRCR_TYPE2" name="DRCR_TYPE">
									<option value="">--Selecte--</option>
									<option value="D">Credit</option>
									<option value="C">Debit</option>
								</select>
							</td>
							<td>
								<div id="divDEPT_CODE2">
									<span id="lblDEPT_CODE2" class="title"></span>
									<jsp:setProperty name="cboDept" property="id" value="DEPT_CODE2"/>
									<jsp:setProperty name="cboDept" property="isBlank" value="true"/>
									<jsp:getProperty name="cboDept" property="bindData" />
								</div>
							</td>
							<td>
								<div id="divCHNL_CODE2">
									<span id="lblCHNL_CODE2" class="title"></span>
									<jsp:setProperty name="cboChnl" property="id" value="CHNL_CODE2"/>
									<jsp:setProperty name="cboChnl" property="isBlank" value="true"/>
									<jsp:getProperty name="cboChnl" property="bindData" />
								</div>
							</td>
							<td class="button">
								<input type="button" id="btnAdd2" name="btnAdd" width="48px" height="24px" class="command">
								<input type="button" id="btnEdit2" name="btnEdit" width="48px" height="24px" class="command">
								<input type="button" id="btnRemove2" name="btnRemove" width="48px" height="24px" class="command">
							</td>
						</tr>
						<tr>
							<td colspan="5">
								<div id="divPRD_CODE2" style="display:inline">
									<span id="lblPRD_CODE2" class="title"></span>
									<jsp:setProperty name="cboPrd" property="id" value="PRD_CODE2"/>
									<jsp:setProperty name="cboPrd" property="isBlank" value="true"/>
									<jsp:getProperty name="cboPrd" property="bindData" />
								</div>
								<div id="divAFS_TYPE2" style="display:inline">
									<span id="lblAFS_TYPE2" class="title"></span>
									<jsp:setProperty name="cboAfs" property="id" value="AFS_TYPE2"/>
									<jsp:setProperty name="cboAfs" property="isBlank" value="true"/>
									<jsp:getProperty name="cboAfs" property="bindData" />
								</div>
								<div id="divSUP_CODE2" style="display:inline">
									<span id="lblSUP_CODE2" class="title"></span>
									<jsp:setProperty name="cboSup" property="id" value="SUP_CODE2"/>
									<jsp:setProperty name="cboSup" property="isBlank" value="true"/>
									<jsp:getProperty name="cboSup" property="bindData" />
								</div>
								<div id="divVAT_TYPE2" style="display:inline">
									<span id="lblVAT_TYPE2" class="title"></span>
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
								<th><div id="T013"></div></th><th><div id="T014"></div></th><th><div id="T015"></div></th><th><div id="T016"></div></th>
								<th><div id="T017"></div></th><th><div id="T018"></div></th><th><div id="T011"></div></th><th class=hidden></th>
								<th><div id="T019"></div></th><th><div id="T020"></div></th><th class=hidden></th><th><div id="T021"></div></th>
								<th class=hidden></th><th class=hidden></th>
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
</html>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       