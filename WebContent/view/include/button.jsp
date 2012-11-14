<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil"%>
<jsp:useBean id="button" class="com.mindtree.framework.control.Button" scope="page"/>
<%
	List buttonListB = null;
	Map resultSetB = CommonUtil.getResultSet(request);
	if(resultSetB != null) {
		buttonListB = (List)resultSetB.get("BUTTON_LIST");
	}
	String screenIdB = request.getParameter("screenId");
	String menuNameB = request.getParameter("menuName");
	String title     = "";//CommonUtil.getTitle(CommonUtil.getString(menuNameB),screenIdB);
	String isPopup   = request.getParameter("isPopup");
%>
<script type="text/javascript">
	$(document).ready(function() {
		get_random_color();
	});
	
	function get_random_color() {
       var letters = '0123456789ABCDEF'.split('');
       var color = '#';
       for (var i = 0; i < 6; i++ ) {
           color += letters[Math.round(Math.random() * 15)];
       }
       document.getElementById('div1').style.backgroundColor = color;
    }
</script>
		<div class="loading"></div><img class="loading" src="<%=request.getContextPath()%>/theme/default/image/main/loading.gif"/>
		<table class="titleTable" id="titleTable">
			<tr>
				<td><span style="width:20px;hieght:10px;" id="div1">&nbsp;&nbsp;&nbsp;&nbsp;</span><font color=#ffffff></font><b>&nbsp;<%=menuNameB%></b> - [<%=screenIdB%>]</td>
				<td class="button">
					<jsp:setProperty name="button" property="buttonGroup" value="1"/>
					<jsp:setProperty name="button" property="dataSource" value="<%=buttonListB%>"/>
					<jsp:getProperty name="button" property="dataBind" />
					<%if("true".equals(isPopup)) { %>
						<%if(!screenIdB.equals("AC011")){ %>
						<input type="button" id="btnInit" value="초기화" class="command"/>
						<input type="button" id="btnClose" value="닫기" class="command"/>
						<%}else {%>
						<%} %>
					<%}%>
				</td>
			</tr>
		</table>