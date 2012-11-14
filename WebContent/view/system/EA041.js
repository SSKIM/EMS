//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	// DEFAULT VALUE
	setRadioValue("STATUS","Y");
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnAdd").click(Add);
    $("#btnUpdate").click(Update);
    $("#btnDelete").click(Delete);
	$("#SCREEN_ID2,#SCREEN_NAME2").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	// ETC
//    $("#dataTable").tablesorter();
	initEvent();
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}
function dataTableRow2_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable2',obj.rowIndex);
	bindData2(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(key1) {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody,#dataTable2 tbody").empty();

	var j = 0;
	var action = "system.do?method=EA041Retrieve";
	var data   = "&SCREEN_ID="+$("#SCREEN_ID2").val()
               + "&SCREEN_NAME="+getString("#SCREEN_NAME2")
               + "&viewMode=&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("SCREEN_ID").text()+"</td>"
                +"<td>"+$(this).find("SCREEN_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("SCREEN_TYPE").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
//				var index = tableRowIndex(tableId,key1);
//				tableRowColor(tableId,index);
//				bindData(tableRowObj(tableId,index));
			}

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}

function Retrieve2(screenId,buttonId) {
	var tableId = "#dataTable2", tableRowId = "dataTableRow2";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "system.do?method=EA041Retrieve";
	var data   = "&SCREEN_ID="+screenId
               + "&viewMode=BUTTON&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result) {
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("SCREEN_ID").text()+"</td>"
                +"<td><input type=\"text\" id=\"BUTTON_ID"+j+"\" name=\"BUTTON_ID\" value=\""+$(this).find("BUTTON_ID").text()+"\" style=\"width:99%\" readonly=\"true\" class=\"readonly\"/></td>"
                +"<td>"+$(this).find("BUTTON_NAME").text()+"</td>"
                +"<td align=center><input type=\"text\" id=\"BUTTON_GRP"+j+"\" name=\"BUTTON_GRP\" value=\""+$(this).find("BUTTON_GRP").text()+"\" style=\"width:40px\" /></td>"
                +"<td align=center><input type=\"text\" id=\"BUTTON_SEQ"+j+"\" name=\"BUTTON_SEQ\" value=\""+$(this).find("BUTTON_SEQ").text()+"\" style=\"width:40px\" /></td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
				var index = tableRowIndex(tableId,new Array(screenId,buttonId),"1,2");
				tableRowColor(tableId,index);
				bindData2(tableRowObj(tableId,index));
			}

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Add() {
	var screenID = $("#SCREEN_ID").html();
	if(screenID == "") {
		alert(W003);
		return;
	}

	var param = new Object();
	param.SCREEN_ID = screenID;

	var url   = "popup.do?method=CP040&screenId=CP040&screenIdRef=EA041&refVal=&isPopup=true";
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		Retrieve2(screenID,'');
	}
}
function Update() {
	if(!requiredValidate("#formData")) return;
	var screenId = $("#SCREEN_ID").html();
	var buttonId = $("#BUTTON_ID").html();
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EA041Update&call=xml";
    var data   = $("#formData").serialize()
               + "&SCREEN_ID="+screenId
               + "&BUTTON_ID="+buttonId;

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result) {
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			Retrieve2(screenId,buttonId);
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Delete() {
	if(!window.confirm(W002)) {
	    return false;
	}

    var action = "system.do?method=EA041Delete&call=xml";
    var data   = "&SCREEN_ID="+$("#SCREEN_ID").html()
               + "&BUTTON_ID="+$("#BUTTON_ID").html();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			Retrieve2($("#SCREEN_ID").html(),'');
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function bindData(obj) {
	$("#SCREEN_ID,#SCREEN_NAME").empty();

	var screenId   = obj.cells[1].innerHTML;
	var screenName = obj.cells[2].innerHTML;

	$("#SCREEN_ID").html(screenId);
	$("#SCREEN_NAME").html(screenName);
	Retrieve2(screenId,'');
}
function bindData2(obj) {
	$("#BUTTON_ID").html($("#BUTTON_ID"+obj.rowIndex).val());
	$("#BUTTON_NAME").html(obj.cells[3].innerHTML);
}
function initEvent() {
	$("#divMain1,#divMain2").css("height",$(window).height()-120);
}