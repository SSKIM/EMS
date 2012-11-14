<%@ page language="java" contentType="text/xml; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.mindtree.framework.util.CommonUtil,java.sql.*,com.mindtree.framework.db.ConnectionManager" %><%

	String procedure = (String)CommonUtil.getParameter(request,"PROCEDURE");
	String parameter = (String)CommonUtil.getParameter(request,"PARAMETER");

	String[] param = parameter.split("\\|");

	StringBuffer sb = new StringBuffer();
	if(parameter==null || parameter.length()==0) {
	} else if(param.length==1){
		sb.append("?");
	} else {
		for(int i=0; i<param.length; i++) {
			if(i>0) sb.append(",");
			sb.append("?");
		}
	}

	Connection        conn = null;
	CallableStatement stmt = null;
	ResultSet         rset = null;
	ResultSetMetaData rsmd = null;

	int cnt = 0;
	response.setContentType("text/xml;charset=UTF-8");

	StringBuffer sbXml = new StringBuffer();
	//sbXml.append("<?xml version='1.0' encoding='UTF-8'?>");
	try {		
		conn = new ConnectionManager().getConnection();

		stmt = conn.prepareCall("{call "+procedure+"("+sb.toString()+")}");

		if(parameter==null || parameter.length()==0) {
		} else {
			for(int i=0; i<param.length; i++) {
				stmt.setObject(i+1, parameter);
			}
		}

		stmt.execute();

		rset = stmt.getResultSet();
		rsmd = rset.getMetaData();

		int nColumnCount = rsmd.getColumnCount();
		sbXml.append("<rexdataset>");

		while(rset.next()) {
			cnt = 1;
			sbXml.append("<rexrow>");
			for (int j = 1; j <= nColumnCount; j++) {
					sbXml.append("<" + rsmd.getColumnName(j).trim()+ ">");
					sbXml.append("<![CDATA["+ (rset.getString(j) == null ? "" : rset.getString(j)) + "]]>");
					sbXml.append("</" + rsmd.getColumnName(j).trim()+ ">");
			}
			sbXml.append("</rexrow>");
		}
		sbXml.append("</rexdataset>");

		out.print(sbXml.toString());
	} catch(Exception e) {
		out.print("<rexdataset><rexrow></rexrow></rexdataset>");
	} finally {
		try {
			rset.close();
			stmt.close();
			conn.close();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
%>