//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	// ETC
//    $("#dataTable").tablesorter();
	initEvent();
	// DEFAULT VALUE
});
function dataTableRow1_onClick(obj) {
	tableRowColor('#dataTable1',obj.rowIndex);
//	bindData(obj);
}
function checkRow1_onClick(obj) {
	var row = obj.parent().parent()[0];
	var chk = obj.attr("checked");
	var val = obj.val();
	var v   = val.split("^");
	Update(v[0],v[1],chk);
}

//METHOD///////////////////////////////////////////////////////////////////////////////////////////

function Retrieve() {
	var tableId = "", tableRowId = "";
	$("#btnRetrieve").blur();

	var j = 0, dataCnt = 0;
	var action = "system.do?method=EC020Retrieve";
	var data   = "&viewMode=&call=xml";

	$.ajax({type: "post", url: action, data: data, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}

			///////////////////////////////////////////////////////////////////////////////////////

			tableId = "#dataTable1", tableRowId = "dataTableRow1";
			$(tableId+" tbody").empty();

			$(tableId+" thead tr").empty().append("<th>순번</th><th>사용자ID</th><th>사용자명</th>");
			$(result).find("AUTH_LIST").find("ROW").each(function(){
				$(tableId+" thead tr").append("<th>"+$(this).find("AUTH_NAME").text()+"</td>");
			});

			///////////////////////////////////////////////////////////////////////////////////////

			if($(result).find("DATA_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}
			$(result).find("DATA_LIST").find("ROW").each(function(n){
				var cols   = "";
				var userId = $(this).find("USER_ID").text();
				var obj1   = $(this);
				$(result).find("AUTH_LIST").find("ROW").each(function(k){
					var checked = (obj1.find($(this).find("AUTH_ID").text()).text()>0) ? "checked" : "";
					cols += "<td align=center><input type='checkbox' name='chk' value='"+userId+"^"+$(this).find("AUTH_ID").text()+"' "+checked+" /></td>";
				});
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("USER_ID").text()+"</td>"
                +"<td>"+$(this).find("USER_NAME").text()+"</td>"
                +cols
                +"</tr>");
			});
			$(tableId).trigger("update");
			tableRowEvent(tableId,tableRowId,1);
			checkRowEvent(tableId,"checkRow1");

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;

			///////////////////////////////////////////////////////////////////////////////////////
			
			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Update(userId,authId,value) {
    var action = "system.do?method=EC020Save";
    var params = "&USER_ID="+userId
               + "&AUTH_ID="+authId
               + "&VALUE="+value
               + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
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
function initEvent() {
	$("#divMain").css("height",$(window).height()-100);
}