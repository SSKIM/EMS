//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",true);
	readonly("#EXPS_TYPE_ID,#ACCT_CODE",true);
    // MANDATORY
	required("#EXPS_TYPE_ID,#EXPS_TYPE_NAME1,#EXPS_TYPE_NAME2,#ACCT_CODE",true);
	// EVENT
	$("#btnRetrieve").click(Retrieve);
    $("#btnAdd").click(Add);
    $("#btnUpdate").click(Update);
    $("#btnDelete").click(Delete);
	$("#btnNew").click(New);
	$("#btnCancel").click(Cancel);
	$("#btnPopupAcct").click(PopupAcct);
	// DEFAULT VALUE
	$("#dataTable1").tablesorter();
    initEvent();
    setRadioValue("STATUS","Y");
    setRadioValue("ASST_PURCHASE_YN","N");
    setRadioValue("ASST_PURCHASE_TI","N");
    setRadioValue("CC_CARD_INPUT_YN","N");
    setRadioValue("TRAFFIC_EXPS_YN","N");
	// Validate
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////
function Retrieve(key1) {
	Clear();

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn3.do?method=SA020Retrieve";
	var params = "&EXPS_TYPE_NAME1="+$("#S_EXPS_TYPE_NAME1").val()
	           + "&EXPS_TYPE_NAME2="+$("#S_EXPS_TYPE_NAME2").val()
	           + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			if($(result).find("DATA_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center><nobr>"+j+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("EXPS_TYPE_ID").text()+"</nobr></td>"
                +"<td><nobr>"+$(this).find("EXPS_TYPE_NAME1").text()+"</nobr></td>"
                +"<td><nobr>"+$(this).find("EXPS_TYPE_NAME2").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("ACCT_CODE").text()+"</nobr></td>"
                +"<td><nobr>"+$(this).find("ACCT_NAME").text()+"</nobr></td>"
                +"<td><nobr>"+$(this).find("REMARK1").text()+"</nobr></td>"
                +"<td><nobr>"+$(this).find("REMARK2").text()+"</nobr></td>"
                +"<td><nobr>"+$(this).find("REMARK3").text()+"</nobr></td>"
                +"<td><nobr>"+$(this).find("REMARK4").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("ASST_PURCHASE_YN").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("ASST_PURCHASE_TI").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("CC_CARD_INPUT_YN").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("TRAFFIC_EXPS_YN").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("STATUS").text()+"</nobr></td>"
                +"<td class=hidden><nobr>"+$(this).find("INS_DATE").text()+"</nobr></td>"
                +"<td class=hidden><nobr>"+$(this).find("INS_USER").text()+"</nobr></td>"
                +"<td class=hidden><nobr>"+$(this).find("UPD_DATE").text()+"</nobr></td>"
                +"<td class=hidden><nobr>"+$(this).find("UPD_USER").text()+"</nobr></td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
				var index = tableRowIndex(tableId,key1,"1");
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
function Add() {
	required("#EXPS_TYPE_ID,#EXPS_TYPE_NAME1,#EXPS_TYPE_NAME2,#ACCT_CODE",true);
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "scn3.do?method=SA020Insert&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}
			var key1 = $(result).find("DATA").find("dataPK").find("EXPS_TYPE_ID").text();
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
	required("#EXPS_TYPE_ID,#EXPS_TYPE_NAME1,#EXPS_TYPE_NAME2,#ACCT_CODE",true);
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "scn3.do?method=SA020Update&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}
			var key1 = $(result).find("DATA").find("dataPK").find("EXPS_TYPE_ID").text();
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
	required("#EXPS_TYPE_NAME1,#EXPS_TYPE_NAME2,#ACCT_CODE",false);
	required("#EXPS_TYPE_ID",true);
	if(!requiredValidate("#formData")) return;
	if(!window.confirm(W002)) { 
	    return false;
	}
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "scn3.do?method=SA020Delete&call=xml";
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
	readonly("#EXPS_TYPE_ID",false);
    // MANDATORY
	// DEFAULT VALUE
	setRadioValue("STATUS","Y");
	$("#EXPS_TYPE_ID").focus();
}
function Cancel() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",true);
	disabled("#btnNew,#btnUpdate,#btnDelete",false);
	readonly("#EXPS_TYPE_ID",true);
    // MANDATORY
	required("#EXPS_TYPE_ID,#EXPS_TYPE_NAME1,#EXPS_TYPE_NAME2",true);
	// RE-BIND DATA
	var rowIndex = $("#rowIndex").val();
	if(rowIndex!="" && !isNaN(rowIndex) && $("#dataTable tbody tr").length>0) {
		bindData(tableRowObj("#dataTable",rowIndex));
	}
}
function PopupAcct() {
	var param = new Object();
	
	var url   = "popup.do?method=CP050&screenId=CP050&screenIdRef=SA020&refVal=&isPopup=true";
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		$("#ACCT_CODE").val(retVal.ACCT_CODE);
		$("#ACCT_NAME").val(retVal.ACCT_NAME);
	}
}
function bindData(obj) {
	$("#rowIndex").val(obj.rowIndex);
	$("#EXPS_TYPE_ID").val(obj.cells[1].innerText);
	$("#EXPS_TYPE_NAME1").val(obj.cells[2].innerText);
	$("#EXPS_TYPE_NAME2").val(obj.cells[3].innerText);
	$("#ACCT_CODE").val(obj.cells[4].innerText);
	$("#ACCT_NAME").val(obj.cells[5].innerText);
	$("#REMARK1").val(obj.cells[6].innerText);
	$("#REMARK2").val(obj.cells[7].innerText);
	$("#REMARK3").val(obj.cells[8].innerText);
	$("#REMARK4").val(obj.cells[9].innerText);
	setRadioValue("ASST_PURCHASE_YN",obj.cells[10].innerText);
	setRadioValue("ASST_PURCHASE_TI",obj.cells[11].innerText);
	setRadioValue("CC_CARD_INPUT_YN",obj.cells[12].innerText);
	setRadioValue("TRAFFIC_EXPS_YN",obj.cells[13].innerText);
	setRadioValue("STATUS",obj.cells[14].innerText);
	$("#INS_DATE").html(obj.cells[15].innerText);
	$("#INS_USER").html(obj.cells[16].innerText);
	$("#UPD_DATE").html(obj.cells[17].innerText);
	$("#UPD_USER").html(obj.cells[18].innerText);
}
function Clear() {
	$('#formData').clearForm();
	//$(":input").not(':button, :submit, :reset, :hidden, :radio').val("");
	setRadioValue("STATUS","Y");
    setRadioValue("ASST_PURCHASE_YN","N");
    setRadioValue("ASST_PURCHASE_TI","N");
    setRadioValue("CC_CARD_INPUT_YN","N");
    setRadioValue("TRAFFIC_EXPS_YN","N");
	requiredClear();
	$("#tree1").empty();
	$("#output").hide();

	disabled("#btnNew,#btnUpdate,#btnDelete",false);
	disabled("#btnAdd,#btnCancel",true);
	readonly("#EXPS_TYPE_ID,#ACCT_CODE",true);
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-298);
}
