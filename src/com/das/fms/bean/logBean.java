package com.das.fms.bean;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.mindtree.framework.util.Endec;
import com.mindtree.framework.util.GLOBAL;

public class logBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());
	private String userId = "";

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 1. get parameter
		String histGrp   = (String)((Map)(((Map)request.getAttribute("RESULT_SET"))).get("dataPK")).get("GET_NO");
		String userId    = (String)CommonUtil.getParameter(request,"SESSION_USER_ID");
		String transType = (String)CommonUtil.getParameter(request,"TRANS_TYPE");
		String transFlag = (String)CommonUtil.getParameter(request,"TRANS_FLAG");
		String errMsg    = (String)CommonUtil.getParameter(request,"ERR_MSG");
		List   logParam  = null;
		try {
			request.setAttribute("HIST_GRP",histGrp);
			// 2. validate Parameter
			String validParam = validateEssential(request);
			if(!"OK".equals(validParam)) {
				if(log.isDebugEnabled()) {
					log.debug("parameterEssential Fail : "+validParam);
				}
				returnError(request, "W001", validParam);
				return;
			}

			String errorCode = (String)request.getAttribute(GLOBAL.RETURN_CODE);
			if(!CommonUtil.nullOrEmpty(errorCode)) {
				String errorMessage = (String)request.getAttribute(GLOBAL.RETURN_MESSAGE);
				String errorDetail  = (String)request.getAttribute(GLOBAL.RETURN_DETAIL);
				
				logParam = new ArrayList();
				logParam.add(histGrp);
				logParam.add(transType);
				logParam.add("L");
				logParam.add(CommonUtil.getDateString("yyyyMMdd"));
				logParam.add(CommonUtil.getDateString("HHmmss"));
				logParam.add(0);
				logParam.add(errorCode);
				logParam.add(errorMessage+" "+errorDetail);
				logParam.add(userId);
				execute(logParam);
			}
			
			// 3. set parameter
			logParam = new ArrayList();
			logParam.add(histGrp);
			logParam.add(transType);
			logParam.add(transFlag);
			logParam.add(CommonUtil.getDateString("yyyyMMdd"));
			logParam.add(CommonUtil.getDateString("HHmmss"));
			logParam.add(0);
			logParam.add("");
			logParam.add(errMsg);
			logParam.add(userId);
			execute(logParam);

		} catch(Exception e) {
			try {
				logParam = new ArrayList();
				logParam.add(histGrp);
				logParam.add(transType);
				logParam.add(transFlag);
				logParam.add(CommonUtil.getDateString("yyyyMMdd"));
				logParam.add(CommonUtil.getDateString("HHmmss"));
				logParam.add(0);
				logParam.add("");
				logParam.add(e.getMessage());
				logParam.add(userId);
				this.procedure = "UP_BATCH_LOG";
				execute(logParam);
			} catch(Exception e2) {
				log.error(e2);
			}
		}
    }
}