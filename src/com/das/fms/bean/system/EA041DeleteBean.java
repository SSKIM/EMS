package com.das.fms.bean.system;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;

public class EA041DeleteBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// 1.
//			String   userId    = (String)CommonUtil.getParameter(request, "SESSION_USER_ID");
			String screenId    = (String)CommonUtil.getParameter(request, "SCREEN_ID");
			String buttonId    = (String)CommonUtil.getParameter(request, "BUTTON_ID");
			// 2.
			if(CommonUtil.nullOrEmpty(screenId)) {
				returnError(request, "W001", "screenId");
				return;
			}
			if(CommonUtil.nullOrEmpty(buttonId)) {
				returnError(request, "W001", "buttonId");
				return;
			}

			// 3.
			List param = new ArrayList();
			param.add(screenId);
			param.add(buttonId);
			// 4.
			Map result = execute(param);
			// 5.
			returnValue2(request, result);
		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
			throw e;
		}
    }
}