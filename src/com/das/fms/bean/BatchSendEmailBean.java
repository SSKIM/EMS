package com.das.fms.bean;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.das.fms.bean.dasUtil;

public class BatchSendEmailBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse respon) throws Exception {
		// 1. get parameter
		String userId    = (String)CommonUtil.getParameter(request,"SESSION_USER_ID");
		String errMsg    = (String)CommonUtil.getParameter(request,"ERR_MSG");
		String mail = "sskay19@naver.com";
		String subject = "배치 결과 입니다.";


		// ---------------------------------------- 메일 발송 ---------------------------------------- //
		
//		if(result!=null) {
//			for(int i=0; i<result.size(); i++) {
//				recipents[i] = (String)((Map)result.get(i)).get("EMAIL");
//				details[i]   = (String)((Map)result.get(i)).get("JRNL_NO");
//			}

			dasUtil.sendEmail(mail, subject, errMsg);
		}
		// ---------------------------------------- 메일 발송 ---------------------------------------- //
}