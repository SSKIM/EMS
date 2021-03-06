package com.das.fms.bean.scn3;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.mindtree.framework.util.Endec;

public class SA010IDetailSaveBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// 1. get parameter
			String userId  = (String)CommonUtil.getParameter(request, "SESSION_USER_ID");
			String tpltId  = (String)CommonUtil.getParameter(request, "TPLT_ID");
			String data1   = request.getParameter((String)CommonUtil.getParameter(request,"DATATABLE"));

			if(CommonUtil.nullOrEmpty(tpltId)) {
				long tplt = CommonUtil.getLong(((Map)(((Map)request.getAttribute("RESULT_SET"))).get("dataPK")).get("TPLT_ID"));
				tpltId = String.valueOf(tplt);
				request.setAttribute("TPLT_ID",tpltId);
			}

			String[] data2 = null, data3 = null;
			if(!CommonUtil.nullOrEmpty(data1)) {
				data2 = data1.split("\\|");
			} else {
				return;
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
			List[] params = new ArrayList[data2.length];
			if(!CommonUtil.nullOrEmpty(data1)) {
				for(int i=0; i<data2.length; i++) {
					params[i] = new ArrayList();
					params[i].add(tpltId);
					params[i].add(userId);

					data3 = data2[i].split("\\^");
					for(int j=0; j<data3.length; j++) {
						params[i].add(CommonUtil.getString(data3[j]));
					}
				}
			}
			// 4. execute
			Map result = execute(params);
			// 5.
			returnValue2(request, result);
		} catch(Exception e) {
			log.error(e);
			returnError(request, e.getMessage());
			throw e;
		}
    }
}