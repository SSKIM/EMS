<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<jsp:useBean id="combobox" class="com.mindtree.framework.control.ComboBox" scope="page"/>
<jsp:useBean id="radiobox" class="com.mindtree.framework.control.RadioBox" scope="page"/>
<%
	Map resultSet = CommonUtil.getResultSet(request);
	List buttonList = null;
	if(resultSet != null) {
		buttonList = (List)resultSet.get("BUTTON_LIST");
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/system/EA040.js"></script>
	</head>
	<body>
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable"><tr>
			<th>버튼ID</th>
			<td>
				<input type="text" id="BUTTON_ID2" />
			</td>
			<th>버튼명</th>
			<td>
				<input type="text" id="BUTTON_NAME2" />
			</td>
		</tr></table>
		<div class="main" id="divMain">
			<table class="dataTable" id="dataTable">
				<thead>
					<tr>
						<th width="40px">순번</th>
						<th width="80px">버튼ID</th>
						<th width="100px">버튼명</th>
						<th width="100px">버튼명-영문</th>
						<th width="100px">이미지경로</th>
						<th width="60px">이미지넓이</th>
						<th width="60px">이미지높이</th>
						<th width="60px">스타일시트</th>
						<th width="200px">비고</th>
						<th width="60px">정렬순서</th>
						<th width="40px">상태</th>
						<th style="display:none">입력일자</th>
						<th style="display:none">일력자</th>
						<th style="display:none">수정일자</th>
						<th style="display:none">수정자</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
		<div class="button">
			<jsp:setProperty name="button" property="buttonGroup" value="2"/>
			<jsp:setProperty name="button" property="dataSource" value="<%=buttonList%>"/>
			<jsp:getProperty name="button" property="dataBind" />
		</div>
		<form id="formData" name="formData" method="post">
			<input type="hidden" id="rowIndex" name="rowIndex"/>
			<table id="formTable" class="formTable">
				<tr>
					<th id="lblBUTTON_ID">버튼ID</th>
					<td>
						<input type="text" id="BUTTON_ID" name="BUTTON_ID"/>
					</td>
					<th id="lblBUTTON_NAME">버튼명</th>
					<td>
						<input type="text" id="BUTTON_NAME" name="BUTTON_NAME"/>
					</td>
					<th id="lblBUTTON_NAME3">버튼명-영문</th>
					<td>
						<input type="text" id="BUTTON_NAME3" name="BUTTON_NAME3"/>
					</td>
				</tr>
				<tr>
					<th id="lblIMG_PATH">이미지경로</th>
					<td>
						<input type="text" id="IMG_PATH" name="IMG_PATH"/>
					</td>
					<th id="lblIMG_WIDTH">이미지넓이</th>
					<td>
						<input type="text" id="IMG_WIDTH" name="IMG_WIDTH"/>
					</td>
					<th id="lblIMG_HEIGHT">이미지높이</th>
					<td>
						<input type="text" id="IMG_HEIGHT" name="IMG_HEIGHT"/>
					</td>
				</tr>
				<tr>
					<th id="lblCSS">스타일시트</th>
					<td>
						<input type="text" id="CSS" name="CSS"/>
					</td>
					<th id="lblREMARK">비고</th>
					<td>
						<input type="text" id="REMARK" name="REMARK"/>
					</td>
					<th id="lblSORT_SEQ">정렬순서</th>
					<td>
						<input type="text" id="SORT_SEQ" name="SORT_SEQ"/>
					</td>
				</tr>
				<tr>
					<th id="lblSTATUS">상태</th>
					<td colspan="5">
						<jsp:setProperty name="radiobox" property="name" value="STATUS"/>
						<jsp:setProperty name="radiobox" property="dataType" value="YesNo"/>
						<jsp:getProperty name="radiobox" property="bindData" />
					</td>
				</tr>
			</table>
			<table class="historyTable">
				<tr>
					<th>입력일자</th><td><span id="INS_DATE"></span></td>
					<th>입력자</th><td><span id="INS_USER"></span></td>
					<th>수정일자</th><td><span id="UPD_DATE"></span></td>
					<th>수정자</th><td><span id="UPD_USER"></span></td>
				</tr>
			</table>
		</form>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>