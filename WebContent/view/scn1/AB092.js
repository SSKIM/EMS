//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	disabled("#btnGASU",true);
	$("#btnRetrieve").click(Retrieve);
	$("#btnREGASU").click(JrnlCreate);
	$("#ACCT_CODE").val("");
	
	// ETC
	// DEFAULT VALUE
    initEvent();
	$("#dataTable1").tablesorter();
	// Validate
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
}
function JrnlCreate() {
	var SEQ_NO = checkData("dataTable1","chk1");
	var tmp       = SEQ_NO.split("^");
	var JRNAL_NO   = tmp[0];
	var JRNAL_LINE = tmp[1];
	if(SEQ_NO=="") {
		alert("처리항 항목을 먼저 선택해주세요!");
		return;
	}
	if(SEQ_NO.split("|").length > 1)
	{
		alert("가수금 반제는 하나씩 처리해야 합니다!");
		return;
	}
	if(!confirm("전표를 발행하시겠습니까?")) { return; }
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action  = "scn1.do?method=AB092JR&call=xml";
    var params  = "&JRNAL_NO="+JRNAL_NO
    			+ "&JRNAL_LINE="+JRNAL_LINE;
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
	var ACCT_CODE2 = "2312999";
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$("#dataTable1 tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AB092Retrieve";
	var params = "&ACCNT_CODE="+ACCT_CODE2+"&call=xml";
	
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){

				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center><nobr>"+j+"</nobr></td>"
				+"<td align=center><input type='checkbox' name='chk1' value='"+$(this).find("JRNAL_NO").text()+"^"+$(this).find("JRNAL_LINE").text()+"'/></td>"
                +"<td align=left><nobr>"+$(this).find("DESCRIPTN").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("TRANS_DATETIME").text()+"</nobr></td>"
                +"<td align=right><nobr>"+$(this).find("AMOUNT").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("D_C").text()+"</nobr></td>"
                +"<td align=center><nobr>"+$(this).find("NAME").text()+"</nobr></td>"
                +"<td class=hidden>"+$(this).find("PERIOD").text()+"</td>"
                +"<td class=hidden>"+$(this).find("TREFERENCE").text()+"</td>"
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
function initEvent() {
	$("#divMain").css("height",$(window).height()-($("#divMain").height()+100));
}
