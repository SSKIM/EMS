package com.das.fms.bean.ssc;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.systemsunion.ssc.client.SecurityProvider;
import com.systemsunion.ssc.client.ComponentExecutor;

public class sscInsertBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());
	private String _securityProvider  = "nklsun";

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			SecurityProvider sp = new SecurityProvider(_securityProvider, false);
			String _SSCVoucher = sp.Authenticate("FMS", "sunsys");

			if(_SSCVoucher != "" && _SSCVoucher != null) {	
				
			}

			sp = null;

			StringBuffer queryString = new StringBuffer()
			.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
	        .append("<SSC>")
            .append("    <ErrorContext>")
            .append("        <CompatibilityMode></CompatibilityMode>")
            .append("        <ErrorOutput></ErrorOutput>")
            .append("        <ErrorThreshold></ErrorThreshold>")
            .append("    </ErrorContext>")
	        .append("    <User>")
	        .append("        <Name>FMS</Name>")
	        .append("    </User>")
	        .append("    <SunSystemsContext>")
	        .append("        <BusinessUnit>NK2</BusinessUnit>")
	        .append("    </SunSystemsContext>")
	        .append("    <Payload>")
	        .append("		<Address>")
	        .append("			<AddressCode>DEMO1</AddressCode>")
	        .append("			<AddressLine1>My Street</AddressLine1>")
	        .append("			<TownCity>My Town</TownCity>")
	        .append("			<TelephoneNumber>01234 567890</TelephoneNumber>")
	        .append("			<LookupCode>DEMO1</LookupCode>")
	        .append("		</Address>")
	        .append("    </Payload>")
	        .append("</SSC>")
			;

			ComponentExecutor SSC = new ComponentExecutor(_securityProvider, false);
			try {
				String result = SSC.Execute(_SSCVoucher, null, "Address", "CreateOrAmend", null, queryString.toString());
				request.setAttribute("SSC_DATA", result);
			} catch(Exception ex) {
				returnError(request, "E001", ex.getMessage());
			}
			SSC = null;
		} catch(Exception e) {
//			log.error(e);
			returnError(request, e.getMessage());
			throw e;
		}
    }
}