//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnExcelImport,#btnSave",true);
    // MANDATORY
	// EVENT -button
	$("#btnInit").click(Init);
	$("#btnClose").click(Close);
	$("#btnExcelLoad").click(ExcelLoad);
	$("#btnExcelImport").click(ExcelImport);
	$("#btnSave").click(Save);
	// EVENT -etc
	$("#filename").change(function(){
		$("#dataTable1 tbody").empty();
		disabled("#btnExcelLoad",false);
		disabled("#btnExcelImport",true);
	});
	//
    $("#dataTable1").tablesorter();
	initEvent();
	// DEFAULT VALUE
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex)-1;
//	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function ExcelLoad() {
	disabled("#btnSave",true);
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
	var action = "scn1.do?method=AB081ExcelLoad&FileName="+$('#filename').val();
	var params = "&call=";

	showBack();
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
	    		+"<td align=center>"+j+"</td>"
	            +"<td align=center>"+$(this).find("COL1").text()+"</td>"
	            +"<td align=center>"+$(this).find("COL2").text()+"</td>"
	            +"<td>"+$(this).find("COL3").text()+"</td>"
	            +"<td>"+$(this).find("COL4").text()+"</td>"
	            +"<td align=center>"+$(this).find("COL5").text()+"</td>"
	            +"<td>"+$(this).find("COL6").text()+"</td>"
	            +"<td>"+$(this).find("COL7").text()+"</td>"
	            +"<td align=right>"+$(this).find("COL8").text()+"</td>"
	            +"<td align=right>"+$(this).find("COL9").text()+"</td>"
	            +"</tr>");
	    	});
	    	$(tableId).trigger("update");
	    	tableRowEvent(tableId,tableRowId,1);
	
	    	var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
	    	if(dataCnt==null || dataCnt=="") dataCnt = 0;
	    	message(dataCnt+" "+I002);
	    	
	    	disabled("#btnExcelImport",!(dataCnt>0));
		}
    });

	$("#formData").attr("action",action+params);
	$("#formData").submit();
}
function ExcelImport() {
	disabled("#btnSave",true);
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

	var j = 0, x = 0;
	var action = "scn1.do?method=AB081ExcelImport&FileName="+$('#filename').val();
	var params = "&call=xml";

	showBack();
    $('#formData').ajaxForm({
    	dataType: "xml",
		success: function(result){
	    	if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
	    		return false;
	    	}
	    	if($(result).find("DATA_LIST2").find("ROW").length==0) { 
	    		$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
	    	}
	    	$(result).find("DATA_LIST2").find("ROW").each(function(){
	    		$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
	    		+"<td align=center>"+j+"</td>"
	            +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
	            +"<td align=center>"+$(this).find("BOND_CODE").text()+"</td>"
	            +"<td>"+$(this).find("BOND_NAME").text()+"</td>"
	            +"<td>"+$(this).find("REMARK").text()+"</td>"
	            +"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
	            +"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
	            +"<td>"+$(this).find("DEPT_CODE").text()+"</td>"
	            +"<td align=right>"+$(this).find("DEBIT_AMT").text()+"</td>"
	            +"<td align=right>"+$(this).find("CREDIT_AMT").text()+"</td>"
	            +"<td align=center>"+$(this).find("VALID_TRANS_DATE").text()+"</td>"
	            +"<td align=center>"+$(this).find("VALID_BOND_CODE").text()+"</td>"
	            +"<td align=center>"+$(this).find("VALID_ACCT_CODE").text()+"</td>"
	            +"<td align=center>"+$(this).find("VALID_DEPT_CODE").text()+"</td>"
	            +"</tr>");
	    		
	    		if($(this).find("VALID_ALL").text()=="X") {
	    			x++; //
	    		}
	    	});
	    	$(tableId).trigger("update");
	    	tableRowEvent(tableId,tableRowId,1);
	
	    	var dataCnt = $(result).find("DATA_LIST2").find("DATA_LIST2_CNT").text();
	    	if(dataCnt==null || dataCnt=="") dataCnt = 0;
	    	
    		if(x>0) {
        		disabled("#btnExcelImport",false);
    			disabled("#btnSave",true);
    		} else {
    			disabled("#btnExcelImport",true);
    			disabled("#btnSave",false);
    		}
    		message(I002);
		}
    });

	$("#formData").attr("action",action+params);
	$("#formData").submit();
}
function Save() {
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "scn1.do?method=AB081Save&call=xml";
    var params = "&call=xml";
    
	showBack();
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			disabled("#btnExcelImport,#btnSave",true);
			message(I003);
		}
	});
}
function Init() {
	disabled("#btnExcelLoad",false);
	disabled("#btnExcelImport",true);
	$("#dataTable1 tbody").empty();
	$("#filename").val("");
}
//-------------------------------------------------------------------------------------------------
function initEvent() {
	var winH          = $(window).height();
	var titleTableH   = $("#titleTable").height();
	var buttonH       = $("#button").height();
	var formTable     = $("#formTable1").height();
	var historyTableH = $("#historyTable").height();
	var statusTable   = $("#statusTable").height();

	$("#divMain").css("height",winH-(titleTableH+buttonH+formTable+historyTableH+statusTable+30));
}