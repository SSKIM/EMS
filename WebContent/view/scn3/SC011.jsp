<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String bltnNo = request.getParameter("BLTN_NO");
	String pageNo = request.getParameter("PAGE_NO");
	if(CommonUtil.nullOrEmpty(pageNo)) pageNo = "1";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn3/SC011.js"></script>
		<script type="text/javascript">
			var bltnNo   = "<%=bltnNo%>";
			var pageNo   = "<%=pageNo%>";
			var findKind = "<%=request.getParameter("FIND_KIND")%>";
			var findWord = "<%=request.getParameter("FIND_WORKD")%>";
			var viewMode = "<%=request.getParameter("viewMode")%>";
		</script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="formTable" id="fromTable1">
			<tr>
				<th>게시글 번호</th>
				<td colspan=3>
					<span id="BLTN_NO" />
				</td>
			</tr>
			<tr>
				<th style="width:15%">작성자</th>
				<td style="width:35%">
					<span id="WRITER" />
				</td>
				<th style="width:15%">작성일자</th>
				<td style="width:35%">
					<span id="WRITE_DATE" />
				</td>
			</tr>
			<tr>
				<th>공지기간</th>
				<td>
					<span id="BLTN_DATE_FROM" /> ~ <span id="BLTN_DATE_TO" />
				</td>
				<th>공지구분</th>
				<td>
					<span id="BLTN_CTGR" />
				</td>
			</tr>
			<tr>
				<th id="lblSUBJECT">제목</th>
				<td colspan="3">
					<span id="SUBJECT" />
				</td>
			</tr>
			<tr style="height:300px">
				<th id="lblCONTENTS">내용</th>
				<td colspan="3" valign="top">
					<textarea id="CONTENTS" style="width:100%;height:300px;border:0px;" readonly></textarea>
				</td>
			</tr>
			<tr style="height:100px">
				<th id="">첨부</th>
				<td colspan="3" valign=top>
					<table class="attachTable" id="attachTable1">
						<colgroup>
							<col width=40><col>
						</colgroup>
						<tbody></tbody>
					</table>
				</td>
			</tr>
		</table>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
