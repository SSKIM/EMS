<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,java.util.Iterator"%>
<%@ page import="com.mindtree.framework.util.CommonUtil" %>
<%
	Map resultSet2 = CommonUtil.getResultSet(request);
	List   menuSub = (List)resultSet2.get("MENU_SUB");
	if(menuSub!=null) {
%>
<table width="200" border="0" cellpadding="0" cellspacing="0">
<%
		for(int i=0; i<menuSub.size(); i++) {
		    Map<String,Object> item = (Map<String,Object>)menuSub.get(i);
		    String menuId    = (String)item.get("MENU_ID");
		    String menuName  = (String)item.get("MENU_NAME");
		    String menuType  = (String)item.get("MENU_TYPE");
		    String menuUrl   = (String)item.get("MENU_URL");
		    String screenId  = (String)item.get("SCREEN_ID");
		    int    menuLevel = CommonUtil.getInt(item.get("MENU_LEVEL"));
		    
		    if(i==0) {
%>
  <tr>
    <td height="55" align="center"><img src="./theme/default/image/menu/menusub<%=menuId%>.gif" width="200" height="45"></td>
  </tr>
  <tr>
    <td height="1" bgcolor="#e8e8e8"></td>
  </tr>
<%			} else {
				if(menuLevel == 2) {
%>
  <tr>
    <td height="1" bgcolor="#e8e8e8"></td>
  </tr>
  <tr>
    <td align="center">
<%					if("S".equals(menuType)) {%>
		<img src="./theme/default/image/menu/menusub<%=menuId%>.gif" width="179" height="22" onMouseOver="imgFlip(this,'over')" onMouseOut="imgFlip(this,'out')">
<%					} else {%>

		<img src="./theme/default/image/menu/menusub<%=menuId%>.gif" width="179" height="22" onMouseOver="imgFlip(this,'over')" onMouseOut="imgFlip(this,'out')" onClick="imgFlip(this,'on','menusub'); goLink('<%=menuUrl%>','menuId=<%=menuId%>&screenId=<%=screenId%>','F','<%=menuName%>');" name="menusub" id="menusub<%=menuId%>" style="cursor:pointer">
<%					}%>
    </td>
  </tr>
<%				} else {%>
  <tr>
    <td align="center">
<%					if("S".equals(menuType)) {%>
    <img src="./theme/default/image/menu/menusub<%=menuId%>.gif" width="179" height="22" onMouseOver="imgFlip(this,'over')" onMouseOut="imgFlip(this,'out')">
<%					} else {%>
    <img src="./theme/default/image/menu/menusub<%=menuId%>.gif" width="179" height="22" onMouseOver="imgFlip(this,'over')" onMouseOut="imgFlip(this,'out')" onClick="imgFlip(this,'on','menusub'); goLink('<%=menuUrl%>','menuId=<%=menuId%>&screenId=<%=screenId%>','F','<%=menuName%>')" name="menusub" id="menusub<%=menuId%>" style="cursor:pointer">
<%}%>
	</td>
  </tr>
<%
				}
			}
		}
%>
  <tr>
    <td height="1" bgcolor="#e8e8e8"></td>
  </tr>
</table>
<%	}%>
