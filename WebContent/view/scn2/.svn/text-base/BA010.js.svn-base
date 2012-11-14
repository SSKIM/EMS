//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("btnJrnlData",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnJrnlData").click(JrnlData);
	// DEFAULT VALUE
//  $("#dataTable").tablesorter();
    initEvent();
	date("#S_TRANS_DATE_FROM,#S_TRANS_DATE_TO");
	$("#S_TRANS_DATE_FROM").val(dateMonthDiff('yyyyMMdd',-1));
	$("#S_TRANS_DATE_TO").val(currDate());
	// Validate
	//$("#pager1").html(paging(20,967,50,10));
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}
function dataTableRow2_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable2',obj.rowIndex);
//	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	if($("#S_TRANS_DATE_FROM").val()=="") {
		alert($("lblS_TRANS_DATE").html()+"를 입력해주세요! (FROM_DATE)");
		$("#S_TRANS_DATE").focus();
		return;
	}
	if($("#S_TRANS_DATE_TO").val()=="") {
		alert($("lblS_TRANS_DATE").html()+"를 입력해주세요! (TO_DATE)");
		$("#S_TRANS_DATE_TO").focus();
		return;
	}

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody, #dataTable2 tbody").empty();

	var j = 0;
	var action = "scn2.do?method=BA010Retrieve";
	var params = "&TRANS_DATE_FROM="+$("#S_TRANS_DATE_FROM").val().replaceAll("-","")
	           + "&TRANS_DATE_TO="+$("#S_TRANS_DATE_TO").val().replaceAll("-","")
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
                +"<td align=center>"+$(this).find("HIST_GRP").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td align=right>"+$(this).find("LINE_CNT").text()+"</td>"
	            +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);
	
			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			
			message(dataCnt+" "+I002);

			disabled("btnJrnlData",!(dataCnt>0));
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function RetrieveDetail(histGrp,pageNo) {
	if(isNaN(pageNo)) pageNo = "1";

	var tableId = "#dataTable2", tableRowId = "dataTableRow2";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn2.do?method=BA010RetrieveDetail";
	var params = "&HIST_GRP="+histGrp
               + "&PAGE_NO="+pageNo
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
	            +"<td align=center>"+$(this).find("HIST_GRP").text()+"</td>"
	            +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
	            +"<td align=center>"+$(this).find("SLIP_DATE").text()+"</td>"
	            +"<td align=center>"+$(this).find("SLIP_NO").text()+"</td>"
	            +"<td align=center>"+$(this).find("SLIP_SEQ").text()+"</td>"
	            +"<td align=center>"+$(this).find("SLIP_CMPL_ORGC").text()+"</td>"
	            +"<td align=center>"+$(this).find("SLIP_CMPL_TMCD").text()+"</td>"
	            +"<td align=center>"+$(this).find("ATIT_C").text()+"</td>"
	            +"<td align=center>"+$(this).find("DRCR_TC").text()+"</td>"
	            +"<td align=right>"+$(this).find("AMT").text()+"</td>"
	            +"<td>"+$(this).find("RMK").text()+"</td>"
	            +"<td>"+$(this).find("REF_MTR").text()+"</td>"
	            +"<td align=center>"+$(this).find("SCRT_NO").text()+"</td>"
	            +"<td align=center>"+$(this).find("ACDT_NO").text()+"</td>"
	            +"<td align=center>"+$(this).find("USE_YN").text()+"</td>"
	            +"<td align=center>"+$(this).find("EVDC_YN").text()+"</td>"
	            +"<td align=center>"+$(this).find("LAST_CHNG_DT").text()+"</td>"
	            +"<td>"+$(this).find("LAST_CHNG_USID").text()+"</td>"
	            +"<td>"+$(this).find("LAST_CHNG_PGM_ID").text()+"</td>"
	            +"<td align=center>"+$(this).find("ADJ_YN").text()+"</td>"
	            +"<td>"+$(this).find("ADJ_SLIP_INFO").text()+"</td>"
	            +"<td align=center>"+$(this).find("INTR_DT").text()+"</td>"
	            +"<td align=center>"+$(this).find("DEPT_CODE").text()+"</td>"
	            +"<td align=center>"+$(this).find("CHNL_CODE").text()+"</td>"
	            +"<td align=center>"+$(this).find("STATUS").text()+"</td>"
	            +"<td align=center>"+$(this).find("SS_JRNL_NO").text()+"</td>"
	            +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);
	
			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;

			var total = $(result).find("TOTAL_ITEM").text();
			$("#pager1").html(paging(pageNo,total,50,10));
			$("#total").html("Total: "+total);

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}

function JrnlData() {
	if($("#HIST_GRP").val()=="") {
		alert(W003);
		return;
	}

//	var param = new Object();
//	param.HIST_GRP = $("#HIST_GRP").val();
//
//	var url   = "popup.do?method=CP120&screenId=CP120&screenIdRef=BA010&refVal=&isPopup=true";
//	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";
//
//	var retVal = window.showModalDialog(url, param, style);
//	if(retVal != null) {
//	}
}
function bindData(obj) {
	var histGrp = obj.cells[1].innerHTML;
	$("#HIST_GRP").val(histGrp);
	RetrieveDetail(histGrp,1);
}
function goPage(pageNo) {
	var histGrp = $("#HIST_GRP").val();
	if(histGrp==null || histGrp=='')
		return;

	RetrieveDetail(histGrp,pageNo);
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-305);
}
