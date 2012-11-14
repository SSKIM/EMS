//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	// DEFAULT VALUE
//  $("#dataTable").tablesorter();
	date("#S_TRANS_DATE_FROM,#S_TRANS_DATE_TO");
	$("#S_TRANS_DATE_FROM").val(dateMonthDiff('yyyyMMdd',-1));
	$("#S_TRANS_DATE_TO").val(currDate());
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
//	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	if($("#S_TRANS_DATE_FROM").val()=="") {
		alert($("#S_TRANS_DATE").html()+"를 입력해주세요!");
		$("#S_TRANS_DATE_FROM").focus();
		return;
	}
	if($("#S_TRANS_DATE_TO").val()=="") {
		alert($("#S_TRANS_DATE").html()+"를 입력해주세요!");
		$("#S_TRANS_DATE_TO").focus();
		return;
	}

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody, #dataTable2 tbody").empty();

	var j = 0;
	var action = "scn2.do?method=BA020Retrieve";
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
                +"<td align=center>"+$(this).find("TRANS_TYPE").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_TIME_START").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_TIME_END").text()+"</td>"
                +"<td align=right>"+$(this).find("LINE_CNT").text()+"</td>"
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

function RetrieveDetail(histGrp) {
	var tableId = "#dataTable2", tableRowId = "dataTableRow2";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn2.do?method=BA020RetrieveDetail";
	var params = "&HIST_GRP="+histGrp
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
                +"<td align=center>"+$(this).find("TRANS_TIME").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_TYPE").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_FLAG").text()+"</td>"
                +"<td align=right>"+$(this).find("LINE_CNT").text()+"</td>"
                +"<td>"+$(this).find("ERR_CODE").text()+"</td>"
                +"<td>"+$(this).find("ERR_MSG").text()+"</td>"
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
function bindData(obj) {
	var histGrp = obj.cells[1].innerHTML;
	RetrieveDetail(histGrp);
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-300);
}
