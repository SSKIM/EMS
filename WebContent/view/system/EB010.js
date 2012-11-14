//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnAdd,#btnCancel,#btnChangePwd",true);
	readonly("#USER_ID",true);
    // MANDATORY
	required("#BUSI_UNIT_TYPE,#LEDGER_TYPE,#DEPT_CODE,#USER_ID,#USER_NAME,#USER_TYPE,#LAN_TYPE",true);
	// EVENT
	$("#btnRetrieve").click(Retrieve);
    $("#btnAdd").click(Insert);
    $("#btnUpdate").click(Update);
    $("#btnDelete").click(Delete);
	$("#btnNew").click(New);
	$("#btnCancel").click(Cancel);
	$("#btnChangePwd").click(Change);
	$("#USER_ID2,#USER_NAME2").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	// ETC
//    $("#dataTable").tablesorter();
	initEvent();
	// DEFAULT VALUE
	setRadioValue("STATUS","Y");
	setRadioValue("PWD_CHNG_TYPE","N");
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
	var action = "system.do?method=EB010Retrieve";
	var data   = "&USER_ID="+$("#USER_ID2").val()
               + "&USER_NAME="+getString("#USER_NAME2")
               + "&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+dataRow+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("USER_ID").text()+"</td>"
                +"<td>"+$(this).find("USER_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("USER_TYPE").text()+"</td>"
                +"<td>"+$(this).find("EMPL_ID").text()+"</td>"
                +"<td>"+$(this).find("TEL_NO").text()+"</td>"
                +"<td>"+$(this).find("HP_NO").text()+"</td>"
                +"<td>"+$(this).find("EMAIL").text()+"</td>"
                +"<td align=center>"+$(this).find("DEPT_CODE").text()+"</td>"
                +"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("BUSI_UNIT_TYPE").text()+"</td>"
                +"<td align=center>"+$(this).find("LEDGER_TYPE").text()+"</td>"
				+"<td align=center>"+$(this).find("STATUS").text()+"</td>"
				+"<td align=center>"+$(this).find("PWD_CHNG_TYPE").text()+"</td>"
				+"<td align=center>"+$(this).find("LOGIN_FAIL_CNT").text()+"</td>"
				+"<td align=center>"+$(this).find("LAN_TYPE").text()+"</td>"
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
    var action = "system.do?method=EB010Insert&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("USER_ID").text();
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
	if(!requiredValidate("#formData")) return false;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EB010Update&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("USER_ID").text();
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

    var action = "system.do?method=EB010Delete&call=xml";
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
function Change() {	
	var password = $("#PASSWORD").val().trim();
	if(password=="") {
		alert("비밀번호를 입력해 주세요!");
		$("#PASSWORD").focus();
		return false;
	}
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EB010Change&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

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
	disabled("#btnAdd,#btnCancel",false);
	disabled("#btnNew,#btnUpdate,#btnDelete",true);
	readonly("#USER_ID",false);
	$("#USER_ID").focus();
}
function Cancel() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel,#btnChangePwd",true);
	disabled("#btnNew,#btnUpdate,#btnDelete",false);
	readonly("#USER_ID",true);
    // MANDATORY
	required("#USER_ID,#USER_NAME,#USER_TYPE",true);
	// RE-BIND DATA
	var rowIndex = $("#rowIndex").val();
	if(rowIndex!="" && !isNaN(rowIndex) && $("#dataTable tbody tr").length>0) {
		bindData(tableRowObj("#dataTable",rowIndex));
	}
}
function bindData(obj) {
	$("#rowIndex").val(obj.cells[0].innerHTML);
	if(!$("#btnNew").attr("disabled")) {
		$("#USER_ID").val(obj.cells[1].innerHTML);
	}
	$("#USER_NAME").val(obj.cells[2].innerHTML);
	$("#USER_TYPE").val(obj.cells[3].innerHTML);
	$("#EMPL_ID").val(obj.cells[4].innerHTML);
	$("#TEL_NO").val(obj.cells[5].innerHTML);
	$("#HP_NO").val(obj.cells[6].innerHTML);
	$("#EMAIL").val(obj.cells[7].innerHTML);
	$("#DEPT_CODE").val(obj.cells[8].innerHTML);
	$("#BUSI_UNIT_TYPE").val(obj.cells[10].innerHTML);
	$("#LEDGER_TYPE").val(obj.cells[11].innerHTML);
	setRadioValue("STATUS",obj.cells[12].innerHTML);
	setRadioValue("PWD_CHNG_TYPE",obj.cells[13].innerHTML);
	$("#LOGIN_FAIL_CNT").val(obj.cells[14].innerHTML);
	$("#LAN_TYPE").val(obj.cells[15].innerHTML);
	$("#INS_DATE").html(obj.cells[16].innerHTML);
	$("#INS_USER").html(obj.cells[17].innerHTML);
	$("#UPD_DATE").html(obj.cells[18].innerHTML);
	$("#UPD_USER").html(obj.cells[19].innerHTML);
	$("#btnChangePwd").removeAttr("disabled");
}
function Clear() {
	$('#formData').clearForm();
	//$(":input").not(':button, :submit, :reset, :hidden, :radio').val("");
	$("#USER_TYPE,#DEPT_CODE,#BUSI_UNIT_TYPE,#LEDGER_TYPE,LAN_TYPE").val("");
	setRadioValue("STATUS","Y");
	setRadioValue("PWD_CHNG_TYPE","N");
	requiredClear();
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-255);
}