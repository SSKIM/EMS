<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.mindtree.framework.util.CommonUtil" %>
<%
	String menuId    = (String)CommonUtil.nvl(CommonUtil.getParameter(request,"menuId")); 
	String menuSubId = (String)CommonUtil.nvl(CommonUtil.getParameter(request,"menuSubId")); 
	String screenId  = (String)CommonUtil.nvl(CommonUtil.getParameter(request,"screenId")); 
	String method2   = (String)CommonUtil.nvl(CommonUtil.getParameter(request,"method2")); 
	String jrnlNo    = (String)CommonUtil.nvl(CommonUtil.getParameter(request,"JRNL_NO")); 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<HTML>
    <HEAD>
        <FRAMESET cols="160,*" frameborder="no">
            <FRAME id="fleft" name="fleft" src="index.do?method=menuLeft&menuId=<%=menuId%>&menuSubId=<%=menuSubId%>" scrolling="no" noresize="noresize">
            <%if(CommonUtil.nullOrEmpty(screenId)) {%>
            <FRAME id="fmain" name="fmain" src="./view/common/blank.jsp" scrolling="no">
            <%} else {%>
            <FRAME id="fmain" name="fmain" src="<%=method2%>?method=<%=screenId%>&screenId=<%=screenId%>&JRNL_NO=<%=jrnlNo%>" scrolling="no">
            <%} %>
        </FRAMESET>
    </HEAD>
</HTML>