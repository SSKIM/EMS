//EVENT////////////////////////////////////////////////////////////////////////////////////////////
var dataCnt = 0;
var xWidth = 0;  
var xHeight = 0;

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	$("#btnExcelExport").click(ExcelExport);
	$("#btnRetrieve").click(Retrieve);
	// DEFAULT VALUE
	$("#dataTable1").tablesorter();
	
	$("#ANL_CODE_ID").change(function(){
		AnlcodeRemark($(this));
	});
	date("#TR_TO_DATE,#TR_FROM_DATE");
	required("#TR_TO_DATE,#TR_FROM_DATE", true);
	$("#TR_FROM_DATE").val(dateMonthDiff('yyyyMMdd',-2));
	$("#TR_TO_DATE").val(currDate());
	
	$(window).resize(function () { initEvent(); });
	
	initEvent();
});

function getWidth() {  
    xWidth = null;  
    if (window.screen != null)  
        xWidth = window.screen.width;  
    return xWidth;  
}  
function getHeight() {  
    xHeight = null;  
    if (window.screen != null)  
        xHeight = window.screen.height;  
    return xHeight;  
}

function changeScreenSize(w,h)
{
  window.resizeTo( w,h );
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
}

function AnlcodeRemark(obj){
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
	var action = "scn1.do?method=AC030Retrieve";
	var params = "&ANL_CODE_ID="+$("#ANL_CODE_ID").val()
				+ "&ACCT_CODE1="+$("#ACCT_CODE1").val()
				+ "&TSC_DEAL="+$("#TSC_DEAL").val()
				+ "&TR_FROM_DATE="+$("#TR_FROM_DATE").val().replaceAll("-","")
				+ "&TR_TO_DATE="+$("#TR_TO_DATE").val().replaceAll("-","")
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
                +"<td align=center>"+$(this).find("TRANS_DATETIME").text()+"</td>"
                +"<td align=left>"+$(this).find("DESCRIPTN").text()+"</td>"
                +"<td align=left>"+$(this).find("TSC_DEAL").text()+"</td>"
                +"<td align=right>"+$(this).find("USD").text()+"</td>"
                +"<td align=right>"+$(this).find("INITIAL_RATE").text()+"</td>"
                +"<td align=right>"+$(this).find("INITAL_KRW").text()+"</td>"
                +"<td align=right>"+$(this).find("UNREALIZED_KRW").text()+"</td>"
                +"<td align=center>"+$(this).find("TRADE_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("VALUE_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("MATURITY_DATE").text()+"</td>"
                +"<td align=left>"+$(this).find("COUNTERPARTY").text()+"</td>"
                +"<td align=left>"+$(this).find("PRIMARY_SECONDARY").text()+"</td>"
                +"<td align=right>"+$(this).find("PRICE_YIELD").text()+"</td>"
                +"<td align=left>"+$(this).find("CURRENCY").text()+"</td>"
                +"<td align=right>"+$(this).find("VA").text()+"</td>"
                +"<td align=right>"+$(this).find("PC").text()+"</td>"
                +"<td align=right>"+$(this).find("TSC").text()+"</td>"
                +"<td align=right>"+$(this).find("TSCC").text()+"</td>"
                +"<td align=center>"+$(this).find("TREATS_SECURITY_ID").text()+"</td>"
                +"<td align=center>"+$(this).find("SECURITY_ID").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNAL_NO").text()+"</td>"
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
	var action = "scn1.do?method=AC030Retrieve1";
	var params = "&ANL_CODE_ID="+$("#ANL_CODE_ID").val()
				+ "&ACCT_CODE1="+$("#ACCT_CODE1").val()
				+ "&TSC_DEAL="+$("#TSC_DEAL").val()
				+ "&TR_FROM_DATE="+$("#TR_FROM_DATE").val().replaceAll("-","")
				+ "&TR_TO_DATE="+$("#TR_TO_DATE").val().replaceAll("-","")
				+ "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$("#USD_TOTAL").html($(result).find("dataPK").find("USD_TOTAL").text());
			$("#INITIAL_PRICE").html($(result).find("dataPK").find("INITAL_KRW").text());
			$("#UNREALIZED").html($(result).find("dataPK").find("UNREALIZED_KRW").text());
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}

function ExcelExport() {
	if(dataCnt==0) {
		alert("No Recode!");
		return;
	}
	
	var action = "scn1.do?method=AC030ExcelExport";
	var params = "&ANL_CODE_ID="+$("#ANL_CODE_ID").val()
				+ "&ACCT_CODE1="+$("#ACCT_CODE1").val()
				+ "&TSC_DEAL="+$("#TSC_DEAL").val()
				+ "&TR_FROM_DATE="+$("#TR_FROM_DATE").val().replaceAll("-","")
				+ "&TR_TO_DATE="+$("#TR_TO_DATE").val().replaceAll("-","")
				+ "&call=xml";

	backgroundp.location.href = action+params;
//	document.location.href = action+params;
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-170);
}
