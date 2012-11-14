package com.das.fms.bean.ssc;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.systemsunion.ssc.client.SecurityProvider;
import com.systemsunion.ssc.client.ComponentExecutor;

public class sscAnalysisCodesBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());
	private String _securityProvider  = "nklsun";

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			String ANALYISS_TYPE = (String)CommonUtil.getParameter(request, "ANALYISS_TYPE"); //PAYMENTMETHOD,EMPLOYEE,DEPT

			SecurityProvider sp = new SecurityProvider(_securityProvider, false);
			String _SSCVoucher = sp.Authenticate("FMS", "sunsys");

			if(_SSCVoucher != "" && _SSCVoucher != null) {	
				
			}

			sp = null;

			StringBuffer queryString = new StringBuffer()
			.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
			.append("<SSC>")
//			.append("    <ErrorContext>")
//			.append("        <CompatibilityMode></CompatibilityMode>")
//			.append("        <ErrorOutput></ErrorOutput>")
//			.append("        <ErrorThreshold></ErrorThreshold>")
//			.append("    </ErrorContext>")
			.append("    <User>")
			.append("        <Name>FMS</Name>")
			.append("    </User>")
			.append("    <SunSystemsContext>")
			.append("        <BusinessUnit>NK2</BusinessUnit>")
			.append("    </SunSystemsContext>")
			.append("    <Payload>")
	        .append("        <Filter>")
//	        .append("        	<Expr operator=\"AND\">")
	        .append("        		<Item name=\"/AnalysisCodes/AnalysisCatID/AnlCat_SHead\" operator=\"LIKE\" value=\""+ANALYISS_TYPE+"%\"/>")
//	        .append("        	</Expr>")
	        .append("        </Filter>")
			.append("        <Select>")
			.append("			<AnalysisCodes>")
//			.append("				<AnalysisDimensionId></AnalysisDimensionId>")
//			.append("               <AnalysisCode></AnalysisCode>")
			.append("               <LookupCode></LookupCode>")
			.append("               <Name></Name>")
//			.append("               <Status></Status>")
//			.append("               <ProhibitPosting></ProhibitPosting>")
//			.append("               <DataAccessGroupCode></DataAccessGroupCode>")
//			.append("               <BudgetStop></BudgetStop>")
//			.append("               <BudgetChecking></BudgetChecking>")
//			.append("               <BudgetNavigationMethod></BudgetNavigationMethod>")
//			.append("               <CombinedBudgetCheck></CombinedBudgetCheck>")
//			.append("               <DateTimeLastUpdated></DateTimeLastUpdated>")
			.append("			</AnalysisCodes>")
			.append("		</Select>")
			.append("	</Payload>")
			.append("</SSC>")
			;

			ComponentExecutor SSC = new ComponentExecutor(_securityProvider, false);
			try {
				String result = SSC.Execute(_SSCVoucher, null, "AnalysisCodes", "Query", null, queryString.toString());
				request.setAttribute("SSC_DATA", result);
				System.out.println(result);
			} catch(Exception ex) {
				returnError(request, "E004", ex.toString());
			}
			SSC = null;
		} catch(Exception e) {
//			log.error(e);
			returnError(request, "E004", e.toString());
			throw e;
		}
    }
}