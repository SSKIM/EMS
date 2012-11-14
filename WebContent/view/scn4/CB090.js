//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnSave",true);
    // MANDATORY
	// EVENT
	$("#btnExcelLoad").click(ExcelLoad);
	$("#btnSave").click(Save);
	$("#filename").change(function(){
		$("#dataTable1 tbody").empty();
		disabled("#btnExcelLoad",false);
		disabled("#btnSave",true);
	});
	// DEFAULT VALUE
    initEvent();
	$("#dataTable1").tablesorter();
	// Validate
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
//	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function ExcelLoad() {
	if(!$('#filename').val()) {
		alert("파일을 먼저 선택해 주세요!");
		$('#filename').focus();
		return;
	}
	var ext = $('#filename').val().split('.').pop().toLowerCase();
	if($.inArray(ext, ['xls','xlsx']) == -1) {
		alert('invalid extension!');
		return;
	}

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AB090ExcelLoad&FileName="+$('#filename').val();
	var params = "&call=";

    $('#formData').ajaxForm({
    	dataType: "xml",
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
	            +"<td align=center><nobr>"+String($(this).find("COL1").text())+"</nobr></td>"
	            +"<td align=center><nobr>"+String($(this).find("COL2").text())+"</nobr></td>"
	            +"<td align=center><nobr>"+String($(this).find("COL3").text())+"</nobr></td>"
	            +"<td><nobr>"+$(this).find("COL4").text()+"</nobr></td>"
	            +"<td><nobr>"+$(this).find("COL5").text()+"</nobr></td>"
	            +"<td><nobr>"+$(this).find("COL6").text()+"</nobr></td>"
	            +"<td align=right><nobr>"+String($(this).find("COL7").text())+"</nobr></td>"
	            +"<td align=right><nobr>"+String($(this).find("COL8").text())+"</nobr></td>"
	            +"<td align=right><nobr>"+String($(this).find("COL9").text())+"</nobr></td>"
	            +"<td align=right><nobr>"+String($(this).find("COL10").text())+"</nobr></td>"
	            +"<td align=right><nobr>"+String($(this).find("COL11").text())+"</nobr></td>"
	            +"<td align=right><nobr>"+String($(this).find("COL12").text())+"</nobr></td>"
	            +"<td align=right><nobr>"+String($(this).find("COL13").text())+"</nobr></td>"
	            +"<td align=right><nobr>"+String($(this).find("COL14").text())+"</nobr></td>"
	            +"<td align=right><nobr>"+String($(this).find("COL15").text())+"</nobr></td>"
	            +"<td align=right><nobr>"+String($(this).find("COL16").text())+"</nobr></td>"
	            +"</tr>");
	    	});
	    	$(tableId).trigger("update");
	    	tableRowEvent(tableId,tableRowId,1);
	
	    	var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
	    	if(dataCnt==null || dataCnt=="") dataCnt = 0;
	    	message(dataCnt+" "+I002);
	    	
	    	disabled("#btnSave",!(dataCnt>0));
    	},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
    });

	$("#formData").attr("action",action+params);
	$("#formData").submit();
}
function Save() {
	if(!$('#filename').val()) {
		alert("파일을 먼저 선택해 주세요!");
		$('#filename').focus();
		return;
	}
	var ext = $('#filename').val().split('.').pop().toLowerCase();
	if($.inArray(ext, ['xls','xlsx']) == -1) {
		alert('invalid extension!');
		return;
	}

	var action = "scn1.do?method=AB090ExcelImport&FileName="+$('#filename').val();
	var params = "&call=xml";

    $('#formData').ajaxForm({
    	dataType: "xml",
		success: function(result){
    		disabled("#btnExcelLoad,#btnSave",true);
			$("#dataTable1 tbody").empty();
    		message(I003);
    	},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging
		}
    });

	$("#formData").attr("action",action+params);
	$("#formData").submit();
}

function initEvent() {
	$("#divMain").css("height",$(window).height()-115);
}
