package com.das.fms.bean.ssc;

import java.io.ByteArrayInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;

import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.mindtree.framework.util.GLOBAL;
import com.systemsunion.ssc.client.SecurityProvider;
import com.systemsunion.ssc.client.ComponentExecutor;

public class sscJournalImportBean extends CommandServlet {
	private final Logger log = Logger.getLogger(this.getClass());
	private String _securityProvider  = "";
	private String _securityAccount   = "";
	private String _securityPassword  = "";
	ComponentExecutor SSC = null;
	List   logParam  = null;
	String sccResult = null;

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 1. get parameter
		String userId    = (String)CommonUtil.getParameter(request,"SESSION_USER_ID");
		try {
			String jrnlNo        = request.getParameter((String)CommonUtil.getParameter(request,"DATATABLE"));
			String busiUnitType  = (String)CommonUtil.getParameter(request,GLOBAL.SESSION_BUSI_UNIT_TYPE);
			String ledgerType    = (String)CommonUtil.getParameter(request,GLOBAL.SESSION_LEDGER_TYPE);
			String currDate      = CommonUtil.getToday("yyyy-MM-dd HH:mm");
			String ssjrnlNo      = ""; //SunSystems에서 반환받은 전표번호

			if(CommonUtil.nullOrEmpty(jrnlNo)) {
				//지급전표에서...
				jrnlNo           = (String)CommonUtil.getParameter(request, "JRNL_NO");
			}

			Map  resultSet = (Map)request.getAttribute("RESULT_SET");
			Map  authInfo  = (Map)resultSet.get("AUTH_INFO");

			StringBuffer paramsString = new StringBuffer();
			List paramList = (List)resultSet.get("PARAM_LIST");
	        for(int i=0; i<paramList.size(); i++) {
	        	Map cols = (Map)paramList.get(i);
	        	paramsString.append("<").append(cols.get("TAG_NAME")).append(">").append(cols.get("TAG_VALUE")).append("</").append(cols.get("TAG_NAME")).append(">");	
	        }

			_securityProvider = (String)authInfo.get("ETC1");
			_securityAccount  = (String)authInfo.get("ETC2");
			_securityPassword = (String)authInfo.get("ETC3");

			List param = new ArrayList();
			param.add(jrnlNo);

			List result = selectList(param);

			if(result==null || result.size()==0) {
				returnError(request, "E004", "I/F 전표발행 대상 정보가 없습니다.");
				SSC = null;
				return;
			}

			SecurityProvider sp = new SecurityProvider(_securityProvider, false);
			String _SSCVoucher = sp.Authenticate(_securityAccount,_securityPassword);

			if(_SSCVoucher != "" && _SSCVoucher != null) {	
			}

			sp = null;
			StringBuffer queryString = null;

			queryString = new StringBuffer();
			queryString.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
	        queryString.append("<SSC>");
            queryString.append("    <ErrorContext>");
            queryString.append("        <CompatibilityMode></CompatibilityMode>");
            queryString.append("        <ErrorOutput></ErrorOutput>");
            queryString.append("        <ErrorThreshold></ErrorThreshold>");
            queryString.append("    </ErrorContext>");
	        queryString.append("    <User>");
	        queryString.append("        <Name>").append(_securityAccount).append("</Name>");
	        queryString.append("    </User>");
	        queryString.append("    <SunSystemsContext>");
	        queryString.append("        <BusinessUnit>").append(busiUnitType).append("</BusinessUnit>");
	        queryString.append("        <BudgetCode>").append(ledgerType).append("</BudgetCode>");
	        queryString.append("    </SunSystemsContext>");
	        queryString.append("    <MethodContext>");
	        queryString.append("        <LedgerPostingParameters>");
	        queryString.append("            <Description>DFS Interface 전표정보 ").append(currDate).append("</Description>");

	        queryString.append(paramsString.toString());

	        queryString.append("        </LedgerPostingParameters>");
	        queryString.append("    </MethodContext>");
	        queryString.append("    <Payload>");
			queryString.append("        <Ledger>");

			for(int j=0; j<result.size(); j++) {
				queryString.append(((Map)result.get(j)).get("LEDGER_LINE"));
			}

			queryString.append("        </Ledger>");
	        queryString.append("    </Payload>");
	        queryString.append("    <ErrorMessages></ErrorMessages>");
	        queryString.append("</SSC>");

log.debug(queryString.toString());

			SSC = new ComponentExecutor(_securityProvider, false);
			try {
				sccResult = SSC.Execute(_SSCVoucher, null, "Journal", "Import", null, queryString.toString());

log.debug(sccResult);

				SAXBuilder bdr  = new SAXBuilder();
				Document   doc  = bdr.build(new ByteArrayInputStream(new String(sccResult.getBytes("8859_1"),"UTF-8").getBytes()));
				Element    root = doc.getRootElement();
				
				List retVal1 = new ArrayList();
				Map  retVal2 = null;
				Map  retVal3 = null;
				StringBuffer sb3 = null;
				int  j = 0;
				
				boolean isSuccess = true;
				List<Element> elements1 = root.getChildren();
				for(Element element1 : elements1) {
					if(element1.getName().equals("Payload")) {
						List<Element> elements2 = element1.getChildren();
						for(Element element2 : elements2) {
							if(element2.getName().equals("Ledger")) {
								List<Element> elements3 = element2.getChildren();
								for(Element element3 : elements3) {
									if(element3.getName().equals("Line")) {
										retVal2 = new HashMap();
										retVal2.put("LINE_NO", element3.getAttributeValue("Reference"));
										retVal2.put("STATUS",  element3.getAttributeValue("status"));

										if(element3.getAttributeValue("status").equals("fail"))
											isSuccess = false;

										j = 0;
//										retVal3 = new HashMap();
										sb3 = new StringBuffer();
										List<Element> elements4 = element3.getChildren();
										for(Element element4 : elements4) {
											if(element4.getName().equals("Messages")) {
												List<Element> elements5 = element4.getChildren();
												for(Element element5 : elements5) {
													if(element5.getName().equals("Message")) {
														if(element5.getAttributeValue("Level").equals("error")) {
															List<Element> elements6 = element5.getChildren();
															for(Element element6 : elements6) {
																if(element6.getName().equals("UserText")) {
																	j++;
//																	retVal3.put("UserText"+j, element6.getText().trim());
																	if(j>1) sb3.append("|");
																	sb3.append(element6.getText().trim());
																}
															}
														}
													}
												}
											}
											if(element4.getName().equals("JournalNumber")) {
												if(ssjrnlNo==null || ssjrnlNo=="")
													ssjrnlNo = element4.getText();
											}
										}

										retVal2.put("UserText", sb3.toString());
										retVal1.add(retVal2);
									}
								}
							}
						}
					}
				}
				if(isSuccess && !CommonUtil.nullOrEmpty(ssjrnlNo)) {
					try {
						List p = new ArrayList();
						p.add(jrnlNo);
						p.add(ssjrnlNo);
						this.procedure = "UP_AB021U_JRNL";
						execute(p);
					} catch(Exception e) {
						// 일부러 Exception 발생 막음. SunSystems에서 성공시 전체 rollback 방지.
					}
				}
				Map<String,Object> resultSet2 = (Map<String,Object>)request.getAttribute(GLOBAL.RESULT_SET);
				resultSet2.put("SS_JRNL_NO", ssjrnlNo);
				resultSet2.put("SS_STATUS",  isSuccess);

				request.setAttribute("SS_JRNL_NO", ssjrnlNo);
				request.setAttribute("SS_STATUS",  isSuccess);

				if(!isSuccess) {
					returnError(request, "E004", "I/F 중 에러발생"); //인터페이스 에러
				}
				returnValue(request, retVal1);
			} catch(Exception ex) {
				log.error(ex);
				returnError(request, "E004", ex.getMessage());
			}
			SSC = null;
		} catch(Exception e) {
			log.error(e);
			returnError(request, "E004", e.getMessage());
		} finally {
			SSC = null;
		}
    }
}