package com.das.fms.bean.scn1;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.das.fms.vo.UserVO;

public class AB051ReconSetBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// 1. get parameter
			UserVO userVO    = (UserVO)CommonUtil.getUserSession(request);
			String getNo     = (String)((Map)(((Map)request.getAttribute("RESULT_SET"))).get("dataPK")).get("GET_NO");
			String getDate   = (String)((Map)(((Map)request.getAttribute("RESULT_SET"))).get("dataPK")).get("GET_DATE");
			String data1     = request.getParameter((String)CommonUtil.getParameter(request,"DATATABLE"));

			String[] data11 = null, data12 = null;
			if(!CommonUtil.nullOrEmpty(data1)) {
				data11 = data1.split("\\|");
			}
			// Parameter 유효성검사
			String validParam = validateEssential(request);
			if(!"OK".equals(validParam)) {
				if(log.isDebugEnabled()) {
					log.debug("parameterEssential Fail : "+validParam);
				}
				returnError(request, "W001", validParam);
				return;
			}
			// 
			List[] params = new ArrayList[data11.length];
			if(!CommonUtil.nullOrEmpty(data1)) {
				for(int i=0; i<data11.length; i++) {
					params[i] = new ArrayList();
					params[i].add(getNo);
					params[i].add(getDate);
					params[i].add(userVO.getUserId());
					params[i].add(userVO.getUserName());

					data12 = data11[i].split("\\^");
					for(int j=0; j<data12.length; j++) {
						params[i].add(data12[j]);
					}
				}
			}
			// 4. execute
			Map result = execute(params);			
			// 5. return
			returnValue2(request, result);
		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
			throw e;
		}
    }
}