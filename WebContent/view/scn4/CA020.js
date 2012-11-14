//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnCancelJrnlSave",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnCancelJrnlSave").click(CancelJrnlSave);
	// DEFAULT VALUE
    $("#dataTable1").tablesorter();
    initEvent();
	// Validate
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
//	bindData(obj);
}
function dataTableRow1_onDblClick(obj) {
	if(obj==null) return;

	var jrnlNo     = obj.cells[1].innerHTML;
	var jrnlSeq    = obj.cells[2].innerHTML;
	var evidType   = obj.cells[11].innerHTML;

	popupDetail(jrnlNo,jrnlSeq,evidType);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA020Retrieve";
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
                +"<td class=hidden>"+$(this).find("EVID_TYPE").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);

			disabled("#btnCancelJrnlSave",(dataCnt>0) ? false : true);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function CancelJrnlSave() {
	if($("input:checkbox[name=chk]:checked").length==0) {
		alert("처리할 대상을 먼저 선택해 주세요!");
		return;
	}
	if(!confirm("취소전표를 생성하시겠습니까?")) {
		return;
	}
	
	var param = new Object();
	param.JRNL_NO = checkData("dataTable1","chk");

	var url   = "scn1.do?method=AA021&screenId=AA021&screenIdRef=AB020&refVal=&isPopup=true";
	var style = "dialogWidth:400px;dialogHeight:200px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		if(retVal.RESULT == "OK") {
			goLink('scn1.do?method=AA010','menuId=1101&screenId=AA010&JRNL_NO='+retVal.JRNL_NO,'F','전표 작성');
		}
	}
}
function bindData(obj) {
//	$("#rowIndex").val(obj.cells[0].innerHTML);
}
function Clear() {
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-60);
}
