package com.das.fms.bean.system;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;

public class EA041UpdateBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// 1.
			String   userId    = (String)CommonUtil.getParameter(request, "SESSION_USER_ID");
			String   screenId  = (String)CommonUtil.getParameter(request, "SCREEN_ID");
			String[] buttonId  = request.getParameterValues("BUTTON_ID");
	        String[] buttonGrp = request.getParameterValues("BUTTON_GRP");
	        String[] buttonSeq = request.getParameterValues("BUTTON_SEQ");
			// 2.
			if(CommonUtil.nullOrEmpty(userId)) {
				returnError(request, "W001", "screenId");
				return;
			}
			if(CommonUtil.nullOrEmpty(buttonId)) {
				returnError(request, "W001", "buttonId");
				return;
			}
			// 3.
	        for (int i=0; i<buttonGrp.length; i++) {
				List param = new ArrayList();
				param.add(screenId);
				param.add(buttonId[i]);
				param.add(buttonGrp[i]);
				param.add(buttonSeq[i]);
//				param.add(userId);
				// 4.
				execute(param);
				// 5.
//				returnValue2(request, result);
	        }
		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
			throw e;
		}
    }
}