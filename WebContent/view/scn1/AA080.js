//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	// DEFAULT VALUE
    initEvent();
	$("#S_DEPT_CODE").val(ssDeptCode);
	$("#dataTable1").tablesorter();

	if(ssDeptCode != 'DM2')
	{
		disabled("#S_DEPT_CODE", true);
	}
});

//METHOD///////////////////////////////////////////////////////////////////////////////////////////
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
}

function Retrieve() {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA080Retrieve";
	var params = "&DEPT_CODE="+$("#S_DEPT_CODE").val()
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
                +"<td align=center>"+$(this).find("TRANS_DATETIME").text()+"</td>"
                +"<td align=center>"+$(this).find("TREFERENCE").text()+"</td>"
                +"<td align=left>"+$(this).find("DESCR").text()+"</td>"
                +"<td align=right>"+$(this).find("AMOUNT").text()+"</td>"
                +"<td align=left>"+$(this).find("DESCRIPTN").text()+"</td>"
                +"<td align=center>"+$(this).find("ACCNT_CODE").text()+"</td>"
                +"<td align=center>"+$(this).find("ANAL_T6").text()+"</td>"
                +"<td align=center>"+$(this).find("ANAL_T7").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
		}
	});
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-170);
}
