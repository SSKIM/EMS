//EVENT////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function(){
	// READONLY MODE
    // MANDATORY
	// EVENT
	$("#btnRetrieve").click(Retrieve);
	// DEFAULT VALUE
//  $("#dataTable").tablesorter();
    initEvent();
	// Validate
});
function dataTableRow1_onClick(obj) {
//	tableRowColor('#dataTable1',obj.rowIndex);
//	bindData1(obj);
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
	var action = "scn3.do?method=SA030Retrieve";
	var params = "&EXPS_TYPE_NAME1="+getString("#S_EXPS_TYPE_NAME1")
	           + "&EXPS_TYPE_NAME2="+getString("#S_EXPS_TYPE_NAME2")
	           + "&call=xml";

	$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
		success: function(result){
			if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
				return false;
			}
			
			///////////////////////////////////////////////////////////////////////////////////////

			tableId = "#dataTable1", tableRowId = "dataTableRow1";
			$(tableId+" tbody").empty();

			$(tableId+" thead tr").empty().append("<th>순번</th><th>비용구분ID</th><th>비용구분명</th>");
			$(result).find("DEPT_LIST").find("ROW").each(function(){
				$(tableId+" thead tr").append("<th>"+$(this).find("DEPT_NAME").text()+"</td>");
			});
			
			///////////////////////////////////////////////////////////////////////////////////////

			if($(result).find("DATA_LIST").find("ROW").length==0) { 
				$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
			}
			$(result).find("DATA_LIST").find("ROW").each(function(n){
				var cols = "";
				var expsTypeId = $(this).find("EXPS_TYPE_ID").text();
				var obj1 = $(this);
				$(result).find("DEPT_LIST").find("ROW").each(function(k){
					var checked = (obj1.find("COL_"+$(this).find("DEPT_CODE").text()).text()>0) ? "checked" : "";
					cols += "<td align=center><input type='checkbox' name='chk' value='"+expsTypeId+"^"+$(this).find("DEPT_CODE").text()+"' "+checked+" /></td>";
				});
				$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
				+"<td align=center>"+j+"</td>"
                +"<td align=center>"+$(this).find("EXPS_TYPE_ID").text()+"</td>"
                +"<td>"+$(this).find("EXPS_TYPE_NAME1").text()+"-"+$(this).find("EXPS_TYPE_NAME2").text()+"</td>"
                +cols
                +"</tr>");
			});
			$(tableId).trigger("update");
//			tableRowEvent(tableId,tableRowId,1);
			checkRowEvent(tableId,"checkRow1");

			var dataCnt = $(result).find("DATA_LIST").find("DATA_LIST_CNT").text();
			if(dataCnt==null || dataCnt=="") dataCnt = 0;

			///////////////////////////////////////////////////////////////////////////////////////
			
			message(dataCnt+" "+I002);
		},
		error: function(xhr, ajaxOptions, thrownError){
			alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//			alert(xhr.responseText); //for debuging 
		}
	});
}
function Update(expsTypeId,deptCode,value) {
    var action = "scn3.do?method=SA030Save";
    var params = "&EXPS_TYPE_ID="+expsTypeId
               + "&DEPT_CODE="+deptCode
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
function Clear() {
}
function initEvent() {
	$("#divMain").css("height",$(window).height()-95);
}
