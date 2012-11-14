//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	// ETC
//    $("#dataTable").tablesorter();
	initEvent();
	// DEFAULT VALUE
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
function checkRow1_onClick(obj) {
	if(obj==null) return;
	var row      = obj.parent().parent()[0];
	var menuGrp  = $("#MENU_GRP2").val();
	var authId   = $("#AUTH_ID").html();
	var menuId   = row.cells[4].innerHTML;
	var value    = obj.attr("checked");
	var menuType = row.cells[2].innerHTML;
	Update(authId,menuGrp,menuId,value,menuType);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(authId) {
	$("#dataTable tbody,#dataTable1 tbody,#dataTable2 tbody").empty();
	$("#AUTH_ID,#AUTH_NAME,#MENU_ID,#MENU_NAME").empty();
	var tableId, dataRow;
	var j = 0, dataCnt = 0;

	var action = "system.do?method=EC030Retrieve";
	var data   = "&viewMode=&call=xml";

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
function Retrieve2(authId,screenId) {
	$("#dataTable1 tbody").empty();
	var tableId, dataRow;
	var j = 0, dataCnt = 0;

	var action = "system.do?method=EC030Retrieve";
	var data   = "&MENU_ID="+$("#MENU_GRP2").val()
		       + "&AUTH_ID="+authId
		       + "&viewMode=SCREEN&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			tableId = "#dataTable1", dataRow = "dataRow1_"; j = 0;
			$(result).find("DATA_LIST").find("ROW").each(function(){
				var level = (parseInt($(this).find("MENU_LEVEL").text())-1)*10;
				var value, checked;
				if($(this).find("CHECKED").text()==1) {
					value   = "true";
					checked = "checked";
				} else {
					value   = "false";
					checked = "";
				}

				$(tableId+" tbody").append("<tr id=\""+dataRow+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
				+"<td align=center><input type='checkbox' name='chk' value='"+value+"' "+checked+"/></td>"
                +"<td align=center>"+$(this).find("MENU_TYPE").text()+"</td>"
                +"<td align=center>"+$(this).find("MENU_LEVEL").text()+"</td>"
                +"<td align=center>"+$(this).find("MENU_ID").text()+"</td>"
                +"<td style=\"padding-left:"+level+"px\">"+$(this).find("MENU_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("MENU_REF").text()+"</td>"
                +"<td align=center>"+$(this).find("SCREEN_ID").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,"dataTableRow1",1);
			checkRowEvent(tableId,"checkRow1");

			dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
//				var index = tableRowIndex(tableId,new Array(authId,screenId),"4,5");
//				tableRowColor(tableId,index);
//				bindData(tableRowObj(tableId,index));
			}

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Update(authId,menuGrp,menuId,value,menuType) {
	$("#btnRetrieve").focus();

	var action = "system.do?method=EC030Update&call=xml";
	var data   = "&AUTH_ID="+authId+"&MENU_GRP="+menuGrp+"&MENU_ID="+menuId+"&VALUE="+value;

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			if(menuType == 'S' || menuType == 'R') {
				Retrieve2(authId,menuId);
			}
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
	Retrieve2(obj.cells[0].innerHTML);
}
function bindData1(obj) {
	$("#MENU_ID").html(obj.cells[4].innerHTML);
	$("#MENU_NAME").html(obj.cells[5].innerHTML);
}
function initEvent() {
	$("#divMain2").css("height",$(window).height()-120);
}