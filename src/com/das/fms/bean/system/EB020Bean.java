package com.das.fms.bean.system;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.mindtree.framework.bean.CommandServlet;

import java.util.*;


public class EB020Bean extends CommandServlet {

	public void execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		try {
			List<Map<String,Object>> result = selectList();
			
			returnValue(request, result);
		} catch(Exception e) {
			returnError(request, "조회 내용이 잘못되었습니다.");
		}
    }
}
