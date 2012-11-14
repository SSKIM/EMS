<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript" src="<%=request.getContextPath()%>/view/popup/CP0120.js"></script>
	</head>
	<body style="margin: 0px 5px 0px 5px">
		<%@ include file="../include/button.jsp" %>
		<table class="searchTable" style=""><tr>
			<th></th>
			<td>
				<input type="text" id="S_VENDOR_CODE" maxlength="20" />
			</td>
			<th></th>
			<td>
				<input type="text" id="S_VENDOR_NAME" maxlength="40" style="width:99%" />
			</td>
		</tr></table>
		<div id="divMain" class="main">
			<table class="dataTable" id="dataTable1">
				<colgroup>
					<col width="40"/><col width="100px"/><col width="140px"/><col width="140px"/>
				</colgroup>
				<thead>
					<tr>
						<th>순번</th>
						<th>AccountCode</th>
						<th>AccountingPeriod</th>
						<th>AllocationMarker</th>
						<th>AnalysisCode1</th>
						<th>AnalysisCode2</th>
						<th>AnalysisCode3</th>
						<th>AnalysisCode4</th>
						<th>AnalysisCode5</th>
						<th>AnalysisCode6</th>
						<th>AnalysisCode7</th>
						<th>AnalysisCode8</th>
						<th>AnalysisCode9</th>
						<th>AnalysisCode10</th>
						<th>AssetCode</th>
						<th>AssetIndicator</th>
						<th>BaseAmount</th>
						<th>DebitCredit</th>
						<th>Description</th>
						<th>DueDate</th>
						<th>JournalLineNumber</th>
						<th>JournalNumber</th>
						<th>JournalSource</th>
						<th>JournalType</th>
						<th>TransactionDate</th>
						<th>TransactionReference</th>
						<th>SupplementaryExtension</th>
						<th>GeneralDate1</th>
						<th>GeneralDescription1</th>
						<th>GeneralDescription2</th>
						<th>GeneralDescription3</th>
						<th>GeneralDescription4</th>
					</tr>
				</thead>
				<tbody>
					<tr><td colspan="32"></td></tr>
				</tbody>
			</table>
		</div>
		<div style="width:100%;height:30px;margin:5px" align=center>
			<span id="pager1"></span>
		</div>
		<%@ include file="../include/bottom.jsp" %>
	</body>
</html>
