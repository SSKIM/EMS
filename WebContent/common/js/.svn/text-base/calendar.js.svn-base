function getLastDay(year, month) {
    var date = new Date(year, month, 0);
    return date.getDate();
}

function getStartWeek(year, month, day) {
    var date = new Date(year, month-1, day);
    return date.getDay();
}

function setLPad(str,len,val) {
    var retVal = str+"";
    if(retVal.length<len) retVal = val+retVal;
    return retVal;
}