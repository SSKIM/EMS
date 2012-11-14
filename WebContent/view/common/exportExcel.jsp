<%@ page language="java" contentType="application/vnd.ms-excel; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.File,java.io.FileInputStream,java.io.OutputStream,java.io.BufferedInputStream,java.io.BufferedOutputStream,com.mindtree.framework.util.CommonUtil" %>
<%
	String filename = (String)CommonUtil.getParameter(request,"FILE_NAME");
	String filepath = request.getSession().getServletContext().getInitParameter("fileDonwload");

	filename = filename+".xls";
		
	response.setHeader("Content-Disposition","attachment; filename=\""+filename+"\";");
	response.setHeader("Pragma", "no-cache;");
	response.setHeader("Expires", "-1;");
	response.setHeader("Cache-Control", "cache, must-revalidate");

	out.clear();
    out=pageContext.pushBody();

	FileInputStream fin = null;
	OutputStream   fout = null;

	try {
		File file = new File (filepath+filename);
		byte[] bytestream = new byte[(int)file.length()];
	
		fin = new FileInputStream(file);
	
		int i = 0, j = 0;
		while((i = fin.read()) != -1) {
			bytestream[j] = (byte)i;
			j++;
		}

		fout = response.getOutputStream();
		fout.write(bytestream);
		fout.close();
	} catch(java.io.IOException e) {
	} finally {
         if(fin  != null) fin.close();
         if(fout != null) fout.close();
	}
%>