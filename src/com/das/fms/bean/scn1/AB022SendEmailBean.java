package com.das.fms.bean.scn1;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

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

			//dasUtil.sendEmail(recipents, "전표반려 되었습니다", reason, details);
			sendEmail(recipents, "전표반려 되었습니다", reason, details);
			
		}
		// ---------------------------------------- 메일 발송 ---------------------------------------- //
	}
	/*
	 * 작성자	: 김 성 수
	 * 기능		: 메일 보내기
	 * 파라메터	: (메일 제목, 내용) 
	 */
    public static void sendEmail(String[] mailAddr,String subject, String content, String[] detaile) throws Exception {
    	
        String host = "FMS2008";//smtp 서버
        String fromName = "SUNGL";
        String fromEmail = "BMW@EMS.com";
        try{
            // 프로퍼티 값 인스턴스 생성과 기본세션(SMTP 서버 호스트 지정)
            Properties props = new Properties();

            props.put("mail.transport.protocol", "smtp");
            props.put("mail.smtp.host", host);
            props.put("mail.smtp.port", "25");
            props.put("mail.smtp.user", fromEmail);
            Session mailSession = Session.getDefaultInstance(props);
            
            Message msg = new MimeMessage(mailSession);
            msg.setFrom(new InternetAddress(fromEmail, MimeUtility.encodeText(fromName,"UTF-8","B")));//보내는 사람 설정
            String Maile1 = mailAddr[0];
            String Maile2 = "sskay19@naver.com";
            InternetAddress[] address = {new InternetAddress(Maile1), new InternetAddress(Maile2)};
            msg.setRecipients(Message.RecipientType.TO, address);//받는 사람설정
            msg.setSubject(subject+" Journal No: "+detaile[0]);// 제목 설정
            msg.setSentDate(new java.util.Date());// 보내는 날짜 설정
            msg.setContent(content,"text/html;charset=euc-kr"); // 내용 설정 (HTML 형식)
            Transport.send(msg); // 메일 보내기
            
            System.out.println("메일 발송을 완료하였습니다.");
        } catch ( MessagingException ex ) {
            System.out.println("mail send error : " + ex.getMessage());
        } catch ( Exception e ) {
            System.out.println("error : " + e.getMessage());
        }
    }	
	
}