<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,java.math.BigDecimal,java.util.Date"%>
<%@ page import="com.mindtree.framework.util.CommonUtil" %>
<%
	String theme       = getServletContext().getInitParameter("theme");
	String contextPath = request.getContextPath();
%>
		<title>다스법률비용보험(주) 전표관리 시스템</title>
		<meta http-equiv="Content-Type"  content="text/html; charset=UTF-8">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Expires"       content="0">
		<meta http-equiv="Pragma"        content="no-cache">

		<link type="image/gif" rel="shortcut icon" href="<%=contextPath%>/theme/<%=theme%>/icon/favicon.gif"></link>
		<link type="text/css"  rel="stylesheet"    href="<%=contextPath%>/theme/<%=theme%>/css/default.css"/>
		<link type="text/css"  rel="stylesheet"    href="<%=contextPath%>/theme/<%=theme%>/css/table.css"/>
		<link type="text/css"  rel="stylesheet"    href="<%=contextPath%>/theme/<%=theme%>/css/tree.css"/>
		<link type="text/css"  rel="stylesheet"    href="<%=contextPath%>/theme/<%=theme%>/css/jquery-ui-1.8.1.custom.css"/>

		<script type="text/javascript" src="<%=contextPath%>/common/js/default.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/common/js/validate.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/common/js/popup.js"></script>
		<script type="text/javascript" src="<%=contextPath%>/common/js/tree.js"></script>

		<script type="text/javascript" src="<%=contextPath%>/component/jquery/jquery-1.4.2.js"></script>
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
			var W001 = "<%=CommonUtil.getMessage(request,"W001")%>"; //필수 항목을 입력해주세요!
			var W002 = "<%=CommonUtil.getMessage(request,"W002")%>"; //정말 삭제하시겠습니까?
			var W003 = "<%=CommonUtil.getMessage(request,"W003")%>"; //먼저 해당 데이터를 선택해 주세요!
			var I001 = "<%=CommonUtil.getMessage(request,"I001")%>"; //데이터가 존재하지 않습니다.
			var I002 = "<%=CommonUtil.getMessage(request,"I002")%>"; //조회 되었습니다.
			var I003 = "<%=CommonUtil.getMessage(request,"I003")%>"; //처리 되었습니다.
		</script>
