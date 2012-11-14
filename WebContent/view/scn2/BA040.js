//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnExecute",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnExecute").click(Execute);
	// DEFAULT VALUE
//  $("#dataTable").tablesorter();
	date("#S_SLIP_DATE_FROM,#S_SLIP_DATE_TO");
//	$("#S_SLIP_DATE_FROM").val(dateMonthDiff('yyyyMMdd',-2));
	$("#S_SLIP_DATE_TO").val(currDate());
    initEvent();
	// Validate
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(pageNo) {
	if(isNaN(pageNo)) pageNo = "1";

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn2.do?method=BA040Retrieve";
	var params = "&SLIP_DATE_FROM="+$("#S_SLIP_DATE_FROM").val().replaceAll("-","")
	           + "&SLIP_DATE_TO="+$("#S_SLIP_DATE_TO").val() .replaceAll("-","")
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
	            +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);
	
			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;

			var total = $(result).find("TOTAL_ITEM").text();
			$("#pager1").html(paging(pageNo,total,100,10));

			message(dataCnt+" "+I002);
			disabled("#btnExecute",false);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Execute() {
	if(!confirm("작업을 실행하겠습니까?")) {
		return;
	}
	disabled("#btnExecute",true);

	var action = "scn2.do?method=BA040Execute";
	var params = "&SLIP_DATE_FROM="+$("#S_SLIP_DATE_FROM").val().replaceAll("-","")
               + "&SLIP_DATE_TO="+$("#S_SLIP_DATE_TO").val() .replaceAll("-","")
               + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			message(I003);
			alert(I003);
			disabled("#btnExecute",true);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function bindData(obj) {
//	$("#rowIndex").val(obj.cells[0].innerHTML);
}
function goPage(pageNo) {
	Retrieve(pageNo);
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-104);
}