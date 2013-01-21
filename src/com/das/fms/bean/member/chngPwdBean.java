package com.das.fms.bean.member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.mindtree.framework.util.Endec;
import com.das.fms.vo.UserVO;
import com.mindtree.framework.util.GLOBAL;

public class chngPwdBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// Parameter 받기
			String userid    = (String)CommonUtil.getParameter(request,"USER_ID");
			String passwd    = (String)CommonUtil.getParameter(request,"PASSWORD");
			String passwdNew = (String)CommonUtil.getParameter(request,"PASSWORD_NEW");
			// Parameter 유효성 검사
			if(CommonUtil.nullOrEmpty(userid)) {
				returnError(request, "W001", "사용자ID");
				return;
			}
			if(CommonUtil.nullOrEmpty(passwd)) {
				returnError(request, "W001", "사용자 비밀번호");
				return;
			}
			// Parameter 설정
			List<Object> param = bindParameter(request);
			param.add(userid);
			param.add(Endec.encryptData(passwd));
			param.add(Endec.encryptData(passwdNew));
			// 실행
			Map<String,Object> result = execute(param);

			if(result == null || result.size()<1) {
				request.setAttribute(GLOBAL.RETURN_CODE, "W006");
			} else {
				/*
				Map returnData = (Map)result.get("returnData");
				UserVO user = new UserVO();
				user.setUserId(      (String)returnData.get("USER_ID"));
				user.setUserName(    (String)returnData.get("USER_NAME"));
				user.setUserType(    (String)returnData.get("USER_TYPE"));
				user.setEmplId(      (String)returnData.get("EMPL_ID"));
				user.setTelNo(       (String)returnData.get("TEL_NO"));
				user.setHpNo(        (String)returnData.get("HP_NO"));
				user.setEmail(       (String)returnData.get("EMAIL"));
				user.setDeptCode(    (String)returnData.get("DEPT_CODE"));
				user.setDeptName(    (String)returnData.get("DEPT_NAME"));
				user.setBusiUnitType((String)returnData.get("BUSI_UNIT_TYPE"));
				user.setLedgerType(  (String)returnData.get("LEDGER_TYPE"));
				user.setLoginTime(new Long(System.currentTimeMillis()));
				user.setLantype(	 (String)returnData.get("LAN_TYPE"));

				HttpSession session = request.getSession();
				user.setSessionId(session.getId());
				session.setAttribute(GLOBAL.USER_SESSION,           user);
				session.setAttribute(GLOBAL.SESSION_USER_ID,        user.getUserId());
				session.setAttribute(GLOBAL.SESSION_BUSI_UNIT_TYPE, user.getBusiUnitType());
				session.setAttribute(GLOBAL.SESSION_LEDGER_TYPE,    user.getLedgerType());
				*/
			}
			returnValue2(request, result);
		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
		}
    }
}