//EVENT////////////////////////////////////////////////////////////////////////////////////////////

var isComplete  = true;
var isComplete2 = true;
var OpenDate_From = "";
var OpenDate_To = "";
var temp_ASST = "";
var tabid= 1;


$(document).ready(function(){
	Screen_Setup();

	// READONLY MODE
	disabled("#btnSave,#btnPrint,#btnPrintTrafficEx,#btnSubmit",true);
	disabled("#btnTemplate,#btnInsert,#btnUpdate,#btnDelete,#btnAdd1,#btnEdit1,#btnRemove1,#btnAdd2,#btnEdit2,#btnRemove2",true);
	readonly("#TOTAL,#TOTAL_AMT,#DEBIT_TOTAL2,#CREDIT_TOTAL2",true);
	display("#divVENDOR_CODE2,#divVENDOR_CODE3,#divASST_CODE1,#divCHNL_CODE1",false);
	display("#REMARK1,#REMARK2,#REMARK3,#REMARK4",false);
	display("#divVAT_TYPE2,#divPRD_CODE2,#divAFS_TYPE2,#divSUP_CODE2,#divDEPT_CODE2,#divCHNL_CODE2",false);
	display("#lblVENDOR_CODE1,#lblVENDOR_CODE2,#lblVENDOR_CODE3",false);
    // MANDATORY
	required("#EXPS_TYPE_ID,#TRANS_DATE,#REMARK,#VENDOR_CODE1,#COMPANY_NAME,#TOTAL_AMT",true);
	required("#DEPT_AMT1,#DEPT_CODE1",true);
	required("#TRANS_DATE2,#REMARK6,#DEBIT_TOTAL2,#CREDIT_TOTAL2",true);
	required("#ACCT_CODE2,#DEPT_AMT2,#DRCR_TYPE2,#DEPT_CODE2",true);

	date("#TRANS_DATE,#PAY_DUE_DATE,#TRANS_DATE2,#PAY_DUE_DATE2");
	$("#TRANS_DATE").val(currDate());
	$("#PAY_DUE_DATE").val(currDate());
	$("#TRANS_DATE2").val(currDate());
	$("#PAY_DUE_DATE2").val(currDate());
	number("#TOTAL,#DEPT_AMT1,#DEPT_AMT2,#SUPPLY_AMT,#VAT_AMT,#TOTAL_AMT,#DEBIT_TOTAL2,#CREDIT_TOTAL2,#SUPPLY_AMT,#VAT_AMT,#TOTAL_AMT");
	
	// EVENT
	$("#btnNew").click(New);
	$("#btnSave").click(Save);
	$("#btnPrint").click(Print);
	$("#btnPrintTrafficEx").click(PrintTrafficEx);
	$("#btnSubmit").click(Submit);

	$("#btnTemplate").click(Template);
	$("#btnInsert").click(Insert);
	$("#btnUpdate").click(Update);
	$("#btnDelete").click(Delete);

	$("input:button[name=btnAdd]").click(function(){
		Add($("input:button[name=btnAdd]").index(this));
	});
	$("input:button[name=btnEdit]").click(function(){
		Edit($("input:button[name=btnEdit]").index(this));
	});
	$("input:button[name=btnRemove]").click(function(){
		Remove($("input:button[name=btnRemove]").index(this));
	});

	$("#btnPopupAcct").click(PopupAcct);
	$("#btnPopupVndr").click(PopupVndr);
	$("#btnPopupEmpl").click(PopupEmpl);
	$("#EXPS_TYPE_ID").change(function(){
		RetrieveRemark($(this));
	});
// $("#VENDOR_CODE2").change(function(){
// RetrieveInfo($(this).val());
// });
	
	getOpenDate();
	
	$("input:radio[name=USE_TYPE]").change(function(){
// if(getRadioValue("USE_TYPE")=="CC") {
// display("#BUSI_NO",true);
// readonly("#BUSI_NO",false);
// required("#BUSI_NO",true);
// $("#lblBUSI_NO").html("개인신용카드번호");
// $("#BUSI_NO").unmask();
// $("#BUSI_NO").mask("9999-9999-9999-9999");
// } else {
// display("#BUSI_NO",false);
// required("#BUSI_NO",false);
// $("#lblBUSI_NO").html("");
// $("#BUSI_NO").unmask();
// $("#BUSI_NO").mask("999-99-99999");
// }
	});
	$("#TRANS_DATE,#PAY_DUE_DATE,#EXPS_TYPE_ID,#VENDOR_CODE1,#VENDOR_CODE2,#VENDOR_CODE3,#PAY_METHOD_TYPE,#COMPANY_NAME,#BUSI_NO,#REMARK,#REMARK1,#REMARK2,#REMARK3,#REMARK4,#TOTAL_AMT,#SUPPLY_AMT,#VAT_AMT").change(function(){
		isComplete2 = false;
		if($("#S_JRNL_NO").html()=="") {
			 $.msgBox({ title:"Warring", content:I001});
				isComplete2 = true;
			return;
		}
	});
	$("#TRANS_DATE2,#PAY_DUE_DATE2,#PAY_METHOD_TYPE2,#REMARK6,#DEBIT_TOTAL2,#CREDIT_TOTAL2").change(function(){
		isComplete2 = false;
		if($("#S_JRNL_NO").html()=="") {
			 $.msgBox({ title:"Warring", content:I001});
			// $("#TRANS_DATE2,#PAY_DUE_DATE2").unbind("change");
			// $.msgBox({ title:"Warring", content:"Please create a Journal
			// Number", type:"info" });
			isComplete2 = true;
			return;
		}
	});
	$('#evidTabs').tabs({
		select: function(event, ui) {
			if(isComplete2== true) {
				tabEvent(ui.index+1);
			} else {
				$.msgBox({
				    title: "Notice",
				    content: '변경내역이 저장되지 않았습니다. 저장하지 않고 이동하시겠습니까?',
				    type: "confirm",
				    buttons: [{ value: "Yes" }, { value: "No" }],
				    success: function (result) {
				        if (result == "Yes") {
							isComplete2 = true;
							$('#evidTabs').tabs("select", ui.index);
							tabEvent(ui.index+1);
				        }
				    }
				});
				return false;
				/*
				 * if(confirm("변경내역이 저장되지 않았습니다. 저장하지 않고 이동하시겠습니까??")) {
				 * isComplete2 = true; tabEvent(ui.index+1); } else { return
				 * false; }
				 */
			}
		}
	});
	$("#ACCT_CODE2,#ACCT_NAME2").change(function(e){ $("#validACCT_CODE2").val("false"); });
	$("#ACCT_CODE2").keyup(function(e){
		if(e.keyCode==13) {
			$("#validACCT_CODE2").val("false");
			getAcctName($(this).val(),"Y");
		}
	});
	$("#ACCT_NAME2").keyup(function(e){
		if(e.keyCode==13) {
			if($(this).val() != null && $(this).val().trim() != "") {
				PopupAcct();
			}
		}
	});
	$("#VENDOR_CODE2,#VENDOR_NAME2").change(function(e){ $("#validVENDOR_CODE2").val("false"); });
	$("#VENDOR_CODE2").keyup(function(e){
		if(e.keyCode==13) {
			$("#validVENDOR_CODE2").val("false");
			getVendorName($(this).val(),"Y");
		}
	});
	$("#VENDOR_NAME2").keyup(function(e){
		if(e.keyCode==13) {
			if($(this).val() != null && $(this).val().trim() != "") {
				PopupVndr();
			}
		}
	});
	$("#VENDOR_CODE3,#VENDOR_NAME3").change(function(e){ $("#validVENDOR_CODE3").val("false"); });
	$("#VENDOR_CODE3").keyup(function(e){
		if(e.keyCode==13) {
			$("#validVENDOR_CODE3").val("false");
			getEmplName($(this).val(), "Y");
		}
	});
	$("#VENDOR_NAME3").keyup(function(e){
		if(e.keyCode==13) {
			if($(this).val() != null && $(this).val().trim() != "") {
				PopupEmpl();
			}
		}
	});
	$("#REMARK4").blur(function(){
// if(fuelExpsType==$("#ACCT_CODE").val()) {
		if(fuelExpsType==$("#EXPS_TYPE_ID").val()) {
			var km = $("#REMARK4").val().replaceAll(",","");
			if(isNaN(km*fuelUnitPrice)) {
				$.msgBox({ title:"Warring", content:"주행거리의 값이 옳바르지 않습니다!\n다시 입력해 주세요!"});
				$("#REMARK4").focus();
			} else {
				$("#DEPT_AMT1").val(km*fuelUnitPrice).keyup();
			}
		}
	});

	$("#REMARK,#REMARK1,#REMARK2,#REMARK3,#REMARK4,#REMARK6").keyup(function(e){
		$("#byte"+$(this).attr("id")).text(checkByteLen($(this).val()));
	});
	$("#REMARK,#REMARK1,#REMARK2,#REMARK3,#REMARK4,#REMARK6").keypress(function(e){
		$("#byte"+$(this).attr("id")).text(checkByteLen($(this).val()));
	});

	$("#BUSI_NO").blur(function(){
		if($("#EVID_TYPE").val()!="EA") {
			if(!vaildBusiNo($("#BUSI_NO").val())) {
				$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblBUSI_NO").html()});
			}
		}
	});

	// find("VENDOR_CODE","VENDOR_NAME","RetrieveVendor");
	// find("ASST_CODE","ASST_NAME","RetrieveAsst");
	// find("DEPT_CODE","DEPT_NAME","RetrieveDept");
	// find("CHNL_CODE","CHNL_NAME","RetrieveChnl");
	// DEFAULT VALUE
    $("#dataTable").tablesorter();
// document.location.href = "#tab-4";
	$("#BUSI_NO").mask("999-99-99999");
	$("#DEPT_CODE1,#DEPT_CODE2").val(ssDeptCode);
	$("#DEPT_NAME1,#DEPT_NAME2").val(ssDeptName);
	// Validate
	window.onbeforeunload = checkform;
	initEvent();
	tabEvent_INIT();
	if(jrnlNo != "") {
		Retrieve(jrnlNo);
		RetrieveDetail(jrnlNo);
	}
});

function getOpenDate()
{
	var tableId = "#dataTable", tableRowId = "dataTableRow";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA010OpenDate";
	var params = "&CODE_ID=OPEN_DATE"
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			OpenDate_From  = $(result).find("DATA_INFO").find("ETC1").text();
			OpenDate_To  = $(result).find("DATA_INFO").find("ETC2").text();
		}
	});
}
function tabEvent_INIT()
{
	var j = 0;
	var action = "scn1.do?method=AA010TABINDEX";
	var params = "&USER_ID="+ssuserId
		       + "&call=xml";
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			j = $(result).find("DATA_INFO2").find("TAB_INDEX").text();
			$('#evidTabs').tabs("select", j-1);
			tabEvent(j);
		}
	});
}

function getAcctName(acctCode, popupYn) {
	if(acctCode.length == 7) {
		var action = "index.do?method=GETNAME";
		var params = "&TYPE=ACCT&CODE="+acctCode+"&call=xml";

		$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
			success: function(result){
				var acctCode  = $(result).find("DATA_INFO").find("ACCT_CODE").text();
				var acctName  = $(result).find("DATA_INFO").find("ACCT_NAME").text();
				var enterAnl1 = $(result).find("DATA_INFO").find("ENTER_ANL_1").text();
				var enterAnl2 = $(result).find("DATA_INFO").find("ENTER_ANL_2").text();
				var enterAnl3 = $(result).find("DATA_INFO").find("ENTER_ANL_3").text();
				var enterAnl5 = $(result).find("DATA_INFO").find("ENTER_ANL_5").text();
				var enterAnl6 = $(result).find("DATA_INFO").find("ENTER_ANL_6").text();
				var enterAnl7 = $(result).find("DATA_INFO").find("ENTER_ANL_7").text();
				var enterAnl8 = $(result).find("DATA_INFO").find("ENTER_ANL_8").text();

				$("#ACCT_CODE").val(acctCode);
				$("#ACCT_NAME2").val(acctName);
				$("#validACCT_CODE2").val("true");

				$("#ENTER_ANL_1").val(enterAnl1);
				$("#ENTER_ANL_3").val(enterAnl3);
				$("#ENTER_ANL_2").val(enterAnl2);
				$("#ENTER_ANL_5").val(enterAnl5);
				$("#ENTER_ANL_6").val(enterAnl6);
				$("#ENTER_ANL_7").val(enterAnl7);
				$("#ENTER_ANL_8").val(enterAnl8);

				display("#divDEPT_CODE2",(enterAnl1=="1")); // 부서
				display("#divCHNL_CODE2",(enterAnl3=="1")); // 채널
				display("#divPRD_CODE2", (enterAnl2=="1")); // 상품
				display("#divAFS_TYPE2", (enterAnl5=="1")); // 채권구분
				display("#divSUP_CODE2", (enterAnl6=="1")); // 거래처
				display("#divPAY_TYPE2", (enterAnl7=="1")); // 지급방법
				display("#divVAT_TYPE2", (enterAnl8=="1")); // 부가세구분

				required("#DEPT_CODE2",       (enterAnl1=="1"));
				required("#CHNL_CODE2",       (enterAnl3=="1"));
				required("#PRD_CODE2",        (enterAnl2=="1"));
				required("#AFS_TYPE2",        (enterAnl5=="1"));
				required("#SUP_CODE2",        (enterAnl6=="1"));
				required("#PAY_METHOD_TYPE2", (enterAnl7=="1"));
				required("#VAT_TYPE2",        (enterAnl8=="1"));

				$("#DEPT_AMT2").focus();
			},
			complete: function(){
				if(popupYn=="Y" && $("#validACCT_CODE2").val()!="true") {
					PopupAcct();
				}
			}
		});
	}
}
function getVendorName(vndrCode, popupYn) {
	if(vndrCode.length == 7) {
		var action = "index.do?method=GETNAME";
		var params = "&TYPE=VNDR&CODE="+vndrCode+"&call=xml";

		$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
			success: function(result){
				var vndrCode  = $(result).find("DATA_INFO").find("VNDR_CODE").text();
				var vndrName  = $(result).find("DATA_INFO").find("VNDR_NAME").text();
				var busiNo    = $(result).find("DATA_INFO").find("BUSI_NO").text();
				var anlCode1  = $(result).find("DATA_INFO").find("ANL_CODE1").text();

				$("#VENDOR_CODE2").val(vndrCode);
				$("#VENDOR_NAME2").val(vndrName);
				$("#COMPANY_NAME").val(vndrName);
				$("#BUSI_NO").val(busiNo);
				$("#PAY_METHOD_TYPE").val(anlCode1);
				$("#validVENDOR_CODE2").val("true");
			},
			complete: function(){
				if(popupYn=="Y" && $("#validVENDOR_CODE2").val()!="true") {
					PopupVndr();
				}
			}
		});
	}
}
function getEmplName(vndrCode, popupYn) {
	if(vndrCode.length == 7) {
		var action = "index.do?method=GETNAME";
		var params = "&TYPE=EMPL&CODE="+vndrCode+"&call=xml";
		var vndrCode = "";
		$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
			success: function(result){
				vndrCode  = $(result).find("DATA_INFO").find("VNDR_CODE").text();
			}
		});
		EmplName(vndrCode,popupYn);
	}
}
function EmplName(vndrCode, popupYn){
	var action = "scn1.do?method=GETNAME";
	var params = "&VANDER_CODE="+vndrCode+"&call=xml";
	
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$("#VENDOR_NAME3").html($(this).find("VENDOR_NAME").text());
				$("#VENDOR_NAME3").val($(this).find("VENDOR_NAME").text());
			});

			$("#VENDOR_CODE3").val(vndrCode);
			$("#validVENDOR_CODE3").val("true");
		},
		complete: function(){
			if(popupYn=="Y" && $("#validVENDOR_CODE3").val()!="true") {
				PopupEmpl();
			}
		}
	});
}
function checkform() {
	if(!isComplete) {
		return "아직 작성 중인 상태입니다.";
	}
}
function dataTableRow_onClick(obj) {
	if(isComplete == true && isComplete2 == true) {
		isComplete = true;
		tableRowColor('#dataTable',obj.rowIndex);

		var evidType = obj.cells[9].innerText;
		var index    = getIndexEvid(evidType);

		$("#evidTabs").tabs('select', index-1);
		tabEvent(index);

		bindData(obj);
		activeButton($("#S_JRNL_TYPE").html(),$("#S_STATUS").html());
		
		if(index==6) {
			RetrieveSub2(obj.cells[29].innerText,obj.cells[30].innerText);
			$("#DEPT_AMT2,#ACCT_CODE2,#ACCT_NAME2,#DRCR_TYPE2,#DEPT_AMT2,#CHNL_CODE1").val("");
		} else {
			RetrieveSub1(obj.cells[29].innerText,obj.cells[30].innerText);
			$("#DEPT_AMT1,#CHNL_CODE1,#CHNL_NAME1,#ASST_CODE1").val("");
		}
	} else {
		$.msgBox({
		    title: "Notice",
		    content: '변경내역이 저장되지 않았습니다. 저장하지 않고 이동하시겠습니까?',
		    type: "confirm",
		    buttons: [{ value: "Yes" }, { value: "No" }],
		    success: function (result) {
		        if (result == "Yes") {
					isComplete2 = true;
					tableRowColor('#dataTable',obj.rowIndex);

					var evidType = obj.cells[9].innerText;
					var index    = getIndexEvid(evidType);

					$("#evidTabs").tabs('select', index-1);
					tabEvent(index);

					bindData(obj);
					activeButton($("#S_JRNL_TYPE").html(),$("#S_STATUS").html());
					
					if(index==6) {
						RetrieveSub2(obj.cells[29].innerText,obj.cells[30].innerText);
						$("#DEPT_AMT2,#ACCT_CODE2,#ACCT_NAME2,#DRCR_TYPE2,#DEPT_AMT2,#CHNL_CODE1").val("");
					} else {
						RetrieveSub1(obj.cells[29].innerText,obj.cells[30].innerText);
						$("#DEPT_AMT1,#CHNL_CODE1,#CHNL_NAME1,#ASST_CODE1").val("");
					}
		        }
				else return false;
		    }
		});
	}
}
function deptTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#deptTable1',obj.rowIndex);
	bindDataDeptTable(obj,1);
}
function deptTableRow2_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#deptTable2',obj.rowIndex);
	bindDataDeptTable(obj,2);
}
function findTableRow_onClick(obj,code,name) {
	if(obj==null) return;
	tableRowColor('#findTable',obj.rowIndex);
	bindDataFindTable(obj,code,name);
}

// METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve(jrnlNo) {
	var action = "scn1.do?method=AA010Retrieve";
	var params = "&JRNL_NO="+jrnlNo+"&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$("#S_JRNL_NO").html($(this).find("JRNL_NO").text());
				$("#S_JRNL_TYPE").html($(this).find("JRNL_TYPE").text());
				$("#S_JRNL_TYPE_NAME").html($(this).find("JRNL_TYPE_NAME").text());
				$("#S_STATUS").html($(this).find("STATUS").text());
				$("#S_STATUS_NAME").html($(this).find("STATUS_NAME").text());
				$("#S_WRITE_DATE").html($(this).find("WRITE_DATE").text());
				$("#S_REMARK").val($(this).find("REMARK").text());
				$("#S_BUSI_UNIT_TYPE").val($(this).find("BUSI_UNIT_TYPE").text());
				$("#S_LEDGER_TYPE").val($(this).find("LEDGER_TYPE").text());

				activeButton($(this).find("JRNL_TYPE").text(),$(this).find("STATUS").text());
			});
		},
		error: function(xhr, ajaxOptions, thrownError){
			$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
		}
	});
}
function RetrieveDetail(jrnlNo) {
	Clear();
	var tableId = "#dataTable", tableRowId = "dataTableRow";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA010DetailRetrieve";
	var params = "&JRNL_NO="+jrnlNo
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
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
                +"<td align=center>"+$(this).find("PAY_METHOD_TYPE_NAME").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td class=hidden>"+$(this).find("EVID_TYPE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("EXPS_TYPE_ID").text()+"</td>"     // 10
                +"<td class=hidden>"+$(this).find("TRANS_DATE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("PAY_METHOD_TYPE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("REMARK1_LABEL").text()+"</td>"
                +"<td class=hidden>"+$(this).find("REMARK1").text()+"</td>"
                +"<td class=hidden>"+$(this).find("REMARK2_LABEL").text()+"</td>"
                +"<td class=hidden>"+$(this).find("REMARK2").text()+"</td>"
                +"<td class=hidden>"+$(this).find("REMARK3_LABEL").text()+"</td>"
                +"<td class=hidden>"+$(this).find("REMARK3").text()+"</td>"
                +"<td class=hidden>"+$(this).find("REMARK4_LABEL").text()+"</td>"
                +"<td class=hidden>"+$(this).find("REMARK4").text()+"</td>"          // 20
                +"<td class=hidden>"+$(this).find("VENDOR_CODE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("COMPANY_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("BUSI_NO").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ASST_CODE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ASST_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("USE_TYPE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("SUPPLY_AMT").text()+"</td>"
                +"<td class=hidden>"+$(this).find("VAT_AMT").text()+"</td>"
                +"<td class=hidden>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td class=hidden>"+$(this).find("JRNL_SEQ").text()+"</td>"         // 30
                +"<td class=hidden>"+$(this).find("ACCT_CODE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ASST_PURCHASE_YN").text()+"</td>"
                +"<td class=hidden>"+$(this).find("CC_CARD_INPUT_YN").text()+"</td>"
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
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			
			var evidType = $(this).find("EVID_TYPE").text();
			disabled("#btnPrint,#btnPrintTrafficEx,#btnSubmit",(!dataCnt && (evidType=="T" || evidType=="R")));
			message(dataCnt+" "+I002);
			
			setNumber("#TOTAL",tableRowSum(tableId,4));
		},
		error: function(xhr, ajaxOptions, thrownError){
			$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
		}
	});
}
function RetrieveSub1(jrnlNo,jrnlSeq) {
	var tableId = "#deptTable1", tableRowId = "deptTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA010DeptRetrieve";
	var params = "&JRNL_NO="+jrnlNo
	           + "&JRNL_SEQ="+jrnlSeq
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
                +"<td align=right>"+$(this).find("AMT").text()+"</td>"
                +"<td class=hidden>"+$(this).find("DEPT_CODE").text()+"</td>"
                +"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("CHNL_CODE").text()+"</td>"
                +"<td>"+$(this).find("CHNL_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("ASST_CODE").text()+"</td>"
                +"<td>"+$(this).find("ASST_NAME").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
		},
		error: function(xhr, ajaxOptions, thrownError){
			$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
		}
	});
}
function RetrieveSub2(jrnlNo,jrnlSeq) {
	var tableId = "#deptTable2", tableRowId = "deptTableRow2";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA010DrCrRetrieve";
	var params = "&JRNL_NO="+jrnlNo
	           + "&JRNL_SEQ="+jrnlSeq
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				var drAmt = "", crAmt = "";
				var drcrType = $(this).find("DRCR_TYPE").text();
				if(drcrType=="D")
					drAmt = $(this).find("AMT").text();
				else
					crAmt = $(this).find("AMT").text();

				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
                +"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
                +"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
                +"<td align=right>"+drAmt+"</td>"
                +"<td align=right>"+crAmt+"</td>"

                +"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
                +"<td>"+$(this).find("PRD_NAME").text()+"</td>"
                +"<td>"+$(this).find("CHNL_NAME").text()+"</td>"
                +"<td class=hidden></td>"
                +"<td>"+$(this).find("AFS_NAME").text()+"</td>"
                +"<td>"+$(this).find("SUP_NAME").text()+"</td>"
                +"<td class=hidden></td>"
                +"<td>"+$(this).find("VAT_NAME").text()+"</td>"
                +"<td class=hidden></td>"
                +"<td class=hidden></td>"

                +"<td class=hidden>"+$(this).find("DRCR_TYPE").text()+"</td>"

                +"<td class=hidden>"+$(this).find("DEPT_CODE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("PRD_CODE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("CHNL_CODE").text()+"</td>"
                +"<td class=hidden></td>"
                +"<td class=hidden>"+$(this).find("AFS_TYPE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("SUP_CODE").text()+"</td>"
                +"<td class=hidden></td>"
                +"<td class=hidden>"+$(this).find("VAT_TYPE").text()+"</td>"
                +"<td class=hidden></td>"
                +"<td class=hidden></td>"
                
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
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);

			display("#divDEPT_CODE2,#divPRD_CODE2,#divCHNL_CODE2,#divAFS_TYPE2,#divSUP_CODE2,#divVAT_TYPE2",false);
			required("#DEPT_CODE2,#PRD_CODE2,#CHNL_CODE2,#AFS_TYPE2,#SUP_CODE2,#VAT_TYPE2",false);

			totalDeptAmt2(tableId);
		},
		error: function(xhr, ajaxOptions, thrownError){
			$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
		}
	});
}
// -------------------------------------------------------------------------------------------------
function New() {
	if(!isComplete) {
		$.msgBox({
		    title: "Notice",
		    content: '변경내역이 저장되지 않았습니다. 저장하지 않고 이동하시겠습니까?',
		    type: "confirm",
		    buttons: [{ value: "Yes" }, { value: "No" }],
		    success: function (result) {
		        if (result == "Yes") {
					isComplete = false;

					Clear();
					$("#S_JRNL_NO,#S_JRNL_TYPE,#S_JRNL_TYPE_NAME,#S_STATUS,#S_STATUS_NAME,#S_WRITE_DATE,#S_REMARK,#S_BUSI_UNIT_TYPE,#S_LEDGER_TYPE").html("");
					$("#DEBIT_TOTAL2,#CREDIT_TOTAL2,#TOTAL").val("");
					$("#dataTable tbody").empty();
					var action = "scn1.do?method=AA010New";
					var params = "&GET_ID=JRNL_G"
						       + "&call=xml";

					$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
						success: function(result){
							if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
								return false;
							}

							$("#S_JRNL_NO").html($(result).find("dataPK").find("JRNL_NO").text());
							$("#S_JRNL_TYPE").html($(result).find("dataPK").find("JRNL_TYPE").text());
							$("#S_JRNL_TYPE_NAME").html($(result).find("dataPK").find("JRNL_TYPE_NAME").text());
							$("#S_STATUS").html($(result).find("dataPK").find("STATUS").text());
							$("#S_STATUS_NAME").html($(result).find("dataPK").find("STATUS_NAME").text());
							$("#S_WRITE_DATE").html($(result).find("dataPK").find("WRITE_DATE").text());
							
							disabled("#btnTemplate,#btnInsert",false);
							disabled("#btnSave,#btnInsert,#btnAdd1,#btnAdd2",false);
						},
						error: function(xhr, ajaxOptions, thrownError){
							$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
						}
					});	
				}
				else return false;
		    }
		});
	} else {
		$.msgBox({
		    title: "Notice",
		    content: '전표를 생성하시겠습니까?',
		    type: "confirm",
		    buttons: [{ value: "Yes" }, { value: "No" }],
		    success: function (result) {
		        if (result == "Yes") {
					isComplete = false;

					Clear();
					$("#S_JRNL_NO,#S_JRNL_TYPE,#S_JRNL_TYPE_NAME,#S_STATUS,#S_STATUS_NAME,#S_WRITE_DATE,#S_REMARK,#S_BUSI_UNIT_TYPE,#S_LEDGER_TYPE").html("");
					$("#DEBIT_TOTAL2,#CREDIT_TOTAL2,#TOTAL").val("");
					$("#dataTable tbody").empty();
					var action = "scn1.do?method=AA010New";
					var params = "&GET_ID=JRNL_G"
						       + "&call=xml";

					$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
						success: function(result){
							if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
								return false;
							}

							$("#S_JRNL_NO").html($(result).find("dataPK").find("JRNL_NO").text());
							$("#S_JRNL_TYPE").html($(result).find("dataPK").find("JRNL_TYPE").text());
							$("#S_JRNL_TYPE_NAME").html($(result).find("dataPK").find("JRNL_TYPE_NAME").text());
							$("#S_STATUS").html($(result).find("dataPK").find("STATUS").text());
							$("#S_STATUS_NAME").html($(result).find("dataPK").find("STATUS_NAME").text());
							$("#S_WRITE_DATE").html($(result).find("dataPK").find("WRITE_DATE").text());
							
							disabled("#btnTemplate,#btnInsert",false);
							disabled("#btnSave,#btnInsert,#btnAdd1,#btnAdd2",false);
						},
						error: function(xhr, ajaxOptions, thrownError){
							$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
						}
					});	
				}
				else return false;
		    }
		});
	}
		/*
		 * if(!confirm("전표를 생성하시겠습니까?")) { return false; } }
		 */
}
function Save() {
	
	var action = "scn1.do?method=AA010Save";
	var params = "&JRNL_NO="+$("#S_JRNL_NO").html()+"&REMARK="+$("#S_REMARK").val()+"&call=xml";
	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
		}
	});	
}
function Print() {
	var Open_Date_From = Number(OpenDate_From);
	var Open_Date_To = Number(OpenDate_To);
	var tableId = "#dataTable";
	var tableRows = $(tableId+" tbody tr");
	var temp = true;
	tableRows.each(function(n){
		var date = tableRows[n].cells[1].innerHTML.replaceAll("-","");
		if(date < Open_Date_From ){
			$.msgBox({ title:"Warring", content:"허용되지 않는 거래일자 입니다 . (허용기간 : "+OpenDate_From+" ~ "+OpenDate_To+")"});
			temp = false;
		}
		else if(date > Open_Date_To)
		{
			$.msgBox({ title:"Warring", content:"허용되지 않는 거래일자 입니다 . (허용기간 : "+OpenDate_From+" ~ "+OpenDate_To+")"});
			temp = false;
		}
	});
	if(temp == true)
	{
		
		var action = "scn1.do?method=AA010Print";
		var params = "&SCREEN_ID=CR010"
			+ "&JRNL_NO="+$("#S_JRNL_NO").html()
			
			+ "&RPT_MAIN=CR010|UP_AA010S_PRINT"
			+ "&RPT_MAIN_PARA="+appvLine+"|"+$("#S_JRNL_NO").html()+"|"+ $("#S_STATUS_NAME").html()+"|"+ $("#S_WRITE_DATE").html()+"|"+ ssUserName+"|"+ ssDeptName+"| |"+ ssBusiUnitType
			+ "&RPT_MAIN_PAR2="+$("#S_JRNL_NO").html()	

			+ "&RPT_SUBR=CR011|UP_AA010S_PRINT3"	
			+ "&RPT_SUBR_PARA="
			+ "&RPT_SUBR_PAR2="+$("#S_JRNL_NO").html()
			;
		
		openWindowFull("http://hpsfk071/ReportServer/Pages/ReportViewer.aspx?/EMS/Journal_test&JRNL_NO="+$("#S_JRNL_NO").html(), "전표출력");
	}
}

function PrintTrafficEx() {
	var Open_Date_From = Number(OpenDate_From);
	var Open_Date_To = Number(OpenDate_To);
	var tableId = "#dataTable";
	var tableRows = $(tableId+" tbody tr");
	var temp = true;
	tableRows.each(function(n){
		var date = tableRows[n].cells[1].innerHTML.replaceAll("-","");
		if(date < Open_Date_From ){
			$.msgBox({ title:"Warring", content:"허용되지 않는 거래일자 입니다 . (허용기간 : "+OpenDate_From+" ~ "+OpenDate_To+")"});
			temp = false;
		}
		else if(date > Open_Date_To)
		{
			$.msgBox({ title:"Warring", content:"허용되지 않는 거래일자 입니다 . (허용기간 : "+OpenDate_From+" ~ "+OpenDate_To+")"});
			temp = false;
		}
	});
	if(temp == true)
	{
		var action = "index.do?method=Print";
		var params = "&RPT_MAIN=CR030|UP_AA010S_PRINT2"
			+ "&RPT_MAIN_PARA="+appvLine+"|"+$("#S_JRNL_NO").html()+"|"+ssUserName
			+ "&RPT_MAIN_PAR2="+$("#S_JRNL_NO").html()
			+ "&RPT_SUBR="
			+ "&RPT_SUBR_PARA="
			+ "&RPT_SUBR_PAR2="
			;

		openWindowFull(action+params, "교통비명세서출력");
	}
}
function Submit() {
	var Open_Date_From = Number(OpenDate_From);
	var Open_Date_To = Number(OpenDate_To);
	var tableId = "#dataTable";
	var tableRows = $(tableId+" tbody tr");
	var temp = true;
	tableRows.each(function(n){
		var date = tableRows[n].cells[1].innerHTML.replaceAll("-","");
		if(date < Open_Date_From ){
			$.msgBox({ title:"Warring", content:"허용되지 않는 거래일자 입니다 . (허용기간 : "+OpenDate_From+" ~ "+OpenDate_To+")"});
			temp = false;
		}
		else if(date > Open_Date_To)
		{
			$.msgBox({ title:"Warring", content:"허용되지 않는 거래일자 입니다 . (허용기간 : "+OpenDate_From+" ~ "+OpenDate_To+")"});
			temp = false;
		}
	});
	if(temp == true)
	{
		if($("#dataTable tbody tr").length < 1) {
			$.msgBox({ title:"Warring", content:"처리할 데이터가 존재하지 않습니다!"});
			return;
		}
		
		$.msgBox({
		    title: "Notice",
		    content: '제출하시겠습니까?',
		    type: "confirm",
		    buttons: [{ value: "Yes" }, { value: "No" }],
		    success: function (result) {
		        if (result == "Yes") {

					var action = "scn1.do?method=AA010Submit";
					var params = "&JRNL_NO="+$("#S_JRNL_NO").html()
						+ "&STATUS=S&call=xml";
					
					$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
						success: function(result){
							if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
								return false;
							}
								$(result).find("dataPK").each(function(){
	// $("#S_JRNL_NO").html($(this).find("JRNL_NO").text());
								$("#S_STATUS").html($(this).find("STATUS").text());
								$("#S_STATUS_NAME").html($(this).find("STATUS_NAME").text());

								activeButton($(this).find("JRNL_TYPE").text(),$(this).find("STATUS").text());
								});
								$.msgBox({ title:"Submit", content:"제출 되었습니다!", type:"infor"});
								message(I003);
						
								Clear();
								$("#S_JRNL_NO,#S_JRNL_TYPE,#S_JRNL_TYPE_NAME,#S_STATUS,#S_STATUS_NAME,#S_WRITE_DATE,#S_REMARK,#S_BUSI_UNIT_TYPE,#S_LEDGER_TYPE").html("");
								$("#DEBIT_TOTAL2,#CREDIT_TOTAL2,#TOTAL").val("");
								$("#dataTable tbody").empty();
						},
						error: function(xhr, ajaxOptions, thrownError){
							$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
						}
					});
				}
				else return false;
		    }
		});
		
		// if(!confirm("제출하시겠습니까?")) { return false; }
	}
}
// -------------------------------------------------------------------------------------------------
function Template() {
	var param = new Object();

	var url   = "scn1.do?method=AA011&screenId=AA011&screenIdRef=AA010&refVal=&isPopup=true";
	var style = "dialogWidth:1024px;dialogHeight:748px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal) {
		RetrieveTemplate(retVal.TPLT_ID,retVal.EVID_TYPE);
		
		disabled("#btnEdit1,#btnRemove1",(retVal.EVID_TYPE=="EO"));
		disabled("#btnEdit2,#btnRemove2",!(retVal.EVID_TYPE=="EO"));
	}
}
function RetrieveTemplate(tpltId,evidType) {
	if(!isComplete) {
		
		$.msgBox({
		    title: "Notice",
		    content: '변경내역이 저장되지 않았습니다. 저장하지 않고 이동하시겠습니까?',
		    type: "confirm",
		    buttons: [{ value: "Yes" }, { value: "No" }],
		    success: function (result) {
		        if (result == "Yes") {
					isComplete = true;
					isComplete2 = true;
					
					var index = getIndexEvid(evidType);
					$("#evidTabs").tabs('select', index-1);
					tabEvent(index);

					var j = 0, dataCnt = 0;
					var action = "scn1.do?method=AA010RetrieveTemplate";
					var params = "&TPLT_ID="+tpltId
					+ "&viewMode="+evidType
					+ "&call=xml";
					
					$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
						success: function(result){
						if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
							return false;
						}

						$("#EVID_TYPE").val(evidType);

						$(result).find("DATA_LIST").find("ROW").each(function(){
							if(evidType == "EO") {

								$("#PAY_METHOD_TYPE2").val($(this).find("PAY_METHOD_TYPE").text());
								$("#REMARK6").val($(this).find("REMARK").text());
							} else {
								$("#EXPS_TYPE_ID").val($(this).find("EXPS_TYPE_ID").text());
							$("#PAY_METHOD_TYPE").val($(this).find("PAY_METHOD_TYPE").text());
		
							$("#REMARK").val($(this).find("REMARK").text());
							$("#lblREMARK1").html($(this).find("REMARK1_LABEL").text());
							$("#REMARK1").val($(this).find("REMARK1").text());
							$("#lblREMARK2").html($(this).find("REMARK2_LABEL").text());
							$("#REMARK2").val($(this).find("REMARK2").text());
							$("#lblREMARK3").html($(this).find("REMARK3_LABEL").text());
							$("#REMARK3").val($(this).find("REMARK3").text());
							$("#lblREMARK4").html($(this).find("REMARK4_LABEL").text());
							$("#REMARK4").val($(this).find("REMARK4").text());

							$("#byteREMARK").text(checkByteLen($(this).find("REMARK").text()));
							$("#byteREMARK1").text(checkByteLen($(this).find("REMARK1").text()));
							$("#byteREMARK2").text(checkByteLen($(this).find("REMARK2").text()));
							$("#byteREMARK3").text(checkByteLen($(this).find("REMARK3").text()));
							$("#byteREMARK4").text(checkByteLen($(this).find("REMARK4").text()));
						
							if(evidType=="EA") {
								$("#VENDOR_CODE3").val($(this).find("VENDOR_CODE").text());
								$("#VENDOR_NAME3").val($(this).find("VENDOR_NAME").text());
								setRadioValue("USE_TYPE",$(this).find("USE_TYPE").text());
							} else {
								if(evidType=="EC") {
									$("#VENDOR_CODE1").val($(this).find("VENDOR_CODE").text());
									required("#COMPANY_NAME",($(this).find("CC_CARD_INPUT_YN").text()=="Y"));
									required("#BUSI_NO",($(this).find("CC_CARD_INPUT_YN").text()=="Y"));
								} else if(evidType=="ET" || evidType=="EI" || evidType=="ER") {
									$("#VENDOR_CODE2").val($(this).find("VENDOR_CODE").text());
									$("#VENDOR_NAME2").val($(this).find("VENDOR_NAME").text());
								}
								$("#COMPANY_NAME").val($(this).find("COMPANY_NAME").text());
								$("#BUSI_NO").val($(this).find("BUSI_NO").text());
							}

							setNumber("#SUPPLY_AMT",$(this).find("SUPPLY_AMT").text());
							setNumber("#VAT_AMT",$(this).find("VAT_AMT").text());
							setNumber("#TOTAL_AMT",$(this).find("TOTAL_AMT").text());

							$("#ASST_PURCHASE_YN").val($(this).find("ASST_PURCHASE_YN").text());
							$("#ENTER_ANL_1").val($(this).find("ENTER_ANL_1").text());
							$("#ENTER_ANL_3").val($(this).find("ENTER_ANL_3").text());
							$("#ACCT_CODE").val($(this).find("ACCT_CODE").text());

							display("#divDEPT_CODE1",($(this).find("ENTER_ANL_1").text()=="1"));
							display("#divCHNL_CODE1",($(this).find("ENTER_ANL_3").text()=="1"));
							if($(this).find("ASST_PURCHASE_YN").text()=="Y")
							{
								temp_ASST = $(this).find("ASST_PURCHASE_TI").text();
								ASST_VIEW();
							}
							display("#divASST_CODE1",($(this).find("ASST_PURCHASE_YN").text()=="Y"));
						
							required("#DEPT_CODE1",($(this).find("ENTER_ANL_1").text()=="1"));
							required("#CHNL_CODE1",($(this).find("ENTER_ANL_3").text()=="1"));
							required("#ASST_CODE1",($(this).find("ASST_PURCHASE_YN").text()=="Y"));
							}
						});
				
	// if(evidType=="ET" || evidType=="EI" || evidType=="ER") {
	// $("#TRANS_DATE,#PAY_DUE_DATE#,#BUSI_NO").blur();
	// } else if(evidType=="EA") {
	// $("#TRANS_DATE").blur();
	// } else if(evidType=="EO") {
	// $("#TRANS_DATE2,#PAY_DUE_DATE2#").blur();
	// }

				// /////////////////////////////////////////////////////////////////////////////////////

						var tableId = "", tableRowId = "";
						if(evidType == "EO") {
							tableId = "#deptTable2", tableRowId = "deptTableRow2";
							$(tableId+" tbody").empty();

	// if($(result).find("DETAIL_LIST").find("ROW").length==0) {
	// $(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr
	// th").length+" align=center>"+I001+"</td></tr>");
	// }
							$(result).find("DETAIL_LIST").find("ROW").each(function() {
								var drAmt = 0, crAmt = 0;
								var drcrType = $(this).find("DRCR_TYPE").text();
								if(drcrType == "D")
									drAmt = $(this).find("AMT").text();
								else
									crAmt = $(this).find("AMT").text();

								$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
										+"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
										+"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
										+"<td align=right>"+drAmt+"</td>"
										+"<td align=right>"+crAmt+"</td>"

										+"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
										+"<td>"+$(this).find("PRD_NAME").text()+"</td>"
										+"<td>"+$(this).find("CHNL_NAME").text()+"</td>"
										+"<td class=hidden></td>"
										+"<td>"+$(this).find("AFS_NAME").text()+"</td>"
										+"<td>"+$(this).find("SUP_NAME").text()+"</td>"
										+"<td class=hidden></td>"
										+"<td>"+$(this).find("VAT_NAME").text()+"</td>"
										+"<td class=hidden></td>"
										+"<td class=hidden></td>"

										+"<td class=hidden>"+$(this).find("DRCR_TYPE").text()+"</td>"

										+"<td class=hidden>"+$(this).find("DEPT_CODE").text()+"</td>"
										+"<td class=hidden>"+$(this).find("PRD_CODE").text()+"</td>"
										+"<td class=hidden>"+$(this).find("CHNL_CODE").text()+"</td>"
										+"<td class=hidden></td>"
										+"<td class=hidden>"+$(this).find("AFS_TYPE").text()+"</td>"
										+"<td class=hidden>"+$(this).find("SUP_CODE").text()+"</td>"
										+"<td class=hidden></td>"
										+"<td class=hidden>"+$(this).find("VAT_TYPE").text()+"</td>"
										+"<td class=hidden></td>"
										+"<td class=hidden></td>"
		                
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
							totalDeptAmt2("#deptTable2");
						} else {
							tableId = "#deptTable1", tableRowId = "deptTableRow1";
							$(tableId+" tbody").empty();

	// if($(result).find("DETAIL_LIST").find("ROW").length==0) {
	// $(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr
	// th").length+" align=center>"+I001+"</td></tr>");
	// }
							$(result).find("DETAIL_LIST").find("ROW").each(function() {
								$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
										+"<td align=right>"+$(this).find("AMT").text()+"</td>"
										+"<td class=hidden>"+$(this).find("DEPT_CODE").text()+"</td>"
										+"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
										+"<td class=hidden>"+$(this).find("CHNL_CODE").text()+"</td>"
										+"<td>"+$(this).find("CHNL_NAME").text()+"</td>"
										+"<td class=hidden>"+$(this).find("ASST_CODE").text()+"</td>"
										+"<td>"+$(this).find("ASST_NAME").text()+"</td>"
										+"</tr>");
							});
							totalDeptAmt1("#deptTable1");
						}
				
						$(tableId).trigger("update");
						tableRowEvent(tableId,tableRowId,1);

						dataCnt = $(result).find("DETAIL_LIST").find("DETAIL_LIST_CNT").text();
						if(dataCnt==null || dataCnt=="") dataCnt = 0;

						message(dataCnt+" "+I002);
						isComplete = false;
					},
					error: function(xhr, ajaxOptions, thrownError){
						$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
					}
					});
				}
				else return false;
		    }
		});
	}
	else
	{
		isComplete = true;
		isComplete2 = true;
		
		var index = getIndexEvid(evidType);
		$("#evidTabs").tabs('select', index-1);
		tabEvent(index);
	
		var j = 0, dataCnt = 0;
		var action = "scn1.do?method=AA010RetrieveTemplate";
		var params = "&TPLT_ID="+tpltId
		+ "&viewMode="+evidType
		+ "&call=xml";
		
		$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
			success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
	
			$("#EVID_TYPE").val(evidType);
	
			$(result).find("DATA_LIST").find("ROW").each(function(){
				if(evidType == "EO") {
	
					$("#PAY_METHOD_TYPE2").val($(this).find("PAY_METHOD_TYPE").text());
					$("#REMARK6").val($(this).find("REMARK").text());
				} else {
					$("#EXPS_TYPE_ID").val($(this).find("EXPS_TYPE_ID").text());
				$("#PAY_METHOD_TYPE").val($(this).find("PAY_METHOD_TYPE").text());
	
				$("#REMARK").val($(this).find("REMARK").text());
				$("#lblREMARK1").html($(this).find("REMARK1_LABEL").text());
				$("#REMARK1").val($(this).find("REMARK1").text());
				$("#lblREMARK2").html($(this).find("REMARK2_LABEL").text());
				$("#REMARK2").val($(this).find("REMARK2").text());
				$("#lblREMARK3").html($(this).find("REMARK3_LABEL").text());
				$("#REMARK3").val($(this).find("REMARK3").text());
				$("#lblREMARK4").html($(this).find("REMARK4_LABEL").text());
				$("#REMARK4").val($(this).find("REMARK4").text());
	
				$("#byteREMARK").text(checkByteLen($(this).find("REMARK").text()));
				$("#byteREMARK1").text(checkByteLen($(this).find("REMARK1").text()));
				$("#byteREMARK2").text(checkByteLen($(this).find("REMARK2").text()));
				$("#byteREMARK3").text(checkByteLen($(this).find("REMARK3").text()));
				$("#byteREMARK4").text(checkByteLen($(this).find("REMARK4").text()));
			
				if(evidType=="EA") {
					$("#VENDOR_CODE3").val($(this).find("VENDOR_CODE").text());
					$("#VENDOR_NAME3").val($(this).find("VENDOR_NAME").text());
					setRadioValue("USE_TYPE",$(this).find("USE_TYPE").text());
				} else {
					if(evidType=="EC") {
						$("#VENDOR_CODE1").val($(this).find("VENDOR_CODE").text());
						required("#COMPANY_NAME",($(this).find("CC_CARD_INPUT_YN").text()=="Y"));
						required("#BUSI_NO",($(this).find("CC_CARD_INPUT_YN").text()=="Y"));
					} else if(evidType=="ET" || evidType=="EI" || evidType=="ER") {
						$("#VENDOR_CODE2").val($(this).find("VENDOR_CODE").text());
						$("#VENDOR_NAME2").val($(this).find("VENDOR_NAME").text());
					}
					$("#COMPANY_NAME").val($(this).find("COMPANY_NAME").text());
					$("#BUSI_NO").val($(this).find("BUSI_NO").text());
				}
	
				setNumber("#SUPPLY_AMT",$(this).find("SUPPLY_AMT").text());
				setNumber("#VAT_AMT",$(this).find("VAT_AMT").text());
				setNumber("#TOTAL_AMT",$(this).find("TOTAL_AMT").text());
	
				$("#ASST_PURCHASE_YN").val($(this).find("ASST_PURCHASE_YN").text());
				$("#ENTER_ANL_1").val($(this).find("ENTER_ANL_1").text());
				$("#ENTER_ANL_3").val($(this).find("ENTER_ANL_3").text());
				$("#ACCT_CODE").val($(this).find("ACCT_CODE").text());
	
				display("#divDEPT_CODE1",($(this).find("ENTER_ANL_1").text()=="1"));
				display("#divCHNL_CODE1",($(this).find("ENTER_ANL_3").text()=="1"));
				if($(this).find("ASST_PURCHASE_YN").text()=="Y")
				{
					temp_ASST = $(this).find("ASST_PURCHASE_TI").text();
					ASST_VIEW();
				}
				display("#divASST_CODE1",($(this).find("ASST_PURCHASE_YN").text()=="Y"));
			
				required("#DEPT_CODE1",($(this).find("ENTER_ANL_1").text()=="1"));
				required("#CHNL_CODE1",($(this).find("ENTER_ANL_3").text()=="1"));
				required("#ASST_CODE1",($(this).find("ASST_PURCHASE_YN").text()=="Y"));
				}
			});
	
	// if(evidType=="ET" || evidType=="EI" || evidType=="ER") {
	// $("#TRANS_DATE,#PAY_DUE_DATE#,#BUSI_NO").blur();
	// } else if(evidType=="EA") {
	// $("#TRANS_DATE").blur();
	// } else if(evidType=="EO") {
	// $("#TRANS_DATE2,#PAY_DUE_DATE2#").blur();
	// }
	
	// /////////////////////////////////////////////////////////////////////////////////////
	
			var tableId = "", tableRowId = "";
			if(evidType == "EO") {
				tableId = "#deptTable2", tableRowId = "deptTableRow2";
				$(tableId+" tbody").empty();
	
	// if($(result).find("DETAIL_LIST").find("ROW").length==0) {
	// $(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr
	// th").length+" align=center>"+I001+"</td></tr>");
	// }
				$(result).find("DETAIL_LIST").find("ROW").each(function() {
					var drAmt = 0, crAmt = 0;
					var drcrType = $(this).find("DRCR_TYPE").text();
					if(drcrType == "D")
						drAmt = $(this).find("AMT").text();
					else
						crAmt = $(this).find("AMT").text();
	
					$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
							+"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
							+"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
							+"<td align=right>"+drAmt+"</td>"
							+"<td align=right>"+crAmt+"</td>"
	
							+"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
							+"<td>"+$(this).find("PRD_NAME").text()+"</td>"
							+"<td>"+$(this).find("CHNL_NAME").text()+"</td>"
							+"<td class=hidden></td>"
							+"<td>"+$(this).find("AFS_NAME").text()+"</td>"
							+"<td>"+$(this).find("SUP_NAME").text()+"</td>"
							+"<td class=hidden></td>"
							+"<td>"+$(this).find("VAT_NAME").text()+"</td>"
							+"<td class=hidden></td>"
							+"<td class=hidden></td>"
	
							+"<td class=hidden>"+$(this).find("DRCR_TYPE").text()+"</td>"
	
							+"<td class=hidden>"+$(this).find("DEPT_CODE").text()+"</td>"
							+"<td class=hidden>"+$(this).find("PRD_CODE").text()+"</td>"
							+"<td class=hidden>"+$(this).find("CHNL_CODE").text()+"</td>"
							+"<td class=hidden></td>"
							+"<td class=hidden>"+$(this).find("AFS_TYPE").text()+"</td>"
							+"<td class=hidden>"+$(this).find("SUP_CODE").text()+"</td>"
							+"<td class=hidden></td>"
							+"<td class=hidden>"+$(this).find("VAT_TYPE").text()+"</td>"
							+"<td class=hidden></td>"
							+"<td class=hidden></td>"
	        
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
				totalDeptAmt2("#deptTable2");
			} else {
				tableId = "#deptTable1", tableRowId = "deptTableRow1";
				$(tableId+" tbody").empty();
	
	// if($(result).find("DETAIL_LIST").find("ROW").length==0) {
	// $(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr
	// th").length+" align=center>"+I001+"</td></tr>");
	// }
				$(result).find("DETAIL_LIST").find("ROW").each(function() {
					$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
							+"<td align=right>"+$(this).find("AMT").text()+"</td>"
							+"<td class=hidden>"+$(this).find("DEPT_CODE").text()+"</td>"
							+"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
							+"<td class=hidden>"+$(this).find("CHNL_CODE").text()+"</td>"
							+"<td>"+$(this).find("CHNL_NAME").text()+"</td>"
							+"<td class=hidden>"+$(this).find("ASST_CODE").text()+"</td>"
							+"<td>"+$(this).find("ASST_NAME").text()+"</td>"
							+"</tr>");
				});
				totalDeptAmt1("#deptTable1");
			}
	
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);
	
			dataCnt = $(result).find("DETAIL_LIST").find("DETAIL_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
	
			message(dataCnt+" "+I002);
			isComplete = false;
		},
		error: function(xhr, ajaxOptions, thrownError){
			$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
		}
		});
	}
}
function Insert() {
	var jrnlNo   = $("#S_JRNL_NO").html();
	if(jrnlNo=="") {
		$.msgBox({ title:"Warring", content:"전표번호가 존재하지 않습니다."});
		return;
	}
	var evidType = $("#EVID_TYPE").val();
	var index    = (evidType=="EO") ? 2 : 1;
	if(!requiredValidate("#fromTable"+index))
		return;

	if(index == 2) {// 기타
		if(!checkSpecialChar("#REMARK6")) { return; }
		if($("#byteREMARK6").text()>40)  { $.msgBox({ title:"Warring", content:"40 Bytes 이상 입력 불가! ("+$("#lblREMARK6").text() +")"}); $("#byteREMARK6").focus();  return; }
		if(!checkDataTable2("#deptTable2")) return;
	} else {
		if(!checkSpecialChar("#REMARK,#REMARK1,#REMARK2,#REMARK3,#REMARK4")) { return; }
		if($("#byteREMARK").text()>40)  { $.msgBox({ title:"Warring", content:"40 Bytes 이상 입력 불가! ("+$("#lblREMARK").text() +")"}); $("#byteREMARK").focus();  return; }
		if($("#byteREMARK1").text()>40) { $.msgBox({ title:"Warring", content:"40 Bytes 이상 입력 불가! ("+$("#lblREMARK1").text() +")"}); $("#byteREMARK1").focus(); return; }
		if($("#byteREMARK2").text()>40) { $.msgBox({ title:"Warring", content:"40 Bytes 이상 입력 불가! ("+$("#lblREMARK2").text() +")"}); $("#byteREMARK2").focus(); return; }
		if($("#byteREMARK3").text()>40) { $.msgBox({ title:"Warring", content:"40 Bytes 이상 입력 불가! ("+$("#lblREMARK3").text() +")"}); $("#byteREMARK3").focus(); return; }
		if($("#byteREMARK4").text()>40) { $.msgBox({ title:"Warring", content:"40 Bytes 이상 입력 불가! ("+$("#lblREMARK4").text() +")"}); $("#byteREMARK4").focus(); return; }
		
		if(!validDate($("#TRANS_DATE").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblTRANS_DATE").html()});
			$("#TRANS_DATE").focus();
			return;
		}
// if($("#ACCT_CODE").val()==fuelExpsType) {
		if(fuelExpsType==$("#EXPS_TYPE_ID").val()) {
			var totalAmt = $("#TOTAL_AMT").val().replaceAll(",","");
			var km       = $("#REMARK4").val().replaceAll(",","");
			if(isNaN(km*fuelUnitPrice)) {
				$.msgBox({ title:"Warring", content:"주행거리의 값이 옳바르지 않습니다!\n다시 입력해 주세요!"});
				$("#REMARK4").focus();
			} else {
				if((km*fuelUnitPrice)!=totalAmt) {
					$.msgBox({ title:"Warring", content:"유류비는 측정된 기준 금액과 다르게 입력할 수 없습니다!"});
					return;
				}
			}
		}
		if(!checkDataTable1("#deptTable1")) return;
	}

	if(evidType == 'EC') {// 법인카드
		if(!vaildBusiNo($("#BUSI_NO").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblBUSI_NO").html()});
			$("#BUSI_NO").focus();
			return;
		}
	} else if(evidType == 'ET') {// 세금계산서
		if(!validDate($("#PAY_DUE_DATE").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblPAY_DUE_DATE").html()});
			$("#PAY_DUE_DATE").focus();
			return;
		}
		if(!vaildBusiNo($("#BUSI_NO").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblBUSI_NO").html()});
			$("#BUSI_NO").focus();
			return;
		}
		if($("#validVENDOR_CODE2").val()!="true") {
			$.msgBox({ title:"Warring", content:$("#lblVENDOR_CODE2").text()+" 코드 또는 명이 옯바르지 않습니다!"});
			return;
		}
	} else if(evidType == 'EI') {// 계산서
		if(!validDate($("#PAY_DUE_DATE").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblPAY_DUE_DATE").html()});
			$("#PAY_DUE_DATE").focus();
			return;
		}
		if(!vaildBusiNo($("#BUSI_NO").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblBUSI_NO").html()});
			$("#BUSI_NO").focus();
			return;
		}
		if($("#validVENDOR_CODE2").val()!="true") {
			$.msgBox({ title:"Warring", content:$("#lblVENDOR_CODE2").text()+" 코드 또는 명이 옯바르지 않습니다!"});
			return;
		}
	} else if(evidType == 'ER') {// 기타영수증
		if(!validDate($("#PAY_DUE_DATE").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblPAY_DUE_DATE").html()});
			$("#PAY_DUE_DATE").focus();
			return;
		}
		if(!vaildBusiNo($("#BUSI_NO").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblBUSI_NO").html()});
			$("#BUSI_NO").focus();
			return;
		}
		if($("#validVENDOR_CODE2").val()!="true") {
			$.msgBox({ title:"Warring", content:$("#lblVENDOR_CODE2").text()+" 코드 또는 명이 옯바르지 않습니다!"});
			return;
		}
	} else if(evidType == 'EA') {// 개인경비
		if($("#validVENDOR_CODE3").val()!="true") {
			$.msgBox({ title:"Warring", content:$("#lblVENDOR_CODE3").text()+" 코드 또는 명이 옯바르지 않습니다!"});
			return;
		}
	} else if(evidType == 'EO') {// 기타

	}

	if($("#deptTable"+index+" tbody tr").length==0) {
		$.msgBox({ title:"Warring", content:"부서를 입력해 주세요!"});
		return;
	}

	eval("Insert"+index+"(jrnlNo,'deptTable"+index+"')");
}
function Insert1(jrnlNo,dataTable) {
	var deptData = getDataTable1(dataTable);

	var vndrCode = "", vndrName = "", useType = "";
	var evidType = $("#EVID_TYPE").val();
	if(evidType == 'EC') {// 법인카드
		vndrCode = $("#VENDOR_CODE1").val();
		vndrName = getComboText("VENDOR_CODE1");
	} else if(evidType == 'ET') {// 세금계산서
		vndrCode = $("#VENDOR_CODE2").val();
		vndrName = $("#VENDOR_NAME2").val();
	} else if(evidType == 'EI') {// 계산서
		vndrCode = $("#VENDOR_CODE2").val();
		vndrName = $("#VENDOR_NAME2").val();
	} else if(evidType == 'ER') {// 기타영수증
		vndrCode = $("#VENDOR_CODE2").val();
		vndrName = $("#VENDOR_NAME2").val();
	} else if(evidType == 'EA') {// 개인경비
		vndrCode = $("#VENDOR_CODE3").val();
		vndrName = $("#VENDOR_NAME3").val(); // getComboText("VENDOR_CODE3");
		useType  = getRadioValue("USE_TYPE");
	} else if(evidType == 'EO') {// 기타
		vndrCode = "";
		vndrName = "";
	}

	var action = "scn1.do?method=AA010DetailInsert";
	var params = "&JRNL_NO="+jrnlNo
		       + "&EVID_TYPE="+$("#EVID_TYPE").val()
		       + "&EXPS_TYPE_ID="+$("#EXPS_TYPE_ID").val()
	           + "&TRANS_DATE="+$("#TRANS_DATE").val().replaceAll("-","")
	           + "&PAY_DUE_DATE="+$("#PAY_DUE_DATE").val().replaceAll("-","")
	           + "&PAY_METHOD_TYPE="+$("#PAY_METHOD_TYPE").val()
	           + "&REMARK="+getString("#REMARK")
	           + "&REMARK1_LABEL="+getString2($("#lblREMARK1").html())
	           + "&REMARK1="+getString("#REMARK1")
	           + "&REMARK2_LABEL="+getString2($("#lblREMARK2").html())
	           + "&REMARK2="+getString("#REMARK2")
	           + "&REMARK3_LABEL="+getString2($("#lblREMARK3").html())
	           + "&REMARK3="+getString("#REMARK3")
	           + "&REMARK4_LABEL="+getString2($("#lblREMARK4").html())
	           + "&REMARK4="+getString("#REMARK4")
	           + "&VENDOR_CODE="+vndrCode
	           + "&VENDOR_NAME="+getString2(vndrName)
	           + "&COMPANY_NAME="+getString("#COMPANY_NAME")
	           + "&BUSI_NO="+$("#BUSI_NO").val()
	           + "&USE_TYPE="+useType
	           + "&SUPPLY_AMT="+getNumber("#SUPPLY_AMT")
	           + "&VAT_AMT="+getNumber("#VAT_AMT")
	           + "&TOTAL_AMT="+getNumber("#TOTAL_AMT")
	           + "&DATATABLE="+deptData
	           + "&viewMode=1"
	           + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}
			RetrieveDetail(jrnlNo);
			message(I003);
			isComplete = true;
		},
		error: function(xhr, ajaxOptions, thrownError){
			$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
		}
	});
}
function Insert2(jrnlNo,dataTable) {
	if($("#DEBIT_TOTAL2").val() != $("#CREDIT_TOTAL2").val()) {
		$.msgBox({ title:"Warring", content:"차변합계와 대변합계가 일치하지 않습니다."});
		return;
	}
	var deptData = getDataTable2(dataTable);

	var action = "scn1.do?method=AA010DetailInsert";
	var params = "&JRNL_NO="+jrnlNo
		       + "&EVID_TYPE="+$("#EVID_TYPE").val()
		       + "&EXPS_TYPE_ID="
	           + "&TRANS_DATE="+$("#TRANS_DATE2").val().replaceAll("-","")
	           + "&PAY_DUE_DATE="+$("#PAY_DUE_DATE2").val().replaceAll("-","")
	           + "&PAY_METHOD_TYPE="+$("#PAY_METHOD_TYPE2").val()
	           + "&REMARK="+getString("#REMARK6")
	           + "&REMARK1_LABEL="
	           + "&REMARK1="
	           + "&REMARK2_LABEL="
	           + "&REMARK2="
	           + "&REMARK3_LABEL="
	           + "&REMARK3="
	           + "&REMARK4_LABEL="
	           + "&REMARK4="
	           + "&VENDOR_CODE="
	           + "&VENDOR_NAME="
	           + "&COMPANY_NAME="
	           + "&BUSI_NO="
	           + "&USE_TYPE="
	           + "&SUPPLY_AMT=0"
	           + "&VAT_AMT=0"
	           + "&TOTAL_AMT="+$("#DEBIT_TOTAL2").val().replaceAll(",","")
	           + "&DATATABLE="+deptData
	           + "&viewMode=2"
	           + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}
			RetrieveDetail(jrnlNo);
			message(I003);
			isComplete = true;

		},
		error: function(xhr, ajaxOptions, thrownError){
			$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
		}
	});
}

function Update() {
	var jrnlNo  = $("#JRNL_NO").val();
	var jrnlSeq = $("#JRNL_SEQ").val();
	if(jrnlNo=="" || jrnlSeq=="") {
		$.msgBox({ title:"Warring", content:"해당 정보를 먼저 선택해 주세요!"});
		return;
	}

	var evidType = $("#EVID_TYPE").val();
	var index    = (evidType=="EO") ? 2 : 1;
	if(!requiredValidate("#fromTable"+index))
		return;

	if(index == 2) {// 기타
		if(!checkSpecialChar("#REMARK6")) { return; }
		if($("#byteREMARK6").text()>40)  { $.msgBox({ title:"Warring", content:"40 Bytes 이상 입력 불가! ("+$("#lblREMARK6").text() +")"}); $("#byteREMARK6").focus();  return; }
		if(!checkDataTable2("#deptTable2")) return;
	} else {
		if($("#byteREMARK").text()>40)  { $.msgBox({ title:"Warring", content:"40 Bytes 이상 입력 불가! ("+$("#lblREMARK").text() +")"}); $("#byteREMARK").focus();  return; }
		if($("#byteREMARK1").text()>40) { $.msgBox({ title:"Warring", content:"40 Bytes 이상 입력 불가! ("+$("#lblREMARK1").text() +")"}); $("#byteREMARK1").focus(); return; }
		if($("#byteREMARK2").text()>40) { $.msgBox({ title:"Warring", content:"40 Bytes 이상 입력 불가! ("+$("#lblREMARK2").text() +")"}); $("#byteREMARK2").focus(); return; }
		if($("#byteREMARK3").text()>40) { $.msgBox({ title:"Warring", content:"40 Bytes 이상 입력 불가! ("+$("#lblREMARK3").text() +")"}); $("#byteREMARK3").focus(); return; }
		if($("#byteREMARK4").text()>40) { $.msgBox({ title:"Warring", content:"40 Bytes 이상 입력 불가! ("+$("#lblREMARK4").text() +")"}); $("#byteREMARK4").focus(); return; }

		if(!validDate($("#TRANS_DATE").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblTRANS_DATE").html()});
			$("#TRANS_DATE").focus();
			return;
		}
// if($("#ACCT_CODE").val()==fuelExpsType) {
		if(fuelExpsType==$("#EXPS_TYPE_ID").val()) {
			var totalAmt = $("#TOTAL_AMT").val().replaceAll(",","");
			var km       = $("#REMARK4").val().replaceAll(",","");
			if((km*fuelUnitPrice)!=totalAmt) {
				$.msgBox({ title:"Warring", content:"유류비는 측정된 기준 금액과 다르게 입력할 수 없습니다!"});
				return;
			}
		}
		if(!checkDataTable1("#deptTable1")) return;
	}

	if(evidType == 'EC') {// 법인카드
		if(!vaildBusiNo($("#BUSI_NO").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblBUSI_NO").html()});
			$("#BUSI_NO").focus();
			return;
		}
	} else if(evidType == 'ET') {// 세금계산서
		if(!validDate($("#PAY_DUE_DATE").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblPAY_DUE_DATE").html()});
			$("#PAY_DUE_DATE").focus();
			return;
		}
		if(!vaildBusiNo($("#BUSI_NO").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblBUSI_NO").html()});
			$("#BUSI_NO").focus();
			return;
		}
		if($("#validVENDOR_CODE2").val()!="true") {
			$.msgBox({ title:"Warring", content:$("#lblVENDOR_CODE2").text()+" 코드 또는 명이 옯바르지 않습니다!"});
			return;
		}
	} else if(evidType == 'EI') {// 계산서
		if(!validDate($("#PAY_DUE_DATE").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblPAY_DUE_DATE").html()});
			$("#PAY_DUE_DATE").focus();
			return;
		}
		if(!vaildBusiNo($("#BUSI_NO").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblBUSI_NO").html()});
			$("#BUSI_NO").focus();
			return;
		}
		if($("#validVENDOR_CODE2").val()!="true") {
			$.msgBox({ title:"Warring", content:$("#lblVENDOR_CODE2").text()+" 코드 또는 명이 옯바르지 않습니다!"});
			return;
		}
	} else if(evidType == 'ER') {// 기타영수증
		if(!validDate($("#PAY_DUE_DATE").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblPAY_DUE_DATE").html()});
			$("#PAY_DUE_DATE").focus();
			return;
		}
		if(!vaildBusiNo($("#BUSI_NO").val())) {
			$.msgBox({ title:"Warring", content:"입력값이 옳바르지 않습니다.\n"+$("#lblBUSI_NO").html()});
			$("#BUSI_NO").focus();
			return;
		}
		if($("#validVENDOR_CODE2").val()!="true") {
			$.msgBox({ title:"Warring", content:$("#lblVENDOR_CODE2").text()+" 코드 또는 명이 옯바르지 않습니다!"});
			return;
		}
	} else if(evidType == 'EA') {// 개인경비
		if($("#validVENDOR_CODE3").val()!="true") {
			$.msgBox({ title:"Warring", content:$("#lblVENDOR_CODE3").text()+" 코드 또는 명이 옯바르지 않습니다!"});
			return;
		}
	} else if(evidType == 'EO') {// 기타
	}

	if($("#deptTable"+index+" tbody tr").length==0) {
		$.msgBox({ title:"Warring", content:"부서를 입력해 주세요!"});
		return;
	}

	eval("Update"+index+"(jrnlNo,jrnlSeq,'deptTable"+index+"')");
}
function Update1(jrnlNo,jrnlSeq,dataTable) {
	var deptData = getDataTable1(dataTable);
	var vndrCode = "", vndrName = "", useType = "";
	var evidType = $("#EVID_TYPE").val();
	if(evidType == 'EC') {// 법인카드
		vndrCode = $("#VENDOR_CODE1").val();
		vndrName = getComboText("VENDOR_CODE1");
	} else if(evidType == 'ET') {// 세금계산서
		vndrCode = $("#VENDOR_CODE2").val();
		vndrName = $("#VENDOR_NAME2").val();
	} else if(evidType == 'EI') {// 계산서
		vndrCode = $("#VENDOR_CODE2").val();
		vndrName = $("#VENDOR_NAME2").val();
	} else if(evidType == 'ER') {// 기타영수증
		vndrCode = $("#VENDOR_CODE2").val();
		vndrName = $("#VENDOR_NAME2").val();
	} else if(evidType == 'EA') {// 개인경비
		vndrCode = $("#VENDOR_CODE3").val();
		vndrName = $("#VENDOR_NAME3").val(); // getComboText("VENDOR_CODE3");
		useType  = getRadioValue("USE_TYPE");
	} else if(evidType == 'EO') {// 기타
		vndrCode = "";
		vndrName = "";
	}

	var action = "scn1.do?method=AA010DetailUpdate";
	var params = "&JRNL_NO="+jrnlNo
	           + "&JRNL_SEQ="+jrnlSeq
		       + "&EVID_TYPE="+$("#EVID_TYPE").val()
		       + "&EXPS_TYPE_ID="+$("#EXPS_TYPE_ID").val()
	           + "&TRANS_DATE="+$("#TRANS_DATE").val().replaceAll("-","")
	           + "&PAY_DUE_DATE="+$("#PAY_DUE_DATE").val().replaceAll("-","")
	           + "&PAY_METHOD_TYPE="+$("#PAY_METHOD_TYPE").val()
	           + "&REMARK="+getString("#REMARK")
	           + "&REMARK1_LABEL="+getString2($("#lblREMARK1").html())
	           + "&REMARK1="+getString("#REMARK1")
	           + "&REMARK2_LABEL="+getString2($("#lblREMARK2").html())
	           + "&REMARK2="+getString("#REMARK2")
	           + "&REMARK3_LABEL="+getString2($("#lblREMARK3").html())
	           + "&REMARK3="+getString("#REMARK3")
	           + "&REMARK4_LABEL="+getString2($("#lblREMARK4").html())
	           + "&REMARK4="+getString("#REMARK4")
	           + "&VENDOR_CODE="+vndrCode
	           + "&VENDOR_NAME="+getString2(vndrName)
	           + "&COMPANY_NAME="+getString("#COMPANY_NAME")
	           + "&BUSI_NO="+$("#BUSI_NO").val()
	           + "&USE_TYPE="+useType
	           + "&SUPPLY_AMT="+getNumber("#SUPPLY_AMT")
	           + "&VAT_AMT="+getNumber("#VAT_AMT")
	           + "&TOTAL_AMT="+getNumber("#TOTAL_AMT")
	           + "&DATATABLE="+deptData
	           + "&viewMode=1"
	           + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}
			RetrieveDetail(jrnlNo);
			message(I003);
			isComplete = true;
		},
		error: function(xhr, ajaxOptions, thrownError){
			$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
		}
	});
}
function Update2(jrnlNo,jrnlSeq,dataTable) {
	if($("#DEBIT_TOTAL2").val() != $("#CREDIT_TOTAL2").val()) {
		$.msgBox({ title:"Warring", content:"차변합계와 대변합계가 일치하지 않습니다."});
		return;
	}
	if($("#"+dataTable+" tbody tr").length==0) {
		$.msgBox({ title:"Warring", content:"부서를 입력해 주세요!"});
		return false;
	}
	var deptData = getDataTable2(dataTable);

	var action = "scn1.do?method=AA010DetailUpdate";
	var params = "&JRNL_NO="+jrnlNo
	           + "&JRNL_SEQ="+jrnlSeq
		       + "&EVID_TYPE="+$("#EVID_TYPE").val()
		       + "&EXPS_TYPE_ID="
	           + "&TRANS_DATE="+$("#TRANS_DATE2").val().replaceAll("-","")
	           + "&PAY_DUE_DATE="+$("#PAY_DUE_DATE2").val().replaceAll("-","")
	           + "&PAY_METHOD_TYPE="+$("#PAY_METHOD_TYPE2").val()
	           + "&REMARK="+getString("#REMARK6")
	           + "&REMARK1_LABEL="
	           + "&REMARK1="
	           + "&REMARK2_LABEL="
	           + "&REMARK2="
	           + "&REMARK3_LABEL="
	           + "&REMARK3="
	           + "&REMARK4_LABEL="
	           + "&REMARK4="
	           + "&VENDOR_CODE="
	           + "&VENDOR_NAME="
	           + "&COMPANY_NAME="
	           + "&BUSI_NO="
	           + "&USE_TYPE="
	           + "&SUPPLY_AMT=0"
	           + "&VAT_AMT=0"
	           + "&TOTAL_AMT="+$("#DEBIT_TOTAL2").val().replaceAll(",","")
	           + "&DATATABLE="+deptData
	           + "&viewMode=2"
	           + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false; 
			}
			RetrieveDetail(jrnlNo);
			message(I003);
			isComplete = true;
		},
		error: function(xhr, ajaxOptions, thrownError){
			$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
		}
	});
}
function Delete() {
	$.msgBox({
	    title: "Notice",
	    content: W002,
	    type: "confirm",
	    buttons: [{ value: "Yes" }, { value: "No" }],
	    success: function (result) {
	        if (result == "Yes") {
				var jrnlNo  = $("#JRNL_NO").val();
				var jrnlSeq = $("#JRNL_SEQ").val();

				var action = "scn1.do?method=AA010DetailDelete";
				var params = "&JRNL_NO="+jrnlNo
				           + "&JRNL_SEQ="+jrnlSeq
				           + "&call=xml";

				$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
					success: function(result){
						if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
							return false; 
						}
						RetrieveDetail(jrnlNo);
						message(I003);
						isComplete = true;
					},
					error: function(xhr, ajaxOptions, thrownError){
						$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
					}
				});
			}
			else return false;
	    }
	});
}
// -------------------------------------------------------------------------------------------------

function Add(index) {
	index += 1;
	if(!requiredValidate("#deptForm"+index)) return false;
	var tableId = "#deptTable"+index, tableRowId = "deptTableRow"+index;
	var j = $(tableId+" tbody tr").length;

	if(index == 2) {
		if($("#validACCT_CODE2").val()!="true") {
			$.msgBox({ title:"Warring", content:"계정과목 코드 또는 명이 옯바르지 않습니다!"});
			return;
		}
		
		var drAmt = 0, crAmt = 0;
		var drcrType = $("#DRCR_TYPE2").val();
		if(drcrType=="D")
			drAmt = $("#DEPT_AMT2").val();
		else
			crAmt = $("#DEPT_AMT2").val();

		$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
		    +"<td align=center>"+$("#ACCT_CODE2").val()+"</td>"
		    +"<td>"+$("#ACCT_NAME2").val()+"</td>"
		    +"<td align=right>"+drAmt+"</td>"
		    +"<td align=right>"+crAmt+"</td>"
		    
		    +"<td>"+getComboText("DEPT_CODE2")+"</td>"
		    +"<td>"+getComboText("PRD_CODE2")+"</td>"
		    +"<td>"+getComboText("CHNL_CODE2")+"</td>"
		    +"<td class=hidden></td>"
		    +"<td>"+getComboText("AFS_TYPE2")+"</td>"
		    +"<td>"+getComboText("SUP_CODE2")+"</td>"
		    +"<td class=hidden></td>"
		    +"<td>"+getComboText("VAT_TYPE2")+"</td>"
		    +"<td class=hidden></td>"
		    +"<td class=hidden></td>"

		    +"<td class=hidden>"+$("#DRCR_TYPE2").val()+"</td>"

		    +"<td class=hidden>"+$("#DEPT_CODE2").val()+"</td>"
		    +"<td class=hidden>"+$("#PRD_CODE2").val()+"</td>"
		    +"<td class=hidden>"+$("#CHNL_CODE2").val()+"</td>"
		    +"<td class=hidden></td>"
		    +"<td class=hidden>"+$("#AFS_TYPE2").val()+"</td>"
		    +"<td class=hidden>"+$("#SUP_CODE2").val()+"</td>"
		    +"<td class=hidden></td>"
		    +"<td class=hidden>"+$("#VAT_TYPE2").val()+"</td>"
		    +"<td class=hidden></td>"
		    +"<td class=hidden></td>"

		    +"<td class=hidden>"+$("#ENTER_ANL_1").val()+"</td>"
            +"<td class=hidden>"+$("#ENTER_ANL_2").val()+"</td>"
            +"<td class=hidden>"+$("#ENTER_ANL_3").val()+"</td>"
            +"<td class=hidden>"+$("#ENTER_ANL_4").val()+"</td>"
            +"<td class=hidden>"+$("#ENTER_ANL_5").val()+"</td>"
            +"<td class=hidden>"+$("#ENTER_ANL_6").val()+"</td>"
            +"<td class=hidden>"+$("#ENTER_ANL_7").val()+"</td>"
            +"<td class=hidden>"+$("#ENTER_ANL_8").val()+"</td>"
            +"<td class=hidden>"+$("#ENTER_ANL_9").val()+"</td>"
            +"<td class=hidden>"+$("#ENTER_ANL_10").val()+"</td>"
		    +"</tr>");

		$("#ACCT_CODE2,#ACCT_NAME2,#DEPT_AMT2").val("");
		$("#CHNL_CODE2,#PRD_CODE2,#AFS_TYPE2,#SUP_CODE2,#VAT_TYPE2").val("");
		totalDeptAmt2(tableId);
		$("#validACCT_CODE2").val("false");
		$("#byteREMARK6").val("0");
		$("#ACCT_CODE2").focus();
	} else {
		if($("#EXPS_TYPE_ID").val()=="") {
			$.msgBox({ title:"Warring", content:"비용구분을 먼저 선택해 주세요!"});
			return;
		}
		$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
			+"<td align=right>"+$("#DEPT_AMT1").val()+"</td>"
		    +"<td class=hidden>"+$("#DEPT_CODE1").val()+"</td>"
		    +"<td>"+getComboText("DEPT_CODE1")+"</td>"
		    +"<td class=hidden>"+$("#CHNL_CODE1").val()+"</td>"
		    +"<td>"+getComboText("CHNL_CODE1")+"</td>"
		    +"<td class=hidden>"+$("#ASST_CODE1").val()+"</td>"
		    +"<td>"+getComboText("ASST_CODE1")+"</td>"
		    +"</tr>");

		$("#DEPT_AMT1,#CHNL_CODE1").val("");
		$("#DEPT_AMT1").focus();
		totalDeptAmt1(tableId);
	}

	$("#rowIndex"+index).val(j);
	tableRowEvent(tableId,tableRowId,1);
	tableRowColor(tableId,j);
	isComplete = false;
// Clear();
}
function Edit(index) {
	index += 1;
	var j = $("#rowIndex"+index).val();
	if(j == null || j == '' || isNaN(j)) {
		$.msgBox({ title:"Warring", content:"해당 항목을 먼저 선택해주세요!"});
		return;
	}

	if(!requiredValidate("#deptForm"+index)) return false;

	var tableId = "#deptTable"+index, tableRowId = "deptTableRow"+index;
	if(index==2) {
		if($("#validACCT_CODE2").val()!="true") {
			$.msgBox({ title:"Warring", content:"계정과목 코드 또는 명이 옯바르지 않습니다!"});
			return;
		}

		var drAmt = 0, crAmt = 0;
		var drcrType = $("#DRCR_TYPE2").val();
		if(drcrType=="D")
			drAmt = $("#DEPT_AMT2").val();
		else
			crAmt = $("#DEPT_AMT2").val();

		$(tableId+" tbody>tr:eq("+(j-1)+")").each(function() {
			$(this).find("td:eq(0)").text($("#ACCT_CODE2").val());
			$(this).find("td:eq(1)").text($("#ACCT_NAME2").val());
			$(this).find("td:eq(2)").text(drAmt);
			$(this).find("td:eq(3)").text(crAmt);

			$(this).find("td:eq(4)").text(getComboText("DEPT_CODE2"));
			$(this).find("td:eq(5)").text(getComboText("PRD_CODE2"));
			$(this).find("td:eq(6)").text(getComboText("CHNL_CODE2"));
// $(this).find("td:eq(7)").text(getComboText(""));
			$(this).find("td:eq(8)").text(getComboText("AFS_TYPE2"));
			$(this).find("td:eq(9)").text(getComboText("SUP_CODE2"));
// $(this).find("td:eq(10)").text(getComboText(""));
			$(this).find("td:eq(11)").text(getComboText("VAT_TYPE2"));
// $(this).find("td:eq(12)").text(getComboText(""));
// $(this).find("td:eq(13)").text(getComboText(""));

			$(this).find("td:eq(14)").text($("#DRCR_TYPE2").val());

			$(this).find("td:eq(15)").text($("#DEPT_CODE2").val());
			$(this).find("td:eq(16)").text($("#PRD_CODE2").val());
			$(this).find("td:eq(17)").text($("#CHNL_CODE2").val());
// $(this).find("td:eq(18)").text($("#").val());
			$(this).find("td:eq(19)").text($("#AFS_TYPE2").val());
			$(this).find("td:eq(20)").text($("#SUP_CODE2").val());
// $(this).find("td:eq(21)").text($("#").val());
			$(this).find("td:eq(22)").text($("#VAT_TYPE2").val());
// $(this).find("td:eq(23)").text($("#").val());
// $(this).find("td:eq(24)").text($("#").val());

			$(this).find("td:eq(25)").text($("#ENTER_ANL_1").val());
			$(this).find("td:eq(26)").text($("#ENTER_ANL_2").val());
			$(this).find("td:eq(27)").text($("#ENTER_ANL_3").val());
			$(this).find("td:eq(28)").text($("#ENTER_ANL_4").val());
			$(this).find("td:eq(29)").text($("#ENTER_ANL_5").val());
			$(this).find("td:eq(30)").text($("#ENTER_ANL_6").val());
			$(this).find("td:eq(31)").text($("#ENTER_ANL_7").val());
			$(this).find("td:eq(32)").text($("#ENTER_ANL_8").val());
			$(this).find("td:eq(33)").text($("#ENTER_ANL_9").val());
			$(this).find("td:eq(34)").text($("#ENTER_ANL_10").val());
		});

		$("#byteREMARK6").val("0");
		$("#ACCT_NAME2").focus();
		totalDeptAmt2(tableId);
	} else {
		$(tableId+" tbody>tr:eq("+(j-1)+")").each(function() {
			$(this).find("td:eq(0)").text($("#DEPT_AMT1").val());
			$(this).find("td:eq(1)").text($("#DEPT_CODE1").val());
			$(this).find("td:eq(2)").text(getComboText("DEPT_CODE1"));
			$(this).find("td:eq(3)").text($("#CHNL_CODE1").val());
			$(this).find("td:eq(4)").text(getComboText("CHNL_CODE1"));
			$(this).find("td:eq(5)").text($("#ASST_CODE1").val());
			$(this).find("td:eq(6)").text(getComboText("ASST_CODE1"));
		});
		$("#DEPT_AMT1").focus();
		totalDeptAmt1(tableId);
	}

	tableRowEvent(tableId,tableRowId,1);
	tableRowColor(tableId,j);
	isComplete = false;
// Clear();
}
function Remove(index) {
	index += 1;

	var j = $("#rowIndex"+index).val();
	if(j == null || j == '' || isNaN(j)) {
		$.msgBox({ title:"Warring", content:"해당 항목을 먼저 선택해주세요!"});
		return;
	}

	var tableId  = "#deptTable"+index, tableRowId = "deptTableRow"+index;
	var j = $("#rowIndex"+index).val();

	var objRow = tableRowObj(tableId,j);
	$(objRow).remove();

	$("#rowIndex"+index+",#DEPT_AMT"+index+",#CHNL_CODE"+index+",#CHNL_NAME"+index+",#ASST_CODE"+index+",#ASST_NAME"+index).val("");
	$("#DEPT_AMT"+index).focus();

	eval("totalDeptAmt"+index+"(tableId)");
	
	var k = j-1;
	if(k<1 && $(tableId+" tbody tr").length>0) k = 1;
	if(k>0) {
		tableRowColor(tableId,k);
		bindDataDeptTable(tableRowObj(tableId,k),index);
	}
	isComplete = false;
}
// -------------------------------------------------------------------------------------------------
function RetrievePaymethod() {
	var objId = "#PAY_METHOD_TYPE2,#PAY_METHOD_TYPE3,#PAY_METHOD_TYPE4,#PAY_METHOD_TYPE5,#PAY_METHOD_TYPE6";
	$(objId).empty();
	$(objId).append("<option value=\"\">--Select--</option>");

	var action = "ssc.do?method=AnalyissCodes";
	var params = "&ANALYISS_TYPE=PAYMENTMETHOD&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("SSC").find("Payload").find("AnalysisCodes").each(function(){
				$(objId).append(
					 "<option value="+$(this).find("LookupCode").text()+">"+$(this).find("Name").text()+"</option>"
				);
			});
			$(objId).trigger("update");
		},
		error: function(xhr, ajaxOptions, thrownError){
			$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
		}
	});
}

function RetrieveVendor(index) {
	index += 1; var j = 0;
	var tableId = "#findTable", tableRowId = "findTableRow";
	$(tableId+" tbody").empty();

	var findst = $("#VENDOR_NAME").val();

	var action = "index.do?method=DEPTRetrieve";
	var params = "&DEPT_NAME="+getString("#VENDOR_NAME")+"&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+(++j)+"\">"
                +"<td align=center>"+$(this).find("SCREEN_ID").text()+"</td>"
                +"<td>"+$(this).find("SCREEN_NAME").text().replaceAll(findst,"<font color=red>"+findst+"</font>")+"</td>"
                +"</tr>");
			});
			tableRowEvent(tableId,tableRowId,1,"VENDOR_CODE","VENDOR_NAME");
		}
	});
}

function RetrieveAsst(index) {
	index += 1; var j = 0;
	var tableId = "#findTable", tableRowId = "findTableRow";
	$(tableId+" tbody").empty();

	var findst = $("#ASST_NAME").val();

	var action = "index.do?method=DEPTRetrieve";
	var params = "&DEPT_NAME="+getString("#ASST_NAME")+"&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+(++j)+"\">"
                +"<td align=center>"+$(this).find("SCREEN_ID").text()+"</td>"
                +"<td>"+$(this).find("SCREEN_NAME").text().replaceAll(findst,"<font color=red>"+findst+"</font>")+"</td>"
                +"</tr>");
			});
			tableRowEvent(tableId,tableRowId,1,"ASST_CODE","ASST_NAME");
		}
	});
}
function RetrieveDept(index) {
	index += 1; var j = 0;
	var tableId = "#findTable", tableRowId = "findTableRow";
	$(tableId+" tbody").empty();

	var findst = $("#DEPT_NAME"+index).val();

	var action = "index.do?method=DEPTRetrieve";
	var params = "&DEPT_NAME="+getString("#DEPT_NAME"+index)+"&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+(++j)+"\">"
                +"<td align=center>"+$(this).find("SCREEN_ID").text()+"</td>"
                +"<td>"+$(this).find("SCREEN_NAME").text().replaceAll(findst,"<font color=red>"+findst+"</font>")+"</td>"
                +"</tr>");
			});
			tableRowEvent(tableId,tableRowId,1,"DEPT_CODE"+index,"DEPT_NAME"+index);
		}
	});
}
function RetrieveChnl(index) {
	index += 1; var j = 0;
	var tableId = "#findTable", tableRowId = "findTableRow";
	$(tableId+" tbody").empty();

	var findst = $("#CHNL_NAME"+index).val();

	var action = "index.do?method=DEPTRetrieve";
	var params = "&DEPT_NAME="+getString("#CHNL_NAME"+index)+"&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+(++j)+"\">"
                +"<td align=center>"+$(this).find("SCREEN_ID").text()+"</td>"
                +"<td>"+$(this).find("SCREEN_NAME").text().replaceAll(findst,"<font color=red>"+findst+"</font>")+"</td>"
                +"</tr>");
			});
			tableRowEvent(tableId,tableRowId,1,"CHNL_CODE"+index,"CHNL_NAME"+index);
		}
	});
}

function RetrieveInfo(vndrCode) {
	var action = "index.do?method=INFO";
	var params = "&TYPE=VENDOR&PARAM1="+vndrCode+"&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$("#COMPANY_NAME").val($(this).find("DESCR").text());
				$("#BUSI_NO").val($(this).find("MISC_REF_1").text());
				$("#BUSI_NO").focus();
			});
		},
		error: function(xhr, ajaxOptions, thrownError){
			$.msgBox({ title:"Warring", content:xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError});
		}
	});
}

// 비용구분
function RetrieveRemark(obj) {
	$("#lblREMARK1,#lblREMARK2,#lblREMARK3,#lblREMARK4").html("");
	$("#REMARK1,#REMARK2,#REMARK3,#REMARK4").val("");
	$("#ASST_PURCHASE_YN,#CC_CARD_INPUT_YN,#ENTER_ANL_1,#ENTER_ANL_3,#ACCT_CODE,#DEPT_AMT1").val("");
	display("#REMARK1,#REMARK2,#REMARK3,#REMARK4",false);
	requiredClear();
	required("#REMARK1,#REMARK2,#REMARK3,#REMARK4",false);

	if($(obj).val() == "") { 
		return;
	}

	var action = "scn3.do?method=SA020RetrieveRemark";
	var params = "&EXPS_TYPE_ID="+$(obj).val()+"&call=xml";

	

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			$(result).find("REMARK").find("ROW").each(function(){
				$("#lblREMARK1").html($(this).find("REMARK1").text());
				$("#lblREMARK2").html($(this).find("REMARK2").text());
				$("#lblREMARK3").html($(this).find("REMARK3").text());
				$("#lblREMARK4").html($(this).find("REMARK4").text());

				display("#REMARK1", $(this).find("REMARK1").text());
				display("#REMARK2", $(this).find("REMARK2").text());
				display("#REMARK3", $(this).find("REMARK3").text());
				display("#REMARK4", $(this).find("REMARK4").text());

				required("#REMARK1",$(this).find("REMARK1").text());
				required("#REMARK2",$(this).find("REMARK2").text());
				required("#REMARK3",$(this).find("REMARK3").text());
				required("#REMARK4",$(this).find("REMARK4").text());

				if($("#EVID_TYPE").val()=="EC") {
					required("#COMPANY_NAME",($(this).find("CC_CARD_INPUT_YN").text()=="Y"));
					required("#BUSI_NO",($(this).find("CC_CARD_INPUT_YN").text()=="Y"));
				}

				$("#ASST_PURCHASE_YN").val($(this).find("ASST_PURCHASE_YN").text());
				$("#ASST_PURCHASE_TI").val($(this).find("ASST_PURCHASE_TI").text());
				$("#ENTER_ANL_1").val($(this).find("ENTER_ANL_1").text());
				$("#ENTER_ANL_3").val($(this).find("ENTER_ANL_3").text());
				$("#ACCT_CODE").val($(this).find("ACCT_CODE").text());

				display("#divDEPT_CODE1",($(this).find("ENTER_ANL_1").text()=="1"));
				display("#divCHNL_CODE1",($(this).find("ENTER_ANL_3").text()=="1"));
				/*
				 * $("#lblREMARK6").css("display","none");
				 * $("#lblREMARK7").css("display","none");
				 * $("#lblREMARK8").css("display","none");
				 * 
				 * if($(this).find("ENTER_ANL_1").text()=="1") {
				 * $("#lblREMARK6").css("display","block"); }
				 * if($(this).find("ENTER_ANL_3").text()=="1") {
				 * $("#lblREMARK7").css("display","block"); }
				 */
				if($(this).find("ASST_PURCHASE_YN").text()=="Y")
				{
					temp_ASST = $(this).find("ASST_PURCHASE_TI").text();
					ASST_VIEW();
				// $("#lblREMARK8").css("display","block");
				}
				
				
				display("#divASST_CODE1",($(this).find("ASST_PURCHASE_YN").text()=="Y"));
				required("#DEPT_CODE1",($(this).find("ENTER_ANL_1").text()=="1"));
				required("#CHNL_CODE1",($(this).find("ENTER_ANL_3").text()=="1"));
				required("#ASST_CODE1",($(this).find("ASST_PURCHASE_YN").text()=="Y"));
			});
		}
	});
}
function ASST_VIEW()
{
	var temp2 = "";
	if(temp_ASST == "Y"){
		temp2 = "I";
	}
	else{
		temp2 = "T";
	}
	$("#ASST_CODE1").empty();
	var action = "scn1.do?method=AA010ASSTCODE";
	var data   = "&param2="+temp2+"&call=xml";
	
	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			if($(result).find("ASST_LIST").find("ROW").length==0) { 
			}
			
			$(result).find("ASST_LIST").find("ROW").each(function(){
				$("#ASST_CODE1").append("<option value=\""+$(this).find("VALUE").text()+"\">"+$(this).find("LABEL").text()+"</option>");
			});
		}
	});
}
function PopupAcct() {
	$("#validACCT_CODE2").attr("valid","false");
	var param = new Object();
	param.ACCT_CODE = $("#ACCT_CODE2").val();
	param.ACCT_NAME = $("#ACCT_NAME2").val();
	
	var url   = "popup.do?method=CP050&screenId=CP050&screenIdRef=AA010&refVal=&isPopup=true";
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		$("#divVAT_TYPE2,#divPRD_CODE2,#divAFS_TYPE2,#divSUP_CODE2").css("display","none");

		$("#ACCT_CODE2").val(retVal.ACCT_CODE);
		$("#ACCT_NAME2").val(retVal.ACCT_NAME);
		$("#validACCT_CODE2").val("true");

		$("#ENTER_ANL_1").val(retVal.ENTER_ANL_1);
		$("#ENTER_ANL_2").val(retVal.ENTER_ANL_2);
		$("#ENTER_ANL_3").val(retVal.ENTER_ANL_3);
		$("#ENTER_ANL_4").val(retVal.ENTER_ANL_4);
		$("#ENTER_ANL_5").val(retVal.ENTER_ANL_5);
		$("#ENTER_ANL_6").val(retVal.ENTER_ANL_6);
		$("#ENTER_ANL_7").val(retVal.ENTER_ANL_7);
		$("#ENTER_ANL_8").val(retVal.ENTER_ANL_8);
		$("#ENTER_ANL_9").val(retVal.ENTER_ANL_9);
		$("#ENTER_ANL_10").val(retVal.ENTER_ANL_10);

		display("#divDEPT_CODE2",(retVal.ENTER_ANL_1 =="1")); // 부서
		display("#divPRD_CODE2", (retVal.ENTER_ANL_2 =="1")); // 상품
		display("#divCHNL_CODE2",(retVal.ENTER_ANL_3 =="1")); // 채널
// display("#div ",(retVal.ENTER_ANL_4 =="1")); //
		display("#divAFS_TYPE2", (retVal.ENTER_ANL_5 =="1")); // 채권구분
		display("#divSUP_CODE2", (retVal.ENTER_ANL_6 =="1")); // 거래처
// display("#div ",(retVal.ENTER_ANL_7 =="1")); //지급방법
		display("#divVAT_TYPE2", (retVal.ENTER_ANL_8 =="1")); // 부가세구분
// display("#div ",(retVal.ENTER_ANL_9 =="1")); //
// display("#div ",(retVal.ENTER_ANL_10=="1")); //

		required("#DEPT_CODE2",  (retVal.ENTER_ANL_1 =="1"));
		required("#PRD_CODE2",   (retVal.ENTER_ANL_2 =="1"));
		required("#CHNL_CODE2",  (retVal.ENTER_ANL_3 =="1"));
// required("# ", (retVal.ENTER_ANL_4 =="1"));
		required("#AFS_TYPE2",   (retVal.ENTER_ANL_5 =="1"));
		required("#SUP_CODE2",   (retVal.ENTER_ANL_6 =="1"));
		required("#PAY_METHOD_TYPE2", (retVal.ENTER_ANL_7=="1"));
		required("#VAT_TYPE2",   (retVal.ENTER_ANL_8 =="1"));
// required("# ", (retVal.ENTER_ANL_9 =="1"));
// required("# ", (retVal.ENTER_ANL_10=="1"));

		$("#DEPT_AMT2").focus();
	}
}
function PopupVndr() {
	$("#validVENDOR_CODE2").val("false");
	var param = new Object();
	param.VNDR_CODE = $("#VENDOR_CODE2").val(); 
	param.VNDR_NAME = $("#VENDOR_NAME2").val();

	var url   = "popup.do?method=CP100&screenId=CP100&screenIdRef=AA010&refVal=&isPopup=true";
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		$("#VENDOR_CODE2").val(retVal.VENDOR_CODE);
		$("#VENDOR_NAME2").val(retVal.VENDOR_NAME.replace("&amp;","&"));
		$("#COMPANY_NAME").val(retVal.VENDOR_NAME.replace("&amp;","&"));
		$("#BUSI_NO").val(retVal.BUSI_NO);
		$("#PAY_METHOD_TYPE").val(retVal.ANL_CODE1);
		$("#validVENDOR_CODE2").val("true");
	}
}
function PopupEmpl() {
	$("#validVENDOR_CODE3").val("false");
	var param = new Object();
	param.VNDR_CODE = $("#VENDOR_CODE3").val(); 
	param.VNDR_NAME = $("#VENDOR_NAME3").val();

	var url   = "popup.do?method=CP060&screenId=CP060&screenIdRef=AA010&refVal=&isPopup=true";
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {
		$("#VENDOR_CODE3").val(retVal.VENDOR_CODE);
		$("#VENDOR_NAME3").val(retVal.VENDOR_NAME.replace("&amp;","&"));
		$("#validVENDOR_CODE3").val("true");
	}
}
function Clear() {
	var tpltName = $("#TPLT_NAME").val();
	requiredClear();
	$("#fromTable1,#fromTable2").clearForm();
	$("#deptTable1 tbody,#deptTable2 tbody,#findTable tbody").empty();
	$("#lblREMARK1,#lblREMARK2,#lblREMARK3,#lblREMARK4").html("");
	$("#JRNL_NO,#JRNL_SEQ,#DEPT_AMT1,#DEPT_AMT2").val("");
	$("#ASST_PURCHASE_YN,#CC_CARD_INPUT_YN,#ENTER_ANL_1,#ENTER_ANL_3,#ACCT_CODE").val("");

	$("#ASST_PURCHASE_YN,#CC_CARD_INPUT_YN,#ENTER_ANL_1,#ENTER_ANL_3,#ACCT_CODE").val("");
	
	$("#EXPS_TYPE_ID,#TRANS_DATE,#PAY_DUE_DATE,#PAY_METHOD_TYPE,#VENDOR_CODE1,#VENDOR_CODE2,#VENDOR_NAME2,#VENDOR_CODE").val("");
	$("#DEPT_AMT1,#DEPT_CODE1,#CHNL_CODE1,#ASST_CODE1").val("");

	$("#TRANS_DATE2,#PAY_DUE_DATE2,#PAY_METHOD_TYPE2").val("");
	$("#ACCT_CODE2,#ACCT_NAME2,#DEPT_AMT2,#DRCR_TYPE2,#DEPT_CODE2,#CHNL_CODE2").val("");

	required("#DEPT_CODE1,#CHNL_CODE1,#ASST_CODE1,#ASST_CODE1,#DEPT_CODE2,#CHNL_CODE2",false);
	setRadioValue("USE_TYPE","CH");
	$("#TPLT_NAME").val(tpltName);
	$("#DEPT_CODE1,#DEPT_CODE2").val(ssDeptCode);
	$("#DEPT_NAME1,#DEPT_NAME2").val(ssDeptName);
}
function bindData(obj) {
	Clear();
	disabled("#btnUpdate,#btnDelete",!(obj.rowIndex>0));
	
	$("#JRNL_NO").val(obj.cells[29].innerText);
	$("#JRNL_SEQ").val(obj.cells[30].innerText);

	var evidType = obj.cells[9].innerText;
	if(evidType == "EO") {
		$("#TRANS_DATE2").val(     obj.cells[11].innerText);
		$("#PAY_DUE_DATE2").val(   obj.cells[6].innerText);
		$("#PAY_METHOD_TYPE2").val(obj.cells[12].innerText);
		$("#REMARK6").val(         obj.cells[8].innerText);

		$("#byteREMARK6").text(checkByteLen($("#REMARK6").val()));
		$("#TRANS_DATE2,#PAY_DUE_DATE2").blur();
	} else {
		$("#EXPS_TYPE_ID").val(    obj.cells[10].innerText);
		$("#TRANS_DATE").val(      obj.cells[11].innerText);
		$("#PAY_DUE_DATE").val(    obj.cells[6].innerText);
		$("#PAY_METHOD_TYPE").val( obj.cells[12].innerText);

		$("#REMARK").val(          obj.cells[8].innerText);
		$("#lblREMARK1").html(     obj.cells[13].innerText);
		$("#REMARK1").val(         obj.cells[14].innerText);
		$("#lblREMARK2").html(     obj.cells[15].innerText);
		$("#REMARK2").val(         obj.cells[16].innerText);
		$("#lblREMARK3").html(     obj.cells[17].innerText);
		$("#REMARK3").val(         obj.cells[18].innerText);
		$("#lblREMARK4").html(     obj.cells[19].innerText);
		$("#REMARK4").val(         obj.cells[20].innerText);

		$("#byteREMARK").text(checkByteLen($("#REMARK").val()));
		$("#byteREMARK1").text(checkByteLen($("#REMARK1").val()));
		$("#byteREMARK2").text(checkByteLen($("#REMARK2").val()));
		$("#byteREMARK3").text(checkByteLen($("#REMARK3").val()));
		$("#byteREMARK4").text(checkByteLen($("#REMARK4").val()));
		
		if(evidType=="EC") {
			$("#VENDOR_CODE1").val(obj.cells[21].innerText);
			required("#COMPANY_NAME",(obj.cells[35].innerText=="Y"));
			required("#BUSI_NO",(obj.cells[35].innerText=="Y"));
		} else if(evidType=="ET" || evidType=="EI" || evidType=="ER") {
			$("#VENDOR_CODE2").val(obj.cells[21].innerText);
			$("#VENDOR_NAME2").val(obj.cells[22].innerText);
			$("#validVENDOR_CODE2").val("true");
		} else if(evidType=="EA") {
			$("#VENDOR_CODE3").val(obj.cells[21].innerText);
			$("#VENDOR_NAME3").val(obj.cells[5].innerText);
			$("#validVENDOR_CODE3").val("true");
			var useType = obj.cells[26].innerText;
			setRadioValue("USE_TYPE",useType);
// if(useType=="CC") {
// $("#BUSI_NO").val(obj.cells[23].innerText);
// display("#BUSI_NO",true);
// readonly("#BUSI_NO",false);
// }
		}

		$("#COMPANY_NAME").val(    obj.cells[22].innerText);
		$("#BUSI_NO").val(         obj.cells[23].innerText);

		setNumber("#SUPPLY_AMT",   obj.cells[27].innerText);
		setNumber("#VAT_AMT",      obj.cells[28].innerText);
		setNumber("#TOTAL_AMT",    obj.cells[4].innerText);

		display("#REMARK1", obj.cells[14].innerText);
		display("#REMARK2", obj.cells[16].innerText);
		display("#REMARK3", obj.cells[18].innerText);
		display("#REMARK4", obj.cells[20].innerText);

		required("#REMARK1",obj.cells[14].innerText);
		required("#REMARK2",obj.cells[16].innerText);
		required("#REMARK3",obj.cells[18].innerText);
		required("#REMARK4",obj.cells[20].innerText);

		$("#ACCT_CODE").val(       obj.cells[31].innerText);
		$("#ASST_PURCHASE_YN").val(obj.cells[32].innerText);
		$("#CC_CARD_INPUT_YN").val(obj.cells[33].innerText);

		$("#ENTER_ANL_1").val(     obj.cells[34].innerText);  // 부서
		$("#ENTER_ANL_3").val(     obj.cells[36].innerText);  // 채널

		display("#divASST_CODE1",( obj.cells[32].innerText=="Y"));
		display("#divDEPT_CODE1",( obj.cells[34].innerText=="1"));
		display("#divCHNL_CODE1",( obj.cells[36].innerText=="1"));

		required("#ASST_CODE1",(   obj.cells[32].innerText=="Y"));
		required("#DEPT_CODE1",(   obj.cells[34].innerText=="1"));
		required("#CHNL_CODE1",(   obj.cells[36].innerText=="1"));
	}
	isComplete2 = true;
}
function bindDataDeptTable(obj,index) {
	requiredClear();
	$("#rowIndex"+index).val(obj.rowIndex);
	if(index == 2) { // 6.기타
		var amt = 0;
		var drcrType = obj.cells[14].innerText;
		if(drcrType=="D")
			amt = obj.cells[2].innerText;
		else
			amt = obj.cells[3].innerText;

		$("#ACCT_CODE2").val(obj.cells[0].innerText);
		getAcctName(obj.cells[0].innerText);
		$("#ACCT_NAME2").val(obj.cells[1].innerText);
		$("#DRCR_TYPE2").val(drcrType);
		setNumber("#DEPT_AMT2",amt);

		$("#DEPT_CODE2").val(obj.cells[15].innerText);
		$("#PRD_CODE2").val( obj.cells[16].innerText);
		$("#CHNL_CODE2").val(obj.cells[17].innerText);
// $("# ").val(obj.cells[18].innerText);
		$("#AFS_TYPE2").val( obj.cells[19].innerText);
		$("#SUP_CODE2").val( obj.cells[20].innerText);
// $("#PAY_METHOD_TYPE2").val(obj.cells[21].innerText);
		$("#VAT_TYPE2").val( obj.cells[22].innerText);
// $("# ").val(obj.cells[23].innerText);
// $("# ").val(obj.cells[24].innerText);

		disabled("#btnEdit2,#btnRemove2",false);

		for(var i=0;i<10;i++) {
			$("#ENTER_ANL_"+(i+1)).val(obj.cells[25+i].innerText);
		}

		var enterAnl1  = obj.cells[25].innerText; // 부서
		var enterAnl2  = obj.cells[26].innerText; // 상품
		var enterAnl3  = obj.cells[27].innerText; // 채널
		var enterAnl4  = obj.cells[28].innerText;
		var enterAnl5  = obj.cells[29].innerText; // 채권구분
		var enterAnl6  = obj.cells[30].innerText; // 거래처
		var enterAnl7  = obj.cells[31].innerText; // 지급방법
		var enterAnl8  = obj.cells[32].innerText; // 부가세구분
		var enterAnl9  = obj.cells[33].innerText;
		var enterAnl10 = obj.cells[34].innerText;

		display("#divDEPT_CODE2",(enterAnl1 =="1"));
		display("#divPRD_CODE2", (enterAnl2 =="1"));
		display("#divCHNL_CODE2",(enterAnl3 =="1"));
// display("#div ",(enterAnl4 =="1"));
		display("#divAFS_TYPE2", (enterAnl5 =="1"));
		display("#divSUP_CODE2", (enterAnl6 =="1"));
// display("#div ",(enterAnl7 =="1"));
		display("#divVAT_TYPE2", (enterAnl8 =="1"));
// display("#div ",(enterAnl9 =="1"));
// display("#div ",(enterAnl10=="1"));

		required("#DEPT_CODE2",  (enterAnl1 =="1"));
		required("#PRD_CODE2",   (enterAnl2 =="1"));
		required("#CHNL_CODE2",  (enterAnl3 =="1"));
// required("# ", (enterAnl4 =="1"));
		required("#AFS_TYPE2",   (enterAnl5 =="1"));
		required("#SUP_CODE2",   (enterAnl6 =="1"));
// required("# ", (enterAnl7 =="1"));
		required("#VAT_TYPE2",   (enterAnl8 =="1"));
// required("# ", (enterAnl9 =="1"));
// required("# ", (enterAnl10=="1"));

	} else {        // 1.2.3.4.5
		setNumber("#DEPT_AMT1",obj.cells[0].innerText);
		$("#DEPT_CODE1").val(obj.cells[1].innerText);
		$("#CHNL_CODE1").val(obj.cells[2].innerText);
		$("#ASST_CODE1").val(obj.cells[5].innerText);
		disabled("#btnEdit1,#btnRemove1",false);
	}
}
function bindDataFindTable(obj,code,name) {
	$("#"+code).val(obj.cells[0].innerText);
	$("#"+name).val(obj.cells[1].innerText);
	$("#findTable tbody").empty();
}
function tabEvent(index) {
	isComplete = true;
	isComplete2 = true;
	required("#REMARK1,#REMARK2,#REMARK3,#REMARK4",false);
	if(tabid == 1){
		tabid = index;
	}
	else{
		tabid = index-1;
	}
	
	if(index == 6) {
		$('#fromTable2').clearForm();
		$("#deptTable2 tbody").empty();
		$("#tab-1").css("display","none");
		$("#tab-6").css("display","block");
		$("#byteREMARK6").text(checkByteLen($("#REMARK6").val()));
	} else {
		$('#fromTable1').clearForm();
		$("#deptTable1 tbody").empty();
		$("#tab-1").css("display","block");
		$("#tab-6").css("display","none");
		$("#byteREMARK").text(checkByteLen($("#REMARK").val()));
		$("#byteREMARK1").text(checkByteLen($("#REMARK1").val()));
		$("#byteREMARK2").text(checkByteLen($("#REMARK2").val()));
		$("#byteREMARK3").text(checkByteLen($("#REMARK3").val()));
		$("#byteREMARK4").text(checkByteLen($("#REMARK4").val()));
	}
	$("#DRCR_TYPE2").val("D");
	Screen_Setup();
	Clear();

	if(index == 6) {
		required("#EXPS_TYPE_ID,#TRANS_DATE,#TOTAL_AMT,#PAY_DUE_DATE,#PAY_METHOD_TYPE,#VENDOR_CODE1,#VENDOR_CODE2,#VENDOR_CODE3,#COMPANY_NAME,#BUSI_NO",false);
		required("#TRANS_DATE2,#DEBIT_TOTAL2,#CREDIT_TOTAL2",true);
	} else {
		required("#TRANS_DATE2,#DEBIT_TOTAL2,#CREDIT_TOTAL2,#BUSI_NO",false);
		required("#EXPS_TYPE_ID,#TRANS_DATE,#TOTAL_AMT",true);
		if(index == 1) {
			required("#PAY_DUE_DATE,#PAY_METHOD_TYPE,#VENDOR_CODE2,#VENDOR_CODE3",false);
			required("#VENDOR_CODE1,#COMPANY_NAME,#BUSI_NO",true);
		} else if(index == 2 || index == 3 || index == 4) {
			required("#VENDOR_CODE1,#VENDOR_CODE3",false);
			required("#PAY_DUE_DATE,#PAY_METHOD_TYPE,#VENDOR_CODE2,#COMPANY_NAME",true);		
		} else if(index == 5) {
			required("#PAY_DUE_DATE,#PAY_METHOD_TYPE,#VENDOR_CODE1,#VENDOR_CODE2,#COMPANY_NAME",false);
			required("#VENDOR_CODE3",true);
		}
	}

	display("#REMARK1,#REMARK2,#REMARK3,#REMARK4",false);

	if(index == 1) {
		$("#EVID_TYPE").val("EC"); // 법인카드
		$("#lblTRANS_DATE").html(S009);
		$("#lblVENDOR_CODE").html(S008);
		$("#lblPAY_DUE_DATE,#lblPAY_METHOD_TYPE").html("");
		
		display("#PAY_DUE_DATE,#PAY_METHOD_TYPE,#divVENDOR_CODE2,#divVENDOR_CODE3,#divUSE_TYPE",false);
		display("#divVENDOR_CODE1,#COMPANY_NAME,#BUSI_NO,#SUPPLY_AMT,#VAT_AMT",true);
		readonly("#COMPANY_NAME,#BUSI_NO",false);
	} else if(index == 2) {
		$("#EVID_TYPE").val("ET"); // 세금계산서
		$("#lblVENDOR_CODE").html(S018);
		$("#lblTRANS_DATE").html(S003);

		display("#divVENDOR_CODE1,#divVENDOR_CODE3,#divUSE_TYPE",false);
		display("#PAY_DUE_DATE,#PAY_METHOD_TYPE,#divVENDOR_CODE2,#COMPANY_NAME,#BUSI_NO,#SUPPLY_AMT,#VAT_AMT",true);
		readonly("#COMPANY_NAME,#BUSI_NO",true);
	} else if(index == 3) {
		$("#EVID_TYPE").val("EI"); // 계산서
		$("#lblVENDOR_CODE").html(S018);
		$("#lblTRANS_DATE").html(S003);
		$("#lblSUPPLY_AMT,#lblVAT_AMT").html("");

		display("#divVENDOR_CODE1,#divVENDOR_CODE3,#divUSE_TYPE,#SUPPLY_AMT,#VAT_AMT",false);
		display("#PAY_DUE_DATE,#PAY_METHOD_TYPE,#divVENDOR_CODE2,#COMPANY_NAME,#BUSI_NO",true);
		readonly("#COMPANY_NAME,#BUSI_NO",true);
	} else if(index == 4) {
		$("#EVID_TYPE").val("ER"); // 기타영수증
		$("#lblVENDOR_CODE").html(S018);
		$("#lblSUPPLY_AMT,#lblVAT_AMT").html("");

		display("#divVENDOR_CODE1,#divVENDOR_CODE3,#divUSE_TYPE,#SUPPLY_AMT,#VAT_AMT",false);
		display("#PAY_DUE_DATE,#PAY_METHOD_TYPE,#divVENDOR_CODE2,#COMPANY_NAME,#BUSI_NO",true);
		readonly("#COMPANY_NAME,#BUSI_NO",true);
	} else if(index == 5) {
		$("#EVID_TYPE").val("EA"); // 개인경비
		$("#lblBUSI_NO,#lblSUPPLY_AMT,#lblVAT_AMT,#lblPAY_DUE_DATE,#lblPAY_METHOD_TYPE").html("");
		setRadioValue("USE_TYPE","CC");
		
		EmplName(ssEmplId);

		display("#PAY_DUE_DATE,#PAY_METHOD_TYPE,#divVENDOR_CODE1,#divVENDOR_CODE2,#COMPANY_NAME,#BUSI_NO,#SUPPLY_AMT,#VAT_AMT,#divASST_CODE1",false);
		display("#divVENDOR_CODE3,#divUSE_TYPE",true);
		readonly("#COMPANY_NAME,#BUSI_NO",true);

		$("#lblVENDOR_CODE").html(S019);
		$("#lblCOMPANY_NAME").html(S020);
	} else if(index == 6) {
		$("#EVID_TYPE").val("EO"); // Other
	}
}

function totalDeptAmt1(tableId) {
	var totalAmt = 0, supplyAmt = 0, vatAmt = 0;
	var tableRows = $(tableId+" tbody tr");
	tableRows.each(function(n){
		totalAmt += parseInt(tableRows[n].cells[0].innerHTML.replaceAll(",",""));
	});

// supplyAmt = Math.ceil((totalAmt*parseInt(vatRate))/11);
	supplyAmt = Math.ceil((totalAmt/(1+parseInt(vatRate)/100)));
	vatAmt    = totalAmt-supplyAmt;

	setNumber("#SUPPLY_AMT", supplyAmt);
	setNumber("#VAT_AMT",    vatAmt);
	setNumber("#TOTAL_AMT",  totalAmt);
}
function totalDeptAmt2(tableId) {
	var debitTotalAmt = 0, creditTotalAmt = 0;
	var tableRows = $(tableId+" tbody tr");
	tableRows.each(function(n){
		if(tableRows[n].cells[14].innerHTML=="D")
			debitTotalAmt  += parseInt(tableRows[n].cells[2].innerHTML.replaceAll(",",""));
		else if(tableRows[n].cells[14].innerHTML=="C")
			creditTotalAmt += parseInt(tableRows[n].cells[3].innerHTML.replaceAll(",",""));
	});

	setNumber("#DEBIT_TOTAL2",  debitTotalAmt);
	setNumber("#CREDIT_TOTAL2", creditTotalAmt);
}

function getDataTable1(dataTable) {
	var returnData = "";
	var tableRows = $("#"+dataTable+" tbody tr");

	tableRows.each(function(n){
		if(n > 0) returnData += "|";
		returnData += tableRows[n].cells[0].innerHTML.replaceAll(",","")+"^"
		            + tableRows[n].cells[1].innerHTML.trim()+"^"
		            + tableRows[n].cells[2].innerHTML+" ^"
		            + tableRows[n].cells[3].innerHTML.trim()+"^"
		            + tableRows[n].cells[4].innerHTML+" ^"
		            + tableRows[n].cells[5].innerHTML.trim()+"^"
		            + tableRows[n].cells[6].innerHTML+" ";
	});
	return returnData;
}
// 데이터 테이블 생성2
function getDataTable2(dataTable) {
	var returnData = "";
	var tableRows = $("#"+dataTable+" tbody tr");

	tableRows.each(function(n){
		var amt = 0;
		if(tableRows[n].cells[14].innerHTML=="D")
			amt = tableRows[n].cells[2].innerHTML.replaceAll(",","");
		else
			amt = tableRows[n].cells[3].innerHTML.replaceAll(",","");
		
		// 계정코드^계정명^차대구분^금액^부서코드^부서명^상품코드^상품명^채널코드^채널명^^^채권구분^채권구분명^거래처코드^거래처명^부가세구분^부가세구분명^^^^
		if(n > 0) returnData += "|";
		returnData += tableRows[n].cells[0].innerHTML.trim()+"^"  // 계정코드
        			+ tableRows[n].cells[1].innerHTML+"^"         // 계정명
        			+ tableRows[n].cells[14].innerHTML.trim()+"^" // 차대구분
		            + amt+"^"                                     // 금액
		            + tableRows[n].cells[15].innerHTML.trim()+"^" // 부서코드
		            + tableRows[n].cells[4].innerHTML+"^"         // 부서명
		            + tableRows[n].cells[16].innerHTML.trim()+"^" // 상품코드
		            + tableRows[n].cells[5].innerHTML+"^"         // 상품명
		            + tableRows[n].cells[17].innerHTML.trim()+"^" // 채널코드
		            + tableRows[n].cells[6].innerHTML+" "         // 채널명
		            +"^"                                          // ^
		            + tableRows[n].cells[18].innerHTML.trim()+"^" // 채권구분
		            + tableRows[n].cells[7].innerHTML+"^"         // 채권명
		            + tableRows[n].cells[19].innerHTML.trim()+"^" // 거래처코드
		            + tableRows[n].cells[8].innerHTML+"^"         // 거래처명
		            + tableRows[n].cells[20].innerHTML.trim()+"^" // 부가세구분
		            + tableRows[n].cells[9].innerHTML+"^"         // 부가세구분명
		            + tableRows[n].cells[21].innerHTML.trim()+"^" // ^
		            + tableRows[n].cells[10].innerHTML+"^"        // ^
                    + tableRows[n].cells[22].innerHTML.trim()+"^"
		            + tableRows[n].cells[11].innerHTML+"^"
		            + tableRows[n].cells[23].innerHTML.trim()+"^"
		            + tableRows[n].cells[12].innerHTML+"^"
		            + tableRows[n].cells[24].innerHTML.trim()+"^"
		            + tableRows[n].cells[13].innerHTML+" "
		            ;
	});
	
	return returnData;
}

function checkDataTable1(tableId) {
	var asstPurchaseYn = $("#ASST_PURCHASE_YN").val();
	var enterAnl1      = $("#ENTER_ANL_1").val();
	var enterAnl3      = $("#ENTER_ANL_3").val();
	var retval = true;
	$(tableId+" tbody>tr").each(function() {
		if(enterAnl1=="1" && $(this).find("td:eq(1)").text()=="") {
			$.msgBox({ title:"Warring", content:"부서를 입력해 주세요!"});
			retval = false;
		} else if(enterAnl1!="1") {
			$(this).find("td:eq(1)").text("");
			$(this).find("td:eq(2)").text("");
		}
		if(enterAnl3=="1" && $(this).find("td:eq(3)").text()=="") {
			$.msgBox({ title:"Warring", content:"채널을 입력해 주세요!"});
			retval = false;
		} else if(enterAnl3!="1") {
			$(this).find("td:eq(3)").text("");
			$(this).find("td:eq(4)").text("");
		}
		if(asstPurchaseYn=="Y" && $(this).find("td:eq(5)").text()=="") {
			$.msgBox({ title:"Warring", content:"자산을 입력해 주세요!"});
			retval = false;
		} else if(asstPurchaseYn!="Y") {
			$(this).find("td:eq(5)").text("");
			$(this).find("td:eq(6)").text("");
		}
	});
	return retval;
}
function checkDataTable2(tableId) {
	var retval = true;
	$(tableId+" tbody>tr").each(function() {
		if($(this).find("td:eq(25)").text() == "1" && $(this).find("td:eq(15)").text() == "") {
			$.msgBox({ title:"Warring", content:"부서를 입력해 주세요!"});
			retval = false;
		} else if($(this).find("td:eq(25)").text() != "1") {
			$(this).find("td:eq(4)").text("");
			$(this).find("td:eq(15)").text("");
		}
		if($(this).find("td:eq(26)").text() == "1" && $(this).find("td:eq(16)").text() == "") {
			$.msgBox({ title:"Warring", content:"상품를 입력해 주세요!"});
			retval = false;
		} else if($(this).find("td:eq(26)").text() != "1") {
			$(this).find("td:eq(5)").text("");
			$(this).find("td:eq(16)").text("");
		}
		if($(this).find("td:eq(27)").text() == "1" && $(this).find("td:eq(17)").text() == "") {
			$.msgBox({ title:"Warring", content:"채널을 입력해 주세요!"});
			retval = false;
		} else if($(this).find("td:eq(27)").text() != "1") {
			$(this).find("td:eq(6)").text("");
			$(this).find("td:eq(17)").text("");
		}
		if($(this).find("td:eq(29)").text() == "1" && $(this).find("td:eq(19)").text() == "") {
			$.msgBox({ title:"Warring", content:"채권구분을 입력해 주세요!"});
			retval = false;
		} else if($(this).find("td:eq(29)").text() != "1") {
			$(this).find("td:eq(8)").text("");
			$(this).find("td:eq(19)").text("");
		}
		if($(this).find("td:eq(30)").text() == "1" && $(this).find("td:eq(20)").text() == "") {
			$.msgBox({ title:"Warring", content:"거래처을 입력해 주세요!"});
			retval = false;
		} else if($(this).find("td:eq(30)").text() != "1") {
			$(this).find("td:eq(9)").text("");
			$(this).find("td:eq(20)").text("");
		}
		if($(this).find("td:eq(31)").text() == "1" && $("#PAY_METHOD_TYPE2").val() == "") {
			$.msgBox({ title:"Warring", content:"지급방법을 입력해 주세요!"});
			retval = false;
		} else if($(this).find("td:eq(31)").text() != "1") {
			$(this).find("td:eq(10)").text("");
			$(this).find("td:eq(21)").text("");
		}
		if($(this).find("td:eq(32)").text() == "1" && $(this).find("td:eq(22)").text() == "") {
			$.msgBox({ title:"Warring", content:"부가세구분을 입력해 주세요!"});
			retval = false;
		} else if($(this).find("td:eq(32)").text() != "1") {
			$(this).find("td:eq(11)").text("");
			$(this).find("td:eq(22)").text("");
		}
	});
	return retval;
}
function getIndexEvid(evidType) {
	var index;
	if(evidType == 'EC')// 법인카드
		index = 1;
	if(evidType == 'ET')// 세금계산서
		index = 2;
	if(evidType == 'EI')// 계산서
		index = 3;
	if(evidType == 'ER')// 기타영수증
		index = 4;
	if(evidType == 'EA')// 개인경비
		index = 5;
	if(evidType == 'EO')// 기타
		index = 6;
	return index;
}
function activeButton(jrnlType,jrnlStatus) {
	if(jrnlStatus=="T" || jrnlStatus=="R") {
		label("#S_REMARK",false);
		disabled("#btnSave",true);
		disabled("#btnPrint,#btnPrintTrafficEx,#btnSubmit",false);
		disabled("#btnTemplate,#btnInsert,#btnUpdate,#btnDelete",false);
		disabled("#btnAdd1,#btnEdit1,#btnRemove1,#btnAdd2,#btnEdit2,#btnRemove2",false);

		if(jrnlStatus=="R") {
			label("#S_REMARK",true);
			disabled("#btnSave",true);
			disabled("#btnTemplate,#btnInsert,#btnUpdate,#btnDelete",false);
			disabled("#btnAdd1,#btnEdit1,#btnRemove1,#btnAdd2,#btnEdit2,#btnRemove2",false);
		}
	} else {
		label("#S_REMARK",true);
		disabled("#btnSave,#btnPrint,#btnPrintTrafficEx,#btnSubmit",true);
		disabled("#btnTemplate,#btnInsert,#btnUpdate,#btnDelete",true);
		disabled("#btnAdd1,#btnEdit1,#btnRemove1,#btnAdd2,#btnEdit2,#btnRemove2",true);
	}
	if($("#dataTable tbody tr").length==0) {
		disabled("#btnPrint,#btnPrintTrafficEx,#btnSubmit,#btnUpdate,#btnDelete,,#btnEdit1,#btnRemove1,#btnEdit2,#btnRemove2",true);
	}
	if(jrnlType=="C") {
		label("#S_REMARK",false);
		disabled("#btnSave",false);
		disabled("#btnTemplate,#btnInsert,#btnUpdate,#btnDelete",true);
		disabled("#btnAdd1,#btnEdit1,#btnRemove1,#btnAdd2,#btnEdit2,#btnRemove2",true);
	}
}

function Screen_Setup(){
	// Screen Message Load
	document.getElementById("S001").innerHTML = S001;
	document.getElementById("S002").innerHTML = S002;
	document.getElementById("S003").innerHTML = S003;
	document.getElementById("S004").innerHTML = S004;
	document.getElementById("S005").innerHTML = S005;
	
	document.getElementById("T001").innerHTML = T001;
	document.getElementById("T002").innerHTML = T002;
	document.getElementById("T003").innerHTML = T003;
	document.getElementById("T004").innerHTML = T004;
	document.getElementById("T005").innerHTML = T005;
	document.getElementById("T006").innerHTML = T006;
	document.getElementById("T007").innerHTML = T007;
	document.getElementById("T008").innerHTML = T008;
	document.getElementById("T009").innerHTML = T009;
	document.getElementById("T011").innerHTML = T011;
	document.getElementById("T013").innerHTML = T013;
	document.getElementById("T014").innerHTML = T014;
	document.getElementById("T015").innerHTML = T015;
	document.getElementById("T016").innerHTML = T016;
	document.getElementById("T017").innerHTML = T017;
	document.getElementById("T018").innerHTML = T018;
	document.getElementById("T019").innerHTML = T019;
	document.getElementById("T020").innerHTML = T020;
	document.getElementById("T021").innerHTML = T021;
	
	document.getElementById("B005").innerHTML = B005;
	document.getElementById("B006").innerHTML = B006;
	
	$("#lblTOTAL").html(S006);
	$("#lblEXPS_TYPE_ID").html(S007);
	$("#lblREMARK").html(S010);
	$("#lblREMARK6").html(S010);
	$("#lblCOMPANY_NAME").html(S011);
	$("#lblBUSI_NO").html(S012);
	$("#lblTOTAL_AMT").html(S013);
	$("#lblSUPPLY_AMT").html(S014);
	$("#lblVAT_AMT").html(S015);
	$("#lblREMARK5").html(S016);
	$("#lblDEPT_AMT2").html(S016);
	$("#lblPAY_METHOD_TYPE").html(S017);
	$("#lblPAY_METHOD_TYPE2").html(S017);
	$("#lblSUP_CODE2").html(S018);
	$("#lblDEBIT_TOTAL2").html(S021);
	$("#lblCREDIT_TOTAL2").html(S022);
	$("#lblACCT_CODE2").html(S023);
	$("#lblTRANS_DATE").html(S024);
	$("#lblTRANS_DATE2").html(S024);
	$("#lblPAY_DUE_DATE").html(S025);
	$("#lblPAY_DUE_DATE2").html(S025);
	$("#lblDEPT_CODE1").html(S026);
	$("#lblDEPT_CODE2").html(S026);
	$("#lblCHNL_CODE1").html(S027);
	$("#lblCHNL_CODE2").html(S027);
	$("#lblASST_CODE1").html(S028);
	$("#lblPRD_CODE2").html(S029);
	$("#lblAFS_TYPE2").html(S030);

	$("#lblREMARK7").html(T010);
	$("#lblREMARK8").html(T011);
	$("#lblREMARK9").html(T012);
	$("#lblVAT_TYPE2").html(T021);
	
	$("#btnTemplate").val(B001);
	$("#btnInsert").val(B002);
	$("#btnAdd1").val(B002);
	$("#btnAdd2").val(B002);
	$("#btnEdit1").val(B003);
	$("#btnEdit2").val(B003);
	$("#btnUpdate").val(B003);
	$("#btnDelete").val(B004);
	$("#btnRemove1").val(B004);
	$("#btnRemove2").val(B004);
}

function initEvent() {
// var action = "scn1.do?method=AA010";
	$("#divMain").css("height",$(window).height()-426);
/*
 * $.ajax({type: "post", url: action, data: params, dataType: "xml", cache:
 * false, success: function(result){
 * if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
 * return false; }
 * 
 * $("#EVID_TYPE").val(evidType);
 * 
 * $(result).find("DATA_LIST").find("ROW").each(function(){ if(evidType == "EO") {
 * $("#TRANS_DATE2").val($(this).find("TRANS_DATE").text());
 * $("#PAY_DUE_DATE2").val($(this).find("PAY_DUE_DATE").text());
 * $("#PAY_METHOD_TYPE2").val($(this).find("PAY_METHOD_TYPE").text());
 * $("#REMARK6").val($(this).find("REMARK").text()); } else{
 * $("#EXPS_TYPE_ID").val($(this).find("EXPS_TYPE_ID").text());
 * $("#TRANS_DATE").val($(this).find("TRANS_DATE").text());
 * $("#PAY_DUE_DATE").val($(this).find("PAY_DUE_DATE").text());
 * $("#PAY_METHOD_TYPE").val($(this).find("PAY_METHOD_TYPE").text());
 * 
 * $("#REMARK").val($(this).find("REMARK").text());
 * $("#lblREMARK1").html($(this).find("REMARK1_LABEL").text());
 * $("#REMARK1").val($(this).find("REMARK1").text());
 * $("#lblREMARK2").html($(this).find("REMARK2_LABEL").text());
 * $("#REMARK2").val($(this).find("REMARK2").text());
 * $("#lblREMARK3").html($(this).find("REMARK3_LABEL").text());
 * $("#REMARK3").val($(this).find("REMARK3").text());
 * $("#lblREMARK4").html($(this).find("REMARK4_LABEL").text());
 * $("#REMARK4").val($(this).find("REMARK4").text());
 * 
 * if(evidType=="EA") {
 * $("#VENDOR_CODE3").val($(this).find("VENDOR_CODE").text());
 * $("#VENDOR_NAME3").val($(this).find("VENDOR_NAME").text());
 * setRadioValue("USE_TYPE",$(this).find("USE_TYPE").text()); } else {
 * if(evidType=="EC") {
 * $("#VENDOR_CODE1").val($(this).find("VENDOR_CODE").text());
 * required("#COMPANY_NAME",($(this).find("CC_CARD_INPUT_YN").text()=="Y"));
 * required("#BUSI_NO",($(this).find("CC_CARD_INPUT_YN").text()=="Y")); } else
 * if(evidType=="ET" || evidType=="EI" || evidType=="ER") {
 * $("#VENDOR_CODE2").val($(this).find("VENDOR_CODE").text());
 * $("#VENDOR_NAME2").val($(this).find("VENDOR_NAME").text()); }
 * $("#COMPANY_NAME").val($(this).find("COMPANY_NAME").text());
 * $("#BUSI_NO").val($(this).find("BUSI_NO").text()); }
 * 
 * setNumber("#SUPPLY_AMT",$(this).find("SUPPLY_AMT").text());
 * setNumber("#VAT_AMT",$(this).find("VAT_AMT").text());
 * setNumber("#TOTAL_AMT",$(this).find("TOTAL_AMT").text());
 * 
 * $("#ASST_PURCHASE_YN").val($(this).find("ASST_PURCHASE_YN").text());
 * $("#ENTER_ANL_1").val($(this).find("ENTER_ANL_1").text());
 * $("#ENTER_ANL_3").val($(this).find("ENTER_ANL_3").text());
 * $("#ACCT_CODE").val($(this).find("ACCT_CODE").text());
 * 
 * display("#divDEPT_CODE1",($(this).find("ENTER_ANL_1").text()=="1"));
 * display("#divCHNL_CODE1",($(this).find("ENTER_ANL_3").text()=="1"));
 * display("#divASST_CODE1",($(this).find("ASST_PURCHASE_YN").text()=="Y"));
 * 
 * required("#DEPT_CODE1",($(this).find("ENTER_ANL_1").text()=="1"));
 * required("#CHNL_CODE1",($(this).find("ENTER_ANL_3").text()=="1"));
 * required("#ASST_CODE1",($(this).find("ASST_PURCHASE_YN").text()=="Y")); } });
 *  // if(evidType=="ET" || evidType=="EI" || evidType=="ER") { //
 * $("#TRANS_DATE,#PAY_DUE_DATE#,#BUSI_NO").blur(); // } else if(evidType=="EA") { //
 * $("#TRANS_DATE").blur(); // } else if(evidType=="EO") { //
 * $("#TRANS_DATE2,#PAY_DUE_DATE2#").blur(); // }
 * 
 * ///////////////////////////////////////////////////////////////////////////////////////
 * 
 * var tableId = "", tableRowId = ""; if(evidType == "EO") { tableId =
 * "#deptTable2", tableRowId = "deptTableRow2"; $(tableId+" tbody").empty();
 * 
 * if($(result).find("DETAIL_LIST").find("ROW").length==0) { $(tableId+"
 * tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td>"); } } }
 * });
 */
}
