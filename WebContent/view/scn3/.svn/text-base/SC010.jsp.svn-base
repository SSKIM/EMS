<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
	String pageNo   = request.getParameter("PAGE_NO");
	String findKind = request.getParameter("FIND_KIND");
	String findWord = request.getParameter("FIND_WORKD");
	if(CommonUtil.nullOrEmpty(pageNo))   pageNo   = "1";
	if(CommonUtil.nullOrEmpty(findKind)) findKind = "S";
	if(CommonUtil.nullOrEmpty(findWord)) findWord = "";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn3/SC010.js"></script>
		<script type="text/javascript">
			var pageNo = "<%=pageNo%>", findKind = "<%=findKind%>", findWord = "<%=findWord%>";
		</script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="bbsTable" id="dataTable1" style="width:100%;" cellpadding=0 cellspacing=0>
			<colgroup>
				<col width=80><col width=60><col><col width=100><col width=100><col width=40>
			</colgroup>
			<thead>
				<tr>
					<th>순번</th><th>구분</th><th>제목</th><th>작성일자</th><th>작성자</th><th>첨부</th>
				</tr>
				<tr class=line>
					<td colspan="6" style="height:1px;background-color:#e1e1e1;"></td>
				</tr>
			</thead>
			<tbody>
				<tr><td colspan="6"></td></tr>
			</tbody>
			<tfoot>
				<tr class=line>
					<td colspan="6" style="height:1px;background-color:#e1e1e1;"></td>
				</tr>
			</tfoot>
		</table>
		<div style="width:100%;margin:2px" align=center>
			<span id="pager1"></span>
		</div>
		<div style="width:100%;margin:2px;" align=center>
			<input type="radio" name="findKind" value="S"/>제목 &nbsp;
			<input type="radio" name="findKind" value="C"/>내용 &nbsp;
			<input type="radio" name="findKind" value="W"/>작성자 &nbsp;
			<input type="text"  id="findWord" name="findWord" value=""/>&nbsp;
			<span id="find"  onclick="goFind('Find')"  style="cursor:pointer;">검색</span>&nbsp;
			<span id="clear" onclick="goFind('Clear')" style="cursor:pointer;">지움</span>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
