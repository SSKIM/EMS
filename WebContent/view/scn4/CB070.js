//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnAdd,#btnCancel,#FIXED_DEPOSIT_NO",true);
	readonly("#ACCOUNT_NO,#FIXED_DEPOSIT_ACCOUNTS,#FIXED_DEPOSIT_ACCOUNTS_NAME,#UNEARNED_REVENUE_ACCOUNTS,#UNEARNED_REVENUE_ACCOUNTS_NAME,#OPERATION_DAYS",true);
    // MANDATORY
	required("#FIXED_DEPOSIT_NO,#ACCOUNT_NO,#BANK_CODE,#DEPOSIT_DATE,#DUE_DATE,#OPERATION_DAYS,#INTEREST_RATE,#AMT,#FIXED_DEPOSIT_ACCOUNTS,#UNEARNED_REVENUE_ACCOUNTS",true);
	// EVENT -button
	$("#btnRetrieve").click(Retrieve);
	$("#btnDeposit").click(Deposit);
	$("#btnRemainInterest").click(RemainInterest);
	$("#btnTerminationDue").click(TerminationDue);
    $("#btnAdd").click(Insert);
    $("#btnUpdate").click(Update);
    $("#btnDelete").click(Delete);
	$("#btnNew").click(New);
	$("#btnCancel").click(Cancel);
	// EVENT -popup
	$("#btnPopupAcct1").click(PopupAcct1);
	$("#btnPopupAcct2").click(PopupAcct2);
	// EVENT -etc
	$("#S_DEPOSIT_DATE").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	$("#FIXED_DEPOSIT_NO").change(function() {
		$("#ACCOUNT_NO").val($(this).val().substring($(this).val().indexOf("|")+1));
	});
	$("#DEPOSIT_DATE").change(function() {
		var depositDate = $("#DEPOSIT_DATE").val();
		var dueDate     = $("#DUE_DATE").val();
		$("#OPERATION_DAYS").val(dateDiff(depositDate, dueDate));
	});
	$("#DUE_DATE").change(function() {
		var depositDate = $("#DEPOSIT_DATE").val().trim();
		var dueDate     = $("#DUE_DATE").val().trim();
		$("#OPERATION_DAYS").val(dateDiff(depositDate, dueDate));
	});
	$("#INTEREST_RATE").keydown(function(event) {
		if(event.which==8 || event.which==9 || event.which==16 || event.which==188 || event.which==189 || event.which==190 || event.which==110) {
			// 8:backspace, tab:, shift:16, ,:188, -:189, .:190, .:110
		} else if((event.which>=48 && event.which<=57) || event.which>=96 && event.which<=105) {
			// 0:48, 9:57
		} else {
			return false;
		}
	});
	//
//	$('#S_DEPOSIT_DATE').datepicker({dateFormat: 'yy-mm'});
	date("#S_DEPOSIT_DATE,#DEPOSIT_DATE,#DUE_DATE");
	number("#OPERATION_DAYS,#AMT");
    $("#dataTable1").tablesorter();
	initEvent();
	// DEFAULT VALUE
	$("#S_DEPOSIT_DATE").val(currDate("yyyyMMdd"));
	$("#FIXED_DEPOSIT_NO,#BANK_CODE").val("");
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex-1);
	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function exec(type) {
	$("#btnRetrieve").focus();
	var fixDepositNo = checkData("dataTable1","chk");
	if(fixDepositNo=="") {
		alert("처리항 항목을 먼저 선택해주세요!");
		return;
	}
	//-----------------------------------------------------
    var action = "";
	var params = "&BASE_DATE="+$("#S_DEPOSIT_DATE").val()+"&FIXED_DEPOSIT_NO="+fixDepositNo;

	if(type=="1") {
		action = "scn1.do?method=AB070DepositJR&call=xml";
	} else if(type=="2") {
		action = "scn1.do?method=AB070DepositJR2&call=xml";
	} else if(type=="3") {
		action = "scn1.do?method=AB070DepositJR3&call=xml";
	}

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			message(I003);

			var jrnlNo = $(result).find("DATA").find("dataPK").find("JRNL_NO").text();
			if(confirm("전표가 발행되었습니다. 전표작성화면으로 이동하시겠습니까?\n( 전표번호 : "+jrnlNo+")")) {
				top.document.all.fbody.src = "scn1.do?menuId=1100&menuSubId=1101&screenId=AA010&JRNL_NO="+jrnlNo;
			}
		}
	});
}
function Deposit() {
	if(confirm("전표를 발행하시겠습니까?")) {
		exec("1");
	}
}
function RemainInterest() {
	if($("#S_DEPOSIT_DATE").val()=="") {
		alert("기준월을 입력해 주세요!");
		$("#S_DEPOSIT_DATE").focus();
		return;
	}
	if(confirm("전표를 발행하시겠습니까?")) {
		exec("2");
	}
}
function TerminationDue() {
	if($("#S_DEPOSIT_DATE").val()=="") {
		alert("기준월을 입력해 주세요!");
		$("#S_DEPOSIT_DATE").focus();
		return;
	}
	if(confirm("전표를 발행하시겠습니까?")) {
		exec("3");
	}
}

function Retrieve(key1) {
	if($("#S_DEPOSIT_DATE").val()=="") {
		alert("기준월을 입력해 주세요!");
		$("#S_DEPOSIT_DATE").focus();
		return;
	}
	Cancel();
	Clear();

	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AB070Retrieve";
	var params = "&DEPOSIT_DATE="+$("#S_DEPOSIT_DATE").val()+"&call=xml";

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
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td class=seq>"+j+"</td>"
				+"<td align=center><input type='checkbox' name='chk' value='"+$(this).find("FIXED_DEPOSIT_NO").text()+"'/></td>"
                +"<td>"+$(this).find("FIXED_DEPOSIT_NO").text()+"</td>"
                +"<td>"+$(this).find("ACCOUNT_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("BANK_CODE").text()+"</td>"
                +"<td>"+$(this).find("BANK_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("DEPOSIT_DATE").text()+"</td>"
				+"<td align=center>"+$(this).find("DUE_DATE").text()+"</td>"
				+"<td align=right>"+$(this).find("OPERATION_DAYS").text()+"</td>"
				+"<td align=right>"+$(this).find("INTEREST_RATE").text()+"</td>"
				+"<td align=right>"+$(this).find("AMT").text()+"</td>"
				+"<td align=right>"+$(this).find("AMT1").text()+"</td>"
				+"<td align=right>"+$(this).find("AMT2").text()+"</td>"
				+"<td align=right>"+$(this).find("AMT3").text()+"</td>"
				+"<td align=right>"+$(this).find("UNEARNED_REVENUE_INTEREST_SUM").text()+"</td>"
				+"<td align=right>"+$(this).find("UNEARNED_REVENUE_INTEREST_AMT").text()+"</td>"
				+"<td align=center>"+$(this).find("FIXED_DEPOSIT_ACCONTS").text()+"</td>"
				+"<td align=center>"+$(this).find("UNEARNED_REVENUE_ACCOUNTS").text()+"</td>"
				+"<td class=hidden>"+$(this).find("FIXED_DEPOSIT_ACCONTS_NAME").text()+"</td>"
				+"<td class=hidden>"+$(this).find("UNEARNED_REVENUE_ACCOUNTS_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("INS_DATE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("INS_USER").text()+"</td>"
                +"<td class=hidden>"+$(this).find("UPD_DATE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("UPD_USER").text()+"</td>"
                +"</tr>");
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
function Insert() {
	if($("#S_DEPOSIT_DATE").val()=="") {
		alert("기준월을 입력해 주세요!");
		$("#S_DEPOSIT_DATE").focus();
		return;
	}
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "scn1.do?method=AB070Insert&call=xml";
    var params = "&FIXED_DEPOSIT_NO="+$("#FIXED_DEPOSIT_NO").val()
			   + "&ACCOUNT_NO="+$("#ACCOUNT_NO").val()
			   + "&BANK_CODE="+$("#BANK_CODE").val()
			   + "&DEPOSIT_DATE="+$("#DEPOSIT_DATE").val()
			   + "&DUE_DATE="+$("#DUE_DATE").val()
			   + "&OPERATION_DAYS="+$("#OPERATION_DAYS").val()
			   + "&INTEREST_RATE="+$("#INTEREST_RATE").val()
			   + "&AMT="+$("#AMT").val().replaceAll(",","")
			   + "&FIXED_DEPOSIT_ACCOUNTS="+$("#FIXED_DEPOSIT_ACCOUNTS").val()
			   + "&UNEARNED_REVENUE_ACCOUNTS="+$("#UNEARNED_REVENUE_ACCOUNTS").val()
			   ;
	showBack();
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("SCREEN_ID").text();
			Retrieve(key1);
			message(I003);
		}
	});
}
function Update() {
	if($("#S_DEPOSIT_DATE").val()=="") {
		alert("기준월을 입력해 주세요!");
		$("#S_DEPOSIT_DATE").focus();
		return;
	}
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action  = "scn1.do?method=AB070Update&call=xml";
    var params  = "&FIXED_DEPOSIT_NO="+$("#FIXED_DEPOSIT_NO").val()
			    + "&ACCOUNT_NO="+$("#ACCOUNT_NO").val()
			    + "&BANK_CODE="+$("#BANK_CODE").val()
			    + "&DEPOSIT_DATE="+$("#DEPOSIT_DATE").val()
			    + "&DUE_DATE="+$("#DUE_DATE").val()
			    + "&OPERATION_DAYS="+$("#OPERATION_DAYS").val()
			    + "&INTEREST_RATE="+$("#INTEREST_RATE").val()
			    + "&AMT="+$("#AMT").val().replaceAll(",","")
			    + "&FIXED_DEPOSIT_ACCOUNTS="+$("#FIXED_DEPOSIT_ACCOUNTS").val()
			    + "&UNEARNED_REVENUE_ACCOUNTS="+$("#UNEARNED_REVENUE_ACCOUNTS").val()
			    ;
	showBack();
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("SCREEN_ID").text();
			Retrieve(key1);
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
	//-----------------------------------------------------
    var action = "scn1.do?method=AB070Delete&call=xml";
    var params = "&FIXED_DEPOSIT_NO="+$("#FIXED_DEPOSIT_NO").val();

	showBack();
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			Retrieve();
			message(I003);
		}
	});
}
function New() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel,#FIXED_DEPOSIT_NO",false);
	disabled("#btnNew,#btnUpdate,#btnDelete",true);
//	readonly("#FIXED_DEPOSIT_NO",false);
    // MANDATORY
	// DEFAULT VALUE
	$("#FIXED_DEPOSIT_NO").val("").focus();
}
function Cancel() {
	Clear();	
	// READONLY MODE
	disabled("#btnAdd,#btnCancel,#FIXED_DEPOSIT_NO",true);
	disabled("#btnNew,#btnUpdate,#btnDelete",false);
//	readonly("#FIXED_DEPOSIT_NO",true);
    // MANDATORY
	required("#FIXED_DEPOSIT_NO,#ACCOUNT_NO,#BANK_CODE",true);
	// RE-BIND DATA
	var rowIndex = $("#rowIndex").val();
	if(rowIndex!="" && !isNaN(rowIndex) && $("#dataTable1 tbody tr").length>0) {
		bindData(tableRowObj("#dataTable1",rowIndex));
	}
}
// [POPUP]-----------------------------------------------------------------------------------------
function PopupAcct1() {
	var param = new Object();
	param.ACCT_CODE = $("#FIXED_DEPOSIT_ACCOUNTS").val();
	param.ACCT_NAME = $("#FIXED_DEPOSIT_ACCOUNTS_NAME").val();
	
	var url   = "popup.do?method=CP050&screenId=CP050&screenIdRef=SA010&refVal=&isPopup=true";
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url,param,style);
	if(retVal != null) {
		$("#FIXED_DEPOSIT_ACCOUNTS").val(retVal.ACCT_CODE);
		$("#FIXED_DEPOSIT_ACCOUNTS_NAME").val(retVal.ACCT_NAME);
	}
}
function PopupAcct2() {
	var param = new Object();
	param.ACCT_CODE = $("#UNEARNED_REVENUE_ACCOUNTS").val();
	param.ACCT_NAME = $("#UNEARNED_REVENUE_ACCOUNTS_NAME").val();
	
	var url   = "popup.do?method=CP050&screenId=CP050&screenIdRef=SA010&refVal=&isPopup=true";
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url,param,style);
	if(retVal != null) {
		$("#UNEARNED_REVENUE_ACCOUNTS").val(retVal.ACCT_CODE);
		$("#UNEARNED_REVENUE_ACCOUNTS_NAME").val(retVal.ACCT_NAME);
	}
}
//-------------------------------------------------------------------------------------------------
function bindData(obj) {
	$("#rowIndex").val(obj.cells[0].innerHTML);
	i++;
	if(!$("#btnNew").attr("disabled")) {
		$("#FIXED_DEPOSIT_NO").val(          obj.cells[2].innerHTML+"|"+obj.cells[3].innerHTML);
	}
	$("#ACCOUNT_NO").val(                    obj.cells[3].innerHTML);
	$("#BANK_CODE").val(                     obj.cells[4].innerHTML);
	$("#DEPOSIT_DATE").val(                  obj.cells[6].innerHTML);
	$("#DUE_DATE").val(                      obj.cells[7].innerHTML);
	$("#OPERATION_DAYS").val(                obj.cells[8].innerHTML);
	$("#INTEREST_RATE").val(                 obj.cells[9].innerHTML);
	$("#AMT").val(                           obj.cells[10].innerHTML);
	$("#FIXED_DEPOSIT_ACCOUNTS").val(        obj.cells[16].innerHTML);
	$("#FIXED_DEPOSIT_ACCOUNTS_NAME").val(   obj.cells[18].innerHTML);
	$("#UNEARNED_REVENUE_ACCOUNTS").val(     obj.cells[17].innerHTML);
	$("#UNEARNED_REVENUE_ACCOUNTS_NAME").val(obj.cells[19].innerHTML);
	$("#INS_DATE").html(obj.cells[20].innerHTML);
	$("#INS_USER").html(obj.cells[21].innerHTML);
	$("#UPD_DATE").html(obj.cells[22].innerHTML);
	$("#UPD_USER").html(obj.cells[23].innerHTML);
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

	$("#divMain").css("height",winH-(titleTableH+buttonH+formTable+historyTableH+statusTable+42));
}