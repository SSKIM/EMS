<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.das.fms.vo.UserVO"%>
<%
	UserVO _userSession2 = (UserVO)CommonUtil.getUserSession(request);
	String theme3        = getServletContext().getInitParameter("theme");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript">
			//parent.window.resizeTo(1024,768);
			//parent.window.moveTo(0,0);
			$(document).ready(function(){
				$("#G_BUSI_UNIT_TYPE").val("<%=_userSession2.getBusiUnitType()%>");
				$("#G_LEDGER_TYPE").val("<%=_userSession2.getLedgerType()%>");
				$("#G_BUSI_UNIT_TYPE").change(ChangePostingOption);
				$("#G_LEDGER_TYPE").change(ChangePostingOption);
			});
			function ChangePostingOption() {
				var action = "index.do?method=ChangePostingOption";
				var data   = "&BUSI_UNIT_TYPE="+$("#G_BUSI_UNIT_TYPE").val()
				               + "&LEDGER_TYPE="+$("#G_LEDGER_TYPE").val();

			//	parent.document.location.href = action+data;
				goLink(action,data,'T');
			}
			
		</script>
	</head>
		<%@ include file="../include/menu.jsp" %>
	</body>
</html>
