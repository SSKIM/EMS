package com.das.fms.bean;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.FileUploader;

public class AttachAddBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String filePath = request.getSession().getServletContext().getInitParameter("fileUpload");
			Map  formParam  = new HashMap<String,Object>();
			List uplodParam = new ArrayList<Map>();

			FileUploader fu = new FileUploader(request);
			fu.setTotalSizeLimit(41943040L);
			fu.setFileSizeLimit(41943040L);
//			fu.setFileNameLimit(fileNameLimit);
			fu.setDestPath(filePath);
			fu.fileUpload(formParam, uplodParam);

			returnValue(request, uplodParam);

		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
		}
    }
}