<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil"%>
<%@ page import="com.mindtree.framework.util.CommonUtil"%>
<%@ page import="com.das.fms.vo.UserVO"%>
<%
	UserVO _userSession2 = (UserVO)CommonUtil.getUserSession(request);
	String theme2       = getServletContext().getInitParameter("theme");
	Map resultSet = CommonUtil.getResultSet(request);
	List menu = null, busiUnitType = null, ledgerType = null, buttonList = null;
	if(resultSet!=null) {
		buttonList = (List)resultSet.get("BUTTON_LIST");
		menu         = (List)resultSet.get("MENU_TOP");
		busiUnitType = (List)resultSet.get("BUSI_UNIT_TYPE_LIST");
		ledgerType   = (List)resultSet.get("LEDGER_TYPE_LIST");
	}
	String busiUnitDisplay = "none";
	busiUnitDisplay = "inline";
%>
<jsp:useBean id="cboBusiUnitType2" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboBusiUnitType2" property="dataSource" value="<%=busiUnitType%>"/>
<jsp:useBean id="cboLedgerType2" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboLedgerType2" property="dataSource" value="<%=ledgerType%>"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript">
			//parent.window.resizeTo(1024,768);
			//parent.window.moveTo(0,0);
			$(document).ready(function(){
				display("#btnComplete",true);
				$("#btnComplete").click(ChangePostingOption);
				
				$("#G_BUSI_UNIT_TYPE").val("<%=_userSession2.getBusiUnitType()%>");
				$("#G_LEDGER_TYPE").val("<%=_userSession2.getLedgerType()%>");
			});
			function ChangePostingOption() {
				var action = "index.do?method=ChangePostingOption";
				var data   = "&BUSI_UNIT_TYPE="+$("#G_BUSI_UNIT_TYPE").val()
				               + "&LEDGER_TYPE="+$("#G_LEDGER_TYPE").val();

			//	parent.document.location.href = action+data;
				goLink(action,data,'R');
			}
		</script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table style="width:40%" border="0" cellspacing="0" cellpadding="0"  class="searchTable" >
  			<tr>
  			<th style="width:40%">Business Unit / Ledger :</th>
    			<td  style="width:60%" height="35" colspan="4" align="left">
					<jsp:setProperty name="cboBusiUnitType2" property="id" value="G_BUSI_UNIT_TYPE"/>
					<jsp:getProperty name="cboBusiUnitType2" property="bindData" />
					<jsp:setProperty name="cboLedgerType2"   property="id" value="G_LEDGER_TYPE"/>
					<jsp:getProperty name="cboLedgerType2"   property="bindData" />
 			   	</td>
 			 </tr>
 		</table>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>