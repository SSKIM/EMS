<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil,com.das.fms.vo.UserVO" %>
<%
	UserVO userVO   = (UserVO)CommonUtil.getUserSession(request);
	String viewMode = request.getParameter("viewMode");

	String bltnDateFrom ="", bltnDateTo = ""; 
	if("E".equals(viewMode) || "R".equals(viewMode)) {
		
	} else {
		bltnDateFrom = CommonUtil.getDate(new Date()); 
		bltnDateTo   = "9999-12-31";
	}

	String bltnNo = request.getParameter("BLTN_NO");
	String pageNo = request.getParameter("PAGE_NO");
	if(CommonUtil.nullOrEmpty(pageNo)) pageNo = "1";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/scn3/SC012.js"></script>
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
			<form id="formData2" name="formData" method="post">
			<tr>
				<th>게시글 번호</th>
				<td colspan=3>
					<input type="text" id="BLTN_NO" name="BLTN_NO" value="" />
				</td>
			</tr>
			<tr>
				<th style="width:15%">작성자</th>
				<td style="width:35%">
					<input type="text" id="WRITER" name="WRITER" value="<%=CommonUtil.nvl(userVO.getUserName())%>" />
				</td>
				<th style="width:15%">작성일자</th>
				<td style="width:35%">
					<input type="text" id="WRITE_DATE" name="WRITE_DATE" value="<%=CommonUtil.getDate(new Date())%>" />
				</td>
			</tr>
			<tr>
				<th id="lblBLTN_DATE">공지기간</th>
				<td>
					<input type="text" id="BLTN_DATE_FROM" name="BLTN_DATE_FROM" value="<%=bltnDateFrom%>" /> ~ 
					<input type="text" id="BLTN_DATE_TO" name="BLTN_DATE_TO" value="<%=bltnDateTo%>" />
				</td>
				<th id="lblBLTN_CTGR">공지구분</th>
				<td>
					<input type="radio" name="BLTN_CTGR" value="G"><span class="radio">일반</span>
					<input type="radio" name="BLTN_CTGR" value="F"><span class="radio">고정</span>
				</td>
			</tr>
			<tr>
				<th id="lblSUBJECT">제목</th>
				<td colspan="3">
					<input type="text" id="SUBJECT" name="SUBJECT" style="width:99%" />
				</td>
			</tr>
			<tr style="height:300px">
				<th id="lblCONTENTS">내용</th>
				<td colspan="3">
					<textarea id="CONTENTS" name="CONTENTS" style="width:100%;height:300px;border:1px solid #ccc;"></textarea>
				</td>
			</tr>
			</form>
			<tr>
				<th id="lblATTACH">첨부</th>
				<td colspan="3" style="height:100px" valign=top>
					<form id="formData1" name="formData" method="post" enctype="multipart/form-data">
						<input type="file" id="filename" name="filename" style="width:80%"/>
						<input type="button" id="btnAdd" value="추가" /><input type="button" id="btnRemove" value="삭제" />
					</form>
					<input type="hidden" id="rowIndex" /><input type="hidden" id="tableId" />
					<input type="hidden" id="FILE_ID"  name="FILE_ID" />
					<input type="hidden" id="FILE_EXT" name="FILE_EXT" />
					<table class="attachTable" id="attachTable1"><tbody></tbody></table>
					<table class="attachTable" id="attachTable2"><tbody></tbody></table>
				</td>
			</tr>
		</table>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
