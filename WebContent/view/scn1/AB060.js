//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnExcelExport",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnExcelExport").click(ExcelExport);
	// DEFAULT VALUE
    initEvent();
	$("#dataTable1").tablesorter();
	// Validate
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
//	bindData(obj);
}
function dataTableRow1_onDblClick(obj) {
	if(obj==null) return;

	var jrnlNo     = obj.cells[1].innerHTML;
	var jrnlSeq    = obj.cells[2].innerHTML;
	var evidType   = obj.cells[15].innerHTML;

	popupDetail(jrnlNo,jrnlSeq,evidType);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();
	disabled("#btnExcelExport",true);

	var j = 0;
	var action = "scn1.do?method=AB060Retrieve";
	var params = "&JRNL_NO="+$("#S_JRNL_NO").val()
		       + "&EMPL_ID="+$("#S_EMPL_ID").val()
		       + "&DEPT_CODE="+$("#S_DEPT_CODE").val()
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
                +"<td align=center>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("SUBMIT_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("WRITE_USER_NAME").text()+"</td>"
                +"<td>"+$(this).find("WRITE_USER_DEPT_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("REJECT_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("REJECT_USER_NAME").text()+"</td>"
                +"<td>"+$(this).find("REJECT_REASON").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			$("div.status").html(dataCnt+" "+I002);
			
			if(dataCnt>0) {
				disabled("#btnExcelExport",false);	
			}
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function ExcelExport() {
	var action = "scn1.do?method=AB060ExcelExport";
	var params = "&JRNL_NO="+$("#S_JRNL_NO").val()
	           + "&EMPL_ID="+$("#S_EMPL_ID").val()
	           + "&DEPT_CODE="+$("#S_DEPT_CODE").val()
               + "&call=";

	backgroundp.location.href = action+params;
//	document.location.href = action+params;
}
function bindData(obj) {
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-108);
}
