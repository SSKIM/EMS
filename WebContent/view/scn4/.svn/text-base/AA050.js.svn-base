//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
	disabled("#btnDelete",true);
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	$("#btnDelete").click(Delete);
	// DEFAULT VALUE
    initEvent();
	$("#dataTable1").tablesorter();
	date("#S_WRITE_DATE_FROM,#S_WRITE_DATE_TO");
	// Validate
});
function dataTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#dataTable1',obj.rowIndex);
	bindData(obj);
}
function dataTableRow1_onDblClick(obj) {
	if(obj==null) return;
	var jrnlNo = obj.cells[2].innerHTML;
	if(jrnlNo!='') {
		goLink('scn1.do?method=AA010','menuId=1101&screenId=AA010&JRNL_NO='+jrnlNo,'F','전표 작성');
		//top.document.all.fbody.src = "scn1.do?menuId=1100&menuSubId=1101&screenId=AA010&JRNL_NO="+jrnlNo;
	}
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////
	
function Retrieve() {
	var tableId = "#dataTable1", tableRowId = "dataTableRow1";
	$(tableId+" tbody").empty();

	var j = 0;
	var action = "scn1.do?method=AA050Retrieve";
	var params = "&JRNL_NO="+$("#S_JRNL_NO").val()
			   + "&WRITE_DATE_FROM="+$("#S_WRITE_DATE_FROM").val().replaceAll("-","")
			   + "&WRITE_DATE_TO="+$("#S_WRITE_DATE_TO").val().replaceAll("-","")
	           + "&call=xml";

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
				+"<td align=center>"+j+"</td>"
				+"<td align=center><input type='checkbox' name='chk' value='"+$(this).find("JRNL_NO").text()+"'/></td>"
                +"<td align=center>"+$(this).find("JRNL_NO").text()+"</td>"
                +"<td align=center>"+$(this).find("JRNL_TYPE_NAME").text()+"</td>"
                +"<td align=center>"+$(this).find("WRITE_DATE").text()+"</td>"
                +"<td>"+$(this).find("WRITE_USER_NAME").text()+"</td>"
                +"<td>"+$(this).find("REJECT_USER_NAME").text()+"</td>"
                +"<td>"+$(this).find("REMARK").text()+"</td>"
                +"<td align=center>"+$(this).find("REJECT_DATE").text()+"</td>"
                +"<td>"+$(this).find("REJECT_REASON").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,3);

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;
			$("div.status").html(dataCnt+" "+I002);

			if(dataCnt>0) {
				disabled("#btnDelete",false);
			}
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Delete() {
	if($("input:checkbox[name=chk]:checked").length==0) {
		alert("처리할 대상을 먼저 선택해 주세요!");
		return;
	}
	if(!window.confirm(W002)) {
	    return false;
	}

	var data1 = checkData("dataTable1","chk");
	var action = "scn1.do?method=AA050Delete";
	var params = "&DATATABLE="+data1
	           + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			Retrieve();
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function bindData(obj) {
	$("#JRNL_NO").html(obj.cells[1].innerHTML);
	$("#REJECT_DATE").html(obj.cells[6].innerHTML);
	$("#REJECT_USER_NAME").html(obj.cells[5].innerHTML);
	$("#REJECT_REASON").val(obj.cells[7].innerHTML);
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-170);
}
