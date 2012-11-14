//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	required("#SUM_AMT,#SUM_VAT,#DEPT_AMT,#DEPT_CODE",true);
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnAdd").click(Add);
	$("#btnRemove").click(Remove);
	$("#btnUpdate2").click(Update);
	$("#btnTemplate").click(Template);
	// ETC
//    $("#dataTable").tablesorter();
	// DEFAULT VALUE
    initEvent();
	// Validate
});
function dataTableRow_onClick(obj) {
	tableRowColor('#dataTable',obj.rowIndex);
	bindData(obj);
}
function dataTableRow2_onClick(obj) {
	tableRowColor('#dataTable2',obj.rowIndex);
	bindData(obj);
}
//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(key1) {
	var tableId = "#dataTable", dataRow = "dataRow_";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = servletPath+"scn1.do?method=AA010Retrieve";
	var params = "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			$(result).find("SSC").find("Payload").find("Accounts").each(function(){
				$(tableId+" tbody").append("<tr id=\""+dataRow+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td>"+$(this).find("AccountCode").text()+"</td>"
                +"<td>"+$(this).find("AccountType").text()+"</td>"
                +"<td>"+$(this).find("AccountingLinksAllowed").text()+"</td>"
                +"<td>"+$(this).find("AllocationInProgress").text()+"</td>"
				+"<td>"+$(this).find("BalanceType").text()+"</td>"
				+"<td>"+$(this).find("BankCurrencyRequired").text()+"</td>"
				+"<td>"+$(this).find("ConversionCodeControl").text()+"</td>"
				+"<td>"+$(this).find("CreditLimit").text()+"</td>"
				+"<td>"+$(this).find("DateTimeLastUpdated").text()+"</td>"
				+"<td>"+$(this).find("Description").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,"dataTableRow",1);

//			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
//			if(dataCnt==null || dataCnt=="") dataCnt = 0;
//			message(dataCnt+" "+I002);

//			if(dataCnt>0) {
//			}
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Insert() {
}
function Update() {
	var idx = $("#rowIndex").val();
	if(idx == null || idx == '' || isNaN(idx)) {
		alert("해당 항목을 먼저 선택해주세요!");
	} else {
		$("#dataTable2 tbody>tr:eq("+(idx-1)+")").each(function(){
			$(this).find("td:eq(1)").text($("#DEPT_CODE").val());
			$(this).find("td:eq(2)").text($("#DEPT_NAME").val());
			$(this).find("td:eq(3)").text($("#AMT").val());
			$(this).find("td:eq(4)").text($("#VAT").val());
			$(this).find("td:eq(5)").text($("#SUM").val());
		});
	}
}
function Delete() {
	if(!window.confirm(W002)) { 
	    return false;
	}
}
function Add() {
	if(!requiredValidate("#ITEM")) return false;
	var tableId  = "#dataTable2", dataRow = "dataRow2_";
	var rowCount = $(tableId+" tbody tr").length; 

	$(tableId+" tbody").append("<tr id=\""+dataRow+(++rowCount)+"\">"
	+"<td>"+rowCount+"</td>"
    +"<td>"+$("#DEPT_CODE").val()+"</td>"
    +"<td>"+$("#DEPT_NAME").val()+"</td>"
    +"<td>"+$("#AMT").val()+"</td>"
    +"<td>"+$("#VAT").val()+"</td>"
    +"<td>"+$("#SUM").val()+"</td>"
    +"</tr>");
	$(tableId).trigger("update");

	tableRowEvent(tableId,"dataTableRow2",1);
	$("#DEPT_CODE,#DEPT_NAME,#AMT,#VAT,#SUM").val("");
	$("#DEPT_CODE").focus();
}
function Remove() {
	$("#dataRow2_"+$("#rowIndex").val()).remove();
	$("#rowIndex,#DEPT_CODE,#DEPT_NAME,#AMT,#VAT,#SUM").val("");
	$("#DEPT_CODE").focus();
}
function Template() {
	var param = new Object();

	var url   = "popup.do?method=CP020&screenId=CP020&screenIdRef=EA030&refVal=";
	var style = "dialogWidth:0px;dialogHeight:0px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		
	}
}
function bindData(obj) {
	$("#rowIndex").val(obj.cells[0].innerHTML);
	$("#DEPT_CODE").val(obj.cells[1].innerHTML);
	$("#DEPT_NAME").val(obj.cells[2].innerHTML);
	$("#AMT").val(obj.cells[3].innerHTML);
	$("#VAT").val(obj.cells[4].innerHTML);
	$("#SUM").val(obj.cells[5].innerHTML);
}
function Clear() {
}

function initEvent() {
//	$("#divMain").css("height",$(window).height()-30-$("table#titleTable").height()-$("table#searchTable1").height()-$("div#evidTabs").height()-$("table#statusTable").height());
}
