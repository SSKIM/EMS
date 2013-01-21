package com.das.fms.bean;

import java.net.URL;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;
import org.apache.commons.mail.HtmlEmail;
import org.apache.commons.mail.MultiPartEmail;
import org.apache.commons.mail.EmailAttachment;
import org.apache.log4j.Logger;
import com.mindtree.framework.util.CommonUtil;

public class dasUtil {
	private static final Logger log = Logger.getLogger("dasUtil");
	public static String downloadPath = "http://10.100.100.226:8091/dfs/common/file/download/";
	public static String charset      = "EUC-KR";
	public static String hostname     = "FMS2008.mytest-dns.com";
	public static String fromEmail    = "DFS_Admin@das.co.kr";
	public static String[] toEmail    = {"DFS_Admin@das.co.kr"};

	// DFS_Admin / Welcome1!

	///////////////////////////////////////////////////////////////////////////////////////////////
	
    public static void sendEmail(String errorMessage) throws Exception {
	    sendEmail("제목없음!",errorMessage);
    }
    public static void sendEmail(String subject, String errorMessage) throws Exception {
	    sendEmail(toEmail, "제목없음!",errorMessage);
    }
    public static void sendEmail2(String subject, String errorMessage) throws Exception {
	    sendEmail(toEmail, "SS I/F FAIL!",errorMessage);
    }
    public static void sendEmail(String[] recipents, String subject, String errorMessage) throws Exception {
    	Email email = new SimpleEmail();
	    email.setCharset(dasUtil.charset);
	    email.setHostName(dasUtil.hostname);
//	    email.setSmtpPort(4989);
//	    email.setAuthenticator(new DefaultAuthenticator("miran.kim", "kd9999i"));
//	    email.setTLS(true);
	    email.setFrom(dasUtil.fromEmail);

	    for(int i=0; i<recipents.length; i++) {
	    	email.addTo(recipents[i]);
	    }

	    email.setSubject(subject);
	    //email.setContent(errorMessage, "text/plain; charset=euc-kr");
	    email.setMsg(errorMessage);
	    email.send();
    }
    public static void sendEmail(String recipents, String subject, String errorMessage) throws Exception {
    	Email email = new SimpleEmail();
	    email.setCharset(dasUtil.charset);
	    email.setHostName(dasUtil.hostname);
//	    email.setSmtpPort(4989);
//	    email.setAuthenticator(new DefaultAuthenticator("miran.kim", "kd9999i"));
//	    email.setTLS(true);
	    email.setFrom(dasUtil.fromEmail);

//	    for(int i=0; i<recipents.length; i++) {
//	    	email.addTo(recipents[i]);
//	    }

	    email.setSubject(subject);
	    //email.setContent(errorMessage, "text/plain; charset=euc-kr");
	    email.setMsg(errorMessage);
	    email.send();
    }
    public static void sendEmail(String[] recipents, String subject, String errorMessage, String[] detail) throws Exception {
    	Email email = new SimpleEmail();
	    email.setCharset(dasUtil.charset);
	    email.setHostName(dasUtil.hostname);
//	    email.setSmtpPort(4989);
//	    email.setAuthenticator(new DefaultAuthenticator("miran.kim", "kd9999i"));
//	    email.setTLS(true);
	    email.setFrom(dasUtil.fromEmail);

	    for(int i=0; i<recipents.length; i++) {
	    	if(!CommonUtil.nullOrEmpty(recipents[i])) {
		    	email.addTo(recipents[i]);
			    email.setSubject(subject);
			    //email.setContent(errorMessage, "text/plain; charset=euc-kr");
			    email.setMsg(errorMessage+"\n"+detail[i]);
			    email.send();
	    	}
	    }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    public static void sendEmailH(String errorMessage) throws Exception {
    	StringBuffer sb = new StringBuffer();
    	sb.append("<html><head>제목</head><body>");
    	sb.append(errorMessage);
    	sb.append("</body></html>");

    	HtmlEmail email = new HtmlEmail();
	    email.setCharset(dasUtil.charset);
	    email.setHostName(dasUtil.hostname);
	    email.setFrom(dasUtil.fromEmail);
	    for(int i=0; i<toEmail.length; i++) {
	    	email.addTo(toEmail[i]);
	    }
	    email.setSubject(" ");

        email.setHtmlMsg(sb.toString());
        email.send();
    }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
    public static void sendEmailA(String errorMessage, String fileName) throws Exception {
		EmailAttachment attachment = new EmailAttachment();
    	if(!CommonUtil.nullOrEmpty(fileName)) {
	    	attachment.setURL(new URL(downloadPath+fileName));
	    	attachment.setDisposition(EmailAttachment.ATTACHMENT);
//		    	attachment.setDescription("ProductionPlan");
	    	attachment.setName(fileName);
		}
    	MultiPartEmail email = new MultiPartEmail();
	    email.setCharset(dasUtil.charset);
	    email.setHostName(dasUtil.hostname);
	    email.setFrom(dasUtil.fromEmail);
	    for(int i=0; i<toEmail.length; i++) {
	    	email.addTo(toEmail[i]);
	    }
	    email.setSubject(" ");

	    email.setMsg(errorMessage);
	    if(!CommonUtil.nullOrEmpty(fileName)) {
	    	email.attach(attachment);
	    }
	    email.send();
    }
}