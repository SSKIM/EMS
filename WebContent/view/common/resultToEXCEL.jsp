<%@ page language="java" contentType="application/vnd.ms-excel; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List,java.util.Map,java.util.Map.Entry"%>
<%@ page import="com.mindtree.framework.util.CommonUtil" %>
<%
	Map     resultSet = CommonUtil.getResultSet(request);
	List    dataList  = (List)resultSet.get("dataList");
	String  columns   = (String)CommonUtil.getParameter(request,"COLUMNS"); 
%>
<html> 
	<head>
		<title>User Details</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	</head> 
	<body> 
		<%=CommonUtil.getResultHTML(resultSet, columns)%>
	</body> 
</html>
<%CommonUtil.clearAttribute(request);%>