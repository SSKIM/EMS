<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List,java.util.Map,java.util.Date"%>
<%@ page import="com.mindtree.framework.util.CommonUtil" %>
<%
	Map  resultSet = CommonUtil.getResultSet(request);
	List dataList  = (List)resultSet.get("dataList");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
						<table>
							<thead align="center">
								<tr>
									<td>순번</td>
									<td>제목</td>
									<td>시작일자</td>
									<td>종료일자</td>
									<td>조회수</td>
								</tr>
							</thead>
							<tbody>
								<%=CommonUtil.getResultXML(resultSet)%>
									<%if(dataList == null) {%>
									<tr id="DataRow" onclick="" onmouseover="" onmouseout="" style="">
										<td colspan="4" align="center">not exist data!</td>
									</tr>
									<%} else {
											for(int i=0; i<dataList.size(); i++) {
												Map     data      = (Map)dataList.get(i);
												long    bltnNo    = CommonUtil.getLong(data.get("BLTN_NO"));
												String  title     = (String)data.get("TITLE");
												String  fromDate  = ((Date)data.get("FROM_DT")).toString();
												String  endDate   = ((Date)data.get("END_DT")).toString();
												long    readCnt   = CommonUtil.getLong(data.get("READ_CNT"));
									%>
									<tr id="DataRow" onclick="DataRow_onClick(this)" onmouseover="dataRowOnMouse(this,'1')" onmouseout="dataRowOnMouse(this,'0')" style="">
										<td width="40px" align="right">
											<%=bltnNo%>
										</td>
										<td align="left">
											<a href="javascript:goCommand('View','<%=bltnNo%>')">
												<%=title%>
											</a>
										</td>
										<td width="100px" align="center">
											<%=fromDate%>
										</td>
										<td width="100px" align="center">
											<%=endDate%>
										</td>
										<td>
											<%=readCnt%>
										</td>
									</tr>
									<%}}%>
							</tbody>
						</table>

</body>
</html>
<%CommonUtil.clearAttribute(request);%>