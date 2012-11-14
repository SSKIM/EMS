//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",true);
	readonly("#SCREEN_ID",true);
    // MANDATORY
	required("#SCREEN_ID,#SCREEN_NAME,#SCREEN_TYPE",true);
	// EVENT
	$("#btnRetrieve").click(Retrieve);
    $("#btnAdd").click(Insert);
    $("#btnUpdate").click(Update);
    $("#btnDelete").click(Delete);
	$("#btnNew").click(New);
	$("#btnCancel").click(Cancel);
	$("#SCREEN_ID2,#SCREEN_NAME2").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	// ETC
    $("#dataTable1").tablesorter();
	initEvent();
	// DEFAULT VALUE
	setRadioValue("STATUS","Y");
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(key1) {
	Cancel();

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "system.do?method=EA020Retrieve";
	var data   = "&SCREEN_ID="+$("#SCREEN_ID2").val()
               + "&SCREEN_NAME="+getString("#SCREEN_NAME2")
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
                +"<td>"+$(this).find("REMARK").text()+"</td>"
				+"<td align=center>"+$(this).find("STATUS").text()+"</td>"
                +"<td class=hidden>"+$(this).find("INS_DATE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("INS_USER").text()+"</td>"
                +"<td class=hidden>"+$(this).find("UPD_DATE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("UPD_USER").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

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
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Insert() {
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EA020Insert&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("SCREEN_ID").text();
			Retrieve(key1);
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Update() {
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EA020Update&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("SCREEN_ID").text();
			Retrieve(key1);
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
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
    var action = "system.do?method=EA020Delete&call=xml";
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
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function New() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",false);
	disabled("#btnNew,#btnUpdate,#btnDelete",true);
	readonly("#SCREEN_ID",false);
    // MANDATORY
	required("SCREEN_ID",false);
	// DEFAULT VALUE
	setRadioValue("STATUS","Y");
	$("#SCREEN_ID").focus();
}
function Cancel() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",true);
	disabled("#btnNew,#btnUpdate,#btnDelete",false);
	readonly("#SCREEN_ID",true);
    // MANDATORY
	required("#SCREEN_ID,#SCREEN_NAME,#SCREEN_TYPE",true);
	// RE-BIND DATA
	var rowIndex = $("#rowIndex").val();
	if(rowIndex!="" && !isNaN(rowIndex) && $("#dataTable1 tbody tr").length>0) {
		bindData(tableRowObj("#dataTable1",rowIndex));
	}
}
function bindData(obj) {
	$("#rowIndex").val(obj.cells[0].innerHTML);
	if(!$("#btnNew").attr("disabled")) {
		$("#SCREEN_ID").val(obj.cells[1].innerHTML);
	}
	$("#SCREEN_NAME").val(obj.cells[2].innerHTML);
	$("#SCREEN_TYPE").val(obj.cells[3].innerHTML);
	$("#SCREEN_URL").val(obj.cells[4].innerHTML);
	$("#REMARK").val(obj.cells[5].innerHTML);
	setRadioValue("STATUS",obj.cells[6].innerHTML);
	$("#INS_DATE").html(obj.cells[7].innerHTML);
	$("#INS_USER").html(obj.cells[8].innerHTML);
	$("#UPD_DATE").html(obj.cells[9].innerHTML);
	$("#UPD_USER").html(obj.cells[10].innerHTML);
}
function Clear() {
	$('#formData').clearForm();
	//$(":input").not(':button, :submit, :reset, :hidden, :radio').val("");
	$("#SCREEN_TYPE").val("");
	setRadioValue("STATUS","Y");
	requiredClear();
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-208);
}