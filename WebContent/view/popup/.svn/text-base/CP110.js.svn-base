//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	$("#btnClose").click(Close);
	// DEFAULT VALUE
    initEvent();
    Retrieve();
	// Validate
});
function attachTableRow1_onClick(obj) {
	tableRowColor('#attachTable1',obj.rowIndex);
//	bindData(obj);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	var action = "scn3.do?method=SC011Retrieve";
	var params = "&BLTN_NO="+bltnNo
	           + "&viewMode=&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			$(result).find("DATA_LIST").find("ROW").each(function(n){
				$("#BLTN_NO").html(bltnNo);
				$("#WRITER").html($(this).find("WRITER").text());
				$("#WRITE_DATE").html($(this).find("WRITE_DATE").text());
				$("#BLTN_DATE_FROM").html($(this).find("BLTN_DATE_FROM").text());
				$("#BLTN_DATE_TO").html($(this).find("BLTN_DATE_TO").text());
				$("#BLTN_CTGR").html($(this).find("BLTN_CTGR").text());
				$("#SUBJECT").html($(this).find("SUBJECT").text());
				$("#CONTENTS").val($(this).find("CONTENTS").text());
			});

			var j = 0;
			var tableId = "#attachTable1", tableRowId = "attachTableRow1";
			$(tableId+" tbody").empty();

			$(result).find("ATTACH_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
	            +"<td><a href=\"javascript:goView('"+$(this).find("FILE_ID").text()+"."+$(this).find("FILE_EXT").text()+"','"+$(this).find("FILE_NAME").text()+"')\">"+$(this).find("FILE_NAME").text()+" ["+$(this).find("FILE_SIZE").text()+"] </a></td>"
	            +"<td class=hidden>"+$(this).find("FILE_ID").text()+"</td>"
	            +"<td class=hidden>"+$(this).find("FILE_NAME").text()+"</td>"
	            +"<td class=hidden>"+$(this).find("FILE_EXT").text()+"</td>"
	            +"<td class=hidden>"+$(this).find("FILE_SIZE").text()+"</td>"
	            +"<td class=hidden>"+$(this).find("FILE_PATH").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);

			message(I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function goView(fileId,fileName) {
	var action = "index.do?method=fileDownload";
	var params = "&FILE_ID="+fileId+"&FILE_NAME="+getString2(fileName);

	backgroundp.location.href = action+params;
}
function initEvent() {
}
