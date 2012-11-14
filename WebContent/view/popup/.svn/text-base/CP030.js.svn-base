//EVENT////////////////////////////////////////////////////////////////////////////////////////////

var MENU_REF = "";

$(document).ready(function(){
	// READONLY MODE
	// DEFAULT VALUE
    // MANDATORY
	// EVENT
	$("#btnInit").click(Init);
	$("#btnClose").click(Close);
	$("#btnRetrieve").click(Retrieve);
	$("#MENU_ID2,#MENU_NAME2").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	// DEFAULT
	initEvent();
//	centerDialog("800","600");
//    checkAll("chkAll");
	// GET PARAMETER
	var param = window.dialogArguments;
	MENU_REF = param.MENU_REF;
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
}
function dataTableRow1_onDblClick(obj) {
	var returnParam = new Object();
	returnParam.MENU_ID    = obj.cells[1].innerHTML;
	returnParam.MENU_NAME  = obj.cells[2].innerHTML;
	returnParam.MENU_REF   = obj.cells[3].innerHTML;
	returnParam.MENU_TYPE  = obj.cells[4].innerHTML;
	returnParam.MENU_URL   = obj.cells[5].innerHTML;
	returnParam.MENU_NAVI  = obj.cells[6].innerHTML;
	returnParam.SCREEN_ID  = obj.cells[7].innerHTML;
	returnParam.SORT_SEQ   = obj.cells[8].innerHTML;
	returnParam.STATUS     = obj.cells[9].innerHTML;

	window.returnValue = returnParam;
	Close();
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(pageNo) {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();
//	$("#chkAll").attr("checked","");

	var j = 0;
	var action = "popup.do?method=CP030Retrieve";
	var data   = "&MENU_ID="+$("#MENU_ID2").val()
               + "&MENU_NAME="+escape(encodeURIComponent($("#MENU_NAME2").val()))
               + "&MENU_REF="+MENU_REF
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
                +"<td align=center>"+$(this).find("MENU_ID").text()+"</td>"
                +"<td>"+$(this).find("MENU_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("MENU_REF").text()+"</td>"
                +"<td align=center>"+$(this).find("MENU_TYPE").text()+"</td>"
                +"<td>"+$(this).find("MENU_URL").text()+"</td>"
                +"<td>"+$(this).find("MENU_NAVI").text()+"</td>"
                +"<td align=center>"+$(this).find("MENU_LEVEL").text()+"</td>"
                +"<td align=center>"+$(this).find("SCREEN_ID").text()+"</td>"
                +"<td>"+$(this).find("SORT_SEQ").text()+"</td>"
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
