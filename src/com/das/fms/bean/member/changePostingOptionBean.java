package com.das.fms.bean.member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.List;
import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.mindtree.framework.util.Endec;
import com.das.fms.vo.UserVO;
import com.mindtree.framework.util.GLOBAL;

public class changePostingOptionBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// Parameter 받기
			String busiUnitType = (String)CommonUtil.getParameter(request,"BUSI_UNIT_TYPE");
			String ledgerType   = (String)CommonUtil.getParameter(request,"LEDGER_TYPE");
			// Parameter 유효성 검사
			if(CommonUtil.nullOrEmpty(busiUnitType)) {
				returnError(request, "W001", "사용자ID");
				return;
			}
			if(CommonUtil.nullOrEmpty(ledgerType)) {
				returnError(request, "W001", "사용자 비밀번호");
				return;
			}

			UserVO _userSession = (UserVO)CommonUtil.getUserSession(request);
			_userSession.setBusiUnitType(busiUnitType);
			_userSession.setLedgerType(ledgerType);

			HttpSession session = request.getSession();
			session.setAttribute(GLOBAL.SESSION_BUSI_UNIT_TYPE, busiUnitType);
			session.setAttribute(GLOBAL.SESSION_LANG_TYPE,      ledgerType);
		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
		}
    }
}