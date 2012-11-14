//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("input[name=S_STATUS]").change(function(){
		$("#dataTable1 tbody").empty();
	});
	// DEFAULT VALUE
    initEvent();
	$("#dataTable1").tablesorter();
	date("#S_SUBMIT_DATE_FROM,#S_SUBMIT_DATE_TO");
	setRadioValue("S_STATUS","U");
	$("#S_SUBMIT_DATE_FROM").val(dateMonthDiff('yyyyMMdd',-2));
	$("#S_SUBMIT_DATE_TO").val(currDate());
	// Validate
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
//	bindData(obj);
}
function dataTableRow1_onDblClick(obj) {
	if(obj==null) return;

	var jrnlNo     = obj.cells[1].innerHTML;
	var jrnlSeq    = obj.cells[2].innerHTML;
	var evidType   = obj.cells[15].innerHTML;

	popupDetail(jrnlNo,jrnlSeq,evidType);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	if($("#S_SUBMIT_DATE_FROM").val()=="") {
		alert("제출일자를 입력해주세요! (FROM_DATE)");
		$("#S_SUBMIT_DATE_FROM").focus();
		return;
	}
	if($("#S_SUBMIT_DATE_TO").val()=="") {
		alert("제출일자를 입력해주세요! (TO_DATE)");
		$("#S_SUBMIT_DATE_TO").focus();
		return;
	}

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA040Retrieve";
	var params = "&JRNL_NO="+$("#S_JRNL_NO").val()
	           + "&STATUS="+getRadioValue("S_STATUS")
               + "&SUBMIT_DATE_FROM="+$("#S_SUBMIT_DATE_FROM").val().replaceAll("-","")
               + "&SUBMIT_DATE_TO="+$("#S_SUBMIT_DATE_TO").val().replaceAll("-","")
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
                +"<td align=center>"+$(this).find("SUBMIT_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td>"+$(this).find("EVID_NAME").text()+"</td>"
                +"<td>"+$(this).find("EXPS_TYPE_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("VENDOR_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("PAY_DUE_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("PAY_METHOD_NAME").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td align=center>"+$(this).find("PAY_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("REF_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("STATUS_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("EXPS_TYPE_ID").text()+"</td>"
                +"<td class=hidden>"+$(this).find("EVID_TYPE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("STATUS").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			$("div.status").html(dataCnt+" "+I002);

//			if(dataCnt>0) {
//			}
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function bindData(obj) {
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-108);
}
