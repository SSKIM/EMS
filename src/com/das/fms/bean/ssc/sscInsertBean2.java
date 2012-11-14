package com.das.fms.bean.ssc;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.systemsunion.ssc.client.SecurityProvider;
import com.systemsunion.ssc.client.ComponentExecutor;

public class sscInsertBean2 extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());
	private String _securityProvider  = "172.28.146.153";

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			SecurityProvider sp = new SecurityProvider(_securityProvider, false);
			String _SSCVoucher = sp.Authenticate("BAT", "sunsys");

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
	        .append("        <Name>BAT</Name>")
	        .append("    </User>")
	        .append("    <SunSystemsContext>")
	        .append("        <BusinessUnit>Z01</BusinessUnit>")
	        .append("        <BudgetCode>A</BudgetCode>")
	        .append("    </SunSystemsContext>")
	        .append("    <MethodContext>")
	        .append("        <LedgerPostingParameters>")
	        .append("            <AllowBalTran></AllowBalTran>")
	        .append("            <AllowOverBudget></AllowOverBudget>")
	        .append("            <AllowPostToSuspended></AllowPostToSuspended>")
	        .append("            <BalancingOptions></BalancingOptions>")
	        .append("            <DefaultPeriod>0092010</DefaultPeriod>")
	        .append("            <Description>DIF</Description>")
	        .append("            <JournalType>EQBRO</JournalType>")
	        .append("            <LayoutCode>LIALL</LayoutCode>")
	        .append("            <PostToHold></PostToHold>")
	        .append("            <PostingType>2</PostingType>")
	        .append("            <Print></Print>")
	        .append("            <ReportErrorsOnly>Y</ReportErrorsOnly>")
	        .append("            <ReportingAccount>999999</ReportingAccount>")
	        .append("            <SuppressSubstitutedMessages></SuppressSubstitutedMessages>")
	        .append("            <SuspenseAccount>999999</SuspenseAccount>")
	        .append("            <TransactionAmountAccount>999999</TransactionAmountAccount>")
	        .append("        </LedgerPostingParameters>")
	        .append("    </MethodContext>")
	        .append("    <Payload>")
			.append("        <Ledger>")
			.append("            <Line>")
			.append("                <AccountCode>102320</AccountCode>")
			.append("                <AccountingPeriod>0092010</AccountingPeriod>")
			.append("                <AnalysisCode1>100</AnalysisCode1>")
			.append("                <AnalysisCode2></AnalysisCode2>")
			.append("                <AnalysisCode3></AnalysisCode3>")
			.append("                <AnalysisCode4></AnalysisCode4>")
			.append("                <AnalysisCode5></AnalysisCode5>")
			.append("                <AnalysisCode6>0</AnalysisCode6>")
			.append("                <AnalysisCode7></AnalysisCode7>")
			.append("                <AnalysisCode8></AnalysisCode8>")
			.append("                <AnalysisCode9></AnalysisCode9>")
			.append("                <AnalysisCode10></AnalysisCode10>")
			.append("                <AssetCode></AssetCode>")
			.append("                <AssetIndicator></AssetIndicator>")
			.append("                <AssetSubCode></AssetSubCode>")
			.append("                <BaseAmount>2000</BaseAmount>")
			.append("                <BaseOperator>*</BaseOperator>")
			.append("                <BaseRate>1.000000000</BaseRate>")
			.append("                <ConversionRate></ConversionRate>")
			.append("                <CurrencyCode></CurrencyCode>")
			.append("                <DebitCredit>D</DebitCredit>")
			.append("                <Description>테스트</Description>")
			.append("                <DueDate>06012011</DueDate>")
			.append("                <JournalLineNumber>2</JournalLineNumber>")
			.append("                <JournalSource>FMS</JournalSource>")
			.append("                <JournalType>PUG</JournalType>")
			.append("                <MemoAmount>1000</MemoAmount>")
			.append("                <TransactionAmount></TransactionAmount>")
			.append("                <TransactionAmountDecimalPlaces></TransactionAmountDecimalPlaces>")
			.append("                <TransactionDate>06012010</TransactionDate>")
			.append("                <TransactionReference>SSC002</TransactionReference>")
			.append("                <DetailLad>")
			.append("                    <AccountCode></AccountCode>")
			.append("                    <AccountingPeriod></AccountingPeriod>")
			.append("                    <GeneralDate1></GeneralDate1>")
			.append("                    <GeneralDescription1></GeneralDescription1>")
			.append("                    <GeneralDescription2></GeneralDescription2>")
			.append("                    <GeneralDescription3></GeneralDescription3>")
			.append("                    <GeneralDescription4></GeneralDescription4>")
			.append("                </DetailLad>")
			.append("            </Line>")
			.append("        </Ledger>")
	        .append("    </Payload>")
	        .append("    <ErrorMessages></ErrorMessages>")
	        .append("</SSC>")
			;

			ComponentExecutor SSC = new ComponentExecutor(_securityProvider, false);
			try {
				String result = SSC.Execute(_SSCVoucher, null, "Journal", "Import", null, queryString.toString());
				request.setAttribute("SSC_DATA", result);
			} catch(Exception ex) {
				log.error(ex);
				returnError(request, "E004", ex.getMessage()); //인터페이스 에러
			}
			SSC = null;
		} catch(Exception e) {
//			log.error(e);
			returnError(request, "E004", e.getMessage()); //인터페이스 에러
			throw e;
		}
    }
}