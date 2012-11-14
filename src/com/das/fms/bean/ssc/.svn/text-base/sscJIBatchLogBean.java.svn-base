package com.das.fms.bean.ssc;

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

public class sscJIBatchLogBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());
	private String userId = "";

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String histGrp   = (String)CommonUtil.getParameter(request,"HIST_GRP");
		String transType = (String)CommonUtil.getParameter(request,"TRANS_TYPE");
		String transFlag = "L";
		List   logParam  = null;

		try {
			String validParam = validateEssential(request);
			if(!"OK".equals(validParam)) {
				if(log.isDebugEnabled()) {
					log.debug("parameterEssential Fail : "+validParam);
				}
				returnError(request, "W001", validParam);
				return;
			}

			List params = bindParameter(request);

			execute(params);

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