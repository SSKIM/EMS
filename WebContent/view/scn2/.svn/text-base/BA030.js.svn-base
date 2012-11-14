//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnExcelExport", true);
	disabled("#btnExecute",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnExcelExport").click(ExcelExport);
	$("#btnExecute").click(Execute);
	
	// DEFAULT VALUE
//  $("#dataTable").tablesorter();
    initEvent();
	// Validate
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}
function dataTableRow2_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable2',obj.rowIndex);
//	bindData2(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	$("#HIST_GRP").val("");

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody, #dataTable2 tbody").empty();

	var j = 0;
	var action = "scn2.do?method=BA030Retrieve"
	var params = "&call=xml";

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
                +"<td align=right>"+$(this).find("CNT").text()+"</td>"
                +"<td align=center>"+$(this).find("STATUS_NAME").text()+"</td>"
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
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function RetrieveDetail(histGrp,pageNo) {
	disabled("#btnExcelExport",true);
	if(isNaN(pageNo)) pageNo = "1";
	var tableId = "#dataTable2", tableRowId = "dataTableRow2";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn2.do?method=BA030RetrieveDetail";
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
				+"<td align=center>"+j+"</td>"
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
	            +"<td align=center>"+$(this).find("LAST_CHNG_USID").text()+"</td>"
	            +"<td align=center>"+$(this).find("LAST_CHNG_PGM_ID").text()+"</td>"
	            +"<td align=center>"+$(this).find("ADJ_YN").text()+"</td>"
	            +"<td>"+$(this).find("ADJ_SLIP_INFO").text()+"</td>"
	            +"<td align=center>"+$(this).find("INTR_DT").text()+"</td>"
	            +"<td align=center>"+$(this).find("DEPT_CODE").text()+"</td>"
	            +"<td align=center>"+$(this).find("CHNL_CODE").text()+"</td>"
	            +"<td align=center>"+$(this).find("STATUS").text()+"</td>"
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
			disabled("#btnExecute",!(dataCnt));
			
			if(dataCnt>0) {
				disabled("#btnExcelExport",false);
			}
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Execute() {
	if($("#HIST_GRP").val()=="") {
		alert("실행할 대상을 먼저 선택해주세요!");
		return;
	}
	if(!confirm("재작업을 실행하겠습니까?")) {
		return;
	}
	disabled("#btnExecute",true);

	var action = "scn2.do?method=BA030Execute";
	var params = "&HIST_GRP="+$("#HIST_GRP").val()
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var jrnlNo  = $(result).find("DATA").find("SS_JRNL_NO").text();
			var status  = $(result).find("DATA").find("SS_STATUS").text();
			var status2 = (status=='true') ? "성공":"실패";
			
			alert(I003+"\n 전표번호: "+jrnlNo+"                  \n 전표상태: "+status2);

			message(I003+" "+jrnlNo+" "+(status=='true') ? "성공":"실패");
			disabled("#btnExecute",false);
			Retrieve();
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}

function ExcelExport() {
	if($("#HIST_GRP").val()=="") {
		alert("실행할 대상을 먼저 선택해주세요!");
		return;
	}
	var action = "scn2.do?method=BA030ExcelExport";
	var params = "&HIST_GRP="+$("#HIST_GRP").val()
    		   + "&call=";

	//backgroundp.location.href = action+params;
	document.location.href = action+params;
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
	RetrieveDetail(histGrp, pageNo);
}

function initEvent() {
	$("#divMain").css("height",$(window).height()-285);
}
