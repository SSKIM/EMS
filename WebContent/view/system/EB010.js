//EVENT////////////////////////////////////////////////////////////////////////////////////////////
var pwlength = "";
var pwcomplx = "";


$(document).ready(function(){
	// READONLY MODE
	disabled("#btnAdd,#btnCancel,#btnChangePwd",true);
	readonly("#USER_ID",true);
    // MANDATORY
	required("#BUSI_UNIT_TYPE,#LEDGER_TYPE,#DEPT_CODE,#USER_ID,#USER_NAME,#USER_TYPE,#LAN_TYPE",true);
	// EVENT
	$("#btnRetrieve").click(Retrieve);
    $("#btnAdd").click(Insert);
    $("#btnUpdate").click(Update);
    $("#btnDelete").click(Delete);
	$("#btnNew").click(New);
	$("#btnCancel").click(Cancel);
	$("#btnChangePwd").click(Change);
	$("#USER_ID2,#USER_NAME2").keyup(function() {
		if(event.keyCode == 13) Retrieve();
	});
	$("#btnPopupAcct").click(PopupDomain);
	// ETC
	$("#dataTable1").tablesorter();
	initEvent();
	loadsecuritypolicy();
	// DEFAULT VALUE
	setRadioValue("STATUS","Y");
	setRadioValue("L_STATUS","Y");
	setRadioValue("PWD_CHNG_TYPE","N");
	date("#LAST_LOG_DT,#LAST_PWC_DT");
});
function loadsecuritypolicy() {

	var action = "system.do?method=EB010PwSecurity";

	$.ajax({type: "post", url: action, dataType: "xml", cache: false,
		success: function(result){
		if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
			return false;
		}
		$(result).find("DATA_SET").find("ROW").each(function(){
			
			if($(this).find("CODE_ID").text() == "SEC_3")
			{
				pwlength= $(this).find("ETC1").text();
				
			}
			else if($(this).find("CODE_ID").text() == "SEC_5")
			{
				pwcomplx = $(this).find("ETC1").text();
			}
		});
		message(I003);
	},
	error: function(xhr, ajaxOptions, thrownError){
		alert(xhr.statusText); 
//		alert(xhr.responseText); //for debuging 
	}
});
}
function dataTable1Row_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function PopupDomain() {
	var param = new Object();
	param.DOMAIN_USER = $("#DOMAIN_USER").val();
	param.DOMAIN_NAME = $("#DOMAIN_NAME").val();

	var url   = "system.do?method=EB011&screenId=EB011&screenIdRef=EB010&refVal=&isPopup=true&menuName="+getString2("AD User List");
	var style = "dialogWidth:960px;dialogHeight:600px;status:no;scroll:no";

	var retVal = window.showModalDialog(url, param, style);
	if(retVal != null) {

		$("#DOMAIN_USER").val(retVal.DOMAIN_USER);
		$("#DOMAIN_NAME").val(retVal.DOMAIN_NAME);
	}
}


function Retrieve(key1) {
	Cancel();
	var tableId = "#dataTable1", dataRow = "dataRow_";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "system.do?method=EB010Retrieve";
	var data   = "&USER_ID="+$("#USER_ID2").val()
               + "&USER_NAME="+getString("#USER_NAME2")
               + "&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			$(result).find("DATA_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+dataRow+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("USER_ID").text()+"</td>"
                +"<td>"+$(this).find("USER_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("USER_TYPE").text()+"</td>"
                +"<td>"+$(this).find("EMPL_ID").text()+"</td>"
                +"<td>"+$(this).find("TEL_NO").text()+"</td>"
                +"<td>"+$(this).find("HP_NO").text()+"</td>"
                +"<td>"+$(this).find("EMAIL").text()+"</td>"
                +"<td align=center>"+$(this).find("DEPT_CODE").text()+"</td>"
                +"<td>"+$(this).find("DEPT_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("BUSI_UNIT_TYPE").text()+"</td>"
                +"<td align=center>"+$(this).find("LEDGER_TYPE").text()+"</td>"
				+"<td align=center>"+$(this).find("STATUS").text()+"</td>"
				+"<td align=center>"+$(this).find("PWD_CHNG_TYPE").text()+"</td>"
				+"<td align=center>"+$(this).find("LOGIN_FAIL_CNT").text()+"</td>"
				+"<td align=center>"+$(this).find("LAN_TYPE").text()+"</td>"
				+"<td align=center>"+$(this).find("DOMAINUSER").text()+"</td>"
				+"<td align=center>"+$(this).find("DOMAINNAME").text()+"</td>"
				+"<td align=center>"+$(this).find("LOCK_STATUS").text()+"</td>"
				+"<td align=center>"+$(this).find("LAST_LOGON_DATE").text()+"</td>"
				+"<td align=center>"+$(this).find("LAST_PASSWORD_CHANGE_DATE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("INS_DATE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("INS_USER").text()+"</td>"
                +"<td class=hidden>"+$(this).find("UPD_DATE").text()+"</td>"
                +"<td class=hidden>"+$(this).find("UPD_USER").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,"dataTable1Row",1);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			if(dataCnt>0) {
				var index = tableRowIndex(tableId,key1);
				tableRowColor(tableId,index);
				bindData(tableRowObj(tableId,index));
			}

			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Insert() {
	if(!requiredValidate("#formData")) return;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EB010Insert&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("USER_ID").text();
			Retrieve(key1);
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Update() {
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!requiredValidate("#formData")) return false;
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EB010Update&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			var key1 = $(result).find("DATA").find("dataPK").find("USER_ID").text();
			Retrieve(key1);
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Delete() {
	if($("#rowIndex").val()=="") { alert(W003); return false; }
	if(!window.confirm(W002)) { 
	    return false;
	}
	$("#btnRetrieve").focus();

    var action = "system.do?method=EB010Delete&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			Retrieve();
			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Change() {	
	var password = $("#PASSWORD").val().trim();
	if(password=="") {
		alert("비밀번호를 입력해 주세요!");
		$("#PASSWORD").focus();
		return false;
	}
	if(password.length < pwlength)
	{
		alert("최소 "+pwlength+"자리여야 합니다.");
		$("#PASSWORD").focus();
		return false;
	}
	if(pwcomplx == "Y")
	{
		var symbolSize = "";
		
		if ( password.match(/[0-9]/) )
			 symbolSize +=10;
		if ( password.match(/[a-z]/) )
			 symbolSize +=26;
		if ( password.match(/[A-Z]/) )
			symbolSize +=26;
		if ( password.match(/[^a-zA-Z0-9]/) )
			symbolSize +=31;
		
		natLog = Math.log( Math.pow(symbolSize, password.length) );
		var score = natLog / Math.LN2;
		
		if (score < 40 )
		{
			alert("비밀번호가 Complexity 요건을 만족하지 않습니다.!");
			$("#PASSWORD").focus();
			return false;
		}
	}
	$("#btnRetrieve").focus();
	//-----------------------------------------------------
    var action = "system.do?method=EB010Change&call=xml";
    var data   = $("#formData").serialize();

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			message(I003);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function New() {
	Clear();
	disabled("#btnAdd,#btnCancel",false);
	disabled("#btnNew,#btnUpdate,#btnDelete",true);
	readonly("#USER_ID",false);
	$("#USER_ID").focus();
}
function Cancel() {
	Clear();
	// READONLY MODE
	disabled("#btnAdd,#btnCancel,#btnChangePwd",true);
	disabled("#btnNew,#btnUpdate,#btnDelete",false);
	readonly("#USER_ID",true);
    // MANDATORY
	required("#USER_ID,#USER_NAME,#USER_TYPE",true);
	// RE-BIND DATA
	var rowIndex = $("#rowIndex").val();
	if(rowIndex!="" && !isNaN(rowIndex) && $("#dataTable1 tbody tr").length>0) {
		bindData(tableRowObj("#dataTable1",rowIndex));
	}
}
function bindData(obj) {
	$("#rowIndex").val(obj.cells[0].innerHTML);
	if(!$("#btnNew").attr("disabled")) {
		$("#USER_ID").val(obj.cells[1].innerHTML);
	}
	$("#USER_NAME").val(obj.cells[2].innerHTML);
	$("#USER_TYPE").val(obj.cells[3].innerHTML);
	$("#EMPL_ID").val(obj.cells[4].innerHTML);
	$("#TEL_NO").val(obj.cells[5].innerHTML);
	$("#HP_NO").val(obj.cells[6].innerHTML);
	$("#EMAIL").val(obj.cells[7].innerHTML);
	$("#DEPT_CODE").val(obj.cells[8].innerHTML);
	$("#BUSI_UNIT_TYPE").val(obj.cells[10].innerHTML);
	$("#LEDGER_TYPE").val(obj.cells[11].innerHTML);
	setRadioValue("STATUS",obj.cells[12].innerHTML);
	setRadioValue("PWD_CHNG_TYPE",obj.cells[13].innerHTML);
	$("#LOGIN_FAIL_CNT").val(obj.cells[14].innerHTML);
	$("#LAN_TYPE").val(obj.cells[15].innerHTML);
	$("#DOMAIN_USER").val(obj.cells[16].innerHTML);
	$("#DOMAIN_NAME").val(obj.cells[17].innerHTML);
	setRadioValue("L_STATUS",obj.cells[18].innerHTML);
	$("#LAST_LOG_DT").val(obj.cells[19].innerHTML);
	$("#LAST_PWC_DT").val(obj.cells[20].innerHTML);
	$("#INS_DATE").html(obj.cells[21].innerHTML);
	$("#INS_USER").html(obj.cells[22].innerHTML);
	$("#UPD_DATE").html(obj.cells[23].innerHTML);
	$("#UPD_USER").html(obj.cells[24].innerHTML);
	$("#btnChangePwd").removeAttr("disabled");
}
function Clear() {
	$('#formData').clearForm();
	//$(":input").not(':button, :submit, :reset, :hidden, :radio').val("");
	$("#USER_TYPE,#DEPT_CODE,#BUSI_UNIT_TYPE,#LEDGER_TYPE,LAN_TYPE").val("");
	setRadioValue("STATUS","Y");
	setRadioValue("PWD_CHNG_TYPE","N");
	requiredClear();
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-308);
}