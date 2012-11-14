package com.das.fms.bean.system;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.mindtree.framework.util.Endec;

public class EB010UpdateBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// 1.
			String sessionUserId = (String)CommonUtil.getParameter(request, "SESSION_USER_ID");
			String userId        = (String)CommonUtil.getParameter(request, "USER_ID");
			String userName      = (String)CommonUtil.getParameter(request, "USER_NAME");
			String userType      = (String)CommonUtil.getParameter(request, "USER_TYPE");
			String emplId        = (String)CommonUtil.getParameter(request, "EMPL_ID");
			String telNo         = (String)CommonUtil.getParameter(request, "TEL_NO");
			String hpNo          = (String)CommonUtil.getParameter(request, "HP_NO");
			String email         = (String)CommonUtil.getParameter(request, "EMAIL");
			String deptCode      = (String)CommonUtil.getParameter(request, "DEPT_CODE");
			String busiUnitType  = (String)CommonUtil.getParameter(request, "BUSI_UNIT_TYPE");
			String ledgerType    = (String)CommonUtil.getParameter(request, "LEDGER_TYPE");
			String pwdChngType   = (String)CommonUtil.getParameter(request, "PWD_CHNG_TYPE");
			String loginFailCnt  = (String)CommonUtil.getParameter(request, "LOGIN_FAIL_CNT");
			String lan_type 	 = (String)CommonUtil.getParameter(request, "LAN_TYPE");
			String status        = (String)CommonUtil.getParameter(request, "STATUS");
			// 2.
			if(CommonUtil.nullOrEmpty(userId)) {
				returnError(request, "W001", "USER_ID");
				return;
			}
			if(CommonUtil.nullOrEmpty(userName)) {
				returnError(request, "W001", "USER_NAME");
				return;
			}
			// 3. set parameter
			List param = new ArrayList();
			param.add(userId);
			param.add(userName);
			param.add(userType);
			param.add(emplId);
			param.add(telNo);
			param.add(hpNo);
			param.add(email);
			param.add(deptCode);
			param.add(busiUnitType);
			param.add(ledgerType);
			param.add(pwdChngType);
			param.add(loginFailCnt);
			param.add(lan_type);
			param.add(status);
			param.add(sessionUserId);
			// 4. execute
			Map result = execute(param);
			// 5. return
			returnValue2(request, result);
		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
			throw e;
		}
    }
}