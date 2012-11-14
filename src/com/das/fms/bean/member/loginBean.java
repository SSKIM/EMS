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

public class loginBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// Parameter 받기
			String userid  = (String)CommonUtil.getParameter(request,"userid");
			String passwd  = (String)CommonUtil.getParameter(request,"passwd");
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
			// 실행
			Map<String,Object> result = select(param);
//			returnValue(request, result);

			if(result == null || result.size()<1 || ((Map)result.get("LOGIN")).get("USER_ID") == null) {
				request.setAttribute(GLOBAL.RETURN_CODE, "W006");
				returnValue(request, result);
			} else {
				Map login = (Map)result.get("LOGIN");
				String pwdChngType = (String)login.get("PWD_CHNG_TYPE");

				if("Y".equals(pwdChngType)) {
					returnValue(request, result);
				} else if(login!=null && login.size()>0) {
					
					UserVO user = new UserVO();
					user.setUserId(      (String)login.get("USER_ID"));
					user.setUserName(    (String)login.get("USER_NAME"));
					user.setUserType(    (String)login.get("USER_TYPE"));
					user.setEmplId(      (String)login.get("EMPL_ID"));
					user.setTelNo(       (String)login.get("TEL_NO"));
					user.setHpNo(        (String)login.get("HP_NO"));
					user.setEmail(       (String)login.get("EMAIL"));
					user.setDeptCode(    (String)login.get("DEPT_CODE"));
					user.setDeptName(    (String)login.get("DEPT_NAME"));
					user.setBusiUnitType((String)login.get("BUSI_UNIT_TYPE"));
					user.setLedgerType(  (String)login.get("LEDGER_TYPE"));
					user.setLoginTime(new Long(System.currentTimeMillis()));
					user.setLantype(	 (String)login.get("LAN_TYPE"));
	
					HttpSession session = request.getSession();
					user.setSessionId(session.getId());
					session.setAttribute(GLOBAL.USER_SESSION,           user);
					session.setAttribute(GLOBAL.SESSION_USER_ID,        user.getUserId());
					session.setAttribute(GLOBAL.SESSION_BUSI_UNIT_TYPE, user.getBusiUnitType());
					session.setAttribute(GLOBAL.SESSION_LEDGER_TYPE,    user.getLedgerType());

					returnValue(request, result);
				}
			}
		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
		}
    }
}