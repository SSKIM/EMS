<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List,java.util.Map,com.mindtree.framework.util.CommonUtil" %>
<%
	String filename = CommonUtil.getFileName("반려이력목록","xls");
	response.setHeader("Content-Disposition","attachment; filename=\""+filename+"\";");

	List bodyList = null;
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet!=null) {
		bodyList = (List)resultSet.get("BODY_LIST");
	}
%>
<html> 
	<head>
		<title>반려이력목록</title>
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
        		<col width="80px"/><col width="80px"/><col width="100px"/><col width="150px"/><col width="80px"/><col width="100px"/><col/>
        	</colgroup>
			<thead>
				<tr>
					<th>전표번호</th>
					<th>제출일자</th>
					<th>제출자</th>
					<th>제출부서</th>
					<th>반려일자</th>
					<th>반려자</th>
					<th>반려사유</th>
				</tr>
			</thead>
			<tbody>
			<%
				if(bodyList!=null) {
	    	        for(int i=0; i<bodyList.size(); i++) {
	    	        	Map<String,Object> rowData = (Map<String,Object>)bodyList.get(i);
		     %>
    	        	<tr>
		              <td align=center><%=rowData.get("JRNL_NO")%></td>
		              <td align=center><%=rowData.get("SUBMIT_DATE")%></td>
		              <td align=center><%=rowData.get("WRITE_USER_NAME")%></td>
		              <td><%=rowData.get("WRITE_USER_DEPT_NAME")%></td>
		              <td align=center><%=rowData.get("REJECT_DATE")%></td>
		              <td><%=rowData.get("REJECT_USER_NAME")%></td>
		              <td><%=rowData.get("REJECT_REASON")%></td>
	                </tr>
			<%		}
    	        }
			%>
			</tbody>
        </table>
	</body> 
</html>
