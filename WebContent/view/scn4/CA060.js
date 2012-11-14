//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnExcelExport",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnPrint").click(Print);
	$("#btnPrintTrafficEx").click(PrintTrafficEx);
	$("#btnExcelExport").click(ExcelExport);
	// ETC
	// DEFAULT VALUE
    initEvent();
	$("#dataTable1,#dataTable2").tablesorter();
	date("#S_WRITE_DATE_FROM,#S_WRITE_DATE_TO");
	$("#S_WRITE_DATE_FROM").val(dateMonthDiff('yyyyMMdd',-1));
	$("#S_WRITE_DATE_TO").val(currDate());
	setRadioValue("S_JRNL_TYPE","G");
	setRadioValue("S_STATUS","");
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

function Retrieve() {
	$("#JRNL_NO,#STATUS_NAME,#SUBMIT_DATE,#SUBMIT_USER_NAME,#SUBMIT_USER_DEPT_NAME").val("");
	if($("#S_WRITE_DATE_FROM").val()=="") {
		alert($("#lblS_WRITE_DATE").html()+"를 입력해주세요! (FROM_DATE)");
		$("#S_WRITE_DATE_FROM").focus();
		return;
	}
	if($("#S_WRITE_DATE_TO").val()=="") {
		alert($("#lblS_WRITE_DATE").html()+"를 입력해주세요! (TO_DATE)");
		$("#S_WRITE_DATE_TO").focus();
		return;
	}

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$("#dataTable1 tbody,#dataTable2 tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA060Retrieve";
	var params = "&JRNL_TYPE="+getRadioValue("S_JRNL_TYPE")
			   + "&STATUS="+getRadioValue("S_STATUS")
			   + "&JRNL_NO="+$("#S_JRNL_NO").val()
			   + "&WRITE_DATE_FROM="+$("#S_WRITE_DATE_FROM").val().replaceAll("-","")
			   + "&WRITE_DATE_TO="+$("#S_WRITE_DATE_TO").val().replaceAll("-","")
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNL_TYPE_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("SUBMIT_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("SUBMIT_USER_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("SUBMIT_USER_DEPT_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("APPV_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("APPV_USER_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("POSTING_PERIOD").text()+"</td>"
                +"<td>"+$(this).find("REMARK1").text()+"</td>" 
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
function Print() {
	var jrnlNo     = $("#JRNL_NO").val();
	var statusName = $("#STATUS_NAME").val();
	var submitDate = $("#SUBMIT_DATE").val();
	var swriTer = $("#SUBMIT_USER_NAME").val();
	var sdeptName = $("#SUBMIT_USER_DEPT_NAME").val();
	if(jrnlNo=="") {
		alert(W003);
		return;
	}

	var action = "scn1.do?method=AA010Print";
	var params = "&SCREEN_ID=CR040"
               + "&JRNL_NO="+jrnlNo

               + "&RPT_MAIN=CR040|UP_AA010S_PRINT"
               + "&RPT_MAIN_PARA="+appvLine+"|"+jrnlNo+"|"+statusName+"|"+submitDate+"|"+ swriTer+"|"+ sdeptName+"| |"+ ssBusiUnitType
               + "&RPT_MAIN_PAR2="+jrnlNo

               + "&RPT_SUBR=CR041|UP_AA010S_PRINT3"
               + "&RPT_SUBR_PARA="
               + "&RPT_SUBR_PAR2="+jrnlNo
               ;

	openWindowFull(action+params, "전표재출력");
}
function PrintTrafficEx() {
	var jrnlNo     = $("#JRNL_NO").val();
	if(jrnlNo=="") {
		alert(W003);
		return;
	}
	var swriTer = $("#SUBMIT_USER_NAME").val();
	var sdeptName = $("#SUBMIT_USER_DEPT_NAME").val();
	
	var action = "index.do?method=Print";
	var params = "&RPT_MAIN=CR030|UP_AA010S_PRINT2"
               + "&RPT_MAIN_PARA="+appvLine+"|"+jrnlNo+"|"+swriTer
               + "&RPT_MAIN_PAR2="+jrnlNo
               + "&RPT_SUBR="
               + "&RPT_SUBR_PARA="
               + "&RPT_SUBR_PAR2="
               ;

	openWindowFull(action+params, "교통비명세서출력");
}
function ExcelExport() {
	var action = "scn1.do?method=AA060ExcelExport";
	var params = "&JRNL_TYPE="+getRadioValue("S_JRNL_TYPE")
	           + "&STATUS="+getRadioValue("S_STATUS")
	           + "&JRNL_NO="+$("#S_JRNL_NO").val()
	           + "&WRITE_DATE_FROM="+$("#S_WRITE_DATE_FROM").val().replaceAll("-","")
	           + "&WRITE_DATE_TO="+$("#S_WRITE_DATE_TO").val().replaceAll("-","")
               + "&call=";

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
