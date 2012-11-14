//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",true);
	readonly("#BUTTON_ID",true);
    // MANDATORY
	required("#BUTTON_ID,#BUTTON_NAME",true);
	// EVENT
	$("#btnRetrieve").click(Retrieve);
    $("#btnAdd").click(Insert);
    $("#btnUpdate").click(Update);
    $("#btnDelete").click(Delete);
	$("#btnNew").click(New);
	$("#btnCancel").click(Cancel);
	$("#BUTTON_ID2,#BUTTON_NAME2").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	// ETC
    $("#dataTable").tablesorter();
	initEvent();
	// DEFAULT VALUE
	setRadioValue("STATUS","Y");
});
function dataTableRow_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable',obj.rowIndex);
	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(key1) {
	Cancel();
	var tableId = "#dataTable", dataRow = "dataRow_";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "system.do?method=EA040Retrieve";
	var data   = "&BUTTON_ID="+$("#BUTTON_ID2").val()
               + "&BUTTON_NAME="+getString("#BUTTON_NAME2")
               + "&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+dataRow+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td>"+$(this).find("BUTTON_ID").text()+"</td>"
                +"<td>"+$(this).find("BUTTON_NAME").text()+"</td>"
                +"<td>"+$(this).find("IMG_PATH").text()+"</td>"
                +"<td align=right>"+$(this).find("IMG_WIDTH").text()+"</td>"
                +"<td align=right>"+$(this).find("IMG_HEIGHT").text()+"</td>"
                +"<td>"+$(this).find("CSS").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td align=right>"+$(this).find("SORT_SEQ").text()+"</td>"
				+"<td align=center>"+$(this).find("STATUS").text()+"</td>"
                +"<td class=hidden>"+$(this).find("INS_DATE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("INS_USER").text()+"</td>"
                +"<td class=hidden>"+$(this).find("UPD_DATE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("UPD_USER").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,"dataTableRow",1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
				var index = tableRowIndex(tableId,key1);
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
function Insert() {
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EA040Insert&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("BUTTON_ID").text();
			Retrieve(key1);
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Update() {
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EA040Update&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("BUTTON_ID").text();
			Retrieve(key1);
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Delete() {
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!window.confirm(W002)) { 
	    return false;
	}
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EA040Delete&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			Retrieve();
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function New() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",false);
	disabled("#btnNew,#btnUpdate,#btnDelete",true);
	readonly("#BUTTON_ID",false);
    // MANDATORY
	// DEFAULT VALUE
	setRadioValue("STATUS","Y");
	$("#BUTTON_ID").focus();
}
function Cancel() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",true);
	disabled("#btnNew,#btnUpdate,#btnDelete",false);
	readonly("#BUTTON_ID",true);
    // MANDATORY
	required("#BUTTON_ID,#BUTTON_NAME",true);
	// RE-BIND DATA
	var rowIndex = $("#rowIndex").val();
	if(rowIndex!="" && !isNaN(rowIndex) && $("#dataTable tbody tr").length>0) {
		bindData(tableRowObj("#dataTable",rowIndex));
	}
}
function bindData(obj) {
	$("#rowIndex").val(obj.cells[0].innerHTML);
	if(!$("#btnNew").attr("disabled")) {
		$("#BUTTON_ID").val(obj.cells[1].innerHTML);
	}
	$("#BUTTON_NAME").val(obj.cells[2].innerHTML);
	$("#IMG_PATH").val(obj.cells[3].innerHTML);
	$("#IMG_WIDTH").val(obj.cells[4].innerHTML);
	$("#IMG_HEIGHT").val(obj.cells[5].innerHTML);
	$("#CSS").val(obj.cells[6].innerHTML);
	$("#REMARK").val(obj.cells[7].innerHTML);
	$("#SORT_SEQ").val(obj.cells[8].innerHTML);
	setRadioValue("STATUS",obj.cells[9].innerHTML);
	$("#INS_DATE").html(obj.cells[10].innerHTML);
	$("#INS_USER").html(obj.cells[11].innerHTML);
	$("#UPD_DATE").html(obj.cells[12].innerHTML);
	$("#UPD_USER").html(obj.cells[13].innerHTML);
}
function Clear() {
	$('#formData').clearForm();
	//$(":input").not(':button, :submit, :reset, :hidden, :radio').val("");
	setRadioValue("STATUS","Y");
	requiredClear();
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-232);
}