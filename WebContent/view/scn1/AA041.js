//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	$("#btnClose").click(Close);
	$("#btnRetrieve").click(Retrieve);
	// DEFAULT VALUE
	$('#evidTabs.tabs').tabs({ fxSlide: false, fxFade: true, fxSpeed: 'normal' });
	// GET PARAMETER
	Clear();
	number("#DEBIT_TOTAL2,#CREDIT_TOTAL2,#DEBIT_TOTAL3,#CREDIT_TOTAL3");
	var param = window.dialogArguments;
	$("#S_JRNL_NO").html(param.JRNL_NO);
	$("#S_JRNL_SEQ").html(param.JRNL_SEQ);
	$("#S_EVID_TYPE").html(param.EVID_TYPE);
	$("#SS_JRNL_NO").html(param.SS_JRNL_NO);

	display("#tab2",!(param.EVID_TYPE=="EO"));
	
	var index = getIndexEvid(param.EVID_TYPE);
	tabEvent(index);
	RetrieveDetail(param.JRNL_NO,param.JRNL_SEQ);
	if(index==6) {
		RetrieveSub2(param.JRNL_NO,param.JRNL_SEQ);
	} else {
		RetrieveSub1(param.JRNL_NO,param.JRNL_SEQ);
	}
	RetrieveDetailDrCr(param.JRNL_NO,param.JRNL_SEQ);
});
function deptTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#deptTable1',obj.rowIndex);
}
function deptTableRow2_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#deptTable2',obj.rowIndex);
}
function deptTableRow3_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#deptTable2',obj.rowIndex);
}
function tab_onClick(index) {
	if(index==1) {
		tabEvent(getIndexEvid($("#S_EVID_TYPE").html()));
	} else {
		totalDeptAmt3("#deptTable3");
	}
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	var jrnlNo  = $("#S_JRNL_NO").html();
	var jrnlSeq = $("#S_JRNL_SEQ").html();
	
	RetrieveDetail(jrnlNo,jrnlSeq);
	var index = getIndexEvid($("#S_EVID_TYPE").html());
	if(index==6) {
		RetrieveSub2(jrnlNo,jrnlSeq);
	} else {
		RetrieveSub1(jrnlNo,jrnlSeq);
	}
}
function RetrieveDetail(jrnlNo,jrnlSeq) {
	var action = "scn1.do?method=AA041RetrieveDetail";
	var params = "&JRNL_NO="+jrnlNo
	           + "&JRNL_SEQ="+jrnlSeq
		       + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			///////////////////////////////////////////////////////////////////////////////////////
			$(result).find("DATA_LIST").find("ROW").each(function(){
				$("#S_STATUS").html($(this).find("STATUS").text());
				$("#S_STATUS_NAME").html($(this).find("STATUS_NAME").text());
				$("#S_EVID_TYPE").html($(this).find("EVID_TYPE").text());
				$("#S_EVID_NAME").html($(this).find("EVID_NAME").text());

				if($("#S_EVID_TYPE").html()=="EO") {
	                $("#TRANS_DATE2").html($(this).find("TRANS_DATE").text());
	                $("#PAY_DUE_DATE2").html($(this).find("PAY_DUE_DATE").text());
	                $("#PAY_METHOD_TYPE2").html($(this).find("PAY_METHOD_NAME").text());
	                $("#REMARK6").html($(this).find("REMARK").text());
				} else {
	                $("#EXPS_TYPE_NAME").html($(this).find("EXPS_TYPE_NAME").text());
	                $("#TRANS_DATE").html($(this).find("TRANS_DATE").text());
	                $("#PAY_DUE_DATE").html($(this).find("PAY_DUE_DATE").text());
	                $("#PAY_METHOD_NAME").html($(this).find("PAY_METHOD_NAME").text());
	                
	                $("#REMARK").html($(this).find("REMARK").text());
	                $("#lblREMARK1").html($(this).find("REMARK1_LABEL").text());
	                $("#REMARK1").html($(this).find("REMARK1").text());
	                $("#lblREMARK2").html($(this).find("REMARK2_LABEL").text());
	                $("#REMARK2").html($(this).find("REMARK2").text());
	                $("#lblREMARK3").html($(this).find("REMARK3_LABEL").text());
	                $("#REMARK3").html($(this).find("REMARK3").text());
	                $("#lblREMARK4").html($(this).find("REMARK4_LABEL").text());
	                $("#REMARK4").html($(this).find("REMARK4").text());
	                
	                $("#VENDOR_CODE").html($(this).find("VENDOR_CODE").text());
	                $("#VENDOR_NAME").html($(this).find("VENDOR_NAME").text());
	                $("#COMPANY_NAME").html($(this).find("COMPANY_NAME").text());
	                $("#BUSI_NO").html($(this).find("BUSI_NO").text());
	                
	                $("#SUPPLY_AMT").html($(this).find("SUPPLY_AMT").text());
	                $("#VAT_AMT").html($(this).find("VAT_AMT").text());
	                $("#TOTAL_AMT").html($(this).find("TOTAL_AMT").text());
	                
	                if($(this).find("EVID_TYPE").text()=="EA") {
	                	var flag = $(this).find("USE_TYPE").text()=="CC";
	                	if(flag) {
	                		$("#lblBUSI_NO").html("신용카드번호");
	                	}
	                	display("#BUSI_NO",flag);
	                }
				}
			});
			///////////////////////////////////////////////////////////////////////////////////////
			message(I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
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
				+"<td align=center>"+j+"</td>"
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
			message(dataCnt+" "+I002);

			totalDeptAmt3("#deptTable3",4,9);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
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
				+"<td align=center>"+j+"</td>"
				+"<td align=center>"+$(this).find("PP").text()+"</td>"
                +"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
                +"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
                +"<td align=right>"+drAmt+"</td>"
                +"<td align=right>"+crAmt+"</td>"
                +"<td class=hidden>"+$(this).find("DEPT_CODE").text()+"</td>"
                +"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("CHNL_CODE").text()+"</td>"
                +"<td>"+$(this).find("CHNL_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("DRCR_TYPE").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);
			
			totalDeptAmt2(tableId);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}

function RetrieveDetailDrCr(jrnlNo,jrnlSeq) {
	var tableId = "#deptTable3", tableRowId = "deptTableRow3";
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
				+"<td align=center>"+j+"</td>"
				+"<td align=center>"+$(this).find("PP").text()+"</td>"
                +"<td align=center>"+$(this).find("ACCT_CODE").text()+"</td>"
                +"<td>"+$(this).find("ACCT_NAME").text()+"</td>"
                +"<td align=right>"+drAmt+"</td>"
                +"<td align=right>"+crAmt+"</td>"
                +"<td class=hidden>"+$(this).find("DEPT_CODE").text()+"</td>"
                +"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("CHNL_CODE").text()+"</td>"
                +"<td>"+$(this).find("CHNL_NAME").text()+"</td>"
                +"<td class=hidden>"+$(this).find("DRCR_TYPE").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			message(dataCnt+" "+I002);
			
			totalDeptAmt2(tableId);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function bindData(obj) {
}
function totalDeptAmt1(tableId) {
	var totalAmt = 0, supplyAmt = 0, vatAmt = 0;
	var tableRows = $(tableId+" tbody tr");
	tableRows.each(function(n){
		totalAmt += parseInt(tableRows[n].cells[7].innerHTML.replaceAll(",",""));
	});

	supplyAmt = Math.floor((totalAmt*10)/11);
	vatAmt    = totalAmt-supplyAmt;

	setNumber("#SUPPLY_AMT", supplyAmt);
	setNumber("#VAT_AMT",    vatAmt);
	setNumber("#TOTAL_AMT",  totalAmt);
}
function totalDeptAmt2(tableId) {
	var debitTotalAmt = 0, creditTotalAmt = 0;
	var tableRows = $(tableId+" tbody tr");
	tableRows.each(function(n){
		if(tableRows[n].cells[9].innerHTML=="D")
			debitTotalAmt  += parseInt(tableRows[n].cells[3].innerHTML.replaceAll(",",""));
		else if(tableRows[n].cells[9].innerHTML=="C")
			creditTotalAmt += parseInt(tableRows[n].cells[4].innerHTML.replaceAll(",",""));
	});

	setNumber("#DEBIT_TOTAL2",  debitTotalAmt);
	setNumber("#CREDIT_TOTAL2", creditTotalAmt);
}
function totalDeptAmt3(tableId) {
	var debitTotalAmt = 0, creditTotalAmt = 0;
	var tableRows = $(tableId+" tbody tr");
	tableRows.each(function(n){
		if(tableRows[n].cells[9].innerHTML=="D")
			debitTotalAmt  += parseInt(tableRows[n].cells[3].innerHTML.replaceAll(",",""));
		else if(tableRows[n].cells[9].innerHTML=="C")
			creditTotalAmt += parseInt(tableRows[n].cells[4].innerHTML.replaceAll(",",""));
	});

	setNumber("#DEBIT_TOTAL3",  debitTotalAmt);
	setNumber("#CREDIT_TOTAL3", creditTotalAmt);
}
function tabEvent(index) {
	if(index == 6) {
		$("#expsType1").css("display","none");
		$("#expsType2").css("display","block");
	} else {
		$("#expsType1").css("display","block");
		$("#expsType2").css("display","none");	
	}

	Clear();

	if(index == 1) {
		$("#EVID_TYPE").val("EC"); //법인카드
		$("#lblPAY_METHOD_TYPE").html("지급방법");
		$("#lblTRANS_DATE").html("승인일자");
		$("#lblVENDOR_CODE").html("미지급처");

		display("#PAY_DUE_DATE",false);
		display("#SUPPLY_AMT,#VAT_AMT,#PAY_METHOD_TYPE",true);
		display("#BUSI_NO",true);
	} else if(index == 2) {
		$("#EVID_TYPE").val("ET"); //세금계산서
		$("#lblTRANS_DATE").html("작성일자");
		$("#lblPAY_DUE_DATE").html("지급요청일자");
		$("#lblPAY_METHOD_TYPE").html("지급방법");
		$("#lblVENDOR_CODE").html("거래처");

		display("#PAY_DUE_DATE,#PAY_METHOD_TYPE",true);
		display("#SUPPLY_AMT,#VAT_AMT",true);
		display("#BUSI_NO",true);
	} else if(index == 3) {
		$("#EVID_TYPE").val("EI"); //계산서
		$("#lblTRANS_DATE").html("작성일자");
		$("#lblPAY_DUE_DATE").html("지급요청일자");
		$("#lblPAY_METHOD_TYPE").html("지급방법");

		display("#PAY_DUE_DATE,#PAY_METHOD_TYPE",true);
		display("#SUPPLY_AMT,#VAT_AMT",false);
		display("#BUSI_NO",true);
	} else if(index == 4) {
		$("#EVID_TYPE").val("ER"); //기타영수증
		$("#lblPAY_DUE_DATE").html("지급요청일자");
		$("#lblPAY_METHOD_TYPE").html("지급방법");

		display("#PAY_DUE_DATE,#PAY_METHOD_TYPE",true);
		display("#SUPPLY_AMT,#VAT_AMT",false);
		display("#BUSI_NO",true);
	} else if(index == 5) {
		$("#EVID_TYPE").val("EA"); //개인경비
		$("#lblPAY_METHOD_TYPE").html("지급방법");
		$("#lblVENDOR_CODE").html("사원");
		$("#lblCOMPANY_NAME").html("사용구분");

		display("#PAY_DUE_DATE",false);
		display("#SUPPLY_AMT,#VAT_AMT",false);
		display("#BUSI_NO",false);
	} else if(index == 6) {
		$("#EVID_TYPE").val("EO"); //기타
	}
}
function getIndexEvid(evidType) {
	var index;
	if(evidType == 'EC')//법인카드
		index = 1;
	if(evidType == 'ET')//세금계산서
		index = 2;
	if(evidType == 'EI')//계산서
		index = 3;
	if(evidType == 'ER')//기타영수증
		index = 4;
	if(evidType == 'EA')//개인경비
		index = 5;
	if(evidType == 'EO')//기타
		index = 6;
	return index;
}
function Clear() {
	$("#lblTRANS_DATE").html("승인일자");
	$("#lblVENDOR_CODE").html("미지급처");
	$("#lblCOMPANY_NAME").html("거래처명");
	$("#lblBUSI_NO").html("사업자번호");
	$("#lblSUPPLY_AMT").html("공급가액");
	$("#lblVAT_AMT").html("세액");

	$("#lblREMARK1,#lblREMARK2,#lblREMARK3,#lblREMARK4").html("");
	$("#REMARK1,#REMARK2,#REMARK3,#REMARK4").html("");

	display("#PAY_DUE_DATE,#PAY_METHOD_TYPE",false);
	display("#COMPANY_NAME,#BUSI_NO,#SUPPLY_AMT,#VAT_AMT",true);
}
function initEvent() {
	
}
