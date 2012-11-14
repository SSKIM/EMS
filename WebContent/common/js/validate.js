
/**
 * 사업자등록번호 유효성 검사
 * @param busiNo
 * @return
 */
function vaildBusiNo2(busiNo) { 
	var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1); 
	var tmpBizID, i, chkSum=0, c2, remander; 
	busiNo = busiNo.replace(/-/gi,''); 

	for (i=0; i<=7; i++)
		chkSum += checkID[i] * busiNo.charAt(i);

	c2 = "0" + (checkID[8] * busiNo.charAt(8));
	c2 = c2.substring(c2.length - 2, c2.length);
	chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1)); 
	remander = (10 - (chkSum % 10)) % 10 ;

	if (Math.floor(busiNo.charAt(9)) == remander)
		return true ; // OK! 

    return false; 
}
function vaildBusiNo(busiNo) {
	if(busiNo==null || busiNo=="")
		return true;

	busiNo = busiNo.replaceAll("-","");
	if (busiNo.length != 10) {
	   //alert("사업자등록번호가 잘못되었습니다.");
	   return false;
	}

	var sumMod = 0;
	sumMod += parseInt(busiNo.substring(0,1));
	sumMod += parseInt(busiNo.substring(1,2)) * 3 % 10;
	sumMod += parseInt(busiNo.substring(2,3)) * 7 % 10;
	sumMod += parseInt(busiNo.substring(3,4)) * 1 % 10;
	sumMod += parseInt(busiNo.substring(4,5)) * 3 % 10;
	sumMod += parseInt(busiNo.substring(5,6)) * 7 % 10;
	sumMod += parseInt(busiNo.substring(6,7)) * 1 % 10;
	sumMod += parseInt(busiNo.substring(7,8)) * 3 % 10;
	sumMod += Math.floor(parseInt(busiNo.substring(8,9)) * 5 / 10);
	sumMod += parseInt(busiNo.substring(8,9)) * 5 % 10;
	sumMod += parseInt(busiNo.substring(9,10));

	if (sumMod % 10 != 0) {
	   //alert("사업자등록번호가 잘못되었습니다.");
	   return false;
	}

	return true;
}
/**
 * 날짜 유효성 검사
 * @param date
 * @return
 */
function validDate(date) {
	if(date==null||date==""||date.length!=10) {
		return false;
	}
	var dat1 = date.split("-");
	return validDate2(dat1[0], dat1[1], dat1[2]);
}
/**
 * 날짜 유효성 검사
 * @param yyyy
 * @param mm
 * @param dd
 * @return
 */
function validDate2(yyyy, mm, dd) {
	var m = parseInt(mm,10) - 1;
    var d = parseInt(dd,10);

    var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
    	end[1] = 29;
    }

    return (d >= 1 && d <= end[m]);
}

/**
 * 시작일자와 종료일자 간의 유효성 검사
 * @param fromDate
 * @param toDate
 * @return
 */
function validDateFromTo(fromDate,toDate) {
    var v1 = fromDate.split("-");
    var v2 = toDate.split("-");

    var a1 = new Date(v1[0],v1[1],v1[2]).getTime();
    var a2 = new Date(v2[0],v2[1],v2[2]).getTime();

   	return (a1<a2||a2 == '');
}
/**
 * 특수문자 확인
 * @param obj
 * @returns {Boolean}
 */
function checkSpecialChar(objId) {
	var retVal = "";
	var re = /[!@\<>^&\\\']/gi;
//	var re = /[~!@\#$%<>^&*\\_\']/gi;
	$(objId).each(function() {
		var strVal = $(this).val();
		if(re.test(strVal)) {
			if(retVal=="") {
				retVal += $("#lbl"+$(this).attr("id")).text();
			} else {
				retVal += ","+$("#lbl"+$(this).attr("id")).text();	
			}
//	    	$(this).val(strVal.replace(re,""));
	    	$(this).focus();
		}
	});
	
	if(retVal.length>0) {
    	alert("특수문자는 입력하실수 없습니다.\n"+retVal);
    	return false;
	} else {
		return true;
	}
}
