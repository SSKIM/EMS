package com.das.fms.bean.scn1;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.mindtree.framework.util.Endec;

public class AA020InsertBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// 1.
			String sessionUserId = (String)CommonUtil.getParameter(request, "SESSION_USER_ID");
			String userId        = (String)CommonUtil.getParameter(request, "USER_ID");
			String userName      = (String)CommonUtil.getParameter(request, "USER_NAME");
			String password      = (String)CommonUtil.getParameter(request, "PASSWORD");
			String userType      = (String)CommonUtil.getParameter(request, "USER_TYPE");
			String emplId        = (String)CommonUtil.getParameter(request, "EMPL_ID");
			String telNo         = (String)CommonUtil.getParameter(request, "TEL_NO");
			String hpNo          = (String)CommonUtil.getParameter(request, "HP_NO");
			String email         = (String)CommonUtil.getParameter(request, "EMAIL");
			String status        = (String)CommonUtil.getParameter(request, "STATUS");
			if(CommonUtil.nullOrEmpty(password)) password = "1111"; 
			// 2.
			if(CommonUtil.nullOrEmpty(userId)) {
				returnError(request, "W001", "USER_ID");
				return;
			}
			if(CommonUtil.nullOrEmpty(userName)) {
				returnError(request, "W001", "USER_NAME");
				return;
			}
			// 3.
			List param = new ArrayList();
			param.add(userId);
			param.add(userName);
			param.add(Endec.encryptData(password));
			param.add(userType);
			param.add(emplId);
			param.add(telNo);
			param.add(hpNo);
			param.add(email);
			param.add(status);
			param.add(sessionUserId);
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