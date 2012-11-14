<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.util.Map,java.util.HashMap,java.io.OutputStream,java.io.IOException"%>
<%@ page import="net.sf.jasperreports.view.JasperViewer,net.sf.jasperreports.engine.*,net.sf.jasperreports.engine.export.*" %>
<%@ page import="com.mindtree.framework.util.CommonUtil,com.mindtree.framework.db.ConnectionManager" %>
<%
	String filename  = request.getParameter("filename");
	String filetype  = request.getParameter("filetype");
	String param     = request.getParameter("param");

	//String filePath  = request.getSession().getServletContext().getRealPath("/report/"+filename+".jasper");
	String filePath  = "D:/project/dfs/workspace/dfs/WebContent/report/CR020.rex";
	Map    fileParam = CommonUtil.getParameter(param);
	
	OutputStream ouputStream = null;
	ConnectionManager conn = new ConnectionManager();
	JasperPrint jasperPrint = JasperFillManager.fillReport(filePath, fileParam, conn.getConnection());
	
	try {
		if(CommonUtil.nullOrEmpty(filetype)) {
			JasperViewer.viewReport(jasperPrint, false);
		} else {
			//out.clear();
			ouputStream = response.getOutputStream();
			JRExporter exporter = null;

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
			exporter.exportReport();
		}
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