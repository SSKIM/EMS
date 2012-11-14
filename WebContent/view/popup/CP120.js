//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	// DEFAULT VALUE
    // MANDATORY
	// EVENT
	$("#btnInit").click(Init);
	$("#btnClose").click(Close);
	$("#btnRetrieve").click(Retrieve);
	$("#S_VENDOR_CODE,#S_VENDOR_NAME").keyup(function(e) {
		if(e.keyCode == 13) Retrieve(1);
	});
	// DEFAULT
	initEvent();
	// GET PARAMETER
	var param = window.dialogArguments;
	$("#S_VENDOR_CODE").val(param.VNDR_CODE);
	$("#S_VENDOR_NAME").val(param.VNDR_NAME);

	Retrieve(1);
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
}
function dataTableRow1_onDblClick(obj) {
	if(obj==null) return;
	var returnParam = new Object();
	returnParam.VENDOR_CODE = obj.cells[1].innerHTML;
	returnParam.VENDOR_NAME = obj.cells[2].innerHTML;

	window.returnValue = returnParam;
	Close();
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(pageNo) {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	if(isNaN(pageNo)) pageNo = "1";

	var j = 0;
	var action = "popup.do?method=CP060Retrieve";
	var data   = "&VENDOR_CODE="+$("#S_VENDOR_CODE").val()
               + "&VENDOR_NAME="+getString("#S_VENDOR_NAME")
               + "&ANL_CODE2=SE"
	           + "&PAGE_NO="+pageNo
               + "&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			if($(result).find("DATA_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+$(this).find("RN").text()+"</td>"
                +"<td align=center>"+$(this).find("VENDOR_CODE").text()+"</td>"
                +"<td>"+$(this).find("VENDOR_NAME").text()+"</td>"
                +"<td>"+$(this).find("LOOKUP").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
//			if(dataCnt>0) {
//				var index = tableRowIndex(tableId,"");
//				tableRowColor(tableId,index);
//			}
			
			var total = $(result).find("TOTAL_ITEM").text();
			$("#pager1").html(paging(pageNo,total,100,10));

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function goPage(pageNo) {
	Retrieve(pageNo);
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-110);	
}
