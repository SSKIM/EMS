<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.mindtree.framework.util.CommonUtil"%>
<%@ page import="com.das.fms.vo.UserVO"%>
<%
	UserVO _userSession = (UserVO)CommonUtil.getUserSession(request);
%>
		<table class="statusTable" id="statusTable" style="position:fixed">
			<tr>
				<td style="padding-right:10px">
					<img src="./theme/default/icon/state.gif" alt="" width="13" height="13" align="absmiddle">&nbsp;&nbsp;
					<div class="status"></div>
				</td>
				<td style="padding-left:10px" bgcolor="#559ccd" align=right>
					<b><%=_userSession.getBusiUnitType()+" / "+_userSession.getLedgerType() %></b>&nbsp;
					<img src="./theme/default/icon/name.gif" width="14" height="14" align="absmiddle">
          			<b><%=_userSession.getUserName()+" ("+_userSession.getUserId()+")"%></b>&nbsp;<%=_userSession.getDeptName()%>&nbsp;
				</td>
			</tr>
		</table>
		<div id="output" class="output">
			<table width="100%" height="300" border="0" cellpadding="0" cellspacing="0">
			  <tr>
			    <td bgcolor="#559ccd" height="2px"></td>
		      </tr>
			  <tr>
			    <td height="32" align=center bgcolor="#30709d"><img src="./theme/default/image/title/title_msg.gif" width="95" height="32"></td>
		      </tr>
		      <tr>
		        <td valign="top"><ul class="mktree" id="tree1"></ul></td>
	          </tr>
		      <tr>
		        <td height="25" align=right valign="top" style="padding-right:10px"><label id="lblClose" style="cursor:pointer"><img src="./theme/default/image/button/bt_close.gif" width="54" height="21" align="absmiddle"></label></td>
            </tr>
            </table> 
        </div>
		<div id="findLayout" style="width:316px;height:80px;overflow:auto;position:absolute;z-index:999;display:none">
			<table class="findTable" id="findTable" cellpadding="0" cellspacing="0"><tbody></tbody></table>
		</div>
		<iframe id="backgroundp" src="" frameBorder="0" style="width:100%;height:100px;display:none"></iframe>
