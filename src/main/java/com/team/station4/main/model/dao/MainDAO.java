package com.team.station4.main.model.dao;

import com.team.station4.main.model.MainDTO;

public interface MainDAO {
	
	void memberInsert(MainDTO member);
	String emCheck(MainDTO dto);
	int log1Check(MainDTO dto);
	int log2Check(MainDTO dto);
	String memName(MainDTO dto);
	MainDTO mainSecurity(String mem_email);
	int chkPw(MainDTO dto);
	void changeInfo(MainDTO dto);
}
