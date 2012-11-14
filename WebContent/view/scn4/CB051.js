//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnReconSet,#btnReconDel,#btnExcept,#btnDelete",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnReconSet").click(ReconSet);
	$("#btnReconDel").click(ReconDel);
	$("#btnExcept").click(Except);
	$("#btnDelete").click(Delete);
	// DEFAULT VALUE
    initEvent();
    $("#dataTable1,#dataTable2").tablesorter();
    date("#S_TRANS_DATE");
	number("#JRNL_TOTAL,#CARD_TOTAL");
    setRadioValue("S_STATUS","N");
	$("#S_TRANS_DATE").val(currDate());
	// Validate
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
//	bindData(obj);
}
function dataTableRow2_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable2',obj.rowIndex);
//	bindData(obj);
}
function dataTableCheck1_onClick(obj) {
	if(obj==null) return;
	tableRowCheckSum("dataTable1","chk1",4,"JRNL_TOTAL");
}
function dataTableCheck2_onClick(obj) {
	if(obj==null) return;
	tableRowCheckSum("dataTable2","chk2",4,"CARD_TOTAL");
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
//	if($("#S_TRANS_DATE_TO").val()=="") {
//		alert("거래일자를 입력해주세요! (TO_DATE)");
//		$("#S_TRANS_DATE_TO").focus();
//		return;
//	}
	$("#JRNL_TOTAL,#CARD_TOTAL").val("");
	
	var tableId = "", tableRowId = ""; var j = 0, dataCnt1 = 0, dataCnt2 = 0;
	$("#dataTable1 tbody,#dataTable2 tbody").empty();
	disabled("#btnReconSet,#btnReconDel,#btnExcept,#btnDelete",true);

	var action = "scn1.do?method=AB051Retrieve";
	var params = "&CARD_NO="+$("#S_CARD_NO").val()
	           + "&TRANS_DATE="+$("#S_TRANS_DATE").val().replaceAll("-","")
	           + "&STATUS="+getRadioValue("S_STATUS")
		       + "&call=xml&viewMode=";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			///////////////////////////////////////////////////////////////////////////////////////

			tableId = "#dataTable1", tableRowId = "dataTableRow1"; j = 0;

			if($(result).find("VOUT_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}

			$(result).find("VOUT_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center><input type='checkbox' name='chk1' value='"+$(this).find("JRNL_NO").text()+"^"+$(this).find("JRNL_SEQ").text()+"'/></td>"
                +"<td align=center>"+$(this).find("RECON_TYPE_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("BUSI_NO").text()+"</td>"
                +"<td>"+$(this).find("COMPANY_NAME").text()+"</td>"
                +"<td align=right>"+$(this).find("TOTAL_AMT").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("VENDOR_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNL_SEQ").text()+"</td>"
                +"<td>"+$(this).find("RECON_SEQ").text()+"</td>"
                +"<td>"+$(this).find("EXPS_TYPE_NAME").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);
//			tableRowCheckEvent(tableId);
			checkRowEvent(tableId,"dataTableCheck1");

			dataCnt1 = $(result).find("VOUT_LIST").find("VOUT_LIST_CNT").text();
			if(dataCnt1==null || dataCnt1=="") dataCnt1 = 0;

			///////////////////////////////////////////////////////////////////////////////////////

			tableId = "#dataTable2", tableRowId = "dataTableRow2"; j = 0;

			if($(result).find("CARD_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}

			$(result).find("CARD_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center><input type='checkbox' name='chk2' value='"+$(this).find("SEQ").text()+"' /></td>"
                +"<td align=center>"+$(this).find("RECON_TYPE_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("AFFI_NO").text()+"</td>"
                +"<td>"+$(this).find("AFFI_NAME").text()+"</td>"
                +"<td align=right>"+$(this).find("REQ_AMT").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("CARD_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("APPV_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("APPV_TIME").text()+"</td>"
                +"<td>"+$(this).find("RECON_SEQ").text()+"</td>"
                +"<td>&nbsp;</td>"
                +"<td>&nbsp;</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);
//			tableRowCheckEvent(tableId);
			checkRowEvent(tableId,"dataTableCheck2");

			dataCnt2 = $(result).find("CARD_LIST").find("CARD_LIST_CNT").text();
			if(dataCnt2==null || dataCnt2=="") dataCnt2 = 0;

			///////////////////////////////////////////////////////////////////////////////////////
			message("["+dataCnt1+"/"+dataCnt2+"] "+I002);
			activeButton(dataCnt1,dataCnt2);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function RetrieveCard() {
	var tableId = "", tableRowId = ""; var j = 0, dataCnt1 = 0, dataCnt2 = 0;
	disabled("#btnReconSet,#btnReconDel,#btnExcept,#btnDelete",true);

	var action = "scn1.do?method=AB051Retrieve";
	var params = "&CARD_NO="+$("#S_CARD_NO").val()
	           + "&TRANS_DATE="+$("#S_TRANS_DATE").val()
	           + "&STATUS="+getRadioValue("S_STATUS")
		       + "&call=xml&viewMode=CARD";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			///////////////////////////////////////////////////////////////////////////////////////

			tableId = "#dataTable2", tableRowId = "dataTableRow2"; j = 0;
			$(tableId+" tbody").empty();
			
			if($(result).find("CARD_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}

			$(result).find("CARD_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center><input type='checkbox' name='chk2' value='"+$(this).find("SEQ").text()+"' /></td>"
                +"<td align=center>"+$(this).find("RECON_TYPE_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("CARD_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("APPV_TIME").text()+"</td>"
                +"<td align=center>"+$(this).find("APPV_NO").text()+"</td>"
                +"<td>"+$(this).find("AFFI_NO").text()+"</td>"
                +"<td>"+$(this).find("AFFI_NAME").text()+"</td>"
                +"<td align=right>"+$(this).find("REQ_AMT").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			dataCnt2 = $(result).find("CARD_LIST").find("CARD_LIST_CNT").text();
			if(dataCnt2==null || dataCnt2=="") dataCnt2 = 0;

			///////////////////////////////////////////////////////////////////////////////////////
			message("["+dataCnt2+"] "+I002);
			disabled("#btnExcept,#btnDelete",!(dataCnt2>0));
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function ReconSet() {
	if($("#dataTable1 tbody input:checkbox[name=chk1]:checked").length==0 ||
	   $("#dataTable2 tbody input:checkbox[name=chk2]:checked").length==0) {
		alert("처리할 대상을 먼저 선택해 주세요!");
		return;
	}
	if($("#JRNL_TOTAL").val()!=$("#CARD_TOTAL").val()) {
		alert("전표금액과 카드금액이 일치하지 않습니다!");
		return;
	}

	var action = "scn1.do?method=AB051Recon";
	var params = "&DATATABLE1="+checkData("dataTable1","chk1")
		       + "&DATATABLE2="+checkData("dataTable2","chk2")
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			Retrieve();
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function ReconDel() {
	if($("#dataTable1 tbody input:checkbox[name=chk1]:checked").length==0 ||
	   $("#dataTable2 tbody input:checkbox[name=chk2]:checked").length==0) {
		alert("처리할 대상을 먼저 선택해 주세요!");
		return;
	}
	if($("#JRNL_TOTAL").val()!=$("#CARD_TOTAL").val()) {
		alert("전표금액과 카드금액이 일치하지 않습니다!");
		return;
	}

	var action = "scn1.do?method=AB051ReconDel";
	var params = "&DATATABLE1="+checkData("dataTable1","chk1")
               + "&DATATABLE2="+checkData("dataTable2","chk2")
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			Retrieve();
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Except() {
	if($("#dataTable2 tbody input:checkbox[name=chk2]:checked").length==0) {
		alert("처리할 대상을 먼저 선택해 주세요!");
		return;
	}

	var action = "scn1.do?method=AB051Expect";
	var params = "&DATATABLE="+checkData("dataTable2","chk2");
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			RetrieveCard();
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Delete() {
	if($("#dataTable2 tbody input:checkbox[name=chk2]:checked").length==0) {
		alert("처리할 대상을 먼저 선택해 주세요!");
		return;
	}

	var action = "scn1.do?method=AB051Delete";
	var params = "&DATATABLE="+checkData("dataTable2","chk2");
		       + "&call=xml";

   	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
   		success: function(result){
   			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
   				return false;
   			}
			RetrieveCard();
			message(I003);
   		},
   		error: function(xhr, ajaxOptions, thrownError){
   			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//   			alert(xhr.responseText); //for debuging 
   		}
   	});
}

function activeButton(dataCnt1,dataCnt2) {
	var reconType = getRadioValue("S_STATUS");
	disabled("#btnReconSet",!(dataCnt1>0 && dataCnt2>0 && reconType=='N'));
	disabled("#btnReconDel",!(dataCnt1>0 && dataCnt2>0 && reconType=='Y'));
	disabled("#btnExcept,#btnDelete",!(dataCnt2>0));
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-405);
}
