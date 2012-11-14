//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	disabled("#btnGASU,#btnISA",true);
	$("#btnRetrieve").click(Retrieve);
	$("#btnGASU").click(JrnlCreate);
	$("#btnISA").click(JrnlCreate2);
	$("#ACCT_CODE").val("");
	
	// ETC
	// DEFAULT VALUE
    initEvent();
	$("#dataTable1").tablesorter();
	$("#dataTable2").tablesorter();
	// Validate
	date("#TRADE_DATE_FROM,#TRADE_DATE_TO");
	setRadioValue("S_STATUS","");
	$("#TRADE_DATE_FROM").val(dateMonthDiff('yyyyMMdd',-1));
	$("#TRADE_DATE_TO").val(currDate());
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
}
function dataTableRow2_onClick(obj) {
	tableRowColor('#dataTable2',obj.rowIndex);
}
function JrnlCreate() {
	var SEQ_NO = checkData("dataTable2","chk2");
	if(SEQ_NO=="") {
		alert("처리항 항목을 먼저 선택해주세요!");
		return;
	}
	if(!confirm("전표를 발행하시겠습니까?")) { return; }
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action  = "scn1.do?method=AB091JR&call=xml";
    var params  = "&SEQ_NO="+SEQ_NO
    			+ "&ACCT_CODE="+$("#ACCT_CODE").val();
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			var jrnlNo = $(result).find("DATA").find("dataPK").find("JRNL_NO").text();
			if(confirm("전표가 발행되었습니다. 전표작성화면으로 이동하시겠습니까?\n( 전표번호 : "+jrnlNo+")")) {
				top.document.all.fbody.src = "scn1.do?menuId=1100&menuSubId=1101&screenId=AA010&JRNL_NO="+jrnlNo;
			}
		}
	});
}
function JrnlCreate2() {
	var SEQ_NO = checkData("dataTable2","chk2");
	if(SEQ_NO=="") {
		alert("처리항 항목을 먼저 선택해주세요!");
		return;
	}
	if(!confirm("전표를 발행하시겠습니까?")) { return; }
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action  = "scn1.do?method=AB091JR2&call=xml";
    var params  = "&SEQ_NO="+SEQ_NO;
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			var jrnlNo = $(result).find("DATA").find("dataPK").find("JRNL_NO").text();
			if(confirm("전표가 발행되었습니다. 전표작성화면으로 이동하시겠습니까?\n( 전표번호 : "+jrnlNo+")")) {
				top.document.all.fbody.src = "scn1.do?menuId=1100&menuSubId=1101&screenId=AA010&JRNL_NO="+jrnlNo;
			}
		}
	});
}
function Retrieve() {
	$("#STATUS_NAME,#SUBMIT_DATE").val("");

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$("#dataTable1 tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AB091Retrieve";
	var params = "&ACCT_CODE="+$("#ACCT_CODE").val()+"&call=xml";
	
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){

				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center><nobr>"+j+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("COMP_NAME").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("GROUP_NAME").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("BANK").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("BANK_ACCOUNT").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("BANK_ANL").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("ORIGN_CODE").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("GASU_CODE").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("ISA_CODE").text()+"</nobr></td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);

			RetrieveDetail($("#ACCT_CODE").val());
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError);
//			alert(xhr.responseText); //for debuging 
		}
	});
}

function RetrieveDetail(ACCT_CODE_DE) {
	disabled("#btnGASU,#btnISA",false);
	var tableId = "#dataTable2", tableRowId = "dataTableRow2";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AB091RetrieveDetail";
	var params = "&ACCT_CODE="+ACCT_CODE_DE
				+ "&TRADE_DATE_FROM="+$("#TRADE_DATE_FROM").val()
				+ "&TRADE_DATE_TO="+$("#TRADE_DATE_TO").val()
				+ "&STATUS="+getRadioValue("S_STATUS")
				+ "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center><nobr>"+j+"</nobr></td>"
				+"<td align=center><nobr><input type='checkbox' name='chk2' value='"+$(this).find("SEQ").text()+"' /></nobr></td>"
				+"<td align=center><nobr>"+$(this).find("TRADE_DATE").text()+"</nobr></td>"
                +"<td align=left><nobr>"+$(this).find("REMARK").text()+"</nobr></td>"
                +"<td align=right><nobr>"+$(this).find("INPUT_AMT").text()+"</nobr></td>"
                +"<td align=right><nobr>"+$(this).find("OUTPUT_AMT").text()+"</nobr></td>"
                +"<td align=right><nobr>"+$(this).find("BLANCE").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("TRADE_TYPE").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("TRADE_BRANCH").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("TRADE_TIME").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("MEMO").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("LAST_SERCH").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("STATUS2").text()+"</nobr></td>"
                +"<td class=hidden>"+$(this).find("STATUS").text()+"</td>"
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


function bindData(obj) {
	var ACCT_CODE_DE = obj.cells[4].innerText;
	RetrieveDetail(ACCT_CODE_DE);
}
function initEvent() {
	$("#divMain2").css("height",$(window).height()-($("#divMain").height()+100));
}
