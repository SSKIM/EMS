<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List,java.util.Map,com.mindtree.framework.util.CommonUtil" %>
<%
	String filename = CommonUtil.getFileName("전표목록","xls");
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
			<thead>
				<tr>
					<th>전표번호</th>
					<th>전표일련번호</th>
					<th>상태</th>
					<th>작성일자</th>
					<th>증빙구분코드</th>
					<th>증빙구분명</th>
					<th>비용구분ID</th>
					<th>비용구분명</th>
					<th>거래일자</th>
					<th>지급요청일자</th>
					<th>지급방법구분</th>
					<th>지급방법명</th>
					<th>거래처코드</th>
					<th>거래처명</th>
					<th>상호</th>
					<th>사업자등록번호</th>
					<th>적요</th>
					<th>비고1명칭</th>
					<th>비고1</th>
					<th>비고2명칭</th>
					<th>비고2</th>
					<th>비고3명칭</th>
					<th>비고3</th>
					<th>비고4명칭</th>
					<th>비고4</th>
					<th>공급가액</th>
					<th>세액</th>
					<th>총금액</th>
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
		              <td align=center><%=rowData.get("JRNL_SEQ")%></td>
		              <td align=center><%=rowData.get("STATUS_NAME")%></td>
		              <td align=center><%=rowData.get("WRITE_DATE")%></td>
		              <td align=center><%=rowData.get("EVID_TYPE")%></td>
		              <td><%=rowData.get("EVID_NAME")%></td>
		              <td align=center><%=rowData.get("EXPS_TYPE_ID")%></td>
		              <td><%=rowData.get("EXPS_TYPE_NAME")%></td>
		              <td align=center><%=rowData.get("TRANS_DATE")%></td>
		              <td align=center><%=rowData.get("PAY_DUE_DATE")%></td>
		              <td align=center><%=rowData.get("PAY_METHOD_TYPE")%></td>
		              <td><%=rowData.get("PAY_METHOD_NAME")%></td>
		              <td align=center><%=rowData.get("VENDOR_CODE")%></td>
		              <td><%=rowData.get("VENDOR_NAME")%></td>
		              <td><%=rowData.get("COMPANY_NAME")%></td>
		              <td align=center><%=rowData.get("BUSI_NO")%></td>
		              <td><%=rowData.get("REMARK")+""%></td>
		              <td><%=rowData.get("REMARK1_LABEL")%></td>
		              <td><%=rowData.get("REMARK1")%></td>
		              <td><%=rowData.get("REMARK2_LABEL")%></td>
		              <td><%=rowData.get("REMARK2")%></td>
		              <td><%=rowData.get("REMARK3_LABEL")%></td>
		              <td><%=rowData.get("REMARK3")%></td>
		              <td><%=rowData.get("REMARK4_LABEL")%></td>
		              <td><%=rowData.get("REMARK4")%></td>
		              <td align=right><%=rowData.get("SUPPLY_AMT")%></td>
		              <td align=right><%=rowData.get("VAT_AMT")%></td>
		              <td align=right><%=rowData.get("TOTAL_AMT")%></td>
	                </tr>
			<%		}
    	        }
			%>
			</tbody>
        </table>
	</body> 
</html>
