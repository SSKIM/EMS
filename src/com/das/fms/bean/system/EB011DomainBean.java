package com.das.fms.bean.system;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import com.mindtree.framework.bean.CommandServlet;
import com.mindtree.framework.util.CommonUtil;
import com.mindtree.framework.util.Endec;

import java.util.*;

import javax.naming.*;
import javax.naming.directory.*;


public class EB011DomainBean extends CommandServlet {
	
	private final Logger log = Logger.getLogger(this.getClass());
	public static String usersContainer = "";
	public static String LogInID = "";
	public static String LogInPassword = "";

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			// 1. GET PARAMETER
			//LogInID = (String)CommonUtil.getParameter(request, "DOMAIN_USER");
			//LogInPassword = (String)CommonUtil.getParameter(request, "DOMAIN_USER");
			String Domin_user		= (String)CommonUtil.getParameter(request, "DOMAIN_USER");
			String displayName		= "";
			String description		= "";
			String department		= "";
			String Domin_name		= (String)CommonUtil.getParameter(request, "DOMAIN_NAME");
			String Cn				= "";
			String[] Cn_St			= null;
			String Ou				= (String)CommonUtil.getParameter(request, "OU");
			
			// 2. VALIDATE PARAMETER
			if(Domin_user.length() > 0){
				Domin_user = "*"+Domin_user+"*";
			}
			else{
				Domin_user = "*";
			}
			if(CommonUtil.nullOrEmpty(Domin_name)) {
				Domin_name = "SFAP.ASIAPACIFIC.BMW.CORP";
				Cn = "DC=sfap,DC=asiapacific,DC=bmw,DC=corp";
			}
			else{
				 Cn_St = Domin_name.split("\\.");
			
				for(int i=0;i<Cn_St.length;i++){
					Cn += "dc="+Cn_St[i].toString()+",";
				}
				Cn = Cn.substring(0, Cn.length()-1);
			}
			usersContainer = "ou=user,ou=291,ou=Accounts";
			usersContainer += ","+Cn; 
			
			
			// 3. SET PARAMETER
			Hashtable env = new Hashtable();
			List<Object> param = new ArrayList<Object>();
			String param2 = "";
			String param3 = "";
			String param4 = "";
			String param5 = "";
	    	
			env.put("com.sun.jndi.ldap.connect.pool", "true");
			env.put("java.naming.security.principal", "qqtstaff6@SFAP.ASIAPACIFIC.BMW.CORP");
			env.put("java.naming.security.credentials", "adsf1212");
			env.put("com.sun.jndi.ldap.connect.pool.authentication", "DIGEST-MD5");
			env.put(Context.INITIAL_CONTEXT_FACTORY,"com.sun.jndi.ldap.LdapCtxFactory");
			env.put(Context.PROVIDER_URL,"LDAP://HAP1KRS00:389"); //replace with your server URL/IP 
			env.put(Context.REFERRAL, "follow");

			DirContext ctx = new InitialDirContext(env);
			
			SearchControls ctls = new SearchControls();
			String[] attrIDs = {"cn","displayName","description","department","ObjectClass"};
			ctls.setReturningAttributes(attrIDs);
			ctls.setSearchScope(SearchControls.ONELEVEL_SCOPE);

			NamingEnumeration answer = ctx.search( usersContainer, "(&(objectClass=*)(objectCategory=person)(cn="+Domin_user+"))",ctls );
			while(answer.hasMore()) {
				SearchResult rslt = (SearchResult)answer.next();
				Attributes attrs = rslt.getAttributes();
				if(attrs.get("cn") != null){
					Domin_user = attrs.get("cn").toString().replace("cn: ", "");
					Domin_user = Domin_user.replace(",", "");
				}
				else{
					Domin_user = "";
				}
				if(attrs.get("displayName") != null){
					displayName = attrs.get("displayName").toString().replace("displayName: ", "");
					displayName = displayName.replace(",", "");
				}
				else{
					displayName = "";
				}
				if(attrs.get("description") != null){
					description = attrs.get("description").toString().replace("description: ", "");
					description = description.replace(",", "");
				}
				else{
					description ="";
				}
				if(attrs.get("department") != null){
					department = attrs.get("department").toString().replace("department: ", "");
					department = department.replace(",", "");
				}
				else{
					department = "";
				}
				
				param2 +=Domin_user+"|";
				param3 +=displayName+"|";
				param4 +=description+"|";
				param5 +=department+"|";
				
			}
			ctx.close();
			
			param.add(param2);
			param.add(param3);
			param.add(param4);
			param.add(param5);
			param.add(Domin_name);
			
			List<Map<String,Object>> result = selectList(param);
			// 5. RESULT
			returnValue(request, result);

		} catch(Exception e) {
			returnError(request, "조회 내용이 잘못되었습니다.");
		}
    }
}
