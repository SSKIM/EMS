package com.das.fms.bean;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.FileUploader;

public class AttachRemoveBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String filePath = request.getSession().getServletContext().getInitParameter("fileUpload");
			String fileId   = request.getParameter("FILE_ID");
			String fileExt  = request.getParameter("FILE_EXT");

			File file = new File(filePath+"/"+fileId+"."+fileExt);
			file.delete();

		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
		}
    }
}