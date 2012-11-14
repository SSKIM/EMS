package com.das.fms.bean.member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.GLOBAL;;

public class logoutBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			HttpSession session = request.getSession();
			session.removeAttribute(GLOBAL.USER_SESSION);
			session.invalidate(); //세션삭제
			
		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
		}
    }
}