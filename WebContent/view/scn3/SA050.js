//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",true);
	readonly("#CODE_ID",true);
    // MANDATORY
	required("#SEQ",true);
	// EVENT
	$("#btnRetrieve").click(Retrieve);
    $("#btnAdd").click(Insert);
    $("#btnUpdate").click(Update);
    $("#btnDelete").click(Delete);
	$("#btnNew").click(New);
	$("#btnCancel").click(Cancel);
	$("#S_ORGC_CODE,#S_TEAM_CODE,#S_DEPT_CODE,#S_DEPT_NAME").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	// DEFAULT VALUE
    $("#dataTable").tablesorter();
    initEvent();
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(key1) {
	Cancel();
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn3.do?method=SA050Retrieve";
	var params = "&ORGC_CODE="+$("#S_ORGC_CODE").val()
               + "&TEAM_CODE="+$("#S_TEAM_CODE").val()
               + "&DEPT_CODE="+$("#S_DEPT_CODE").val()
               + "&DEPT_NAME="+getString("#S_DEPT_NAME")
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
                +"<td align=center>"+$(this).find("SEQ").text()+"</td>"
                +"<td align=center>"+$(this).find("DEPT_CODE").text()+"</td>"
                +"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("ORGC_CODE").text()+"</td>"
                +"<td align=center>"+$(this).find("TEAM_CODE").text()+"</td>"
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
				var index = tableRowIndex(tableId,new Array(key1),"1");
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
	if(!requiredValidate("#formData1")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "scn3.do?method=SA050Insert&call=xml";
    var params = $("#formData1").serialize();

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}

			var key1 = $(result).find("DATA").find("dataPK").find("SEQ").text();
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
	if(!requiredValidate("#formData1")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "scn3.do?method=SA050Update&call=xml";
    var params = $("#formData1").serialize();

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}
			var key1 = $(result).find("DATA").find("dataPK").find("SEQ").text();
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
    var action = "scn3.do?method=SA050Delete&call=xml";
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
//	readonly("#SEQ",false);
    // MANDATORY
	required("#SEQ",false);
	// DEFAULT VALUE
	setRadioValue("STATUS","Y");
	$("#DEPT_CODE").focus();
}
function Cancel() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel",true);
	disabled("#btnNew,#btnUpdate,#btnDelete",false);
	readonly("#SEQ",true);
    // MANDATORY
	required("#SEQ",true);
	// RE-BIND DATA
	var rowIndex = $("#rowIndex").val();
	if(rowIndex!="" && !isNaN(rowIndex) && $("#dataTable tbody tr").length>0) {
		bindData(tableRowObj("#dataTable",rowIndex));
	}
}
function bindData(obj) {
	$("#rowIndex").val(obj.rowIndex);
	if(!$("#btnNew").attr("disabled")) {
		$("#SEQ").val(obj.cells[1].innerHTML);
	}
	$("#DEPT_CODE").val(obj.cells[2].innerHTML);
	$("#DEPT_NAME").val(obj.cells[3].innerHTML);
	$("#ORGC_CODE").val(obj.cells[4].innerHTML);
	$("#TEAM_CODE").val(obj.cells[5].innerHTML);
	$("#INS_DATE").html(obj.cells[6].innerHTML);
	$("#INS_USER").html(obj.cells[7].innerHTML);
	$("#UPD_DATE").html(obj.cells[8].innerHTML);
	$("#UPD_USER").html(obj.cells[9].innerHTML);
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
	$("#divMain").css("height",$(window).height()-220);
}
