//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	// DEFAULT VALUE
    // MANDATORY
	// EVENT
	$("#btnInit").click(Init);
	$("#btnClose").click(Close);
	$("#btnRetrieve").click(Retrieve);
	$("#btnSave").click(Save);
	$("#BUTTON_ID2,#BUTTON_NAME2").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	// DEFAULT
	initEvent();
//	centerDialog("800","600");
//  checkAll("chkAll");
	// GET PARAMETER
	var param = window.dialogArguments;
	$("#SCREEN_ID2").val(param.SCREEN_ID);
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
}
//function dataTableRow1_onDblClick(obj) {
//	var returnParam = new Object();
//	returnParam.BUTTON_ID    = obj.cells[1].innerHTML;
//	returnParam.BUTTON_NAME  = obj.cells[2].innerHTML;
//	returnParam.IMG_PATH     = obj.cells[3].innerHTML;
//	returnParam.IMG_WIDTH    = obj.cells[4].innerHTML;
//	returnParam.IMG_HEIGHT   = obj.cells[5].innerHTML;
//	returnParam.CSS          = obj.cells[6].innerHTML;
//	returnParam.REMARK       = obj.cells[7].innerHTML;
//	returnParam.SORT_SEQ     = obj.cells[8].innerHTML;
//	returnParam.STATUS       = obj.cells[9].innerHTML;
//
//	window.returnValue = returnParam;
//	Close();
//}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(pageNo) {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();
//	$("#chkAll").attr("checked","");

	var j = 0;
	var action = "popup.do?method=CP040Retrieve";
	var data   = "&BUTTON_ID="+$("#BUTTON_ID2").val()
               + "&BUTTON_NAME="+escape(encodeURIComponent($("#BUTTON_NAME2").val()))
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
				+"<td align=center><input type='checkbox' name='chk' value='"+$(this).find("BUTTON_ID").text()+"'/></td>"
                +"<td>"+$(this).find("BUTTON_ID").text()+"</td>"
                +"<td>"+$(this).find("BUTTON_NAME").text()+"</td>"
                +"<td>"+$(this).find("IMG_PATH").text()+"</td>"
                +"<td align=right>"+$(this).find("IMG_WIDTH").text()+"</td>"
                +"<td align=right>"+$(this).find("IMG_HEIGHT").text()+"</td>"
                +"<td>"+$(this).find("CSS").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td align=center>"+$(this).find("SORT_SEQ").text()+"</td>"
                +"<td align=center>"+$(this).find("STATUS").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

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
function Save() {
	var screenId = $("#SCREEN_ID2").val();

    var action = "popup.do?method=CP040Save";
	var data   = "&SCREEN_ID="+screenId
	           + "&DATATABLE="+checkData("dataTable1","chk");

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			message(I003);	

			var returnParam = new Object();
			returnParam.SCREEN_ID = screenId;
			window.returnValue = returnParam;

			Close();
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
