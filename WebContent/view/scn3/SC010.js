//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	display("#clear",false);
	// MANDATORY
	// EVENT
	$("#btnWrite").click(Write);
	// DEFAULT VALUE
	setRadioValue("findKind","S");
	initEvent();
	Retrieve(pageNo,"","");
	// Validate
});
function dataTableRow1_onClick(obj) {
//	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(pageNo1,findKind1,findWord1) {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0; pageNo = pageNo1;
	var action = "scn3.do?method=SC010Retrieve";
	var params = "&FIND_KIND="+findKind1
	           + "&FIND_WORD="+findWord1
	           + "&PAGE_NO="+pageNo1
	           + "&viewMode=&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			if($(result).find("DATA_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}
            var BLTN_CTGR = "", rowline = "";
			$(result).find("DATA_LIST").find("ROW").each(function(n){
				if($(this).find("BLTN_CTGR").text() == "F") {
					BLTN_CTGR = "<img src=\"./theme/default/icon/notice.gif\" width=67 height=18 align=absmiddle>";
	            } else {
	            	BLTN_CTGR = "";
	            }

				rowline = ($(result).find("DATA_LIST").find("ROW").length==(n+1)) ? "bottom" : rowline = "line";

				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+$(this).find("BLTN_NO").text()+"</td>"
                +"<td>"+BLTN_CTGR+"</td>"
                +"<td><a href=\"javascript:goLink('scn3.do?method=SC011','&screenId=SC011&BLTN_NO="+$(this).find("BLTN_NO").text()+"&PAGE_NO="+pageNo1+"')\">"+$(this).find("SUBJECT").text()+"</a></td>"
                +"<td align=center>"+$(this).find("WRITE_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("WRITER").text()+"</td>"
                +"<td align=center>"+$(this).find("ATTACH_YN").text()+"</td>"
                +"</tr>"+"<tr class="+rowline+"><td colspan=6></td></tr>"
				);
			});
			
			$(tableId).trigger("update");
//			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;

			var total = $(result).find("TOTAL").text();
			$("#pager1").html(paging(pageNo1,total));

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Write() {
	goLink("scn3.do?method=SC012","&screenId=SC012");
}
function goPage(pageNo1) {
	setRadioValue("findKind","S");
	$("#findWord").val("");
	Retrieve(pageNo1,"","");
}

function goFind(flag) {
	if(flag == "Find") {
		if($("#findWord").val()=="") {
			alert("검색할 단어를 입력해주세요!");
			return;
		}
		display("#clear",true);
	} else if(flag == "Clear") {
		setRadioValue("findKind","S");
		$("#findWord").val("");
		display("#clear",false);
	}
	Retrieve(1,getRadioValue("findKind"),$("#findWord").val());
}
function bindData(obj) {
	var bltnNo = obj.cells[0].innerHTML;
	goLink("scn3.do?method=SC011","&screenId=SC011&BLTN_NO="+bltnNo+"&PAGE_NO="+pageNo);
}
function initEvent() {
	$("#fromTable1").css("height",$(window).height()-60);
}
