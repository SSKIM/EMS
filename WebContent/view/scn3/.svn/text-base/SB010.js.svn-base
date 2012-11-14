//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",true);
	readonly("#CODE_ID",true);
    // MANDATORY
	required("#CODE_ID,#CODE_NAME",true);
	// EVENT
	$("#btnRetrieve").click(Retrieve);
    $("#btnAdd").click(Insert);
    $("#btnUpdate").click(Update);
    $("#btnDelete").click(Delete);
	$("#btnNew").click(New);
	$("#btnCancel").click(Cancel);
	$("#S_CODE_ID,#S_CODE_NAME").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	// DEFAULT VALUE
    $("#dataTable").tablesorter();
    initEvent();
	setRadioValue("STATUS","Y");
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(key1,key2) {
	Cancel();
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn3.do?method=SB010Retrieve";
	var params = "&CODE_ID="+$("#S_CODE_ID").val()
               + "&CODE_NAME="+getString("#S_CODE_NAME")
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
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("CODE_ID").text()+"</td>"
                +"<td>"+$(this).find("CODE_NAME").text()+"</td>"
                +"<td>"+$(this).find("ETC1").text()+"</td>"
                +"<td>"+$(this).find("ETC2").text()+"</td>"
                +"<td>"+$(this).find("ETC3").text()+"</td>"
				+"<td align=center>"+$(this).find("STATUS").text()+"</td>"
                +"<td style=display:none>"+$(this).find("INS_DATE").text()+"</td>"
                +"<td style=display:none>"+$(this).find("INS_USER").text()+"</td>"
                +"<td style=display:none>"+$(this).find("UPD_DATE").text()+"</td>"
                +"<td style=display:none>"+$(this).find("UPD_USER").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
//				var index = tableRowIndex(tableId,new Array(key1,key2),"1,2");
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
function Insert() {
	if(!requiredValidate("#formData1")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EA010Insert&call=xml&CODE_GRP=S099";
    var params = $("#formData1").serialize();

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}

			var key1 = $(result).find("DATA").find("dataPK").find("CODE_GRP").text();
			var key2 = $(result).find("DATA").find("dataPK").find("CODE_ID").text();
			Retrieve(key1,key2);
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
	if(!requiredValidate("#formData1")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EA010Update&call=xml&CODE_GRP=S099";
    var params = $("#formData1").serialize();

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}
			var key1 = $(result).find("DATA").find("dataPK").find("CODE_GRP").text();
			var key2 = $(result).find("DATA").find("dataPK").find("CODE_ID").text();
			Retrieve(key1,key2);
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
    var action = "system.do?method=EA010Delete&call=xml&CODE_GRP=S099";
    var params = $("#formData1").serialize();

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
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
	readonly("#CODE_ID",false);
    // MANDATORY
	// DEFAULT VALUE
	setRadioValue("STATUS","Y");
	$("#CODE_ID").focus();
}
function Cancel() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",true);
	disabled("#btnNew,#btnUpdate,#btnDelete",false);
	readonly("#CODE_ID",true);
    // MANDATORY
	required("#CODE_ID,#CODE_NAME",true);
	// RE-BIND DATA
	var rowIndex = $("#rowIndex").val();
	if(rowIndex!="" && !isNaN(rowIndex) && $("#dataTable tbody tr").length>0) {
		bindData(tableRowObj("#dataTable",rowIndex));
	}
}
function bindData(obj) {
	$("#rowIndex").val(obj.rowIndex);
	if(!$("#btnNew").attr("disabled")) {
		$("#CODE_ID").val(obj.cells[1].innerHTML);
	}
	$("#CODE_NAME").val(obj.cells[2].innerHTML);
	$("#ETC1").val(obj.cells[3].innerHTML);
	$("#ETC2").val(obj.cells[4].innerHTML);
	$("#ETC3").val(obj.cells[5].innerHTML);
	setRadioValue("STATUS",obj.cells[6].innerHTML);
	$("#INS_DATE").html(obj.cells[7].innerHTML);
	$("#INS_USER").html(obj.cells[8].innerHTML);
	$("#UPD_DATE").html(obj.cells[9].innerHTML);
	$("#UPD_USER").html(obj.cells[10].innerHTML);
}
function Clear() {
	$('#formData1').clearForm();
	//$(":input").not(':button, :submit, :reset, :hidden, :radio').val("");
	setRadioValue("STATUS","Y");
	requiredClear();
	$("#tree1").empty();
	$("#output").hide();	
}

function initEvent() {
	$("#divMain").css("height",$(window).height()-210);
}
