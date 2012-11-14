//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",true);
	readonly("#MENU_ID,#MENU_REF,#MENU_LEVEL,#SCREEN_ID",true);
    // MANDATORY
	required("#MENU_ID,#MENU_NAME,#MENU_NAME2,#MENU_REF,#MENU_TYPE",true);
	// EVENT
	$("#btnRetrieve").click(Retrieve);
    $("#btnAdd").click(Insert);
    $("#btnUpdate").click(Update);
    $("#btnDelete").click(Delete);
	$("#btnNew").click(New);
	$("#btnCancel").click(Cancel);
	$("#btnPrint").click(Print);
	$("#MENU_ID2,#MENU_NAME2").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	$("#MENU_TYPE").change(function(){
		if("L" == $(this).val()) {
			$("#SCREEN_ID").addClass("required");
		} else {
			$("#SCREEN_ID").removeClass("required");
		}
	});
	$("#btnPopupMenuRef").click(function()  { popupMenu(); });
	$("#btnPopupScreenID").click(function() { popupScreen(); });
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
	var action = "system.do?method=EA030Retrieve";
	var data   = "&MENU_ID="+$("#MENU_ID2").val()
               + "&MENU_NAME="+getString("#MENU_NAME3")
               + "&MENU_REF="+$("#MENU_GRP2").val()
               + "&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+dataRow+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("MENU_ID").text()+"</td>"
                +"<td>"+$(this).find("MENU_NAME").text()+"</td>"
                +"<td>"+$(this).find("MENU_NAME2").text()+"</td>"
                +"<td align=center>"+$(this).find("MENU_REF").text()+"</td>"
                +"<td align=center>"+$(this).find("MENU_TYPE").text()+"</td>"
                +"<td>"+$(this).find("MENU_URL").text()+"</td>"
                +"<td>"+$(this).find("MENU_NAVI").text()+"</td>"
                +"<td align=center>"+$(this).find("MENU_LEVEL").text()+"</td>"
				+"<td align=center>"+$(this).find("SCREEN_ID").text()+"</td>"
				+"<td>"+$(this).find("SORT_SEQ").text()+"</td>"
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
    var action = "system.do?method=EA030Insert&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("MENU_ID").text();
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
    var action = "system.do?method=EA030Update&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("MENU_ID").text();
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
    var action = "system.do?method=EA030Delete&call=xml";
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
function Print() {
	var action = "report.do?filename=report1";
	var param  = "&filetype="+"&param=,P_MENU_ID:"+",P_MENU_NAME:&params=P_MENU_REF:1100^1200^1300";

	$.ajax({type: "get", url: action, data: param, cache: false});
}
function New() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",false);
	disabled("#btnNew,#btnUpdate,#btnDelete",true);
	readonly("#MENU_ID",false);
    // MANDATORY
	required("MENU_ID",false);
	// DEFAULT VALUE
	setRadioValue("STATUS","Y");
	$("#MENU_NAME").focus();
}
function Cancel() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",true);
	disabled("#btnNew,#btnUpdate,#btnDelete",false);
	readonly("#MENU_ID,#MENU_REF,#MENU_LEVEL,#SCREEN_ID",true);
    // MANDATORY
	required("#MENU_ID,#MENU_NAME,#MENU_REF,#MENU_TYPE",true);
	// RE-BIND DATA
	var rowIndex = $("#rowIndex").val();
	if(rowIndex!="" && !isNaN(rowIndex) && $("#dataTable tbody tr").length>0) {
		bindData(tableRowObj("#dataTable",rowIndex));
	}
}
function popupMenu() {
	var param = new Object();
	param.MENU_REF = $("#MENU_GRP2").val();
	
	var url   = "popup.do?method=CP030&screenId=CP030&screenIdRef=EA030&refVal=&isPopup=true";;
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		$("#MENU_REF").val(retVal.MENU_ID);
	}
}
function popupScreen() {
	var param = new Object();
	param.MENU_REF = $("#MENU_GRP2").val();

	var url   = "popup.do?method=CP020&screenId=CP020&screenIdRef=EA030&refVal=&isPopup=true";;
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		$("#SCREEN_ID").val(retVal.SCREEN_ID);
	}
}
function bindData(obj) {
	$("#rowIndex").val(obj.cells[0].innerHTML);
	if(!$("#btnNew").attr("disabled")) {
		$("#MENU_ID").val(obj.cells[1].innerHTML);
	}
	$("#MENU_NAME").val(obj.cells[2].innerHTML);
	$("#MENU_NAME2").val(obj.cells[3].innerHTML);
	$("#MENU_REF").val(obj.cells[4].innerHTML);
	$("#MENU_TYPE").val(obj.cells[5].innerHTML);
	$("#MENU_URL").val(obj.cells[6].innerHTML);
	$("#MENU_NAVI").val(obj.cells[7].innerHTML);
	$("#MENU_LEVEL").val(obj.cells[8].innerHTML);
	$("#SCREEN_ID").val(obj.cells[9].innerHTML);
	$("#SORT_SEQ").val(obj.cells[10].innerHTML);
	setRadioValue("STATUS",obj.cells[11].innerHTML);
	$("#INS_DATE").html(obj.cells[12].innerHTML);
	$("#INS_USER").html(obj.cells[13].innerHTML);
	$("#UPD_DATE").html(obj.cells[14].innerHTML);
	$("#UPD_USER").html(obj.cells[15].innerHTML);

	if("L" == $("#MENU_TYPE").val()) {
		$("#SCREEN_ID").addClass("required");
	} else {
		$("#SCREEN_ID").removeClass("required");
	}
}
function Clear() {
	$('#formData').clearForm();
	//$(":input").not(':button, :submit, :reset, :hidden, :radio').val("");
	$("#MENU_TYPE").val("");
	setRadioValue("STATUS","Y");
	requiredClear();
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-232);
}