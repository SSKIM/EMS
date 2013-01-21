package com.das.fms.vo;

import java.io.Serializable;

public class UserVO implements Serializable {
	private static final long serialVersionUID = 1L;
	private String userId;
	private String userName;
	private String userType;
	private String telNo;
	private String hpNo;
	private String email;
	private String emplId;
	private String deptCode;
	private String deptName;
	private String status;
	private String busiUnitType;
	private String ledgerType;
	private long   loginTime;
	private String sessinoId;
	private String lantype;
	private String l_status;
	private String last_log_dt;
	private String last_pwc_dt;

	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserType() {
		return userType;
	}
	public void setUserType(String userType) {
		this.userType = userType;
	}
	public String getTelNo() {
		return telNo;
	}
	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}
	public String getHpNo() {
		return hpNo;
	}
	public void setHpNo(String hpNo) {
		this.hpNo = hpNo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getEmplId() {
		return emplId;
	}
	public void setEmplId(String emplId) {
		this.emplId = emplId;
	}
	public String getDeptCode() {
		return deptCode;
	}
	public void setDeptCode(String deptCode) {
		this.deptCode = deptCode;
	}
	public String getDeptName() {
		return deptName;
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getBusiUnitType() {
		return busiUnitType;
	}
	public void setBusiUnitType(String busiUnitType) {
		this.busiUnitType = busiUnitType;
	}
	public String getLedgerType() {
		return ledgerType;
	}
	public void setLedgerType(String ledgerType) {
		this.ledgerType = ledgerType;
	}
	public String getSessinoId() {
		return sessinoId;
	}
	public void setSessinoId(String sessinoId) {
		this.sessinoId = sessinoId;
	}
	public void setLoginTime(long loginTime) {
		this.loginTime = loginTime;
	}
	public long getLoginTime() {
		return loginTime;
	}
	public String getDurationLoginTime() {
        long current   = System.currentTimeMillis();
        long durantion = current - loginTime;
        long d_hour    = (durantion/1000)/60/60;
        long d_min     = (durantion/1000)/60;
        long d_sec     = (durantion/1000)%60;
        return d_hour+"시간 "+d_min+"분 "+d_sec+"초";
	}
	public void setSessionId(String sessinoId) {
		this.sessinoId = sessinoId;
	}
	public String getSessionId() {
		return sessinoId;
	}
    public void setLantype(String lantype)
    {
        this.lantype = lantype;
    }
    public String getLantype()
    {
        return lantype;
    }
	public String getl_status() {
		return l_status;
	}
	public void setl_status(String l_status) {
		this.l_status = l_status;
	}
	public String getlast_log_dt() {
		return last_log_dt;
	}
	public void setlast_log_dt(String last_log_dt) {
		this.last_log_dt = last_log_dt;
	}
	public String getlast_pwc_dt() {
		return last_pwc_dt;
	}
	public void setlast_pwc_dt(String last_pwc_dt) {
		this.last_pwc_dt = last_pwc_dt;
	}
}