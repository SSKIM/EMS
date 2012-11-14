
function popupDetail(jrnlNo,jrnlSeq,evidType) {
	if(jrnlNo == "") return;

	var param = new Object();
	param.JRNL_NO   = jrnlNo;
	param.JRNL_SEQ  = jrnlSeq;
	param.EVID_TYPE = evidType;

	var url   = "scn1.do?method=AA041&screenId=AA041&screenIdRef=AA040&refVal=&isPopup=true&menuName="+getString2("전표상세정보");
	var style = "dialogWidth:960px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
//	if(retVal != null) {
//	}
}

function popupDetailByRef(refNo,evidType) {
	if(refNo == "") return;

	var ref = refNo.split('-');
	var param = new Object();
	param.JRNL_NO   = ref[0];
	param.JRNL_SEQ  = ref[1];
	param.EVID_TYPE = evidType;

	var url   = "scn1.do?method=AA041&screenId=AA041&screenIdRef=AA040&refVal=&isPopup=true&menuName="+getString2("전표상세정보");
	var style = "dialogWidth:960px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
//	if(retVal != null) {
//	}
}

function popupDetail2(jrnlNo,jrnlSeq,evidType) {
	if(jrnlNo == "") return;

	var param = new Object();
	param.JRNL_NO   = jrnlNo;
	param.JRNL_SEQ  = jrnlSeq;
	param.EVID_TYPE = evidType;

	var url   = "scn1.do?method=AB023&screenId=AB023&screenIdRef=AB020&refVal=&isPopup=true&menuName="+getString2("전표상세정보");
	var style = "dialogWidth:960px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
//	if(retVal != null) {
//	}
}

function popupBond() {
	var param = new Object();
//	param.JRNL_NO   = jrnlNo;

	var url   = "scn1.do?method=AB081&screenId=AB081&screenIdRef=AB080&refVal=&isPopup=true&menuName="+getString2("채권거래내역 업로드");
	var style = "dialogWidth:960px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
//	if(retVal != null) {
//	}
}
function popupAccounts(screenId, objCode, objName) {
	var param = new Object();
	param.ACCT_CODE = $(objCode).val();
	param.ACCT_NAME = $(objName).val();
	
	var url   = "popup.do?method=CP050&screenId=CP050&screenIdRef="+screenId+"&refVal=&isPopup=true";
	var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url,param,style);
	if(retVal != null) {
		$(objCode).val(retVal.ACCT_CODE);
		$(objName).val(retVal.ACCT_NAME);
	}
}