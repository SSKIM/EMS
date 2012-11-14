<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.Map,java.io.OutputStream,java.io.IOException,java.util.HashMap" %>
<%@ page import="net.sf.jasperreports.engine.*,net.sf.jasperreports.engine.export.*" %>
<%@ page import="com.mindtree.framework.util.CommonUtil,com.mindtree.framework.db.ConnectionManager;" %>
<%
	String filename  = request.getParameter("filename");
	String filetype  = request.getParameter("filetype");
	String param     = request.getParameter("param");
	String params    = request.getParameter("params");

System.out.println("filetype: "+filetype);
	String filePath  = "/project/dfs/workspace/dfs/WebContent/report/CR010.jasper";
	//Map    fileParam = CommonUtil.getParameter(param);
	
	Map<String,Object> fileParam = new HashMap<String,Object>();
	if(param.contains(",")) {
		for(String p1 : param.split(",")) {
			String[] p2 = p1.split(":");
			fileParam.put(p2[0], (p2.length>1) ? p2[1] : "");
		}
	} else {
		String[] p2 = param.split(":");
		fileParam.put(p2[0], (p2.length>1) ? p2[1] : "");
	}
	String[] p3 = params.split(":");
	String[] p4 = p3[1].split("\\^");

	if(p4.length>1) {
		StringBuffer sb = new StringBuffer();
		for(int i=0; i<p4.length; i++) {
			if(i>0) sb.append(",");
			sb.append("'").append(p4[i]).append("'");
		}
		fileParam.put(p3[0],sb.toString());
	} else {
		fileParam.put(p3[0],"'"+p3[1]+"'");
	}

	ConnectionManager conn = new ConnectionManager();
	JasperPrint jasperPrint = JasperFillManager.fillReport(filePath, fileParam, conn.getConnection());

	out.clear();
	
	OutputStream ouputStream = response.getOutputStream();
	JRExporter exporter = null;

	response.setContentType("application/pdf");

	exporter = new JRPdfExporter();
	exporter.setParameter(JRExporterParameter.JASPER_PRINT,  jasperPrint);
	exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, ouputStream);

/*
	if("pdf".equalsIgnoreCase(filetype)) {
		response.setContentType("application/pdf");
		
		exporter = new JRPdfExporter();
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, ouputStream);
	} else if("rtf".equalsIgnoreCase(filetype)) {
		response.setContentType("application/rtf");
		response.setHeader("Content-Disposition", "inline; filename=\"file.rtf\"");

		exporter = new JRRtfExporter();
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, ouputStream);
	} else if("html".equalsIgnoreCase(filetype)) {
		response.setContentType("text/html");
		
		exporter = new JRHtmlExporter();
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, ouputStream);
	} else if("xls".equalsIgnoreCase(filetype)) {
		response.setContentType("application/xls");
		response.setHeader("Content-Disposition", "inline; filename=\"file.xls\"");

		exporter = new JRXlsExporter();
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, ouputStream);
	} else if("csv".equalsIgnoreCase(filetype)) {
		response.setContentType("application/csv");
		response.setHeader("Content-Disposition", "inline; filename=\"file.csv\"");
		
		exporter = new JRCsvExporter();
		exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
		exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, ouputStream);
	}
*/

	try {
		exporter.exportReport();
		
	} catch (Exception e) {
		throw new ServletException(e);

	} finally {
		if(conn != null) conn.close();
		if (ouputStream != null) {
			try {
				ouputStream.close();
			} catch (IOException ex) {
			}
		}
	}
%>