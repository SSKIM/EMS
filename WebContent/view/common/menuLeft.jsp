<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String menuSubId = (String)CommonUtil.nvl(CommonUtil.getParameter(request,"menuSubId")); 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
	    <script type="text/javascript">
	    	$(document).ready(function() {
				<%if(!CommonUtil.nullOrEmpty(menuSubId)) {%>
		    		//imgFlip($("#menusub<%=menuSubId%>"),"on","menusub");
				<%}%>
				leftMenuRowEvent("#leftMenu","leftMenuRow");
		    });
		    var colorOver= "#38acec", colorActive = "#3090c7";
		    function leftMenuRowEvent(tableId,tableRowId) {
				$(tableId+' tr')
					.css('cursor','pointer')
					.mouseover(function() {
						if($(this).attr('class') == "line" || $(this).attr('class') == "title") {
						} else if ($(this).css('background-color') != colorActive) {
							$(this).css('background-color',colorOver);
							$(this).find("td").css('background-color',colorOver);
							$(this).find("td").css('color',"#ffffff");
						}
					})
					.mouseout(function() {
						if($(this).attr('class') == "line" || $(this).attr('class') == "title") {
						} else if ($(this).css('background-color') != colorActive) {
							$(this).css('background-color','#ffffff');
							$(this).find("td").css('background-color','#ffffff');
							$(this).find("td").css('color',"#456db2");
						}
					})
					.click(function() {
						var clas = $(this).attr("class");
						if(clas=="S") {
							$("#EXT_"+name).html("-");
							
							var name = $(this).attr("name");
							$("table tbody tr[name=_"+name+"]").each(function(){
								if($(this).css("display")=="table-row") {
									$(this).css("display","none");
									$("#EXT_"+name).html("+");
								} else {
									$(this).css("display","table-row");
									$("#EXT_"+name).html("-");
								}
							});
						}
						var obj = eval($(this).attr("id"));
						eval(tableRowId+"_onClick(obj,tableId)");
					});
		    }
	    	function leftMenuRow_onClick(obj,tableId) {
		    	if(obj==null) return;
	    		$(tableId+" tr").each(function(index) {
	    			if($(this).attr('class') == "line" || $(this).attr('class') == "title") {
	    			} else {
		    			if(obj.rowIndex == index) {
		    				$(this).css('background-color',colorActive);
		    				$(this).find("td").css('background-color',colorActive);
							$(this).find("td").css('color',"#ffffff");
		    			} else {
		    				$(this).css('background-color','#ffffff');
		    				$(this).find("td").css('background-color','#ffffff');
							$(this).find("td").css('color',"#456db2");
		    			}
	    			}
	    		});
	    		
	    	}
		</script>
	</head>
	<body>
		<%@ include file="../include/menuSub.jsp" %>
	</body>
</html>