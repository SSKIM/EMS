<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,com.mindtree.framework.util.GLOBAL"%>
<%@ page import="com.mindtree.framework.util.CommonUtil" %>
<%  Map    resultSet    = CommonUtil.getResultSet(request);
    String errorCode    = (String)CommonUtil.getParameter(request, GLOBAL.RETURN_CODE);
    String errorMessage = (String)CommonUtil.getParameter(request, GLOBAL.RETURN_MESSAGE);
%>
<RESULT>
<%if(CommonUtil.nullOrEmpty(errorCode)) {%>
	<MESSAGE>Success!</MESSAGE>
<%} else {%>
    <MESSAGE><%=CommonUtil.nvl(errorMessage)%></MESSAGE>
<%}%>
</RESULT>