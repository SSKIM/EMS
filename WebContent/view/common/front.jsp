<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.Map,java.util.HashMap,java.util.List,com.mindtree.framework.util.CommonUtil" %>
<%
	String theme3 = getServletContext().getInitParameter("theme");
	List jrnlList =  null;
	Map resultSet = CommonUtil.getResultSet(request);
	if(resultSet != null) {
		jrnlList = (List)resultSet.get("JRNL_LIST");
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <%@ include file="../include/header.jsp" %>
        <script type="text/javascript">
			$(document).ready(function(){
				Retrieve(1);
				get_random_color();
			});
			function get_random_color() {
			       var letters = '0123456789ABCDEF'.split('');
			       var color = '#';
			       var color2 = '#';
			       for (var i = 0; i < 6; i++ ) {
			           color += letters[Math.round(Math.random() * 15)];
			           color2 += letters[Math.round(Math.random() * 14)];
			       }
			       document.getElementById('div1').style.backgroundColor = color;
			       document.getElementById('div2').style.backgroundColor = color2;
			}

			function dataTableRow1_onClick(obj) {
				//tableRowColor('#dataTable1',obj.rowIndex);
				//bindData(obj);
			}
			function goView(bltnNo) {
				var param = new Object();

				var url   = "popup.do?method=CP110&screenId=CP110&screenIdRef=index&refVal=&isPopup=true&BLTN_NO="+bltnNo;
				var style = "dialogWidth:800px;dialogHeight:600px;status:no;scroll:no";

				var retVal = window.showModalDialog(url, param, style);
				if(retVal != null) {
				}
			}
			function goJrnl(jrnlNo) {
				if(jrnlNo!='') {
					goLink('scn1.do','menuId=1100&screenId=AA010&JRNL_NO='+jrnlNo,'L','전표 작성');
				}
			}
			function goPage(bltnNo) {
				Retrieve(bltnNo);
			}
			function Retrieve(pageNo) {
				var tableId = "#dataTable1", tableRowId = "dataTableRow1";
				$(tableId+" tbody").empty();

				var j = 0;
				var action = "index.do?method=NOTICE_LIST";
				var params = "&FIND_KIND="
				           + "&FIND_WORD="
				           + "&PAGE_NO="+pageNo
				           + "&viewMode=&call=xml";

				$.ajax({type: "post", url: action, data: params, dataType: "xml", cache: false,
					success: function(result){
						if(errorMessage($(result).find("RETURN_CODE").text(),$(result).find("RETURN_MESSAGE").text(),$(result).find("RETURN_DETAIL").text())) {
							return false;
						}
						if($(result).find("DATA_LIST").find("ROW").length==0) { 
							$(tableId+" tbody").append("<tr><td colspan="+$(tableId+" thead tr th").length+" align=center>"+I001+"</td></tr>");
						}
			            var BLTN_CTGR = "", rowline = "";
						$(result).find("DATA_LIST").find("ROW").each(function(n){
							if($(this).find("BLTN_CTGR").text() == "F") {
								BLTN_CTGR = "<img src=\"./theme/default/icon/notice.gif\" width=67 height=18 align=absmiddle>";
				            } else {
				            	BLTN_CTGR = "";
				            }

							rowline = ($(result).find("DATA_LIST").find("ROW").length==(n+1)) ? "bottom" : rowline = "line";

							$(tableId+" tbody").append("<tr id=\""+tableRowId+"_"+(++j)+"\">"
			                +"<td>"+BLTN_CTGR+"<a href=\"javascript:goView('"+$(this).find("BLTN_NO").text()+"')\">"+$(this).find("SUBJECT").text()+"</a></td>"
			                +"<td align=center>"+$(this).find("WRITE_DATE").text()+"</td>"
			                +"</tr><tr class="+rowline+"><td colspan=2></td></tr>"
							);
						});
						
						$(tableId).trigger("update");
						tableRowEvent(tableId,tableRowId,1);

						var total = $(result).find("TOTAL").text();
						$("#pager1").html(paging(pageNo,total));
					},
					error: function(xhr, ajaxOptions, thrownError){
						alert(xhr.statusText+"\r\n"+ajaxOptions+"\r\n"+thrownError); 
//						alert(xhr.responseText); //for debuging 
					}
				});
			}
		</script>
    </head>
    <body >

<table border="0" cellspacing="0" cellpadding="0" style="width:922px;margin-left:40px" align=center>
  <tr>
    <td><table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td valign="bottom"><table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td valign="bottom" style="padding-bottom:10px"><span style="width:20px;hieght:10px;" id="div1">&nbsp;&nbsp;&nbsp;&nbsp;</span><font color=#ffffff></font><b>&nbsp;공지사항</b></td>
                <td width="170"><img src="./theme/<%=theme3%>/image/main/notice_img.gif" width="162" height="63"></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
       	 <td valign="bottom"><table width="100%" class="img" border="0" cellpadding="0" cellspacing="0">
          		<tr>
           			<td valign="bottom"width="3"><img src="./theme/default/image/bar_left.gif" width="14" height="33"></td>
            		<td width="700" align="center" background="./theme/default/image/bar_bg.gif">공지내용</td>
            		<td width="" align="center" background="./theme/default/image/bar_bg.gif">공지일자</td>
            		<td width="14"><img src="./theme/default/image/bar_right.gif" width="14" height="33"></td>
          			</tr>
        		</table>
        	</td>
        </tr>
        <tr>
			<td style="height:220px" valign=top>
				<table class="frontTable" id="dataTable1" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width=702><col width=220>
					</colgroup>
					<thead>
						<tr>
							<td colspan=2>
							</td>
						</tr>
					</thead>
					<tbody>
						<tr><td colspan=2></td></tr>
					</tbody>
				</table>
				<div style="width:100%;margin:2px" align=center>
					<span id="pager1"></span>
				</div>
            </td>
        </tr>
        <tr>
          <td><table border="0" cellspacing="0" cellpadding="0" style="width:922px">
              <tr>
                <td valign="bottom" style="padding-bottom:10px"><span style="width:20px;hieght:10px;" id="div2">&nbsp;&nbsp;&nbsp;&nbsp;</span><font color=#ffffff></font><b>&nbsp;전표요약 현황</b></td>
                <td width="162"><img src="./theme/<%=theme3%>/image/main/statement_img.gif" width="162" height="78"></td>
              </tr>
            </table></td>
        </tr>
        <tr>
          <td><table border="0" cellspacing="0" cellpadding="0" style="width:922px">
	          <tr>
		        <table width="100%" class="img" border="0" cellpadding="0" cellspacing="0">
		          <tr>
		            <td width="3"><img src="./theme/default/image/bar_left.gif" width="14" height="33"></td>
		            <td width="89" align="center" background="./theme/default/image/bar_bg.gif">출력</td>
		            <td width="81" align="center" background="./theme/default/image/bar_bg.gif">제출</td>
		            <td width="84" align="center" background="./theme/default/image/bar_bg.gif">승인</td>
		            <td width="86" align="center" background="./theme/default/image/bar_bg.gif">반려</td>
		            <td width="256" align="center" background="./theme/default/image/bar_bg.gif">반려사유</td>
		            <td width="100" align="center" background="./theme/default/image/bar_bg.gif">전표번호</td>
		            <td width="100" align="center" background="./theme/default/image/bar_bg.gif">작성일자</td>
		            <td width="" align="center" background="./theme/default/image/bar_bg.gif">금액</td>
		            <td width="14"><img src="./theme/default/image/bar_right.gif" width="14" height="33"></td>
		          </tr>
		        </table>
	          </tr>
              <tr>
                <td><div id="tableLayer" style="overflow-x:hidden; overflow-y:scroll; height:160px; width:922;">
					<table id="dataTable2" width="903" cellspacing="0" cellpadding="0">
						<tbody>
							<%if(jrnlList == null || jrnlList.size() < 1) {%>
							<tr height="25">
								<td width="89" align="center">&nbsp;</td>
								<td width="81" align="center">&nbsp;</td>
								<td width="84" align="center">&nbsp;</td>
								<td width="86" align="center">&nbsp;</td>
								<td width="256">&nbsp;</td>
								<td width="100" align="center">&nbsp;</td>
								<td width="100" align="center">&nbsp;</td>
								<td width="" align="right">&nbsp;</td>
							</tr>
							<tr>
								<td colspan="8" style="height:1px;background-color:#e1e1e1;"></td>
							</tr>
							<%} else {
								for(int i=0; i<jrnlList.size(); i++) {
									Map data = (HashMap)jrnlList.get(i);
									int    V_PRINT       = CommonUtil.getInt(data.get("V_PRINT"));
									int    V_SUBMIT      = CommonUtil.getInt(data.get("V_SUBMIT"));
									int    V_APPROVAL    = CommonUtil.getInt(data.get("V_APPROVAL"));
									int    V_REJECT      = CommonUtil.getInt(data.get("V_REJECT"));
									String REJECT_REASON = (String)data.get("REJECT_REASON");
									String JRNL_NO       = (String)data.get("JRNL_NO");
									String WRITE_DATE    = (String)data.get("WRITE_DATE");
									String TOTAL_AMT     = CommonUtil.getString(data.get("TOTAL_AMT"));
							%>
							<tr height="25">
								<td width="89" align="center"><%if(V_PRINT    == 1) {%> √ <%}%></td>
								<td width="81" align="center"><%if(V_SUBMIT   == 1) {%> √ <%}%></td>
								<td width="84" align="center"><%if(V_APPROVAL == 1) {%> √ <%}%></td>
								<td width="86" align="center"><%if(V_REJECT   == 1) {%> √ <%}%></td>
								<td width="256"><%=REJECT_REASON%></td>
								<td width="100" align="center"><a href="javascript:goJrnl('<%=JRNL_NO%>')"><%=JRNL_NO%></a></td>
								<td width="100" align="center"><%=WRITE_DATE%></td>
								<td width="" align="right"><%=TOTAL_AMT%></td>
							</tr>
							<tr>
								<td colspan="8" style="height:1px;background-color:#e1e1e1;"></td>
							</tr>
							<%
								}
							}
							%>
						</tbody>
                    </table>
                  </div></td>
              </tr>
            </table></td>
        </tr>
      </table></td>
  </tr>
</table>
            <%@ include file="../include/bottom.jsp" %>
    </body>
</html>