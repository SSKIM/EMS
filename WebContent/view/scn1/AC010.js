//EVENT////////////////////////////////////////////////////////////////////////////////////////////
var dataCnt = 0;

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnExecute").click(Process);
	$("#btnExcelExport").click(ExcelExport);
	// DEFAULT VALUE
    initEvent();
	$("#dataTable1").tablesorter();
	
	$("#ANL_CODE_ID").change(function(){
		AnlcodeRemark($(this));
	});
	
	$(window).resize(function () { initEvent(); });
	
	initEvent();
});

//METHOD///////////////////////////////////////////////////////////////////////////////////////////
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
}

function AnlcodeRemark(obj){
	var tableId = "#dataTable1";
	$(tableId+" tbody").empty();
	$("#ACCT_CODE1").empty();
	
	var action = "scn1.do?method=AC010ANLCODE";
	var params = "&ANL_CODE_ID="+$(obj).val()+"&call=xml";
	
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			if($(result).find("ACCT_CODE_LIST").find("ROW").length==0) { 
			}
			if($(obj).val() != "") { 
				$("#ACCT_CODE1").append("<option value=\"\"> --ALL-- </option>");
			}
			else{
				$("#ACCT_CODE1").append("<option value=\"\"> --ALL-- </option>");
			}
			$(result).find("ACCT_CODE_LIST").find("ROW").each(function(){
				$("#ACCT_CODE1").append("<option value=\""+$(this).find("VALUE").text()+"\">"+$(this).find("LABEL").text()+"</option>");
			});
		}
	});
}

function Retrieve() {
	var tableId = "#dataTable1", tableRowId = "dataTable1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AC010Retrieve";
	var params = "&ANL_CODE_ID="+$("#ANL_CODE_ID").val()
				+ "&ACCT_CODE1="+$("#ACCT_CODE1").val()
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
                +"<td align=center>"+$(this).find("ACCNT_CODE").text()+"</td>"
                +"<td align=left>"+$(this).find("REVAL_LINK_REF").text()+"</td>"
                +"<td align=center>"+$(this).find("PERIOD").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATETIME").text()+"</td>"
                +"<td align=right>"+$(this).find("AMOUNT").text()+"</td>"
                +"<td align=left>"+$(this).find("D_C").text()+"</td>"
                +"<td align=center>"+$(this).find("CONV_CODE").text()+"</td>"
                +"<td align=left>"+$(this).find("DESCRIPTN").text()+"</td>"
                +"<td align=center>"+$(this).find("TSC_DEAL").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNAL_TYPE").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNAL_SRCE").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);
			Retrieve1();

			dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			$("div.status").html(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
		}
	});
}

function Retrieve1() {
	var action = "scn1.do?method=AC010Retrieve1";
	var params = "&ANL_CODE_ID="+$("#ANL_CODE_ID").val()
				+ "&ACCT_CODE1="+$("#ACCT_CODE1").val()
    			+ "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$("#TOTAL").html($(result).find("dataPK").find("TOTAL").text());
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}

function Process() {
	if(dataCnt==0) {
		alert("No Recode!");
		return;
	}
	
	if($("#ANL_CODE_ID").val()=="")
	{
		alert("Do not match Category!");
		return;
	}
	
	var param = new Object();
	param.ANL_CODE = $("#ANL_CODE_ID").val(); 
	param.ACT_NAME = $("#ACCT_CODE1").val();
	param.TOTAL_AMT = $("#TOTAL").html().replaceAll(",","");
	
	var url   = "scn1.do?method=AC011&screenId=AC011&screenIdRef=AC010&refVal=&isPopup=true&menuName=Positing Option";
	var style = "dialogWidth:600px;dialogHeight:400px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		if(retVal.RESULT == "OK") {
			Retrieve();
		}
	}
}

function ExcelExport() {
	if(dataCnt==0) {
		alert("No Recode!");
		return;
	}
	
	var action = "scn1.do?method=AC010ExcelExport";
	var params = "&ANL_CODE_ID="+$("#ANL_CODE_ID").val()
				+ "&ACCT_CODE1="+$("#ACCT_CODE1").val()
				+ "&call=xml";

	backgroundp.location.href = action+params;
//	document.location.href = action+params;
}

function initEvent() {
	$("#divMain").css("height",$(window).height()-109);
}
