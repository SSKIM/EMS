<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,java.util.ListIterator,java.math.BigDecimal,java.util.Locale"%>
<%@ page import="com.mindtree.framework.util.CommonUtil"%>
<%@ page import="com.das.fms.vo.UserVO"%>
<%@ page import="java.util.Locale "%>
<%
	UserVO _userSession = (UserVO)CommonUtil.getUserSession(request);
	String theme2       = getServletContext().getInitParameter("theme");
	Map resultSet = CommonUtil.getResultSet(request);
	List menu = null, busiUnitType = null, ledgerType = null;
	if(resultSet!=null) {
		menu         = (List)resultSet.get("MENU_TOP");
		busiUnitType = (List)resultSet.get("BUSI_UNIT_TYPE_LIST");
		ledgerType   = (List)resultSet.get("LEDGER_TYPE_LIST");
	}
	String busiUnitDisplay = "none";
	if("DM2".equals(_userSession.getDeptCode())) busiUnitDisplay = "inline";
%>
<jsp:useBean id="cboBusiUnitType" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboBusiUnitType" property="dataSource" value="<%=busiUnitType%>"/>
<jsp:useBean id="cboLedgerType" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:setProperty name="cboLedgerType" property="dataSource" value="<%=ledgerType%>"/>
<table style="width:100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="50" valign="top" style="background-color:#232323"></td>
    <%if(menu != null) {%>
	<%
		ListIterator m = menu.listIterator();
		while(m.hasNext()) 	{	
			Map item = (Map)m.next();	
			String MENU_ID   = (String)item.get("MENU_ID");
			String MENU_NAME = (String)item.get("MENU_NAME");
			String MENU_URL  = (String)item.get("MENU_URL");
			String SCREEN_ID = (String)item.get("SCREEN_ID");
			if(CommonUtil.nullOrEmpty(MENU_URL.trim())) {
	%>			<td width="200" height="22" align=left style="background-color:#232323"><label for="<%=MENU_ID%>" onMouseOver="this.style.color='#FFFFFF'" onMouseOut="this.style.color='#BDBDBD'"></td>
	<%		} else {%>
				<td width="200" height="22" align=left style="background-color:#232323"><label for="<%=MENU_ID%>" onMouseOver="this.style.color='#FFFFFF'" onMouseOut="this.style.color='#BDBDBD'" onClick="goLink('<%=MENU_URL%>','menuId=<%=MENU_ID%>&screenId=<%=SCREEN_ID%>','L');" style="cursor:pointer;font-weight:bold;font-size:14px;font-color:#8C8C8C;background-color:#232323"><%=MENU_NAME %></label></td>
	<%		}
	}
	%>
	<%}%>
	<td valign="top" style="background-color:#232323"></td>
  </tr>
  <tr style="background-color:#F8F8F8">
    <td width="100" height="61" align="center" background="./theme/<%=theme2%>/image/menu/top_bg2.gif"><a href="javascript:goLink('index.do','','T')"><img src="./theme/<%=theme2%>/image/menu/logo.gif" width="160" height="45"></a></td>
    <td class="hidden" height="35" colspan="4" align="right" background="./theme/<%=theme2%>/image/menu/top_bg.gif">
    	<div style="display:<%=busiUnitDisplay%>" >
			Business Unit / Ledger : 
			<jsp:setProperty name="cboBusiUnitType" property="id" value="G_BUSI_UNIT_TYPE"/>
			<jsp:getProperty name="cboBusiUnitType" property="bindData" />
			<jsp:setProperty name="cboLedgerType"   property="id" value="G_LEDGER_TYPE"/>
			<jsp:getProperty name="cboLedgerType"   property="bindData" />
		</div>
    </td>
    <td height="35" width="100%" colspan="4" align="right" background="./theme/<%=theme2%>/image/menu/top_bg2.gif">
    	<%if(CommonUtil.isLogin(request)) {%>
        <img src="./theme/<%=theme2%>/icon/logout.gif" width="14" height="15" align="absmiddle">
        <a href="javascript:goLink('index.do?method=logout','','T')">Logout</a>&nbsp;&nbsp;
        <%} else {%>
        <a href="javascript:goLink('index.do?method=loginForm','','T')">Login</a>&nbsp;&nbsp;
        <%}%>
        <img src="./theme/<%=theme2%>/icon/user_info.gif" width="16" height="15" align="absmiddle">
        <a href="javascript:goLink('index.do?method=userEdit','screenId=EB020','L','개인정보변경')">User Profile&nbsp;&nbsp;&nbsp;&nbsp;</a>
	</td>
  </tr>
</table>
