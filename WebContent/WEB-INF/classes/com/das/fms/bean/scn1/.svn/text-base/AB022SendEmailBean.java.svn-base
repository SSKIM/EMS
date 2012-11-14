package com.das.fms.bean.scn1;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.das.fms.bean.dasUtil;

public class AB022SendEmailBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 1. get parameter
		String jrnlNo = request.getParameter((String)CommonUtil.getParameter(request,"DATATABLE"));
		String reason = (String)CommonUtil.getParameter(request,"REJECT_REASON");
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
		List params = new ArrayList();
		params.add(jrnlNo);
		// 4. execute
		List result = selectList(params);
		// 5. return
		//returnValue2(request, result);

		// ---------------------------------------- 메일 발송 ---------------------------------------- //
		
		String[] recipents = new String[result.size()];
		String[] details   = new String[result.size()];
		if(result!=null) {
			for(int i=0; i<result.size(); i++) {
				recipents[i] = (String)((Map)result.get(i)).get("EMAIL");
				details[i]   = (String)((Map)result.get(i)).get("JRNL_NO");
			}

			reason.concat("\n").concat(jrnlNo.replaceAll("\\|",","));

			dasUtil.sendEmail(recipents, "전표반려 되었습니다", reason, details);
		}
		// ---------------------------------------- 메일 발송 ---------------------------------------- //
	}
}