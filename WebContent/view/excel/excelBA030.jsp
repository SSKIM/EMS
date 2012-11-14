<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List,java.util.Map,com.mindtree.framework.util.CommonUtil" %>
<%
	String filename = CommonUtil.getFileName("에러재작업목록","xls");
	response.setHeader("Content-Disposition","attachment; filename=\""+filename+"\";");

	List bodyList = null;
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet!=null) {
		bodyList = (List)resultSet.get("DATA_LIST");
	}
%>
<html> 
	<head>
		<title>에러재작업목록</title>
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
					<th>전표발행일자</th>
					<th>전표번호</th>
					<th>전표발행순번</th>
					<th>전표발행조직</th>
					<th>전표발행팀</th>
					<th>계정코드</th>
					<th>차대구분</th>
					<th>금액</th>
					<th>적요</th>
					<th>참조사항</th>
					<th>증권번호</th>
					<th>사고번호</th>
					<th>사용유무</th>
					<th>증빙서유무</th>
					<th>최종변경일자</th>
					<th>최종변경자</th>
					<th>최종변경프로그램ID</th>
					<th>조정여부</th>
					<th>조정전표정보</th>
					<th>I/F일자</th>
					<th>부서코드</th>
					<th>채널코드</th>
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
		              <td align=center><%=rowData.get("SLIP_DATE")%></td>
		              <td align=center><%=rowData.get("SLIP_NO")%></td>
		              <td align=center><%=rowData.get("SLIP_SEQ")%></td>
		              <td align=center><%=rowData.get("SLIP_CMPL_ORGC")%></td>
		              <td align=center><%=rowData.get("SLIP_CMPL_TMCD")%></td>
		              <td align=center><%=rowData.get("ATIT_C")%></td>
		              <td align=center><%=rowData.get("DRCR_TC")%></td>
		              <td align=right><%=rowData.get("AMT")%></td>
		              <td><%=rowData.get("RMK")%></td>
		              <td align=center><%=rowData.get("REF_MTR")%></td>
		              <td align=center><%=rowData.get("SCRT_NO")%></td>
		              <td align=center><%=rowData.get("ACDT_NO")%></td>
		              <td align=center><%=rowData.get("USE_YN")%></td>
		              <td align=center><%=rowData.get("EVDC_YN")%></td>
		              <td align=center><%=rowData.get("LAST_CHNG_DT")%></td>
		              <td align=center><%=rowData.get("LAST_CHNG_USID")%></td>
		              <td align=center><%=rowData.get("LAST_CHNG_PGM_ID")+""%></td>
		              <td align=center><%=rowData.get("ADJ_YN")%></td>
		              <td align=center><%=rowData.get("ADJ_SLIP_INFO")%></td>
		              <td align=center><%=rowData.get("INTR_DT")%></td>
		              <td align=center><%=rowData.get("DEPT_CODE")%></td>
		              <td align=center><%=rowData.get("CHNL_CODE")%></td>
		              <td align=center><%=rowData.get("STATUS")%></td>
	                </tr>
			<%		}
    	        }
			%>
			</tbody>
        </table>
	</body> 
</html>
