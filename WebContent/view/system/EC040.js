//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	// DEFAULT VALUE
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	// ETC
//    $("#dataTable").tablesorter();
	initEvent();
});
function dataTableRow_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable',obj.rowIndex);
	bindData(obj);
}
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData1(obj);
}
function dataTableRow2_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable2',obj.rowIndex);
	bindData2(obj);
}
function checkRow2_onClick(obj) {
	if(obj==null) return;
	var checked  = obj.attr("checked");
	var row      = obj.parent().parent()[0];
	var screenId = row.cells[1].innerHTML;
	var buttonId = row.cells[2].innerHTML;	
	var authId   = $("#AUTH_ID").html();

	Update(authId,screenId,buttonId,checked);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(authId) {
	$("#dataTable tbody,#dataTable1 tbody,#dataTable2 tbody").empty();
	$("#AUTH_ID,#AUTH_NAME,#MENU_ID,#MENU_NAME,#SCREEN_ID,#BUTTON_ID,#BUTTON_NAME").empty();
	var tableId, dataRow;
	var j = 0, dataCnt = 0;

	var action = "system.do?method=EC040Retrieve";
	var data   = "&MENU_GRP="+$("#MENU_GRP2").val()
	           + "&viewMode=&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			tableId = "#dataTable", dataRow = "dataRow_";
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+dataRow+(++j)+"\">"
                +"<td align=center>"+$(this).find("AUTH_ID").text()+"</td>"
                +"<td>"+$(this).find("AUTH_NAME").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,"dataTableRow",1);

			dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
				var index = tableRowIndex(tableId,authId);
				tableRowColor(tableId,index);
				bindData(tableRowObj(tableId,index));
			}

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}

function Retrieve1(authId,menuId) {
	$("#dataTable1 tbody,#dataTable2 tbody").empty();
	var tableId, dataRow;
	var j = 0, dataCnt = 0;

	var action = "system.do?method=EC040Retrieve";
	var data   = "&AUTH_ID="+authId
	           + "&MENU_ID="+$("#MENU_GRP2").val()
	           + "&viewMode=AUTH_SCREEN&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			tableId = "#dataTable1", dataRow = "dataRow1_"; j = 0;
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+dataRow+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("SCREEN_ID").text()+"</td>"
                +"<td>"+$(this).find("SCREEN_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("SCREEN_TYPE").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,"dataTableRow1",1);

			dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
				var index = tableRowIndex(tableId,authId);
				tableRowColor(tableId,index);
				bindData1(tableRowObj(tableId,index));
			}

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}

function Retrieve2(authId,screenId,buttonId) {
	$("#dataTable2 tbody").empty();
	var tableId, dataRow;
	var j = 0, dataCnt = 0;

	var action = "system.do?method=EC040Retrieve";
	var data   = "&AUTH_ID="+authId
               + "&SCREEN_ID="+screenId
		       + "&viewMode=AUTH_BUTTON&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			tableId = "#dataTable2", dataRow = "dataRow2_"; j = 0;
			$(result).find("DATA_LIST").find("ROW").each(function(){
				var value, checked;
				if($(this).find("CHECKED").text()==1) {
					value   = "true";
					checked = "checked";
				} else {
					value   = "false";
					checked = "";
				}

				$(tableId+" tbody").append("<tr id=\""+dataRow+(++j)+"\">"
				+"<td align=center><input type='checkbox' name='chk' value='"+value+"' "+checked+"/></td>"
                +"<td align=center>"+$(this).find("SCREEN_ID").text()+"</td>"
                +"<td>"+$(this).find("BUTTON_ID").text()+"</td>"
                +"<td>"+$(this).find("BUTTON_NAME").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,"dataTableRow2",1);
			checkRowEvent(tableId,"checkRow2");

			dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
				var index = tableRowIndex(tableId,new Array(screenId,buttonId),"1,2");
				tableRowColor(tableId,index);
				bindData2(tableRowObj(tableId,index));
			}

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Update(authId,screenId,buttonId,checked) {
	$("#btnRetrieve").focus();

	var action = "system.do?method=EC040Update&call=xml";
	var data   = "&AUTH_ID="+authId+"&SCREEN_ID="+screenId+"&BUTTON_ID="+buttonId+"&CHECKED="+checked;

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

//			Retrieve2(authId,screenId,buttonId);
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
			alert(xhr.responseText); //for debuging 
		}
	});
}
function bindData(obj) {
	$("#AUTH_ID").html(obj.cells[0].innerHTML);
	$("#AUTH_NAME").html(obj.cells[1].innerHTML);
	Retrieve1($("#AUTH_ID").html());
}
function bindData1(obj) {
	var authId   = $("#AUTH_ID").html();
	var screenId = obj.cells[1].innerHTML;

	$("#SCREEN_ID").html(screenId);
	$("#SCREEN_NAME").html(obj.cells[2].innerHTML);

	Retrieve2(authId,screenId);
}
function bindData2(obj) {
	$("#BUTTON_ID").html(obj.cells[1].innerHTML);
	$("#BUTTON_NAME").html(obj.cells[2].innerHTML);
}
function initEvent() {
	$("#divMain2").css("height",$(window).height()-120);
}