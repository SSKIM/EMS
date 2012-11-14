<?xml version="1.0" encoding="UTF-8"?>
<%@ page language="java" contentType="text/xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,com.mindtree.framework.util.CommonUtil,com.mindtree.framework.util.GLOBAL" %>
<%  Map    resultSet    = CommonUtil.getResultSet(request);
	String errorCode    = (String)CommonUtil.getParameter(request, GLOBAL.RETURN_CODE);
	String errorMessage = (String)CommonUtil.getParameter(request, GLOBAL.RETURN_MESSAGE);
	String errorDetail  = (String)CommonUtil.getParameter(request, GLOBAL.RETURN_DETAIL);
%>
<RESULT>
	<RETURN_CODE><%=CommonUtil.nvl(errorCode)%></RETURN_CODE>
	<RETURN_MESSAGE><%=CommonUtil.nvl(errorMessage)%></RETURN_MESSAGE>
	<RETURN_DETAIL><%=CommonUtil.nvl(errorDetail)%></RETURN_DETAIL>
	
	<DATA>
	<%=CommonUtil.getResultXML(resultSet)%>
	</DATA>
	
</RESULT>
<%CommonUtil.clearAttribute(request);%>