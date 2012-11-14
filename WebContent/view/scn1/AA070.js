//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnExcelExport",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnExcelExport").click(ExcelExport);
	// ETC
	// DEFAULT VALUE
    initEvent();
	$("#dataTable1").tablesorter();
	date("#S_WRITE_DATE_FROM,#S_WRITE_DATE_TO");
	$("#S_WRITE_DATE_FROM").val(dateMonthDiff('yyyyMMdd',-1));
	$("#S_WRITE_DATE_TO").val(currDate());
	setRadioValue("S_JRNL_TYPE","G");
	setRadioValue("S_STATUS","");
	$("#btnPopupAcct").click(PopupAcct);
	$("#btnPopupAcct2").click(PopupAcct2);
	
	$("#ACCT_CODE2").keyup(function(e){
		if(e.keyCode==13) {
			getAcctName($(this).val());
		}
	});
	$("#ACCT_CODE3").keyup(function(e){
		if(e.keyCode==13) {
			getAcctName2($(this).val());
		}
	});
	$("#ACCT_NAME2").keyup(function(e){
		if(e.keyCode==13) {
			if($("#ACCT_NAME2").val().trim()!="") {
				PopupAcct();
			}
		}
	});
	$("#ACCT_NAME3").keyup(function(e){
		if(e.keyCode==13) {
			if($("#ACCT_NAME3").val().trim()!="") {
				PopupAcct2();
			}
		}
	});
	// Validate
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}
function dataTableRow2_onClick(obj) {
	tableRowColor('#dataTable2',obj.rowIndex);
}
function dataTableRow2_onDblClick(obj) {
	if(obj==null) return;

	var jrnlNo     = obj.cells[11].innerHTML;
	var jrnlSeq    = obj.cells[12].innerHTML;
	var evidType   = obj.cells[13].innerHTML;

	popupDetail(jrnlNo,jrnlSeq,evidType);
}


//METHOD///////////////////////////////////////////////////////////////////////////////////////////
function getAcctName(acctCode) {
	if(acctCode.length == 7) {
		var action = "index.do?method=GETNAME";
		var params = "&TYPE=ACCT&CODE="+acctCode+"&call=xml";

		$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
			success: function(result){
				var acctCode  = $(result).find("DATA_INFO").find("ACCT_CODE").text();
				var acctName  = $(result).find("DATA_INFO").find("ACCT_NAME").text();

				$("#ACCT_CODE").val(acctCode);
				$("#ACCT_NAME2").val(acctName);
			}
		});
	} else if(acctCode!=null && acctCode != "") {
		PopupAcct();
	}
}

function Retrieve() {
	$("#STATUS_NAME,#SUBMIT_DATE").val("");

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$("#dataTable1 tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA070Retrieve";
	var params = "&JRNL_TYPE="+getRadioValue("S_JRNL_TYPE")
			   + "&STATUS="+getRadioValue("S_STATUS")
			   + "&ACCT_CODE="+$("#ACCT_CODE2").val()
			   + "&ACCT_CODE2="+$("#ACCT_CODE3").val()
               + "&ACCT_NAME="+getString("#ACCT_NAME2")
               + "&ACCT_NAME2="+getString("#ACCT_NAME3")
			   + "&WRITE_DATE_FROM="+$("#S_WRITE_DATE_FROM").val().replaceAll("-","")
			   + "&WRITE_DATE_TO="+$("#S_WRITE_DATE_TO").val().replaceAll("-","")
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				var drAmt = "", crAmt = "";
				var drcrType = $(this).find("DRCR_TYPE").text();
				if(drcrType=="D")
					drAmt = $(this).find("AMT").text();
				else
					crAmt = $(this).find("AMT").text();
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNL_TYPE_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
                +"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
                +"<td align=center>"+drAmt+"</td>"
                +"<td align=center>"+crAmt+"</td>"
                +"<td class=hidden>"+$(this).find("ANAL_T0").text()+"</td>"
                +"<td>"+$(this).find("ANAL_T0_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ANAL_T2").text()+"</td>"
                +"<td>"+$(this).find("ANAL_T2_NAME").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td class=hidden>"+$(this).find("DRCR_TYPE").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("SUBMIT_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("SUBMIT_USER_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("APPV_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("APPV_USER_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("POSTING_PERIOD").text()+"</td>"
                +"<td align=center>"+$(this).find("REJECT_DATE").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td align=center>"+$(this).find("REF_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("STATUS_NAME").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);

			disabled("#btnExcelExport",!(dataCnt>0));
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}

function RetrieveDetail(jrnlNo) {
	var tableId = "#dataTable2", tableRowId = "dataTableRow2";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA060RetrieveDetail";
	var params = "&JRNL_NO="+jrnlNo
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td>"+$(this).find("EVID_NAME").text()+"</td>"
                +"<td>"+$(this).find("EXPS_TYPE_NAME").text()+"</td>"
                +"<td align=right>"+$(this).find("TOTAL_AMT").text()+"</td>"
                +"<td>"+$(this).find("VENDOR_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("PAY_DUE_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("PAY_METHOD_NAME").text()+"</td>"
                +"<td align=center><a href=\"javascript:popupDetailByRef('"+$(this).find("REF_NO").text()+"','"+$(this).find("REF_EVID_TYPE").text()+"')\">"+$(this).find("REF_NO").text()+"</a></td>"
                +"<td align=center>"+$(this).find("STATUS_NAME").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td class=hidden>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td class=hidden>"+$(this).find("JRNL_SEQ").text()+"</td>"
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
//			alert(xhr.responseText); //for debuging 
		}
	});
}

//팝업1 (나중에..)
function PopupAcct() {
	var param = new Object();
	param.ACCT_CODE = $("#ACCT_CODE2").val();
	param.ACCT_NAME = $("#ACCT_NAME2").val();
	
	var url   = "popup.do?method=CP050&screenId=CP050&screenIdRef=SA010&refVal=&isPopup=true";
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url,param,style);
	if(retVal != null) {
		$("#divVAT_TYPE2,#divPRD_CODE2,#divAFS_TYPE2,#divSUP_CODE2").css("display","none");
		
		$("#ACCT_CODE2").val(retVal.ACCT_CODE);
		$("#ACCT_NAME2").val(retVal.ACCT_NAME);
	}
}

//팝업1 (나중에..)
function PopupAcct2() {
	var param = new Object();
	param.ACCT_CODE = $("#ACCT_CODE3").val();
	param.ACCT_NAME = $("#ACCT_NAME3").val();
	
	var url   = "popup.do?method=CP050&screenId=CP050&screenIdRef=SA010&refVal=&isPopup=true";
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url,param,style);
	if(retVal != null) {
		$("#divVAT_TYPE2,#divPRD_CODE2,#divAFS_TYPE2,#divSUP_CODE2").css("display","none");
		
		$("#ACCT_CODE3").val(retVal.ACCT_CODE);
		$("#ACCT_NAME3").val(retVal.ACCT_NAME);
	}
}

function ExcelExport() {
	var action = "scn1.do?method=AA070ExcelExport";
	var params = "&JRNL_TYPE="+getRadioValue("S_JRNL_TYPE")
			   + "&STATUS="+getRadioValue("S_STATUS")
			   + "&ACCT_CODE="+$("#ACCT_CODE2").val()
			   + "&ACCT_CODE2="+$("#ACCT_CODE3").val()
               + "&ACCT_NAME="+getString("#ACCT_NAME2")
               + "&ACCT_NAME2="+getString("#ACCT_NAME3")
			   + "&WRITE_DATE_FROM="+$("#S_WRITE_DATE_FROM").val().replaceAll("-","")
			   + "&WRITE_DATE_TO="+$("#S_WRITE_DATE_TO").val().replaceAll("-","")
		       + "&call=xml";



	backgroundp.location.href = action+params;
//	document.location.href = action+params;
}
function bindData(obj) {
	var jrnlNo = obj.cells[1].innerText;
	$("#JRNL_NO").val(jrnlNo);
	$("#STATUS_NAME").val(obj.cells[11].innerText);
	$("#SUBMIT_DATE").val(obj.cells[4].innerText);
	$("#SUBMIT_USER_NAME").val(obj.cells[5].innerText);
	$("#SUBMIT_USER_DEPT_NAME").val(obj.cells[6].innerText);
	RetrieveDetail(jrnlNo);
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-310);
}
