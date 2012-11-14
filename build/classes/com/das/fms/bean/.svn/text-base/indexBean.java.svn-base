package com.das.fms.bean;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;

public class indexBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// Parameter 받기
//			UserVO login   = (UserVO)request.getSession().getAttribute("_LoginSession");
			String menuId = (String)CommonUtil.getParameter(request, "menuId");

			// Parameter 유효성 검사
//			if(procName == null || "".equals(procName)) {
//				request.setAttribute("ActorError",   "true");
//				request.setAttribute("ErrorMessage", "해당 파라메터를 입력해 주세요! [ex) PROCEDURE]");
//				return;
//			}
			// Parameter 설정
			List<Object> param = new ArrayList<Object>();
			param.add(menuId);
			// 실행
			List<Map<String,Object>> result = selectList(param);
			// 반환
			returnValue(request, result);
			
		} catch(Exception e) {
//			log.error(e);
//			returnError(request, e.getMessage());
			throw e;
		}
    }
}