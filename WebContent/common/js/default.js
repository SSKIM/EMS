var servletPath = "/EMS/";

function showBack() {
	$(".loading").show();
}
function goLink(url, param, type, menuName) {
	if(url == null) return false;

	if(param == null || param == "") {
		url = servletPath + url;
	} else {
		url = servletPath + url + ((url.split("?").length) > 1 ? "&" : "?") + param + "&menuName="+menuName;
	}

	if(type=="T") {       //FRAME TOP
		parent.document.location.href = url;
	} else if(type=="L") {//FRAME LEFT
		parent.document.getElementById("fbody").src = url;
	} else if(type=="P") {
        window.showModalDialog(url, param, "help=no;scroll=no;status=0");
    } else if(type=="F") {
    	parent.document.getElementById("fmain").src = url;
    } else if(type=="R") {
    	top.location.reload = url;
    } else {
    	window.document.location.href = url;
    }
}
function errorMessage(msgCode,msgTitle,msgDetail) {
	if(msgCode == null || msgCode == '') {
		return false;
	} else {
		$("div.status").html(msgTitle);
		$('#tree1').append("<li>"+msgTitle+"<ul id=result>");
		$('#result').append("<li>Message Code : "+msgCode+"</li>");
		$('#result').append("<li>Message Detail : "+msgDetail+"</li>");
		convertTrees();
		return true;
	}
}
function imgFlip(obj,str,name) {
	if(str=="over") {
		if($(obj).attr("active") != "true") {
			$(obj).attr("src",$(obj).attr("src").replaceAll('.gif','_on.gif'));
		}
	} else if(str=="out") {
		if($(obj).attr("active") != "true") {
			$(obj).attr("src",$(obj).attr("src").replaceAll('_on.gif','.gif'));
		}
	}
	if(str=="on"){
		$("img[name="+name+"]").each(function(){
			$(this).removeAttr("active");
			$(this).attr("src",$(this).attr("src").replaceAll('_on.gif','.gif'));
		});
		$(obj).attr("active","true");
		$(obj).attr("src",$(obj).attr("src").replaceAll('.gif','_on.gif'));
	}
}
function imgOnOff(obj,str) {
	if(str == "over") {
		if($(obj).attr("active") != "true") {
			if($(obj).css("margin-top") == "-33px") {
				$(obj).css("margin-top","0px");
			} else {
				$(obj).css("margin-top","-33px");
			}
		}
	} else if(str == "out") {
		if($(obj).attr("active") != "true")
			$(obj).css("margin-top","0px");
	} else if(str == "on") {
		$("div.divTmu ul.Tmu li img").each(function() {
			$(this).css("margin-top","0px");
			$(this).removeAttr("active");
		});
		$(obj).css("margin-top","-33px").attr("active","true");
	}
}
function sidebar(flag) {
	if(flag == 'on') {
		$("#sidebar").css("background-image","url('/theme/default/image/comm/sub_sidebar_over.gif')");
	} else {
		$("#sidebar").css("background-image","url('/theme/default/image/comm/sub_sidebar.gif')");
	}
}
function showHide(obj) {
	if($(obj).css("display") == "none") {
		$(obj).css("display","block");
	} else {
		$(obj).css("display","none");		
	}

	var a = parseInt($("table.mainForm").css("width"));
	var b = parseInt($("#sidebar").css("width"));

	if($("#sideform").css("display") == "none") {
	    $("div.main").css("width",(a-b-5));
	} else {
		var c = parseInt($("#sideform").css("width"));
	    $("div.main").css("width",(a-b-c));
	}
}
function showPopup() {
	var maskHeight = $(document).height()-10;
	var maskWidth  = $(document).width()-10;
	$('#popupBack').css({'width':maskWidth,'height':maskHeight});
    $('#popupBack').fadeIn(1000).fadeTo("slow",0.8);     
    $('#popupForm,#popupMain').show();
}
function openWindowFrameless(url,name,w,h){
	var win = window.open("",name,"fullscreen=1,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0,width="+w+",height="+h+";");

	var cw  = Math.ceil((window.screen.width -w)/2);
	var ch  = Math.ceil((window.screen.height-h)/2);

	win.resizeTo(Math.ceil(w),Math.ceil(h));
	win.moveTo(Math.ceil(cw),Math.ceil(ch));
	win.document.location.replace(url);
}
function centerDialog(width,height) {
	var top  = (screen.height - height) / 2;
	var left = (screen.width  - width)  / 2;

	window.dialogHeight = height + 'px';
	window.dialogWidth  = width  + 'px';
	window.dialogTop    = top    + 'px';
	window.dialogLeft   = left   + 'px'; 
}
function onTab(str,idx) {
	$("span.tabTitle").each(function(i){
		if((i+1) == idx) {
			$("#"+str+"-"+(i+1)).css("display","block");
			$(this).css("background-color","#ffffff");
		} else {
			$("#"+str+"-"+(i+1)).css("display","none");
			$(this).css("background-color","#b1b1b1");
		}
	});
}

function getChildValue(area, name) {
	var j = 0;
	var value = "";
	for(i=0; i<area.childNodes.length; i++) {
		if(name == area.childNodes(i).name) {
			if(j==0)
				value = area.childNodes(i).value;
			else
				value = value + "," + area.childNodes(i).value;
			j++;
		}
	}
	return value;
}
function getScrollXY() {
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
    scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  return [ scrOfX, scrOfY ];
}
/**********************************************************
 * object
 *********************************************************/
function flash(src, width, height) {
	var html = '';
	html += '<object id="flash" type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+width+'" height="'+height+'">';
	html += '<param name="movie"         value="'+src+'">';
	html += '<param name="quality"       value="high">';
	html += '<param name="bgcolor"       value="#ffffff">';
	html += '<param name="menu"          value="false">';
	html += '<param name="wmode"         value="transparent">';
	html += '<param name="swliveconnect" value="true">';
	html += '<embed src="'+src+'" quality=high bgcolor="#ffffff" menu="false" width="'+width+'" height="'+height+'" swliveconnect="true" id="param" name="param" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"><\/embed>';
	html += '</object>';
	document.write(html);
}
function excel() {
	var html = '';
	html += '<object id="excel" type="application/vnd.ms-excel" classid="CLSID:0002E541-0000-0000-C000-000000000046" width="900" height="500" VIEWASTEXT>';
	html += '<param name="DisplayTitleBar"            value="true">';
	html += '<param name="DataType"                   value="HTMURL">';
	html += '<param name="AutoFit"                    value="0">';
	html += '<param name="DisplayColHeaders"          value="1">';
	html += '<param name="DisplayGridlines"           value="1">';
	html += '<param name="DisplayHorizontalScrollBar" value="1">';
	html += '<param name="DisplayRowHeaders"          value="1">';
	html += '<param name="DisplayTitleBar"            value="1">';
	html += '<param name="DisplayToolbar"             value="1">';
	html += '<param name="DisplayVerticalScrollBar"   value="1">';
	html += '<param name="EnableAutoCalculate"        value="0">';
	html += '<param name="EnableEvents"               value="0">';
	html += '<param name="MoveAfterReturn"            value="1">';
	html += '<param name="MoveAfterReturnDirection"   value="0">';
	html += '<param name="RightToLeft"                value="0">';
	html += '</object>';
	document.write(html);
}

function resizeIframeToFitContent(iframe) {
 	iframe.height = frameBanner.document.body.scrollHeight;
 	//iframe.width  = frameBanner.document.body.scrollWidth;
}
function slide(obj) {
	var id = $(obj).attr("id");
	$("div.slide").each(function() {
		if ($(this).attr("id") == id+"_sub") {
			$(this).css("display", "");
		} else {
			$(this).css("display", "none");
		}
	});
}
function showPopup(url) {
	$('#popup').attr("src",url);
	var maskHeight = $(document).height()-10;
	var maskWidth  = $(window).width()-10;   
	$('#popupBack').css({'width':maskWidth,'height':maskHeight});   
    $('#popupBack').fadeIn(1000).fadeTo("slow",0.8);     
    $('#popupForm,#popupMain').show();
}
/**********************************************************
 * required
 *********************************************************/
function required(id,flag) {
	if(flag) {
		$(id).addClass("required");
		$(id.replaceAll("#","#lbl")).addClass("required");
	} else {
		$(id).removeClass("required");
		$(id.replaceAll("#","#lbl")).removeClass("required");
	}
}
function requiredValidate(tableId) {
	var isValid = true;
	var labelName="",labelName2="";
    $(tableId+" input.required").each(function() {
		$(this).css("background-color","");
		if ($(this).val().trim() == "") {
			$(this).css("background-color", "#d9ecff");
			if(labelName=="")
				labelName += $("#lbl"+$(this).attr("id")).html();
			else
				labelName += ","+$("#lbl"+$(this).attr("id")).html();
			if(labelName2=="") labelName2 = $(this).attr("id");
			isValid = false;
		}
	});
	$(tableId+" select.required").each(function() {
		var objId = $(this).attr("id");
		$(this).css("background-color","");
		$(this).find("option:selected").each(function(){
			if($(this).val() == "") {
				$(this).css("background-color", "#d9ecff");
				if(labelName=="")
					labelName += $("#lbl"+objId).html();
				else
					labelName += ","+$("#lbl"+objId).html();			
				if(labelName2=="") labelName2 = objId;
				isValid = false;
			}
		});
	});
	if(!isValid) {
		$.msgBox({ title:"Warring", content:W001+" \n["+labelName+"]"});
		//$("#"+labelName2).focus();
	}
	return isValid;
}
function requiredClear() {
    $(".required").each(function() {
		$(this).css("background-color","");
	});
    $("select.required option").each(function() {
    	
		$(this).css("background-color","");
	});
}
function requiredCheck() {
    $(".required").each(function() {
		$(this).css("background-color","");
		if ($(this).val() == "") {
			$(this).css("background-color", "#ffccff");
		}
	});
}
/**********************************************************
 * 
 *********************************************************/
/*
function isNULL() {
	if(this == null) return true;
	var result = this.replace(/(^\s*)|(\s*$)/g,"");
	if(result)
		return false;
	else
		return true;
}*/
function LPAD(str,len,addStr) {
	var retVal = "";
	if(str.length == len) {
		retVal = str;
	} else {
		for(i=0; i<(len-str.length); i++) {
			retVal = retVal + addStr;
	    }
	    retVal = retVal + str;
	}
	return retVal;
}
function currDate(format) {
	var d = new Date();
	if(format == "yyyyMM") {
		return d.getFullYear()+"-"+LPAD(((d.getMonth()+1)+""),2,'0');
	} else {
		return d.getFullYear()+"-"+LPAD(((d.getMonth()+1)+""),2,'0')+"-"+LPAD((d.getDate()+""),2,'0');
	}
}
function dateMonthDiff(format,month,compareDate) {
	var d;
	if(compareDate == null || compareDate == "") {
		d = new Date();
	} else {
		var dd = compareDate.replaceAll("-","");
		d = new Date(parseInt(dd.substr(0,4)), parseInt(dd.substr(4,2))-1, parseInt(dd.substr(6,2)));
	}
	d.setMonth(d.getMonth()+parseInt(month));

	if(format == "yyyyMM") {
		return d.getFullYear()+"-"+LPAD(((d.getMonth()+1)+""),2,'0');
	} else {
		return d.getFullYear()+"-"+LPAD(((d.getMonth()+1)+""),2,'0')+"-"+LPAD((d.getDate()+""),2,'0');
	}
}
function dateDayDiff(format,day,compareDate) {
	var d;
	if(compareDate == null || compareDate == "") {
		d = new Date();
	} else {
		var dd = compareDate.replaceAll("-","");
		d = new Date(parseInt(dd.substr(0,4)), parseInt(dd.substr(4,2))-1, parseInt(dd.substr(6,2)));
	}
	d.setDate(d.getDate()+parseInt(day));

	if(format == "yyyyMM") {
		return d.getFullYear()+"-"+LPAD(((d.getMonth()+1)+""),2,'0');
	} else {
		return d.getFullYear()+"-"+LPAD(((d.getMonth()+1)+""),2,'0')+"-"+LPAD((d.getDate()+""),2,'0');
	}
}
function dateDiff(fromDate, toDate) {
	if(fromDate.length>0 && toDate.length>0) {
//		var d1 = new Date(fromDate); //ie9 ok, ie8 fail
//		var d2 = new Date(toDate);   //ie9 ok, ie8 fail

		var fd = fromDate.split("-"); 
		var d1 = new Date(fd[0],fd[1]-1,fd[2]);

		var td = toDate.split("-"); 
		var d2 = new Date(td[0],td[1]-1,td[2]);

		return (d2-d1)/1000/60/60/24;
	} else {
		return "";
	}
}
function currYear() {
	var d = new Date();
	return d.getFullYear();
}
/**********************************************************
 * table
 *********************************************************/
function tableRowObj(tableId,index){
	return $(tableId+" tbody tr")[index-1];
}
function tableRowColor(tableId,idx) {
	$(tableId+" tbody tr").each(function(index) {
		if($(this).attr('class') == "line" || $(this).attr('class') == "title" || $(this).attr('class') == "bottom") {
		} else if(idx == index+1) {
			$(this).css('background-color','#e1e1e1');
			$(this).find("td").css('background-color','#e1e1e1');
		} else {
			$(this).css('background-color','#ffffff');
			$(this).find("td").css('background-color','#ffffff');
		}
	});
}
function tableRowIndex(tableId,value,index) {
	if(value==null)
		return 1;

	var idx = 1, j = 0;
	var tableRows = $(tableId+" tbody tr");
	
	if(typeof(value) == 'string') {
		if(index == null || index == '') index = 1;
		tableRows.each(function(n) {
			if (tableRows[n].cells[index].innerHTML == value) idx = n+1;
		});
	} else {
		if(value.length == null) { return idx; }
		for(j=0;j<value.length;j++) {
			if(typeof(value[j]) == 'object' || value[j] == null || value[j] == '') {
				return idx; 
			}
		}
		if(value.length>1) {
			var indexs = index.split(",");
			tableRows.each(function(n) {
				j = 0;
				$(value).each(function(n1){
					if(tableRows[n].cells[indexs[n1]].innerHTML == value[n1]) {
						j++;
					}
				});                                                
				if(j==value.length) { idx = n+1; return; } 
			});
		} else {
			tableRows.each(function(n) {
				if (tableRows[n].cells[index].innerHTML == value[0]) idx = n+1;
			});
		}
	}
	return idx;
}
function tableRowHighlight(tableId,index,value) {
	var idx = tableRowIndex(tableId,index,value);
	tableRowColor(tableId,index);
	return idx;
}
function tableRowEvent(tableId,eventName,type,code,name) {
	$(tableId+' tbody tr')
		.css('cursor','pointer')
		.mouseover(function() {
			if($(this).attr('class') == "line" || $(this).attr('class') == "title" || $(this).attr('class') == "bottom") {
			} else if ($(this).css('background-color') != '#e1e1e1') {
				$(this).css('background-color','#f1f1f1');
				$(this).find("td").css('background-color','#f1f1f1');
			}
		})
		.mouseout(function() {
			if($(this).attr('class') == "line" || $(this).attr('class') == "title" || $(this).attr('class') == "bottom") {
			} else if ($(this).css('background-color') != '#e1e1e1') {
				$(this).css('background-color','#ffffff');
				$(this).find("td").css('background-color','#ffffff');
			}
		})
		.click(function() {
			if(type==1 || type == 3) {
				var obj = eval($(this).attr("id"));
				eval(eventName+"_onClick(obj,code,name)");
				//jQuery.globalEval(eventName+"_onClick('"+this+"')");
			}
		})
		.dblclick(function() {
			if(type==2 || type == 3) {
				var obj = eval($(this).attr("id"));
				eval(eventName+"_onDblClick(obj,code,name)");
			}
		});
}
function tableRowCheckEvent(tableId) {
	$(tableId+" tr").click(function(event) {
		if(event.target.type !== 'checkbox') {
			$(':checkbox', this).trigger('click');
		}
	});
}
function tableRowSum(tableId,index) {
	var totalAmt = 0;
	var tableRows = $(tableId+" tbody tr");
	tableRows.each(function(n){
		var amt = parseInt(tableRows[n].cells[index].innerHTML.replaceAll(",",""));
		totalAmt += amt;
	});
	return totalAmt;
}
function tableRowCheckSum(tableId,chkName,index,objName) {
	var totalAmt = 0, amt = 0;
	$("#"+tableId+" tbody input:checkbox[name="+chkName+"]:checked").each(function(n) {
		var col = $(this).parent().parent().html();
		totalAmt += parseInt($(col)[index].innerHTML.replaceAll(",",""));
	});
	$("#"+objName).val(totalAmt).keyup();
}
function tableData(tableId,cols,str) {
	var returnValue = "", col = "";
	var j = 0;

	if(cols!=null && cols!="") {
		col = cols.split(",");
		$(tableId+" tbody tr").each(function(n1) {
			if(n1>0) returnValue += ",";
			j = 0;
			$(this).find("td").each(function(n2){
				if(col.length>1) {
					for(var i = 0; i<col.length; i++) {
						if(col[i] == n2) {
							if(j>0) returnValue += "|";
//							if(str == n2)
//								returnValue += $(this).text();
//							else
								returnValue += $(this).text();
							j++;
						}	
					}
				} else {
					if(col == n2) {
						returnValue += $(this).text();
					}
				}
			});
		});
	}
	return returnValue;
}
/**********************************************************
 * radiobox
 *********************************************************/
function setRadioValue(name,value) {
	$(":input:radio[name="+name+"]").each(function(idx, val) {
		if($(this).val() == value) {
			$(":input:radio[name="+name+"]")[idx].checked = true;
			return false;
		}
	});
}
function getRadioValue(name) {
	return $(":input:radio[name="+name+"]:checked").val();
}
/**********************************************************
 * combobox
 *********************************************************/
function getComboText(id) {
	if($("#"+id+" option:selected").val()=="")
		return "";
	else
		return $("#"+id+" option:selected").text();
}
/**********************************************************
 * checkbox
 *********************************************************/
function checkAll(obj) {
    $("#"+obj).click(function() {
        if ($("#"+obj+":checked").length > 0) {
            $("input:checkbox:not(checked)").attr("checked", "checked");
        } else {
            $("input:checkbox:checked").attr("checked","");
        }
    });
}
function checkOne(tableId) {
	$(tableId+' tbody tr').click(function(event) {
		$(this).toggleClass('selected');
		if (event.target.type !== 'checkbox') {
			$(':checkbox', this).trigger('click');
		}
	});
}
function checkData(tableId,name) {
	var returnValue = "";
	$("#"+tableId+" tbody input:checkbox[name="+name+"]:checked").each(function(n) {
		if(n>0) returnValue += "|";
		returnValue += $(this).val();
	});
	return returnValue;
}
function checkData2(tableId,idx) {
	var retVal = '', sep = "";
	var j = 0, l = 0;
	var num = idx.split(',');
	$(tableId+" tbody tr input:checkbox").each(function(n) { 
	    if($(this).attr("checked") == true) {
	    	j++, l=0;
			if(num.length>1) {
				if(j>1) retVal += '^';
				sep = "", l = 0;
				$(num).each(function(k){
					l++; if(l>1) sep = "|";
					retVal += sep+$(tableId+" tbody tr")[n].cells[num[k]].innerHTML;
				});
			} else {
				if(j>1) sep = "|";
				retVal += sep+$(tableId+" tbody tr")[n].cells[idx].innerHTML;
	    	}
		}
    }); 
	return retVal;
}
function checkAllEvent(tableId,eventName) {
	$(tableId+" thead tr input:checkbox")
		.click(function() {
			eval(eventName+"_onClick($(this))");
		});
}
function checkRowEvent(tableId,eventName) {
	$(tableId+" tbody tr input:checkbox")
		.click(function() {
			eval(eventName+"_onClick($(this))");
		});
}
function checkIsUpdate(obj) {
	return !(obj.attr("checked")+"" == obj.attr("value"));
}
/**********************************************************
 * prototype
 *********************************************************/
String.prototype.trim       = function() {
	return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""));
};
String.prototype.ltrim      = function() {
	return this.replace(/(^ *)/g, "");
};
String.prototype.rtrim      = function() {
	return this.replace(/( *$)/g, "");
};
String.prototype.startsWith = function(str) {
	return (this.match("^"+str)==str);
};
String.prototype.endsWith   = function(str) {
	return (this.match(str+"$")==str);
};
String.prototype.replaceAll = function(_findValue, _replaceValue) {
	return this.replace(new RegExp(_findValue,"g"), _replaceValue);
};

function maximize2() {
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			if (top.screenX>0 || top.screenY>0) top.moveTo(0,0);
				if (top.outerWidth < screen.availWidth)
					top.outerWidth=screen.availWidth;
				if (top.outerHeight < screen.availHeight) 
					top.outerHeight=screen.availHeight;
		}
		else {
			top.moveTo(-4,-4);
			top.resizeTo(screen.availWidth+8,screen.availHeight+8);
		}
	}
}
function maximize() {
    window.moveTo(screen.availLeft,screen.availTop);
    window.resizeTo(screen.availWidth, screen.availHeight);
}

function number(id) {
	$(id).css("text-align","right");
	$(id).bind('keydown',function(e) {
//		if(event.which==8 || event.which==9 || event.which==16 || event.which==188 || event.which==189 || event.which==190 || event.which==110) {
//			// 8:backspace, tab:, shift:16, ,:188, -:189, .:190, .:110
//		} else if((event.which>=48 && event.which<=57) || event.which>=96 && event.which<=105) {
//			// 0:48, 9:57
//		} else {
//			return false;
//		}
	});
	$(id).bind('keypress',function(e) {
		return numberonly(e);
	});
	$(id).bind('keyup',function(e){
		$(this).val(numbercomma(parseInt($(this).val().replaceAll(',',''))));
	});
//	$(id).bind('blur',function(e){
//		if($(this).val().trim() =='') {
//			$(this).val(0);
//		}
//	});
}
function numberonly(e) {
	var key  = window.event ? e.keyCode : e.which;
	var char = String.fromCharCode(key);
	var reg  = /\D/;
	return !reg.test(char);
}
function numbercomma(num){
	return num.toLocaleString().slice(0,-3);
}
function date(id,mask) {
	$(id).datepicker();
	$(id).css("text-align","center");
	if(mask == null || mask == '')
		$(id).mask("9999-99-99");
	else
		$(id).mask(mask);
}
function disabledDate(id) {
	$(id).datepicker("destroy");
	$(id).unmask();	
}
function dateformat(val) {
	var y = val.substring(0,4);
	var m = val.substring(4,6);
	var d = val.substring(6,8);
	return y+"-"+m+"-"+d;
}
function readonly(id,flag) {
	if(flag) {
		$(id).attr("readonly","true").addClass("readonly");
	} else {
		$(id).removeAttr("readonly").removeClass("readonly");
	}
}
function disabled(id,flag) {
	if(flag) {
		$(id).removeClass("command");
		$(id).addClass("command2");
		$(id).attr("disabled","true");
	} else {
		$(id).removeClass("command2");
		$(id).addClass("command");
		$(id).removeAttr("disabled");
	}
}
function display(id,flag) {
	$(id).css("display",(flag) ? "inline" : "none");
//	if(flag==false) {
//		$(id.replaceAll("#","#lbl")).html("");
//	} else {
//		$(id.replaceAll("#","#lbl")).css("display","inline");
//	}
}
function getString(id) {
	return escape(encodeURIComponent($(id).val()));
}
function getString2(value) {
	return escape(encodeURIComponent(value));
}
function getNumber(id) {
	var num = $(id).val().trim().replaceAll(",","");
	if(num == "")
		return 0;
	else
		return parseInt(num);
}
function getFileSize(obj) {
//	var fileObj = document.getElementById("tempFile");
//	fileObj.dynsrc.value = obj.value;

	var img = new Image();
	img.dynsrc = obj.value;
	return fileObj.fileSize;
}
function setNumber(id,value) {
	$(id).val(value).keyup();
}
function find(code,name,callback) {
	var findLayout = "findLayout", findTable = "findTable";
	$("input:text[name="+name+"]").bind('keydown',function(e) {
		if((event.keyCode == 9)) {//TAB
			$("#"+findTable+" tbody").empty();
			$(this).focus();
		}
		else if((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 32) {
			$("#"+findTable+" tbody").empty();
			$("#"+findTable+" tbody tr:eq(0)").focus();
		} else if(event.keyCode = 38) {
		} else if(event.keyCode = 40) {
		} else {
			$("#"+findTable+" tbody").empty();
			e.preventDefault();
		}
	});
	$("input:text[name="+name+"]").bind('keyup',function(e) {
		if((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 8) {
			var offset = $("#"+code).offset();
			var index  = $("input:text[name="+name+"]").index(this);

			if($("input:text[name="+name+"]").length>1) {
				offset = $("#"+code+(index+1)).offset();
			}

			if(offset != null) {
				$("#"+findLayout).css("left",offset.left).css("top",offset.top+19);
				e.preventDefault();
				eval(callback+"("+index+")");
			}
		}
	});
}
function label(id,flag) {
	if(flag) {
		$(id).attr("readonly","true").addClass("label");
	} else {
		$(id).removeAttr("readonly").removeClass("label");
	}
}
function message(msg) {
	$("div.status").html(msg);
}
function checkByteLen(txt) {
	var bytesLen = 0;
	for(var i=0; i<txt.length; i++) {
		var oneChar = txt.charAt(i);
		if(escape(oneChar).length > 4) {
			bytesLen += 2;
		} else {
			bytesLen += 1;
		}
	}
	return bytesLen;
}
function paging(pageNo,itemCount,itemSize,pageSize) {
	var prev1 = "<img src='./theme/default/image/button/prev.gif' width='14px' height='13px' alt='이전'></img>";
	var prev2 = "<img src='./theme/default/image/button/last_prev.gif' width='18px' height='13px' alt='처음'></img>";
	var next1 = "<img src='./theme/default/image/button/next.gif' width='14px' height='13px' alt='다음>'</img>";
	var next2 = "<img src='./theme/default/image/button/last_next.gif' width='18px' height='13px' alt='끝'></img>";

	if(itemSize==null || itemSize=="" || itemSize=="0" || itemSize==0) itemSize = 10;
	if(pageSize==null || pageSize=="" || pageSize=="0" || pageSize==0) pageSize = 10;

	var pageFm = 0, pageTo = 0, pageCount = 0;
	var content = "";

	if(itemCount <= itemSize) {
		pageCount = 1;
	} else {
		pageCount = parseInt(itemCount/itemSize);
		if((itemCount % itemSize) > 0) { 
	        pageCount++;
	    }
    }

	pageFm = (Math.floor((pageNo-1)/pageSize) * pageSize) + 1;
	pageTo = (Math.floor((pageNo-1)/pageSize) * pageSize) + pageSize;

    if(pageCount < pageTo) {
        pageTo = pageCount;
    }
    //---------------------------------------------------------------------------------------------
    content += "<a href=\"javascript:goPage(1);\">"+prev2+"</a>&nbsp;";
    if(pageNo > pageSize) {
    	content += "<a href=\"javascript:goPage("+(pageFm - 1)+");\">"+prev1+"</a>";
    } else {
    	content += prev1;
    }
    content += "&nbsp;&nbsp;";
    //---------------------------------------------------------------------------------------------
    for(var i = pageFm; i <= pageTo; i++) {
        if(i > pageFm) {
        	content += "/&nbsp;";
        }
        if(i == pageNo) {
        	content += "<font color=red>"+i+"</font>&nbsp;";
        } else {
        	content += "<a href=\"javascript:goPage("+i+");\">"+i+"</a>&nbsp;";
        }
    }
    //---------------------------------------------------------------------------------------------
    content += "&nbsp;";
    if(pageTo < pageCount) {
    	content += "<a href=\"javascript:goPage("+(pageTo + 1)+");\">"+next1+"</a>";
    } else {
    	content += next1;
    }
    content += "&nbsp;";
    content += "<a href=\"javascript:goPage("+pageCount+");\">"+next2+"</a>";
    //---------------------------------------------------------------------------------------------
	return content;
}
function openWindowFull(aURL,winName) {
   var wOpen;
   var sOptions;

   sOptions  = 'status=yes,menubar=no,scrollbars=no,resizable=no,toolbar=no';
   sOptions += ',width=' + (screen.availWidth - 10).toString();
   sOptions += ',height=' + (screen.availHeight - 122).toString();
   sOptions += ',screenX=0,screenY=0,left=0,top=0';

   wOpen = window.open('', winName, sOptions);
   wOpen.location = aURL;
   wOpen.focus();
   if(window.name != winName) {
	   wOpen.moveTo(0,0);
   }
   wOpen.resizeTo(screen.availWidth, screen.availHeight);
   return wOpen;
}
function closeWindow(winName) {
	if(window.name != winName) {
		var win = window.open(location.href, "_self");
		win.close();
	}
}
function MM_swapImgRestore() { //v3.0
	  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function Init() {
	$(":input").not(':button, :submit, :reset, :hidden, :radio').val("");
	$("#dataTable1 tbody").empty();
}
function Close() {
	window.close();
}