//EVENT////////////////////////////////////////////////////////////////////////////////////////////
var pwlength = "";
var pwcomplx = "";

$(document).ready(function(){
	$("#btnSave").click(Save);
	$("#btnClose").click(Close);
	// GET PARAMETER
	loadsecuritypolicy();
	var param = window.dialogArguments;
	$("#USER_ID").html(param.USER_ID);
});

//METHOD///////////////////////////////////////////////////////////////////////////////////////////
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
function Save() {
	var password = $("#PASSWORD_NEW").val().trim();
	
	$("#spnPASSWORD,#spnPASSWORD_NEW,#spnPASSWORD_REP").empty();
	if($("#PASSWORD").val().trim()=="") {
		$("#spnPASSWORD").html("*"+$("#lblPASSWORD").text()+"을 입력해주세요!");
		$("#PASSWORD").focus();
		return;
	}
	if($("#PASSWORD_NEW").val().trim()=="") {
		$("#spnPASSWORD_NEW").html("*"+$("#lblPASSWORD_NEW").text()+"을 입력해주세요!");
		$("#PASSWORD_NEW").focus();
		return;
	}
	if(checkByteLen($("#PASSWORD_NEW").val())< pwlength) {
		$("#spnPASSWORD_NEW").html("*비밀번호는 "+pwlength+"자리 이상 입력해주세요!");
		$("#PASSWORD_NEW").focus();
		return;
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
	if($("#PASSWORD_REP").val().trim()=="") {
		$("#spnPASSWORD_REP").html("*"+$("#lblPASSWORD_REP").text()+"을 입력해주세요!");
		$("#PASSWORD_REP").focus();
		return;
	}
	if($("#PASSWORD_NEW").val().trim()!=$("#PASSWORD_REP").val().trim()) {
		$("#spnPASSWORD_REP").html("*신규와 재입력 비밀번호가 불일치 합니다!");
		$("#PASSWORD_REP").focus();
		return;
	}
	
    var action = "index.do?method=chngPwdSave";
    var data   = "&USER_ID="+$("#USER_ID").text()
               + "&PASSWORD="+$("#PASSWORD").val()
               + "&PASSWORD_NEW="+$("#PASSWORD_NEW").val()
               + "&call=xml"
               ;

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			var msg = $(result).find("RETURN_MESSAGE").text();
			if(msg == '') {
				alert(I003);

				var returnParam = new Object();
				returnParam.RESULT = "OK";

				window.returnValue = returnParam;
				Close();
			} else {
				alert(msg);
			}
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}