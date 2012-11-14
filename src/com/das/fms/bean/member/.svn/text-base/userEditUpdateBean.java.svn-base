package com.das.fms.bean.member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.mindtree.framework.util.Endec;

public class userEditUpdateBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// 1. GET PARAMETER
			String sessionUserId = (String)CommonUtil.getParameter(request, "SESSION_USER_ID");
			String userId        = (String)CommonUtil.getParameter(request, "USER_ID");
			String password      = (String)CommonUtil.getParameter(request, "PASSWORD");
			String telNo         = (String)CommonUtil.getParameter(request, "TEL_NO");
			String hpNo          = (String)CommonUtil.getParameter(request, "HP_NO");
			// 2. VALIDATE PARAMETER
			if(CommonUtil.nullOrEmpty(userId)) {
				returnError(request, "W001", "USER_ID");
				return;
			}
			if(CommonUtil.nullOrEmpty(password)) {
				returnError(request, "W001", "PASSWORD");
				return;
			}
			// 3. SET PARAMETER
			List param = new ArrayList();
			param.add(userId);
			param.add(Endec.encryptData(password));
			param.add(telNo);
			param.add(hpNo);
			param.add(sessionUserId);
			// 4. EXECUTE
			Map result = execute(param);
			// 5. RESULT
			returnValue2(request, result);
		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
			throw e;
		}
    }
}
