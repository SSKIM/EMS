//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnCancel,#BOND_CODE,#DEPT_CODE",true); //#btnAdd,
	readonly("#TRANS_DATE,#REMARK,#ACCT_CODE,#ACCT_NAME,#BOND_NO,#BOND_SEQ",true);
    // MANDATORY
	required("#S_BASE_DATE,#BOND_CODE,#TRANS_DATE,#ACCT_CODE",true);
	// EVENT -button
	$("#btnRetrieve").click(Retrieve);
	$("#btnJrnlCreate").click(JrnlCreate);
    $("#btnAdd").click(Insert);
    $("#btnUpdate").click(Update);
    $("#btnDelete").click(Delete);
	$("#btnNew").click(New);
	$("#btnCancel").click(Cancel);
	// EVENT -popup
	$("#btnExcelImport").click(popupBond);
	$("#btnPopupAcct").click(function() { popupAccounts("AB080","#ACCT_CODE","#ACCT_NAME"); });
	// EVENT -etc
	$("#S_BASE_DATE").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	//
	$('#S_BASE_DATE').datepicker({dateFormat: 'yy-mm'});
	disabledDate("#TRANS_DATE");
    $("#dataTable1").tablesorter();
	initEvent();
	// DEFAULT VALUE
	number("#DEBIT_AMT,#CREDIT_AMT");
	$("#S_BASE_DATE").val(currDate("yyyyMM"));
	$("#S_BOND_CODE,#BOND_CODE").val("");
	$("#DEPT_CODE").val("DM2");
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}
function dataTableRow2_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable2',obj.rowIndex);
	bindData2(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(key1) {
	if($("#S_BASE_DATE").val()=="") {
		alert("기준월을 입력해 주세요!");
		$("#S_BASE_DATE").focus();
		return;
	}
	Clear();

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AB080Retrieve";
	var params = "&BASE_DATE="+$("#S_BASE_DATE").val()+"&BOND_CODE="+$("#S_BOND_CODE").val()+"&call=xml";

	showBack();
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			if($(result).find("DATA_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}

			$(result).find("DATA_LIST").find("ROW").each(function(){
				var bondNo = $(this).find("BOND_NO").text();
				var bondRn = $(this).find("RN").text();
				if("1"==bondRn) {
					var bondSeqCnt = $(this).find("BOND_SEQ_CNT").text();
					$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
					+"<td class=seq>"+j+"</td>"
					+"<td rowspan="+bondSeqCnt+" align=center><input type='checkbox' name='chk' value='"+bondNo+"'/></td>"
	                +"<td rowspan="+bondSeqCnt+" align=center>"+$(this).find("BOND_NO").text()+"</td>"
	                +"<td rowspan="+bondSeqCnt+" align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
	                +"<td rowspan="+bondSeqCnt+" align=center>"+$(this).find("BOND_CODE").text()+"</td>"
	                +"<td rowspan="+bondSeqCnt+">"+$(this).find("BOND_NAME").text()+"</td>"
	                +"<td rowspan="+bondSeqCnt+">"+$(this).find("REMARK").text()+"</td>"
	                +"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
					+"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
					+"<td align=center>"+$(this).find("DEPT_CODE").text()+"</td>"
					+"<td align=right>"+$(this).find("DEBIT_AMT").text()+"</td>"
					+"<td align=right>"+$(this).find("CREDIT_AMT").text()+"</td>"
	                +"</tr>");
				} else {
					$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
					+"<td class=seq>"+j+"</td>"
	                +"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
					+"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
					+"<td align=center>"+$(this).find("DEPT_CODE").text()+"</td>"
					+"<td align=right>"+$(this).find("DEBIT_AMT").text()+"</td>"
					+"<td align=right>"+$(this).find("CREDIT_AMT").text()+"</td>"
	                +"</tr>");
				}
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
				var index = tableRowIndex(tableId,new Array(key1),"1");
//				tableRowColor(tableId,index);
//				bindData(tableRowObj(tableId,index));
			}

			message(dataCnt+" "+I002);
		}
	});
}
function RetrieveDetail(bondNo, bondSeq) {
	var tableId = "#dataTable2", tableRowId = "dataTableRow2";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AB080RetrieveDetail";
	var params = "&BOND_NO="+bondNo+"&call=xml";

//	showBack();
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
				+"<td class=seq>"+j+"</td>"
                +"<td align=center>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td align=center>"+$(this).find("BOND_CODE").text()+"</td>"
                +"<td>"+$(this).find("BOND_NAME").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
				+"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
				+"<td align=center>"+$(this).find("DEPT_CODE").text()+"</td>"
				+"<td align=right>"+$(this).find("DEBIT_AMT").text()+"</td>"
				+"<td align=right>"+$(this).find("CREDIT_AMT").text()+"</td>"
				+"<td class=hidden>"+$(this).find("BOND_NO").text()+"</td>"
				+"<td class=hidden>"+$(this).find("BOND_SEQ").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
				var index = tableRowIndex(tableId,new Array(bondNo, bondSeq),"10,11");
				tableRowColor(tableId,index);
				bindData2(tableRowObj(tableId,index));
			}

			message(dataCnt+" "+I002);
		}
	});
}
function JrnlCreate() {
	var bondNo = checkData("dataTable1","chk");
	if(bondNo=="") {
		alert("처리항 항목을 먼저 선택해주세요!");
		return;
	}
	if(!confirm("전표를 발행하시겠습니까?")) { return; }
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action  = "scn1.do?method=AB080JR&call=xml";
    var params  = "&BOND_NO="+bondNo;
	showBack();
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			var jrnlNo = $(result).find("DATA").find("dataPK").find("JRNL_NO").text();
			if(confirm("전표가 발행되었습니다. 전표작성화면으로 이동하시겠습니까?\n( 전표번호 : "+jrnlNo+")")) {
				top.document.all.fbody.src = "scn1.do?menuId=1100&menuSubId=1101&screenId=AA010&JRNL_NO="+jrnlNo;
			}
		}
	});
}
function Insert() {
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action  = "scn1.do?method=AB080Insert&call=xml";
    var params  = "&BOND_NO="+$("#BOND_NO").val()
//			    + "&TRANS_DATE="+$("#TRANS_DATE").val()
//			    + "&BOND_CODE="+$("#BOND_CODE").val()
//			    + "&REMARK="+$("#REMARK").val()
			    + "&ACCT_CODE="+$("#ACCT_CODE").val()
			    + "&DEPT_CODE="+$("#DEPT_CODE").val()
			    + "&DEBIT_AMT="+$("#DEBIT_AMT").val().replaceAll(",","")
			    + "&CREDIT_AMT="+$("#CREDIT_AMT").val().replaceAll(",","")
			    ;
	showBack();
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("BOND_NO").text();
			var key2 = $(result).find("DATA").find("dataPK").find("BOND_SEQ").text();
			RetrieveDetail(key1, key2);
			message(I003);
		}
	});
}
function Update() {
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action  = "scn1.do?method=AB080Update&call=xml";
    var params  = "&BOND_NO="+$("#BOND_NO").val()
			    + "&BOND_SEQ="+$("#BOND_SEQ").val()
			    + "&ACCT_CODE="+$("#ACCT_CODE").val()
			    + "&DEPT_CODE="+$("#DEPT_CODE").val()
			    + "&DEBIT_AMT="+$("#DEBIT_AMT").val().replaceAll(",","")
			    + "&CREDIT_AMT="+$("#CREDIT_AMT").val().replaceAll(",","")
			    ;
	showBack();
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("BOND_NO").text();
			var key2 = $(result).find("DATA").find("dataPK").find("BOND_SEQ").text();
			RetrieveDetail(key1, key2);
			message(I003);
		}
	});
}
function Delete() {
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!window.confirm(W002)) { 
	    return false;
	}
	$("#btnRetrieve").focus();
	var bondNo  = $("#BOND_NO").val();
	//-----------------------------------------------------
    var action = "scn1.do?method=AB080Delete&call=xml";
    var params = "&BOND_NO="+bondNo+"&BOND_SEQ="+$("#BOND_SEQ").val();

	showBack();
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			RetrieveDetail(bondNo);
			message(I003);
		}
	});
}
function New() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel,#BOND_CODE",false);
	disabled("#btnNew,#btnUpdate,#btnDelete",true);
	readonly("#TRANS_DATE",false);
    // MANDATORY
	// DEFAULT VALUE
	date("#TRANS_DATE");
	$("#BOND_NO,#BOND_SEQ,#TRANS_DATE").val("");
	$("#TRANS_DATE").focus();
}
function Cancel() {
	Clear();	
	// READONLY MODE
	disabled("#btnCancel,#BOND_CODE",true); //#btnAdd,
	disabled("#btnNew,#btnUpdate,#btnDelete",false);
	disabledDate("#TRANS_DATE");
	readonly("#TRANS_DATE",true);
    // MANDATORY
	required("#TRANS_DATE,#BOND_CODE,#ACCT_CODE",true);
	// RE-BIND DATA
	var rowIndex = $("#rowIndex").val();
	if(rowIndex!="" && !isNaN(rowIndex) && $("#dataTable1 tbody tr").length>0) {
		bindData(tableRowObj("#dataTable1",rowIndex));
	}
}
//-------------------------------------------------------------------------------------------------
function bindData(obj) {
	RetrieveDetail(obj.cells[2].innerHTML)
}
function bindData2(obj) {
	$("#rowIndex").val(obj.cells[0].innerHTML);
	i++;
	$("#TRANS_DATE").val(obj.cells[1].innerHTML);
	$("#BOND_CODE").val( obj.cells[2].innerHTML);
	$("#REMARK").val(    obj.cells[4].innerHTML);
	$("#ACCT_CODE").val( obj.cells[5].innerHTML);
	$("#ACCT_NAME").val( obj.cells[6].innerHTML);
	$("#DEPT_CODE").val( obj.cells[7].innerHTML);
	$("#DEBIT_AMT").val( obj.cells[8].innerHTML);
	$("#CREDIT_AMT").val(obj.cells[9].innerHTML);

	$("#BOND_NO").val( obj.cells[10].innerHTML);
	$("#BOND_SEQ").val(obj.cells[11].innerHTML);
}
function Clear() {
//	$('#formData').clearForm();
	$("#formData :input").not(':button, :submit, :reset, :hidden, :radio').val("");
	$("#FIXED_DEPOSIT_NO,#BANK_CODE").val("");
	$(".historyTable td span").text("");
	requiredClear();
}
function initEvent() {
	var winH          = $(window).height();
	var titleTableH   = $("#titleTable").height();
	var buttonH       = $("#button").height();
	var formTable     = $("#formTable1").height();
	var historyTableH = $("#historyTable").height();
	var statusTable   = $("#statusTable").height();

	$("#divMain").css("height",winH-(titleTableH+buttonH+formTable+historyTableH+statusTable+192));
}