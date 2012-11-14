<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List,java.util.Map,com.mindtree.framework.util.CommonUtil" %>
<%
	String filename = CommonUtil.getFileName("UnRealized Inquiry","xls");
	response.setHeader("Content-Disposition","attachment; filename=\""+filename+"\";");
	
	List bodyList = null;
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet!=null) {
		bodyList = (List)resultSet.get("BODY_LIST");
	}
%>
<html> 
	<head>
		<title>Realized Inquiry</title>
		<META http-equiv="Cache-Control" content="max-age=0">
		<META http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="expires"       content="0">
		<META http-equiv="Expires"       content="Tue, 01 Jan 1980 1:00:00 GMT">
		<META http-equiv="Pragma"        content="no-cache">
		<style type="text/css">
			table.excelTable {
				border-collapse: collapse;
			}
			table.excelTable thead tr th {
				border-collapse: collapse;
				background-color: #f4f4f4;
				text-align: center;
				font-weight: bold;
				height: 21px;
				border-left-style: none;
			}
			table.excelTable tbody tr td {
				border-collapse: collapse;
				background-color: #ffffff;
				border-top-style: none;
				border-left-style: none;
				height: 21px;
				mso-number-format:\@;
			}
		</style>
	</head> 
	<body> 
        <table class="excelTable" cellpadding=0 cellspacing=0>
        	<colgroup>
				<col width="40px"/><col width="40px"/><col width="200px"/><col width="60px"/><col width="70px"/><col width="30px"/><col width="50px"/><col width="50px"/><col width="50px"/>
	     	</colgroup>
			<thead>
				<tr>
					<th><nobr>Acct Code</nobr></th>
					<th><nobr>Tr. Date</nobr></th>
					<th><nobr>Description</nobr></th>
					<th><nobr>TSC Deal Code</nobr></th>
					<th><nobr>USD</nobr></th>
					<th><nobr>Initial FX</nobr></th>
					<th><nobr>Initial Price(KRW)</nobr></th>
					<th><nobr>Unealized(KRW)</nobr></th>
					<th><nobr>Trade Date</nobr></th>
					<th><nobr>Value Date</nobr></th>
					<th><nobr>Maturity Date</nobr></th>
					<th><nobr>Counterparty</nobr></th>
					<th><nobr>Primary/Secondary</nobr></th>
					<th><nobr>Price/Yield</nobr></th>
					<th><nobr>Nominal</nobr></th>
					<th><nobr>VA(USD)</nobr></th>
					<th><nobr>PC(USD)</nobr></th>
					<th><nobr>TSC(USD)</nobr></th>
					<th><nobr>TSC(CCY)</nobr></th>
					<th><nobr>Treats Security ID</nobr></th>
					<th><nobr>Security ID</nobr></th>
					<th><nobr>Journal No.</nobr></th>
				</tr>
			</thead>
			<tbody>
			<%
				if(bodyList!=null) {
	    	        for(int i=0; i<bodyList.size(); i++) {
	    	        	Map<String,Object> rowData = (Map<String,Object>)bodyList.get(i);
		     %>
    	        	<tr>
		              <td align=center><%=rowData.get("ACCNT_CODE")%></td>
		              <td align=center><%=rowData.get("TRANS_DATETIME")%></td>
		              <td align=left><%=rowData.get("DESCRIPTN")%></td>
		              <td align=left><%=rowData.get("TSC_DEAL")%></td>
		              <td align=right><%=rowData.get("USD")%></td>
		              <td align=right><%=rowData.get("INITIAL_RATE")%></td>
		              <td align=right><%=rowData.get("INITAL_KRW")%></td>
		              <td align=right><%=rowData.get("UNREALIZED_KRW")%></td>
					  <td align=center><%=rowData.get("TRADE_DATE")%></td>
                	  <td align=center><%=rowData.get("VALUE_DATE")%></td>
                	  <td align=center><%=rowData.get("MATURITY_DATE")%></td>
                	  <td align=left><%=rowData.get("COUNTERPARTY")%></td>
                	  <td align=left><%=rowData.get("PRIMARY_SECONDARY")%></td>
                	  <td align=right><%=rowData.get("PRICE_YIELD")%></td>
                	  <td align=left><%=rowData.get("CURRENCY")%></td>
                	  <td align=right><%=rowData.get("VA")%></td>
                	  <td align=right><%=rowData.get("PC")%></td>
                	  <td align=right><%=rowData.get("TSC")%></td>
                	  <td align=right><%=rowData.get("TSCC")%></td>
                	  <td align=center><%=rowData.get("TREATS_SECURITY_ID")%></td>
                	  <td align=center><%=rowData.get("SECURITY_ID")%></td>
                	  <td align=center><%=rowData.get("JRNAL_NO")%></td>
	                </tr>
			<%		}
    	        }
			%>
			</tbody>
        </table>
	</body> 
</html>
