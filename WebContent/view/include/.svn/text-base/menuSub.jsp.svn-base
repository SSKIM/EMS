<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,java.util.Iterator"%>
<%@ page import="com.mindtree.framework.util.CommonUtil" %>
<%
	Map resultSet2 = CommonUtil.getResultSet(request);
	List   menuSub = (List)resultSet2.get("MENU_SUB");
	if(menuSub!=null) {
%>
<table border="0" cellpadding="0" cellspacing="0" class="leftMenu" id="leftMenu">
<%		String tableRowId = "leftMenuRow";
		for(int i=0; i<menuSub.size(); i++) {
		    Map<String,Object> item = (Map<String,Object>)menuSub.get(i);
		    String menuId    = (String)item.get("MENU_ID");
		    String menuName  = (String)item.get("MENU_NAME");
		    String menuType  = (String)item.get("MENU_TYPE");
		    String menuUrl   = (String)item.get("MENU_URL");
		    String screenId  = (String)item.get("SCREEN_ID");
		    String menuRef   = (String)item.get("MENU_REF");
		    int    menuLevel = CommonUtil.getInt(item.get("MENU_LEVEL"));
		    String menuType2 = ("S".equals(menuType)) ? menuId : "_"+menuRef;
		    if(i==0) {
%>
	<tr><th height="55" align="center" class="title" style="background-color:#fff">[ <%=menuName%> ]</th></tr>
	<tr class="line"><td></td></tr>
<%			} else {
				if(menuLevel < 3) {
%>
	<tr class="line"><td></td></tr>
	<tr id="<%=tableRowId+"_"+i%>" name=<%=menuType2%> class=<%=menuType%>>
<%					if("S".equals(menuType)) {%>
		<td style="padding-left:<%=((menuLevel-1)*10)%>px">
			<span style="font-size:13px"><%=menuName%></span><span id="EXT_<%=menuId%>">-</span>
		</td>
<%					} else {%>

		<td style="padding-left:<%=((menuLevel-1)*10)%>px" onClick="goLink('<%=menuUrl%>','menuId=<%=menuId%>&screenId=<%=screenId%>','F','<%=menuName%>');">
			<span style="font-size:13px"><%=menuName%></span>
		</td>
<%					}%>
	</tr>
<%				} else {%>
	<tr id="<%=tableRowId+"_"+i%>" name=<%=menuType2%> class=<%=menuType%>>
<%					if("S".equals(menuType)) {%>
		<td style="padding-left:<%=((menuLevel-1)*10)%>px">
	   		<%=menuName%><span id="EXT_<%=menuId%>">-</span>
		</td>
<%					} else {%>
		<td style="padding-left:<%=((menuLevel-1)*10)%>px" onClick="goLink('<%=menuUrl%>','menuId=<%=menuId%>&screenId=<%=screenId%>','F','<%=menuName%>')">
				    	<%=menuName%>
		</td>
<%					}%>
	</tr>
<%
				}
			}
		}
%>
	<tr class="line"><td></td></tr>
</table>
<%	}%>
