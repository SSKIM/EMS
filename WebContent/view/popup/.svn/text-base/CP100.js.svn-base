//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	// DEFAULT VALUE
    // MANDATORY
	// EVENT
	$("#btnInit").click(Init);
	$("#btnClose").click(Close);
	$("#btnRetrieve").click(Retrieve);
	$("#S_VENDOR_CODE,#S_VENDOR_NAME").keyup(function(e) {
		if(e.keyCode == 13) Retrieve(1);
	});
	// DEFAULT
	initEvent();
	// GET PARAMETER
	var param = window.dialogArguments;
	$("#S_VENDOR_CODE").val(param.VNDR_CODE);
	$("#S_VENDOR_NAME").val(param.VNDR_NAME);
	
	$("#RN").addClass("header");
	$("#VENDOR_CODE").addClass("header");
	$("#VENDOR_NAME").addClass("header");
	$("#BUSI_NO").addClass("header");
	$("#BANK_NAME").addClass("header");
	$("#BANK_ACNT_NUM").addClass("header");

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
	returnParam.VENDOR_CODE   = obj.cells[1].innerHTML;
	returnParam.VENDOR_NAME   = obj.cells[2].innerHTML;
	returnParam.BUSI_NO       = obj.cells[3].innerHTML;
	returnParam.BANK_NAME     = obj.cells[4].innerHTML;
	returnParam.BANK_ACNT_NUM = obj.cells[5].innerHTML;
	returnParam.ANL_CODE1     = obj.cells[6].innerHTML;
	returnParam.ANL_CODE2     = obj.cells[7].innerHTML;

	window.returnValue = returnParam;
	Close();
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(pageNo) {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	if(isNaN(pageNo)) pageNo = "1";
	
	lo_strValue = "";
	old_strValue ="";
	flag = "";
	flag2 = "";
	ID_2 = "";

	$("#RN").removeClass("headerSortUp");
	$("#VENDOR_CODE").removeClass("headerSortUp");
	$("#VENDOR_NAME").removeClass("headerSortUp");
	$("#BUSI_NO").removeClass("headerSortUp");
	$("#BANK_NAME").removeClass("headerSortUp");
	$("#BANK_ACNT_NUM").removeClass("headerSortUp");
	
	$("#RN").removeClass("headerSortDown");
	$("#VENDOR_CODE").removeClass("headerSortDown");
	$("#VENDOR_NAME").removeClass("headerSortDown");
	$("#BUSI_NO").removeClass("headerSortDown");
	$("#BANK_NAME").removeClass("headerSortDown");
	$("#BANK_ACNT_NUM").removeClass("headerSortDown");
	
	$("#RN").addClass("header");
	$("#VENDOR_CODE").addClass("header");
	$("#VENDOR_NAME").addClass("header");
	$("#BUSI_NO").addClass("header");
	$("#BANK_NAME").addClass("header");
	$("#BANK_ACNT_NUM").addClass("header");

	var j = 0;
	var action = "popup.do?method=CP100Retrieve";
	var data   = "&VENDOR_CODE="+$("#S_VENDOR_CODE").val()
               + "&VENDOR_NAME="+getString("#S_VENDOR_NAME")
               + "&ANL_CODE2=SA"
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
                +"<td align=center>"+$(this).find("VENDOR_CODE").text()+"</td>"
                +"<td>"+$(this).find("VENDOR_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("BUSI_NO").text()+"</td>"
                +"<td>"+$(this).find("BANK_NAME").text()+"</td>"
                +"<td>"+$(this).find("BANK_ACNT_NUM").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ANL_CODE1").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ANL_CODE2").text()+"</td>"
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
			$("#pager1").html(paging(pageNo,total,50,10));

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Retrieve2(pageNo, strValue, id) {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	if(isNaN(pageNo)) pageNo = "1";
	ID_2 = id;
	old_strValue = strValue;
	
	$("#RN").removeClass("headerSortUp");
	$("#VENDOR_CODE").removeClass("headerSortUp");
	$("#VENDOR_NAME").removeClass("headerSortUp");
	$("#BUSI_NO").removeClass("headerSortUp");
	$("#BANK_NAME").removeClass("headerSortUp");
	$("#BANK_ACNT_NUM").removeClass("headerSortUp");
	
	$("#RN").removeClass("headerSortDown");
	$("#VENDOR_CODE").removeClass("headerSortDown");
	$("#VENDOR_NAME").removeClass("headerSortDown");
	$("#BUSI_NO").removeClass("headerSortDown");
	$("#BANK_NAME").removeClass("headerSortDown");
	$("#BANK_ACNT_NUM").removeClass("headerSortDown");
	
	$("#RN").addClass("header");
	$("#VENDOR_CODE").addClass("header");
	$("#VENDOR_NAME").addClass("header");
	$("#BUSI_NO").addClass("header");
	$("#BANK_NAME").addClass("header");
	$("#BANK_ACNT_NUM").addClass("header");
	
	if (strValue == 'RN') flag2 = "1";
	else if(strValue == 'VENDOR_CODE') flag2 = "2";
	else if(strValue == 'VENDOR_NAME') flag2 = "3";
	else if(strValue == 'BUSI_NO') flag2 = "4";
	else if(strValue == 'BANK_NAME') flag2 = "5";
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

	var j = 0;
	var action = "popup.do?method=CP060Retrieve2";
	var data   = "&VENDOR_CODE="+$("#S_VENDOR_CODE").val()
               + "&VENDOR_NAME="+getString("#S_VENDOR_NAME")
               + "&ANL_CODE2=SA"
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
                +"<td align=center>"+$(this).find("VENDOR_CODE").text()+"</td>"
                +"<td>"+$(this).find("VENDOR_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("BUSI_NO").text()+"</td>"
                +"<td>"+$(this).find("BANK_NAME").text()+"</td>"
                +"<td>"+$(this).find("BANK_ACNT_NUM").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ANL_CODE1").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ANL_CODE2").text()+"</td>"
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
			$("#pager1").html(paging(pageNo,total,50,10));

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
	$("#divMain").css("height",$(window).height()-110);	
}
