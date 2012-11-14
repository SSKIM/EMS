//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	$("#btnClose").click(Close);
	$("#btnRetrieve").click(Retrieve);
	$("#btnPopupVndr").click(PopupVndr);
	$("#S_EVID_TYPE").change(function(){
		$("#lblVENDOR_CODE").html("");
		$("#VENDOR_CODE1,#VENDOR_CODE2,#VENDOR_CODE2,#VENDOR_NAME2,#VENDOR_CODE3").val("");
		display("#divVENDOR_CODE1,#divVENDOR_CODE2,#divVENDOR_CODE3",false);

		var evidType = $("#S_EVID_TYPE").val();
		if(evidType=="EC") {
			$("#lblVENDOR_CODE").html("법인카드");
			display("#divVENDOR_CODE1",true);
		} else if(evidType=="ET" || evidType=="EI" || evidType=="ER") {
			$("#lblVENDOR_CODE").html("거래처");
			display("#divVENDOR_CODE2",true);
		} else if(evidType=="EA") {
			$("#lblVENDOR_CODE").html("직원");
			display("#divVENDOR_CODE3",true);
		} else {
			display("#divVENDOR_CODE1,#divVENDOR_CODE2,#divVENDOR_CODE3",false);
		}
	});
	// DEFAULT VALUE
	$("#dataTable1").tablesorter();
	initEvent();
	date("#S_TRANS_DATE");
	$("#S_TRANS_DATE_FROM").val(dateMonthDiff('yyyyMMdd',-2));
	$("#S_TRANS_DATE_TO").val(currDate());
	$("#lblVENDOR_CODE").html("");
	display("#divVENDOR_CODE1,#divVENDOR_CODE2,#divVENDOR_CODE3",false);
	// Validate
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}
function dataTableRow1_onDblClick(obj) {
	var returnParam = new Object();
	returnParam.JRNL_NO   = obj.cells[1].innerHTML;
	returnParam.JRNL_SEQ  = obj.cells[2].innerHTML;
	returnParam.EVID_TYPE = obj.cells[11].innerHTML;

	window.returnValue = returnParam;
	Close();
}
function dataTableRow2_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable2',obj.rowIndex);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var vndrCode = "";
	var evidType = $("#S_EVID_TYPE").val();
	if(evidType=="EC") {
		vndrCode = $("#VENDOR_CODE1").val();
	} else if(evidType=="ET" || evidType=="EI" || evidType=="ER") {
		vndrCode = $("#VENDOR_CODE2").val();
	} else if(evidType=="EA") {
		vndrCode = $("#VENDOR_CODE3").val();
	}

	var j = 0;
	var action = "scn3.do?method=SA011Retrieve";
	var params = "&TRANS_DATE_FROM="+$("#S_TRANS_DATE_FROM").val().replaceAll("-","")
		       + "&TRANS_DATE_TO="+$("#S_TRANS_DATE_TO").val().replaceAll("-","")
		       + "&EVID_TYPE="+$("#S_EVID_TYPE").val()
		       + "&VENDOR_CODE="+vndrCode
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
                +"<td align=center>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNL_SEQ").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td>"+$(this).find("EVID_NAME").text()+"</td>"
                +"<td>"+$(this).find("EXPS_TYPE_NAME").text()+"</td>"
                +"<td>"+$(this).find("PAY_METHOD_NAME").text()+"</td>"
                +"<td>"+$(this).find("VENDOR_NAME").text()+"</td>"
                +"<td>"+$(this).find("COMPANY_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("BUSI_NO").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td class=hidden>"+$(this).find("EVID_TYPE").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//					alert(xhr.responseText); //for debuging 
		}
	});
}
function RetrieveDrCr(jrnlNo,jrnlSeq) {
	var tableId = "#dataTable2", tableRowId = "dataTableRow2";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn3.do?method=SA011RetrieveDrCr";
	var params = "&JRNL_NO="+jrnlNo
		       + "&JRNL_SEQ="+jrnlSeq
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
				var drAmt = 0 , crAmt = 0;
				if($(this).find("DRCR_TYPE").text() == "D")
					drAmt = $(this).find("AMT").text();
				else
					crAmt = $(this).find("AMT").text();

				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
                +"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
                +"<td align=right>"+drAmt+"</td>"
                +"<td align=right>"+crAmt+"</td>"
                +"<td class=hidden>"+$(this).find("DEPT_CODE").text()+"</td>"
                +"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("CHNL_CODE").text()+"</td>"
                +"<td>"+$(this).find("CHNL_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ASST_CODE").text()+"</td>"
                +"<td>"+$(this).find("ASST_NAME").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//					alert(xhr.responseText); //for debuging 
		}
	});
}
function PopupVndr() {
	var param = new Object();

	var url   = "popup.do?method=CP100&screenId=CP100&screenIdRef=AA010&refVal=&isPopup=true";
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		$("#VENDOR_CODE2").val(retVal.VENDOR_CODE);
		$("#VENDOR_NAME2").val(retVal.VENDOR_NAME);
	}
}

function bindData(obj) {
	var jrnlNo  = obj.cells[1].innerText;
	var jrnlSeq = obj.cells[2].innerText;

	RetrieveDrCr(jrnlNo,jrnlSeq);
}
function Clear() {
}
function initEvent() {
	$("#divMain1").css("height",$(window).height()-$("#divMain2").height());
}
