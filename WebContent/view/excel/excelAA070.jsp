<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List,java.util.Map,com.mindtree.framework.util.CommonUtil" %>
<%
	String filename = CommonUtil.getFileName("계정별조회","xls");
	response.setHeader("Content-Disposition","attachment; filename=\""+filename+"\";");

	List bodyList = null;
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet!=null) {
		bodyList = (List)resultSet.get("BODY_LIST");
	}
%>
<html> 
	<head>
		<title>전표목록</title>
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
				background-color: #f4f4f4;
				text-align: center;
				font-weight: bold;
				height: 21px;
				border-left-style: none;
			}
			table.excelTable tbody tr td {
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
			<thead>
				<tr>
					<th>전표번호</th>
					<th>구분</th>
					<th>계정과목</th>
					<th>계정과목명</th>
					<th>금액</th>
					<th>차대구분</th>
					<th>부서코드</th>
					<th>부서명</th>
					<th>채널코드</th>
					<th>채널명</th>
					<th>적요</th>
					<th>제출일자</th>
					<th>제출자</th>
					<th>승인일자</th>
					<th>승인자</th>
					<th>마감월</th>
					<th>반려일자</th>
					<th>취소/반려사유</th>
					<th>참조번호</th>
					<th>상태</th>
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
		              <td align=center><%=rowData.get("JRNL_TYPE_NAME")%></td>
		              <td align=center><%=rowData.get("ACCT_CODE")%></td>
		              <td align=center><%=rowData.get("ACCT_NAME")%></td>
		              <td align=center><%=rowData.get("AMT")%></td>
		              <td align=center><%=rowData.get("DRCR_TYPE")%></td>
		              <td align=center><%=rowData.get("ANAL_T0")%></td>
		              <td align=center><%=rowData.get("ANAL_T0_NAME")%></td>
		              <td align=center><%=rowData.get("ANAL_T2")%></td>
		              <td align=center><%=rowData.get("ANAL_T2_NAME")%></td>
		              <td align=center><%=rowData.get("REMARK")%></td>
		              <td align=center><%=rowData.get("SUBMIT_DATE")%></td>
		              <td align=center><%=rowData.get("SUBMIT_USER_NAME")%></td>
		              <td align=center><%=rowData.get("APPV_DATE")+""%></td>
		              <td align=center><%=rowData.get("APPV_USER_NAME")%></td>
		              <td align=center><%=rowData.get("POSTING_PERIOD")%></td>
		              <td align=center><%=rowData.get("REJECT_DATE")%></td>
		              <td align=center><%=rowData.get("REMARK")%></td>
		              <td align=center><%=rowData.get("REF_NO")%></td>
		              <td align=center><%=rowData.get("STATUS_NAME")%></td>
	                </tr>
			<%		}
    	        }
			%>
			</tbody>
        </table>
	</body> 
</html>
