//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnInsert,#btnCancel",true);
	readonly("#CODE_ID,#CODE_GRP",true);
    // MANDATORY
	required("#CODE_ID,#CODE_NAME,#CODE_GRP",true);
	// EVENT
	$("#btnRetrieve").click(Retrieve);
    $("#btnAdd").click(Insert);
    $("#btnUpdate").click(Update);
    $("#btnDelete").click(Delete);
	$("#btnNew").click(New);
	$("#btnCancel").click(Cancel);
	$("#CODE_GRP2,#CODE_ID2,#CODE_NAME2").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	// DEFAULT VALUE
    $("#dataTable").tablesorter();
	initEvent();
	setRadioValue("STATUS","Y");
});
function dataTableRow_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable',obj.rowIndex);
	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(key1,key2) {
	Cancel();
	var tableId = "#dataTable", dataRow = "dataRow_";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "system.do?method=EA010Retrieve";
	var data   = "&CODE_GRP="+$("#CODE_GRP2").val()
               + "&CODE_ID="+$("#CODE_ID2").val()
               + "&CODE_NAME="+getString("#CODE_NAME2")
               + "&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}

			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+dataRow+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("CODE_GRP").text()+"</td>"
                +"<td align=center>"+$(this).find("CODE_ID").text()+"</td>"
                +"<td>"+$(this).find("CODE_NAME").text()+"</td>"
                +"<td>"+$(this).find("ETC1").text()+"</td>"
                +"<td>"+$(this).find("ETC2").text()+"</td>"
                +"<td>"+$(this).find("ETC3").text()+"</td>"
				+"<td align=center>"+$(this).find("SORT_SEQ").text()+"</td>"
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
				var index = tableRowIndex(tableId,new Array(key1,key2),"1,2");
				tableRowColor(tableId,index);
				bindData(tableRowObj(tableId,index));
			}

			$("div.status").html(dataCnt+" "+I002);
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
    var action = "system.do?method=EA010Insert&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}

			var key1 = $(result).find("DATA").find("dataPK").find("CODE_GRP").text();
			var key2 = $(result).find("DATA").find("dataPK").find("CODE_ID").text();
			Retrieve(key1,key2);
			$("div.status").html(I003);
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
    var action = "system.do?method=EA010Update&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}

			var key1 = $(result).find("DATA").find("dataPK").find("CODE_GRP").text();
			var key2 = $(result).find("DATA").find("dataPK").find("CODE_ID").text();
			Retrieve(key1,key2);
			$("div.status").html(I003);
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
    var action = "system.do?method=EA010Delete&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}

			Retrieve();
			$("div.status").html(I003);
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
	readonly("#CODE_ID,#CODE_GRP",false);
    // MANDATORY
	// DEFAULT VALUE
	setRadioValue("STATUS","Y");
	$("#CODE_GRP").focus();
}
function Cancel() {
	Clear();
	// READONLY MODE
	disabled("#btnInsert,#btnCancel",true);
	disabled("#btnNew,#btnUpdate,#btnDelete",false);
	readonly("#CODE_ID,#CODE_GRP",true);
    // MANDATORY
	required("#CODE_ID,#CODE_NAME,#CODE_GRP",true);
	// RE-BIND DATA
	var rowIndex = $("#rowIndex").val();
	if(rowIndex!="" && !isNaN(rowIndex) && $("#dataTable tbody tr").length>0) {
		bindData(tableRowObj("#dataTable",rowIndex));
	}
}
function bindData(obj) {
	$("#rowIndex").val(obj.cells[0].innerHTML);
	$("#CODE_GRP").val(obj.cells[1].innerHTML);
	if(!$("#btnNew").attr("disabled")) {
		$("#CODE_ID").val(obj.cells[2].innerHTML);
	}
	$("#CODE_NAME").val(obj.cells[3].innerHTML);
	$("#ETC1").val(obj.cells[4].innerHTML);
	$("#ETC2").val(obj.cells[5].innerHTML);
	$("#ETC3").val(obj.cells[6].innerHTML);
	$("#SORT_SEQ").val(obj.cells[7].innerHTML);
	setRadioValue("STATUS",obj.cells[8].innerHTML);
	$("#INS_DATE").html(obj.cells[9].innerHTML);
	$("#INS_USER").html(obj.cells[10].innerHTML);
	$("#UPD_DATE").html(obj.cells[11].innerHTML);
	$("#UPD_USER").html(obj.cells[12].innerHTML);
}
function Clear() {
	$('#formData').clearForm();
	//$(":input").not(':button, :submit, :reset, :hidden, :radio').val("");
	setRadioValue("STATUS","Y");
	requiredClear();
	$("#tree1").empty();
	$("#output").hide();	
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-232);
}