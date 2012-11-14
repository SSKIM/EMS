<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.mindtree.framework.util.CommonUtil" %>
<%
	String rptMain     = (String)CommonUtil.getParameter(request,"RPT_MAIN");
	String rptMainPara = CommonUtil.getString2(request.getParameter("RPT_MAIN_PARA"));
	String rptMainPar2 = CommonUtil.getString2(request.getParameter("RPT_MAIN_PAR2"));
	String rptSubr     = (String)CommonUtil.getParameter(request,"RPT_SUBR");
	String rptSubrPara = CommonUtil.getString2(request.getParameter("RPT_SUBR_PARA"));
	String rptSubrPar2 = CommonUtil.getString2(request.getParameter("RPT_SUBR_PAR2"));
%>
<HTML>
	<HEAD>
		<title>다스법률비용보험(주) 전표관리 시스템</title>
		<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<script language="javaScript">
			var server = "<%=request.getLocalAddr()%>:8091";
			function fnPreView() {
				var oReport, oConnection, oDataSet;

				var rptMain     = "<%=rptMain%>";
				var rptMainPara = "<%=rptMainPara%>";
				var rptMainPar2 = "<%=rptMainPar2%>";

				var rptMains    = rptMain.split("|");
				var screenId    = rptMains[0];
				var procedure   = rptMains[1];

				oReport = RexCtl.OpenReport("http://"+server+"/dfs/report/"+screenId+".rex");
				if(oReport == null) {
					alert("리포트 파일을 열 수 없습니다!");
					return;
				}

				if(rptMainPara==null || rptMainPara=="") {
				} else {
					rptMainParas = rptMainPara.split("|");
					if(rptMainParas.length>1) {
						for(var i=0;i<rptMainParas.length;i++) {
							oReport.SetParameterFieldValue(i,rptMainParas[i]);
						}
					} else if(rptMainParas.length==1) {
						oReport.SetParameterFieldValue(0,rptMainPara);
					}
				}

				if(procedure==null || procedure=="") {
				} else {
					try {
						oConnection = RexCtl.CreateConnection("http.post");
					} catch(e) {
						alert(e.message);	
						return;
					}

					oConnection.AddParameter("PROCEDURE", procedure);
					oConnection.AddParameter("PARAMETER", rptMainPar2);

					oConnection.Path = "http://"+server+"/dfs/view/common/rexserver.jsp";

					try {
						oConnection.Send();
					} catch(e) {
						alert(e.message);
						alert(oConnection.Response());
						return;
					}
	
					try {
						oDataSet = oReport.CreateDataSetXML(oConnection, "rexdataset/rexrow", 0);
						if(oDataSet.RowCount == 0) {
							alert("데이터가 없습니다.");
						}
					} catch(e) {
						alert(e.message);
						return;
					}
				}

				///////////////////////////////////////////////////////////////////////////////////

				var rptSubr     = "<%=rptSubr%>";
				var rptSubrPara = "<%=rptSubrPara%>";
				var rptSubrPar2 = "<%=rptSubrPar2%>";

				if(rptSubr==null || rptSubr=="") {
				} else {
					var rptSubr2 = rptSubr.split("^");
					if(rptSubr2.length>1) {
						var rptSubrParas = rptSubrPara.split("^");
						var rptSubrPar2s = rptSubrPar2.split("^");
						for(var j=0;j<rptSubr2.length;j++) {
							fnOpenSubReport(oReport,j,rptSubr2[j],rptSubrParas[j],rptSubrPar2s[j]);
						}
					} else if(rptSubr2.length==1) {
						fnOpenSubReport(oReport,0,rptSubr,rptSubrPara,rptSubrPar2);
					}
				}

				///////////////////////////////////////////////////////////////////////////////////

				RexCtl.Run();
			}
			function fnOpenSubReport(oReport,index,rptSubr,rptSubrPara,rptSubrPar2) {
				var oSubReport, oSubConnection, oSubDataSet;

				var rptSubrs    = rptSubr.split("|");
				var screenId    = rptSubrs[0];
				var procedure   = rptSubrs[1];

				var oSubReport = oReport.OpenReport(index);
				if(oSubReport == null) {
					alert("서브리포트 파일을 열 수 없습니다!");
					return;
				}

				if(rptSubrPara==null || rptSubrPara=="") {
				} else {
					var rptSubrParas = rptSubrPara.split("|");
					if (rptSubrParas.length > 1) {
						for(var i=0; i<rptSubrParas.length;i++) {
							oSubReport.SetParameterFieldValue(i,rptSubrParas[i]);
						}
					} else if(rptSubrParas.length==1) {
						oSubReport.SetParameterFieldValue(0,rptSubrPara);
					}
				}
				
				if(procedure==null || procedure=="") {
				} else {
					try {
						oSubConnection = RexCtl.CreateConnection("http.post");
					} catch(e) {
						alert(e.message);	
						return;
					}

					oSubConnection.AddParameter("PROCEDURE", procedure);
					oSubConnection.AddParameter("PARAMETER", rptSubrPar2);

					oSubConnection.Path = "http://"+server+"/dfs/view/common/rexserver.jsp";
	
					try {
						oSubConnection.Send();
					} catch(e) {
						alert(e.message);
						alert(oSubConnection.Response());
						return;
					}

					try {
						oSubDataSet = oSubReport.CreateDataSetXML(oSubConnection, "rexdataset/rexrow", 0);
						//if(oSubDataSet.RowCount == 0) {
						//	alert("데이터가 없습니다.");
						//}
					} catch(e) {
						alert(e.message);
						return;
					}
				}
			}
			function MovePage(){
				RexCtl.MovePage(3);
			}
			function SaveAs() {
				RexCtl.SaveAs("xls", "c:\\test1.xls", 1, -1, "ShowFileDialog=1;SheetOption=2;ErrorRange=10;ShowOptionDialog=0;");
			}
			function SaveAsDialog_OnClick() {
				RexCtl.SaveAsDialog("");
			}
			function fnGetErrorMsg(oConnection) {
				var oXMLDOM = oConnection.GetXMLDOM();

				if(oXMLDOM == null) {
					alert(oConnection.Response());
					return;
				}

				try {
					oXMLDOM.setProperty("SelectionLanguage", "XPath");

					var oNodes = oXMLDOM.selectSingleNode("gubun/error/msg");

					if(oNodes == null) {
						if (oXMLDOM.parseError.errorCode != 0) {
							var oError = oXMLDOM.parseError;
							alert(oError.reason);
							return "error";
						} else {
							return "";
						}
					} else {
						alert(oNodes.text);
						return "error";
					}
				} catch(e) {
					alert(e.message);
					return "error";
				}
			}
		</script>
	</HEAD>
	<BODY topmargin="0" leftmargin="0" onload="fnPreView();">
		<script src="<%=request.getContextPath()%>/component/rexpert/rexplugin.js"></script>
	</BODY>
</HTML>
