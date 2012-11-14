//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	// DEFAULT VALUE
    // MANDATORY
	// EVENT
	$("#btnInit").click(Init);
	$("#btnClose").click(Close);
	$("#btnRetrieve").click(Retrieve);
	$("#S_ACCT_CODE,#S_ACCT_NAME,#S_LOOKUP").keyup(function(e) {
		if(e.keyCode == 13) Retrieve(1);
	});
	// DEFAULT
	initEvent();
	// GET PARAMETER
	var param = window.dialogArguments;
	$("#S_ACCT_CODE").val(param.ACCT_CODE);
	$("#S_ACCT_NAME").val(param.ACCT_NAME);
	
	$("#RN").addClass("header");
	$("#ACCT_CODE").addClass("header");
	$("#ACCT_NAME").addClass("header");
	$("#LOOKUP").addClass("header");
	
	Retrieve(1);
});

var lo_strValue = "";
var old_strValue ="";
var old_strValue2 ="";
var ID_2 = "";
var flag = "";
var flag2 = "";

function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
}
function dataTableRow1_onDblClick(obj) {
	var returnParam = new Object();
	returnParam.ACCT_CODE    = obj.cells[1].innerHTML;
	returnParam.ACCT_NAME    = obj.cells[2].innerHTML;
	returnParam.ENTER_ANL_1  = obj.cells[4].innerHTML;
	returnParam.ENTER_ANL_2  = obj.cells[5].innerHTML;
	returnParam.ENTER_ANL_3  = obj.cells[6].innerHTML;
	returnParam.ENTER_ANL_4  = obj.cells[7].innerHTML;
	returnParam.ENTER_ANL_5  = obj.cells[8].innerHTML;
	returnParam.ENTER_ANL_6  = obj.cells[9].innerHTML;
	returnParam.ENTER_ANL_7  = obj.cells[10].innerHTML;
	returnParam.ENTER_ANL_8  = obj.cells[11].innerHTML;
	returnParam.ENTER_ANL_9  = obj.cells[12].innerHTML;
	returnParam.ENTER_ANL_10 = obj.cells[13].innerHTML;

	window.returnValue = returnParam;
	window.close();
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////
function Retrieve(pageNo) {
	if(isNaN(pageNo)) pageNo = "1";
	
	lo_strValue = "";
	old_strValue ="";
	flag = "";
	flag2 = "";
	ID_2 = "";

	$("#RN").removeClass("headerSortUp");
	$("#ACCT_CODE").removeClass("headerSortUp");
	$("#ACCT_NAME").removeClass("headerSortUp");
	$("#LOOKUP").removeClass("headerSortUp");
	
	$("#RN").removeClass("headerSortDown");
	$("#ACCT_CODE").removeClass("headerSortDown");
	$("#ACCT_NAME").removeClass("headerSortDown");
	$("#LOOKUP").removeClass("headerSortDown");
	
	$("#RN").addClass("header");
	$("#ACCT_CODE").addClass("header");
	$("#ACCT_NAME").addClass("header");
	$("#LOOKUP").addClass("header");
	
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "popup.do?method=CP050Retrieve";
	var data   = "&ACCT_CODE="+$("#S_ACCT_CODE").val()
               + "&ACCT_NAME="+getString("#S_ACCT_NAME")
               + "&LOOKUP="+getString("#S_LOOKUP")
	           + "&PAGE_NO="+pageNo
               + "&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			if($(result).find("DATA_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+$(this).find("RN").text()+"</td>"
                +"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
                +"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
                +"<td>"+$(this).find("LOOKUP").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_1").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_2").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_3").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_4").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_5").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_6").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_7").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_8").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_9").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_10").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
//			if(dataCnt>0) {
//				var index = tableRowIndex(tableId,"");
//				tableRowColor(tableId,index);
//			}
			
			var total = $(result).find("TOTAL_ITEM").text();
			$("#pager1").html(paging(pageNo,total,100,10));

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}

function Retrieve2(pageNo, strValue, id) {
	if(isNaN(pageNo)) pageNo = "1";
	ID_2 = id;
	old_strValue = strValue;
	
	$("#RN").removeClass("headerSortUp");
	$("#ACCT_CODE").removeClass("headerSortUp");
	$("#ACCT_NAME").removeClass("headerSortUp");
	$("#LOOKUP").removeClass("headerSortUp");
	
	$("#RN").removeClass("headerSortDown");
	$("#ACCT_CODE").removeClass("headerSortDown");
	$("#ACCT_NAME").removeClass("headerSortDown");
	$("#LOOKUP").removeClass("headerSortDown");
	
	$("#RN").addClass("header");
	$("#ACCT_CODE").addClass("header");
	$("#ACCT_NAME").addClass("header");
	$("#LOOKUP").addClass("header");
	
	if (strValue == 'RN') flag2 = "1";
	else if(strValue == 'ACCT_CODE') flag2 = "2";
	else if(strValue == 'ACCT_NAME') flag2 = "3";
	else flag2 = "4";
	
	if(flag == flag2)
	{
		flag = "";
		lo_strValue = "ASC";
		$(id).removeClass("headerSortUp");
		$(id).addClass("headerSortDown");
	}
	else if(flag != flag2)
	{
		flag = flag2;
		lo_strValue = "DESC";
		$(id).removeClass("headerSortDown");
		$(id).addClass("headerSortUp");
	}
	
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "popup.do?method=CP050Retrieve2";
	var data   = "&ACCT_CODE="+$("#S_ACCT_CODE").val()
               + "&ACCT_NAME="+getString("#S_ACCT_NAME")
               + "&LOOKUP="+getString("#S_LOOKUP")
	           + "&PAGE_NO="+pageNo
	           + "&ORDER_BY="+strValue
	           + "&A_DCES="+lo_strValue
               + "&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			if($(result).find("DATA_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+$(this).find("RN").text()+"</td>"
                +"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
                +"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
                +"<td>"+$(this).find("LOOKUP").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_1").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_2").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_3").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_4").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_5").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_6").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_7").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_8").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_9").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ENTER_ANL_10").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
//			if(dataCnt>0) {
//				var index = tableRowIndex(tableId,"");
//				tableRowColor(tableId,index);
//			}
			
			var total = $(result).find("TOTAL_ITEM").text();
			$("#pager1").html(paging(pageNo,total,100,10));

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function goPage(pageNo) {
	if(ID_2 != "") Retrieve2(pageNo, old_strValue, ID_2);
	else Retrieve(pageNo);
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-120);	
}
