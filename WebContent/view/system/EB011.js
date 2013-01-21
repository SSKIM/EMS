//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	// DEFAULT VALUE
    // MANDATORY
	// EVENT
	$("#btnInit").click(Init);
	$("#btnClose").click(Close);
	$("#btnRetrieve").click(Retrieve);
	$("#S_DOMAIN_USER,#S_DOMAIN_NAME").keyup(function(e) {
		if(e.keyCode == 13) Retrieve();
	});
	// DEFAULT
	initEvent();
	// GET PARAMETER
	var param = window.dialogArguments;
	$("#S_DOMAIN_USER").val(param.DOMAIN_USER);
	$("#S_DOMAIN_NAME").val("SFAP.ASIAPACIFIC.BMW.CORP");
	disabled("#S_DOMAIN_NAME",true);
});

function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
}
function dataTableRow1_onDblClick(obj) {
	var returnParam = new Object();
	returnParam.DOMAIN_USER    = obj.cells[1].innerHTML;
	returnParam.DOMAIN_NAME    = obj.cells[5].innerHTML;

	window.returnValue = returnParam;
	window.close();
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////
function Retrieve(key1) {
	
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "system.do?method=EB011Retrieve";
	var data   = "&DOMAIN_USER="+$("#S_DOMAIN_USER").val()
			   + "&DOMAIN_NAME="+$("#S_DOMAIN_NAME").val()
			   + "&OU="+$("#S_OU").val()
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
                +"<td align=center>"+$(this).find("DOMAIN_USER").text()+"</td>"
                +"<td align=center>"+$(this).find("DISPLAYNAME").text()+"</td>"
                +"<td align=center>"+$(this).find("DESCRIPTION").text()+"</td>"
                +"<td align=center>"+$(this).find("DEPARTMENT").text()+"</td>"
                +"<td align=center>"+$(this).find("DOMAIN_NAME").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
				var index = tableRowIndex(tableId,key1);
				tableRowColor(tableId,index);
			}
			
			var total = $(result).find("TOTAL_ITEM").text();
			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-120);	
}
