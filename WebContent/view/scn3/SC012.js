//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	required("#SUBJECT,#CONTENTS",true);
	// EVENT
	$("#btnSave").click(Save);
	$("#btnCancel").click(Cancel);
	$("#btnAdd").click(Add);
	$("#btnRemove").click(Remove);
	// DEFAULT VALUE
    initEvent();
	setRadioValue("BLTN_CTGR","G");
	if(viewMode=="R" || viewMode=="E") {
		label("#BLTN_NO",true);
		Retrieve();
	} else  {
		display("#BLTN_NO",false);
	}
	date("#BLTN_DATE_FROM,#BLTN_DATE_TO");
	label("#WRITER,#WRITE_DATE",true);
	// Validate
});
function attachTableRow1_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#attachTable1',obj.rowIndex+1);
	bindData1(obj);
}
function attachTableRow2_onClick(obj) {
	if(obj==null) return;
	tableRowColor('#attachTable2',obj.rowIndex+1);
	bindData2(obj);
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

			///////////////////////////////////////////////////////////////////////////////////////

			$(result).find("DATA_LIST").find("ROW").each(function(n){
				$("#BLTN_NO").val(bltnNo);
				$("#WRITER").val($(this).find("WRITER").text());
				$("#WRITE_DATE").val($(this).find("WRITE_DATE").text());
				$("#BLTN_DATE_FROM").val($(this).find("BLTN_DATE_FROM").text());
				$("#BLTN_DATE_TO").val($(this).find("BLTN_DATE_FROM").text());
				$("#BLTN_CTGR").val($(this).find("BLTN_CTGR").text());
				$("#SUBJECT").val($(this).find("SUBJECT").text());
				$("#CONTENTS").val($(this).find("CONTENTS").text());
				
				$("#WRITE_DATE,#BLTN_DATE_FROM,#BLTN_DATE_TO").blur();
			});

			///////////////////////////////////////////////////////////////////////////////////////

			var j = 0;
			var tableId = "#attachTable2", tableRowId = "attachTableRow2";
			$(tableId+" tbody").empty();

			$(result).find("ATTACH_LIST").find("ROW").each(function(){
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
	            +"<td>"+$(this).find("FILE_NAME").text()+" ["+$(this).find("FILE_SIZE").text()+"]</td>"
	            +"<td class=hidden>"+$(this).find("FILE_ID").text()+"</td>"
	            +"<td class=hidden>"+$(this).find("FILE_NAME").text()+"</td>"
	            +"<td class=hidden>"+$(this).find("FILE_EXT").text()+"</td>"
	            +"<td class=hidden>"+$(this).find("FILE_SIZE").text()+"</td>"
	            +"<td class=hidden>"+$(this).find("FILE_PATH").text()+"</td>"
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);
			
			///////////////////////////////////////////////////////////////////////////////////////

			message(I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Save() {
	if(!requiredValidate("#formData2")) return;
	var alen = checkByteLen($("#filename").val());
	if(checkByteLen($("#filename").val())>200) {
		alert("첨부파일명의 길이가 200 byte 이상인 경우 첨부할수 없습니다.\n파일명을 확인 해 주세요! ");
		return;
	}

	var tableData1 = tableData("#attachTable1","1,2,3,4,5,6","2");

	var action = "scn3.do?method=SC012Save";
	var params = $("#formData2").serialize()
               + "&DATATABLE1="+tableData1
               + "&BLTN_NO="+bltnNo
               + "&viewMode="+viewMode
	           + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			goLink("scn3.do?method=SC010","&screenId=SC010&viewMode=&PAGE_NO="+pageNo+"&FIND_KIND="+findKind+"&FIND_WORD="+findWord);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(hr.responseText); //for debuging 
		}
	});
}
function Cancel() {
	goLink("scn3.do?method=SC010","&screenId=SC010");
}
function Add() {
	if(!$("#filename").val()) {
		alert("파일을 먼저 선택해 주세요!");
		$("#filename").focus();
		return
	}

	var alen = checkByteLen($("#filename").val());
	if(checkByteLen($("#filename").val())>200) {
		alert("첨부파일명의 길이가 200 byte 이상인 경우 첨부할수 없습니다.\n파일명을 확인 해 주세요! ");
		return;
	}

	var tableId = "#attachTable1", tableRowId = "attachTableRow1";
	var j = $(tableId+" tbody tr").length;

    $("#formData1").ajaxForm({
    	dataType: "xml",
		success: function(result){
	    	if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
	    		return false;
	    	}
	    	$(result).find("UPLOAD_PARAM").find("ROW").each(function(){
	    		$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
	    		+"<td>"+$(this).find("FILE_NAME").text()+" ["+$(this).find("FILE_SIZE").text()+"] </td>"
	            +"<td class=hidden>"+$(this).find("FILE_ID").text()+"</td>"
	            +"<td class=hidden>"+$(this).find("FILE_NAME").text()+"</td>"
	            +"<td class=hidden>"+$(this).find("FILE_EXT").text()+"</td>"
	            +"<td class=hidden>"+$(this).find("FILE_SIZE").text()+"</td>"
	            +"<td class=hidden>"+$(this).find("FILE_PATH").text()+"</td>"
	            +"</tr>");
	    	});
	    	$(tableId).trigger("update");
	    	tableRowEvent(tableId,tableRowId,1);

	    	var dataCnt = $(result).find("UPLOAD_PARAM").find("UPLOAD_PARAM_CNT").text();
	    	if(dataCnt==null || dataCnt=="") dataCnt = 0;
	    	message(dataCnt+" "+I002);

	    	$("#filename").replaceWith($("#filename").clone(true));
    	},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
    });

	var action = "scn3.do?method=SC012AttachAdd";
	var params = "&call=xml";

	$("#formData1").attr("action",action+params);
	$("#formData1").submit();
}
function Remove() {
	var rowIndex = $("#rowIndex").val();
	if(!rowIndex || !$("#FILE_ID").val()) {
		alert("파일을 먼저 선택해 주세요!");
		return
	}

	var tableId = $("#tableId").val();

	var action = "scn3.do?method=SC012AttachRemove";
	var params = "&FILE_ID="+$("#FILE_ID").val()
	           + "&FILE_EXT="+$("#FILE_EXT").val()
	           + "&call=xml";

	$.ajax({type: "get", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			$($(tableId+" tbody tr")[rowIndex]).remove();
			$("#rowIndex,#tableId,#FILE_ID,#FILE_EXT").val("");
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
	//		alert(xhr.responseText); //for debuging 
		}
	});
}
function bindData1(obj) {
	$("#rowIndex").val(obj.rowIndex);
	$("#tableId").val("#attachTable1");
	$("#FILE_ID").val(obj.cells[1].innerText);
	$("#FILE_NAME").val(obj.cells[2].innerText);
	$("#FILE_EXT").val(obj.cells[3].innerText);
	$("#FILE_SIZE").val(obj.cells[4].innerText);
	$("#FILE_PATH").val(obj.cells[5].innerText);
}
function bindData2(obj) {
	$("#rowIndex").val(obj.rowIndex);
	$("#tableId").val("#attachTable2");
	$("#FILE_ID").val(obj.cells[1].innerText);
	$("#FILE_NAME").val(obj.cells[2].innerText);
	$("#FILE_EXT").val(obj.cells[3].innerText);
	$("#FILE_SIZE").val(obj.cells[4].innerText);
	$("#FILE_PATH").val(obj.cells[5].innerText);
}
function initEvent() {
//	$("#fromTable1").css("height",$(window).height()-60);
}
