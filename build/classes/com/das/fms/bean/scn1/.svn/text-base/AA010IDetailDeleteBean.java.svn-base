package com.das.fms.bean.scn1;

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

public class AA010IDetailDeleteBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// 1. get parameter
			Map resultSet = (Map)request.getAttribute(GLOBAL.RESULT_SET);
			Map dataPK    = (Map)resultSet.get("dataPK");
			request.setAttribute("JRNL_SEQ", dataPK.get("JRNL_SEQ"));
			// Parameter 유효성검사
			String validParam = validateEssential(request);
			if(!"OK".equals(validParam)) {
				if(log.isDebugEnabled()) {
					log.debug("parameterEssential Fail : "+validParam);
				}
				returnError(request, "W001", validParam);
				return;
			}
			// Parameter 설정
			List param = bindParameter(request);
			// 4. execute
			Map result = execute(param);
			// 5.
			returnValue2(request, result);
		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
			throw e;
		}
    }
}