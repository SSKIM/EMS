<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,java.math.BigDecimal,java.util.Date"%>
<%@ page import="com.mindtree.framework.util.CommonUtil" %>
<%@ page import="java.util.*" %>
<%@ page import="com.das.fms.vo.UserVO"%>
<%
	UserVO _userSession3 = (UserVO)CommonUtil.getUserSession(request);
	String Lan_type = _userSession3.getLantype();
	
	Locale objLcl=request.getLocale();
	ResourceBundle objRb = null;
	
	if(Lan_type.equals("KR"))
	{
		objRb=ResourceBundle.getBundle("message_ko",objLcl);
	}
	else if(Lan_type.equals("EN"))
	{
		objRb=ResourceBundle.getBundle("message_en",objLcl);
	}
	
	String theme       = getServletContext().getInitParameter("theme");
	String contextPath = request.getContextPath();
%>
		<title>EMS SYSTEM</title>
		<meta http-equiv="Content-Type"  content="text/html; charset=UTF-8"/>
		<meta http-equiv="Cache-Control" content="no-cache"/>
		<meta http-equiv="Expires"       content="0"/>
		<meta http-equiv="Pragma"        content="no-cache"/>

		<link type="image/gif" rel="shortcut icon" href="<%=contextPath%>/theme/<%=theme%>/icon/favicon.gif"></link>
		<link type="text/css"  rel="stylesheet"    href="<%=contextPath%>/theme/<%=theme%>/css/default.css"/>
		<link type="text/css"  rel="stylesheet"    href="<%=contextPath%>/theme/<%=theme%>/css/table.css"/>
		<link type="text/css"  rel="stylesheet"    href="<%=contextPath%>/theme/<%=theme%>/css/tree.css"/>
		<link type="text/css"  rel="stylesheet"    href="<%=contextPath%>/theme/<%=theme%>/css/jquery-ui-1.8.1.custom.css"/>
		<link type="text/css"  rel="stylesheet"    href="<%=contextPath%>/theme/<%=theme%>/css/msgBoxLight.css">
		
		<script type="text/javascript" src="<%=contextPath%>/common/js/default.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/common/js/validate.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/common/js/popup.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/common/js/tree.js"></script>
		
		<script type="text/javascript" src="<%=contextPath%>/component/jquery/jquery-1.4.1.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/component/jquery/jquery.msgBox.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/component/jquery/jquery.form.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/component/jquery/jquery.maskedinput-1.2.2.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/component/jquery/jquery-ui.min.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/component/jquery/jquery.tablesorter.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/component/jquery/jquery.ui.datepicker-ko.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/component/jquery/jquery.xslt.js"></script>
		
		
	    <script type="text/javascript">
	    	$(document).ready(function() {
				$(".loading").bind("ajaxSend", function(){
					//$(this).show();
					$("div.status").html("doing...");
					$("#tree1").empty(); $("#output").hide();
				}).bind("ajaxComplete", function(){
					$(this).hide();
				});
				$(".loading").hide();
				$("div.status").bind('click',function(){
					$("#output").show();
				});
				$("#output").bind('dblclick',function(){ $("div#output").hide(); });
				$("#lblClose").bind('click',function(){ $("div#output").hide(); });
				$.datepicker.setDefaults($.datepicker.regional['ko']);
				$.datepicker.setDefaults({dateFormat:'yy-mm-dd'}); 
				$("#statusTable").css("top",$(window).height()-24).css("left",0);
			});
			var I001 = "<%=objRb.getString("I001")%>";
			var I002 = "<%=objRb.getString("I002")%>";
			var I003 = "<%=objRb.getString("I003")%>";
			var W001 = "<%=objRb.getString("W001")%>";
			var W002 = "<%=objRb.getString("W002")%>";
			var W003 = "<%=objRb.getString("W003")%>";
			var W004 = "<%=objRb.getString("W004")%>";
			var W005 = "<%=objRb.getString("W005")%>";
			var W006 = "<%=objRb.getString("W006")%>";
			var W007 = "<%=objRb.getString("W007")%>";
			var W008 = "<%=objRb.getString("W008")%>";
			var W009 = "<%=objRb.getString("W009")%>";
			var W010 = "<%=objRb.getString("W010")%>";
			var W011 = "<%=objRb.getString("W011")%>";
			var W012 = "<%=objRb.getString("W012")%>";
			var W013 = "<%=objRb.getString("W013")%>";
			var W014 = "<%=objRb.getString("W014")%>";
			var W015 = "<%=objRb.getString("W015")%>";
			var W016 = "<%=objRb.getString("W016")%>";
			var W017 = "<%=objRb.getString("W017")%>";
			var W018 = "<%=objRb.getString("W018")%>";
			var W019 = "<%=objRb.getString("W019")%>";
			var W020 = "<%=objRb.getString("W020")%>";
			var W021 = "<%=objRb.getString("W021")%>";
			var W022 = "<%=objRb.getString("W022")%>";
			var W023 = "<%=objRb.getString("W023")%>";
		</script>
