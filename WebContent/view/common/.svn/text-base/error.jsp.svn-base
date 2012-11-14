<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.mindtree.framework.util.GLOBAL" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@ include file="../include/header.jsp" %>
		<script type="text/javascript">
			$(document).ready(function(){
				$("#btnClose").click(function(){ Close(); });
			});
			function Close() {
				this.close();
			}
		</script>
	</head>
	<body>
<table width="800" border="0" cellpadding="0" cellspacing="0" align=center>
  <tr>
    <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="33"><img src="./theme/default/image/box_left_top.gif" width="33" height="33" /></td>
          <td background="./theme/default/image/box_top_bg.gif">&nbsp;</td>
          <td width="33"><img src="./theme/default/image/box_right_top.gif" width="33" height="33" /></td>
        </tr>
        <tr>
          <td background="../../view/theme/default/image/box_left_bg.gif">&nbsp;</td>
          <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="160"><img src="./theme/default/image/error_img.gif" width="138" height="136" /></td>
                      <td>
                      	[에러코드] <%=request.getAttribute(GLOBAL.RETURN_CODE)%> <%=request.getAttribute(GLOBAL.RETURN_MESSAGE)%><br />
                        [에러상세]<br />
                        <%=request.getAttribute(GLOBAL.RETURN_DETAIL)%> 
                      </td>
                    </tr>
                  </table></td>
              </tr>
              <tr>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td align="center"><button class="rounded"> <span>처음으로 돌아가기</span></button></td>
              </tr>
            </table></td>
          <td background="./theme/default/image/box_right_bg.gif">&nbsp;</td>
        </tr>
        <tr>
          <td><img src="./theme/default/image/box_left_bottom.gif" width="33" height="33" /></td>
          <td background="./theme/default/image/box_bottom_bg.gif">&nbsp;</td>
          <td><img src="./theme/default/image/box_right_bottom.gif" width="33" height="33" /></td>
        </tr>
      </table></td>
  </tr>
</table>
	</body>
</html>
