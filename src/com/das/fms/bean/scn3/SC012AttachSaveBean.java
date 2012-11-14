package com.das.fms.bean.scn3;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.net.URLDecoder;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;

public class SC012AttachSaveBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// 1. get parameter
			String data1  = request.getParameter((String)CommonUtil.getParameter(request,"DATATABLE"));
			Map resultSet = CommonUtil.getResultSet(request);
			String bltnId = (String)((Map)resultSet.get("dataPK")).get("BLTN_ID");
			long   bltnNo = CommonUtil.getLong(((Map)resultSet.get("dataPK")).get("BLTN_NO"));
			if(CommonUtil.nullOrEmpty(data1)) {
				return;
			}
			String[] data2 = null, data3 = null;
			if(!CommonUtil.nullOrEmpty(data1)) {
				data2 = data1.split(",");
			}
			// 2. validate parameter
			String validParam = validateEssential(request);
			if(!"OK".equals(validParam)) {
				if(log.isDebugEnabled()) {
					log.debug("parameterEssential Fail : "+validParam);
				}
				returnError(request, "W001", validParam);
				return;
			}
			// 3. set parameter
			List paramList = bindParameter(request);
			List[] params  = new ArrayList[data2.length];
			if(!CommonUtil.nullOrEmpty(data1)) {
				for(int i=0; i<data2.length; i++) {
					params[i] = new ArrayList();
					for(int k=0; k<paramList.size(); k++) {
						params[i].add(paramList.get(k));
					}
					params[i].add(bltnId+"-"+bltnNo);

					data3 = data2[i].split("\\|");
					for(int j=0; j<data3.length; j++) {
						params[i].add(CommonUtil.getString((data3[j])));
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