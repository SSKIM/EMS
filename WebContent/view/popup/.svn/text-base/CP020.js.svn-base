//EVENT////////////////////////////////////////////////////////////////////////////////////////////

//var MENU_REF = "";

$(document).ready(function(){
	// READONLY MODE
	// DEFAULT VALUE
    // MANDATORY
	// EVENT
	$("#btnInit").click(Init);
	$("#btnClose").click(Close);
	$("#btnRetrieve").click(Retrieve);
	$("#SCREEN_ID2,#SCREEN_NAME2").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	// DEFAULT
	initEvent();
//	centerDialog("800","600");
//    checkAll("chkAll");
	// GET PARAMETER
//	var param = window.dialogArguments;
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
}
function dataTableRow1_onDblClick(obj) {
	var returnParam = new Object();
	returnParam.SCREEN_ID    = obj.cells[1].innerHTML;
	returnParam.SCREEN_NAME  = obj.cells[2].innerHTML;
	returnParam.SCREEN_TYPE  = obj.cells[3].innerHTML;
	returnParam.SCREEN_URL   = obj.cells[4].innerHTML;
	returnParam.STATUS       = obj.cells[5].innerHTML;

	window.returnValue = returnParam;
	Close();
}
//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(pageNo) {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();
//	$("#chkAll").attr("checked","");

	var j = 0;
	var action = "popup.do?method=CP020Retrieve";
	var data   = "&SCREEN_ID="+$("#SCREEN_ID2").val()
               + "&SCREEN_NAME="+escape(encodeURIComponent($("#SCREEN_NAME2").val()))
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
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("SCREEN_ID").text()+"</td>"
                +"<td>"+$(this).find("SCREEN_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("SCREEN_TYPE").text()+"</td>"
                +"<td>"+$(this).find("SCREEN_URL").text()+"</td>"
                +"<td align=center>"+$(this).find("STATUS").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
//			if(dataCnt>0) {
//				var index = tableRowIndex(tableId,key1);
//				tableRowColor(tableId,index);
//				bindData(tableRowObj(tableId,index));
//			}

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
	$("#divMain").css("height",$(window).height()-95);	
}
