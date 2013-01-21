//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnSave,#btnPrint,#btnBanking,#btnExecute",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnSave").click(Save);
	$("#btnPrint").click(Print);
	$("#btnBanking").click(Banking);
	$("#btnExecute").click(Execute);
	// DEFAULT VALUE
    initEvent();
    $("#dataTable1").tablesorter();
    date("#S_PAY_DUE_DATE");
    number("#TOTAL",true);
    label("#TOTAL",true);
    setRadioValue("S_STATUS","U");
    setRadioValue("STATUS","Y");
	// Validate
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
//	bindData(obj);
}
function dataTableRow1_onDblClick(obj) {
	if(obj==null) return;

	var jrnlNo     = obj.cells[2].innerHTML;
	var jrnlSeq    = obj.cells[3].innerHTML;
	var evidType   = obj.cells[15].innerHTML;

	popupDetail(jrnlNo,jrnlSeq,evidType);
}
function dataTableCheck1_onClick(obj) {
	if(obj==null) return;
	tableRowCheckSum("dataTable1","chk",7,"TOTAL");
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();
	$("#TOTAL").val("");
	
	var j = 0;
	var action = "scn1.do?method=AB040Retrieve";
	var params = "&PAY_METHOD_TYPE="+$("#S_PAY_METHOD_TYPE").val()
		       + "&PAY_DUE_DATE="+$("#S_PAY_DUE_DATE").val().replaceAll("-","")
		       + "&STATUS="+getRadioValue("S_STATUS")
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
				+"<td align=center><input type='checkbox' name='chk' value='"+$(this).find("JRNL_NO").text()+"^"+$(this).find("JRNL_SEQ").text()+"^"+$(this).find("JRNL_LINE_NO").text()+"'/></td>"
                +"<td align=center>"+$(this).find("STATUS_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNL_SEQ").text()+"</td>"
                +"<td>"+$(this).find("WRITE_USER_DEPT_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td>"+$(this).find("VENDOR_NAME").text()+"</td>"
                +"<td align=right>"+$(this).find("AMT").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td align=center>"+$(this).find("PAY_DUE_DATE").text()+"</td>"
                +"<td>"+$(this).find("PAY_METHOD_NAME").text()+"</td>"
                +"<td>"+$(this).find("BANK_NAME").text()+"</td>"
                +"<td>"+$(this).find("ACCOUNT_NO").text()+"</td>"
                +"<td>"+$(this).find("DEPOSITOR").text()+"</td>"
                +"<td>"+$(this).find("PAY_REMARK").text()+"</td>"
                +"<td class=hidden>"+$(this).find("EVID_TYPE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("JRNL_LINE_NO").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);
			checkRowEvent(tableId,"dataTableCheck1");

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);
			
			disabled("#btnExecute",(dataCnt>0 && getRadioValue("S_STATUS")=="Y") ? false : true);
			disabled("#btnSave,#btnPrint,#btnBanking",(dataCnt>0) ? false : true);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Save() {
	if($("input:checkbox[name=chk]:checked").length==0) {
		alert("처리할 대상을 먼저 선택해 주세요!");
		return;
	}

	var action = "scn1.do?method=AB040Save";
	var params = "&STATUS="+getRadioValue("STATUS")
               + "&DATATABLE="+checkData("dataTable1","chk");
			   + "&call=xml";

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
function Print() {
	var action = "index.do?method=Print";
	var params = "&RPT_MAIN=CR020|UP_AB040S_PRINT"
               + "&RPT_MAIN_PARA="+appvLine+"|"+$("#S_ACCOUNT_NO").html();
               + "&RPT_MAIN_PAR2="
               + "&RPT_SUBR="
               + "&RPT_SUBR_PARA="
               + "&RPT_SUBR_PAR2="
               ;
	openWindowFull(action+params, "지출결의내역서출력");
}
function Banking() {
	var action = "scn1.do?method=AB040ExcelExport";
	var params = "&FILE_NAME=InternetBanking&call=excel";
	
	backgroundp.location.href = action+params;
}

function Execute() {
	var action = "scn1.do?method=AB040Amt";
	var params = "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			var cnt = $(result).find("DATA").find("DATA_INFO").find("TOTAL_CNT").text();
			var amt = $(result).find("DATA").find("DATA_INFO").find("TOTAL_AMT").text();

			if(confirm("지급대상으로 되어있는 모든 전표가 처리됩니다."
					+"\n지급처리하겠습니까?"
					+"\n\n[ 총"+cnt+"건 , 총합계:"+amt+" ]")
			) {
				Execute2();
			} else {
				return;
			}
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Execute2() {
//	if($("input:checkbox[name=chk]:checked").length==0) {
//		alert("처리할 대상을 먼저 선택해 주세요!");
//		return;
//	}

	var param = new Object();
	param.JRNL_NO = checkData("dataTable1","chk");

	var url   = "scn1.do?method=AB041&screenId=AB041&screenIdRef=AB040&refVal=&isPopup=true";
	var style = "dialogWidth:560px;dialogHeight:300px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		if(retVal.RESULT == "OK") {
			Retrieve();
		}
	}
}
function bindData(obj) {
//	$("#rowIndex").val(obj.cells[0].innerHTML);
}

function initEvent() {
	$("#divMain").css("height",$(window).height()-110);
}
