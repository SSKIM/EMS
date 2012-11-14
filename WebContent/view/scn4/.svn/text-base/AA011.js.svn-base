//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	$("#btnClose").click(Close);
	$("#btnRetrieve").click(Retrieve);
	// DEFAULT VALUE
	$("#dataTable1").tablesorter();
	initEvent();
	date("#S_TRANS_DATE");
	// Validate
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}
function dataTableRow1_onDblClick(obj) {
	var returnParam = new Object();
	returnParam.TPLT_ID   = obj.cells[10].innerHTML;
	returnParam.EVID_TYPE = obj.cells[9].innerHTML;

	window.returnValue = returnParam;
	Close();
}
function dataTableRow2_onClick(obj) {
	tableRowColor('#dataTable2',obj.rowIndex);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA011Retrieve";
	var params = "&TPLT_NAME="+getString("#S_TPLT_NAME");
		       + "&EVID_TYPE="+$("#S_EVID_TYPE").val()
		       + "&EXPS_TYPE_ID="+$("#S_EXPS_TYPE_ID").val()
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
                +"<td>"+$(this).find("PAY_METHOD_NAME").text()+"</td>"
                +"<td>"+$(this).find("VENDOR_NAME").text()+"</td>"
                +"<td>"+$(this).find("COMPANY_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("BUSI_NO").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td class=hidden>"+$(this).find("EVID_TYPE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("TPLT_ID").text()+"</td>"
                +"<td class=hidden>"+$(this).find("TPLT_NAME").text()+"</td>"
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
//					alert(xhr.responseText); //for debuging 
		}
	});
}
function RetrieveDetail(tpltId) {
	var tableId = "#dataTable2", tableRowId = "dataTableRow2";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA011RetrieveDetail";
	var params = "&TPLT_ID="+tpltId
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
				var drAmt = 0, crAmt = 0;
				if($(this).find("DRCR_TYPE").text()=="D")
					drAmt = $(this).find("AMT").text();
				else
					crAmt = $(this).find("AMT").text();

				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
                +"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
                +"<td align=right>"+drAmt+"</td>"
                +"<td align=right>"+crAmt+"</td>"
                +"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
                +"<td>"+$(this).find("CHNL_NAME").text()+"</td>"
                +"<td>"+$(this).find("ASST_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("DEPT_CODE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("CHNL_CODE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ASST_CODE").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//					alert(xhr.responseText); //for debuging 
		}
	});
}

function bindData(obj) {
	var tpltId = obj.cells[10].innerText;
	RetrieveDetail(tpltId);
}
function Clear() {
}
function initEvent() {
	$("#divMain1").css("height",$(window).height()-$("#divMain2").height());
}
