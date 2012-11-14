//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnSubmit,#btnDelete",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnSubmit").click(Submit);
	$("#btnDelete").click(Delete);
	$("input[name=S_STATUS]").change(function(){
		disabled("#btnDelete",true);
		$("#dataTable1 tbody,#dataTable2 tbody").empty();
	});
	// DEFAULT VALUE
    initEvent();
	$("#dataTable1").tablesorter();
	date("#S_WRITE_DATE_FROM,#S_WRITE_DATE_TO");
	setRadioValue("S_STATUS","T");
	// Validate
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}
function dataTableRow1_onDblClick(obj) {
	if(obj==null) return;
	var jrnlNo = obj.cells[2].innerHTML;
	if(jrnlNo!='') {
		top.document.all.fbody.src = "scn1.do?menuId=1100&menuSubId=1101&screenId=AA010&JRNL_NO="+jrnlNo;
		//goLink('scn1.do?method=AA010','menuId=1101&screenId=AA010&JRNL_NO='+jrnlNo,'F','전표 작성');
	}
}
function dataTableRow2_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable2',obj.rowIndex);
}
function dataTableRow2_onDblClick(obj) {
	if(obj==null) return;

	var jrnlNo     = obj.cells[10].innerHTML;
	var jrnlSeq    = obj.cells[11].innerHTML;
	var evidType   = obj.cells[12].innerHTML;

	popupDetail(jrnlNo,jrnlSeq,evidType);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody, #dataTable2 tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA030Retrieve";
	var params = "&JRNL_NO="+$("#S_JRNL_NO").val()
		       + "&STATUS="+getRadioValue("S_STATUS")
		       + "&WRITE_DATE_FROM="+$("#S_WRITE_DATE_FROM").val().replaceAll("-","")
		       + "&WRITE_DATE_TO="+$("#S_WRITE_DATE_TO").val().replaceAll("-","")
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
				+"<td align=center><input type='checkbox' name='chk' value='"+$(this).find("JRNL_NO").text()+"'/></td>"
                +"<td align=center>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNL_TYPE_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("WRITE_DATE").text()+"</td>"
                +"<td>"+$(this).find("WRITE_USER").text()+"</td>"
                +"<td align=center>"+$(this).find("PRINT_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("SUBMIT_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("STATUS_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("STATUS").text()+"</td>"
                +"<td>"+$(this).find("REMARK1").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			$("div.status").html(dataCnt+" "+I002);

			if(dataCnt>0) {
				var status = getRadioValue("S_STATUS");
				disabled("#btnSubmit,#btnDelete",(status=="T") ? false : true);
			}
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function RetrieveDetail(jrnlNo) {
	var tableId = "#dataTable2", tableRowId = "dataTableRow2";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA030DetailRetrieve";
	var params = "&JRNL_NO="+jrnlNo+"&call=xml";

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
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td>"+$(this).find("EVID_TYPE_NAME").text()+"</td>"
                +"<td>"+$(this).find("EXPS_TYPE_NAME").text()+"</td>"
                +"<td align=right>"+$(this).find("TOTAL_AMT").text()+"</td>"
                +"<td>"+$(this).find("VENDOR_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("PAY_DUE_DATE").text()+"</td>"
                +"<td>"+$(this).find("PAY_METHOD_TYPE_NAME").text()+"</td>"
                +"<td>"+$(this).find("STATUS_NAME").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td class=hidden>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td class=hidden>"+$(this).find("JRNL_SEQ").text()+"</td>"
                +"<td class=hidden>"+$(this).find("EVID_TYPE").text()+"</td>"
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
function Submit() {
	if($("input:checkbox[name=chk]:checked").length==0) {
		alert("처리할 대상을 먼저 선택해 주세요!");
		return;
	}
	if(!confirm("제출하시겠습니까?")) {
		return false;
	}

	var data1 = checkData("dataTable1","chk");

	var action = "scn1.do?method=AA030Submit";
	var params = "&DATATABLE="+data1
	           + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
//			$(result).find("dataPK").each(function(){
//				$("#S_JRNL_NO").html($(this).find("JRNL_NO").text());
//				$("#S_STATUS").html($(this).find("STATUS").text());
//				$("#S_STATUS_NAME").html($(this).find("STATUS_NAME").text());
//			});
			alert("제출 되었습니다!");
			message(I003);
			disabled("#btnSubmit",true);
			Retrieve();
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Delete() {
	if($("input:checkbox[name=chk]:checked").length==0) {
		alert("처리할 대상을 먼저 선택해 주세요!");
		return;
	}
	if(!window.confirm(W002)) {
	    return false;
	}

	var data1 = checkData("dataTable1","chk");
	var action = "scn1.do?method=AA030Delete";
	var params = "&DATATABLE="+data1
	           + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			Retrieve();
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function bindData(obj) {
	var jrnlNo = obj.cells[2].innerHTML;
	$("#JRNL_NO").html(jrnlNo);
	RetrieveDetail(jrnlNo);
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-408);
}
