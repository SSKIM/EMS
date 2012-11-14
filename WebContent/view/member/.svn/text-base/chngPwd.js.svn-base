//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	$("#btnSave").click(Save);
	$("#btnClose").click(Close);
	// GET PARAMETER
	var param = window.dialogArguments;
	$("#USER_ID").html(param.USER_ID);
});

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Save() {
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
	if(checkByteLen($("#PASSWORD_NEW").val())<5) {
		$("#spnPASSWORD_NEW").html("*비밀번호는 5자리 이상 입력해주세요!");
		$("#PASSWORD_NEW").focus();
		return;
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