//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnJrnlCancel",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnJrnlCancel").click(JrnlCancel);
	// DEFAULT VALUE
    initEvent();
    $("#dataTable1").tablesorter();
	date("#S_APPV_DATE_FROM,#S_APPV_DATE_TO");
	$("#S_APPV_DATE_FROM").val(dateMonthDiff('yyyyMMdd',-2));
	$("#S_APPV_DATE_TO").val(currDate());
	// Validate
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}
function dataTableRow1_onDblClick(obj) {
	if(obj==null) return;

	var jrnlNo     = obj.cells[1].innerHTML;
	var jrnlSeq    = obj.cells[2].innerHTML;
	var evidType   = obj.cells[12].innerHTML;

	popupDetail(jrnlNo,jrnlSeq,evidType);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	if($("#S_APPV_DATE_FROM").val()=="") {
		alert($("#lblS_APPV_DATE").html()+"를 입력해주세요! (FROM_DATE)");
		$("#S_APPV_DATE_FROM").focus();
		return;
	}
	if($("#S_APPV_DATE_TO").val()=="") {
		alert($("#lblS_APPV_DATE").html()+"를 입력해주세요! (TO_DATE)");
		$("#S_APPV_DATE_TO").focus();
		return;
	}

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AB030Retrieve";
	var params = "&JRNL_NO="+$("#S_JRNL_NO").val()
               + "&APPV_DATE_FROM="+$("#S_APPV_DATE_FROM").val().replaceAll("-","")
	           + "&APPV_DATE_TO="+$("#S_APPV_DATE_TO").val().replaceAll("-","")
	           + "&EMPL_ID="+$("#S_EMPL_ID").val()
	           + "&DEPT_CODE="+$("#S_DEPT_CODE").val()
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
				+"<td align=center><input type='checkbox' name='chk' value='"+$(this).find("JRNL_NO").text()+"^"+$(this).find("JRNL_SEQ").text()+"'/></td>"
                +"<td align=center>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNL_SEQ").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td>"+$(this).find("EVID_NAME").text()+"</td>"
                +"<td>"+$(this).find("EXPS_TYPE_NAME").text()+"</td>"
                +"<td align=right>"+$(this).find("TOTAL_AMT").text()+"</td>"
                +"<td>"+$(this).find("VENDOR_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("PAY_DUE_DATE").text()+"</td>"
                +"<td>"+$(this).find("PAY_METHOD_NAME").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td align=center>"+$(this).find("STATUS_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("EVID_TYPE").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);

			disabled("#btnJrnlCancel",(dataCnt>0) ? false : true);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function JrnlCancel() {
	if($("input:checkbox[name=chk]:checked").length==0) {
		alert("처리할 대상을 먼저 선택해 주세요!");
		return;
	}
	if(!confirm("해당 전표를 취소처리 하시겠습니까?")) {
		return;
	}

	var action = "scn1.do?method=AB030JrnlCancel";
	var params = "&DATATABLE="+checkData("dataTable1","chk")
               + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			message(I003);
			Retrieve();
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});	
}
function bindData(obj) {

}
function Clear() {
}

function initEvent() {
	$("#divMain").css("height",$(window).height()-110);
}
