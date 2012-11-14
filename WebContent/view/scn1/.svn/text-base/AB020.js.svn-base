//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnApproval,#btnReject",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnApproval").click(Approval);
	$("#btnReject").click(Reject);
	// DEFAULT VALUE
    initEvent();
    $("#dataTable1,#dataTable2").tablesorter();
    date("#S_SUBMIT_DATE_FROM,#S_SUBMIT_DATE_TO");
	// Validate
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}
function dataTableRow2_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable2',obj.rowIndex);
}
function dataTableRow2_onDblClick(obj) {
	if(obj==null) return;

	var jrnlNo     = obj.cells[9].innerHTML;
	var jrnlSeq    = obj.cells[10].innerHTML;
	var evidType   = obj.cells[11].innerHTML;

	var param = new Object();
	param.JRNL_NO   = jrnlNo;
	param.JRNL_SEQ  = jrnlSeq;
	param.EVID_TYPE = evidType;

	var url   = "scn1.do?method=AB023&screenId=AB023&screenIdRef=AB020&refVal=&isPopup=true&menuName="+getString2("전표상세정보");
	var style = "dialogWidth:960px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal!=null && retVal.isSaved) {
		RetrieveDetail(jrnlNo);
	}
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$("#dataTable1 tbody,#dataTable2 tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AB020Retrieve";
	var params = "&JRNL_NO="+$("#S_JRNL_NO").val()
               + "&SUBMIT_DATE_FROM="+$("#S_SUBMIT_DATE_FROM").val().replaceAll("-","")
               + "&SUBMIT_DATE_TO="+$("#S_SUBMIT_DATE_TO").val().replaceAll("-","")
			   + "&DEPT_CODE="+$("#S_DEPT_CODE").val()
			   + "&SUBMIT_USER="+$("#S_EMPL_ID").val()
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			if($(result).find("DATA_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center><input type='checkbox' name='chk' value='"+$(this).find("JRNL_NO").text()+"'/></td>"
                +"<td align=center>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNL_TYPE_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("SUBMIT_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("SUBMIT_USER_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("WRITE_USER_DEPT_NAME").text()+"</td>"
                +"<td align=right>"+$(this).find("TOTAL").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);

			if($(tableId+" tbody tr").length>0)
				disabled("#btnApproval,#btnReject",false);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}

function RetrieveDetail(jrnlNo) {
	var tableId = "#dataTable2", tableRowId = "dataTableRow2";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AB020RetrieveDetail";
	var params = "&JRNL_NO="+jrnlNo
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			if($(result).find("DATA_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td>"+$(this).find("EVID_NAME").text()+"</td>"
                +"<td>"+$(this).find("EXPS_TYPE_NAME").text()+"</td>"
                +"<td align=right>"+$(this).find("TOTAL_AMT").text()+"</td>"
                +"<td>"+$(this).find("VENDOR_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("PAY_DUE_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("PAY_METHOD_NAME").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td class=hidden>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td class=hidden>"+$(this).find("JRNL_SEQ").text()+"</td>"
                +"<td class=hidden>"+$(this).find("EVID_TYPE").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Approval() {
	if($("input:checkbox[name=chk]:checked").length==0) {
		alert("처리할 대상을 먼저 선택해 주세요!");
		return;
	}
	if($("#DEBIT_TOTAL2").val() != $("#CREDIT_TOTAL2").val()) {
		alert("차변합계와 대변합계가 일치하지 않습니다.");
		return;
	}

	var param = new Object();
	param.JRNL_NO = checkData("dataTable1","chk");

	var url   = "scn1.do?method=AB021&screenId=AB021&screenIdRef=AB020&refVal=&isPopup=true";
	var style = "dialogWidth:600px;dialogHeight:400px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		if(retVal.RESULT == "OK") {
			Retrieve();
		}
	}
}
function Reject() {
	if($("input:checkbox[name=chk]:checked").length==0) {
		alert("처리할 대상을 먼저 선택해 주세요!");
		return;
	}

	var param = new Object();
	param.JRNL_NO = checkData("dataTable1","chk");

	var url   = "scn1.do?method=AB022&screenId=AB022&screenIdRef=AB020&refVal=&isPopup=true";
	var style = "dialogWidth:600px;dialogHeight:400px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		if(retVal.RESULT == "OK") {
			Retrieve();
		}
	}
}
function Clear() {
}
function bindData(obj) {
	var jrnlNo = obj.cells[1].innerText;
	RetrieveDetail(jrnlNo);
}

function initEvent() {
	$("#divMain").css("height",$(window).height()-360);
}
