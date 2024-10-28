package com.gdg.nmit.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gdg.nmit.dto.EventRegisterPayload;
import com.gdg.nmit.entity.EventRegisterEntity;
import com.gdg.nmit.entity.EventTable;
import com.gdg.nmit.repository.EventRegisterRepository;
import com.gdg.nmit.repository.eventTableRepository;
import com.gdg.nmit.service.EventRegisterService;

@Service
public class EventRegisterServiceImpl implements EventRegisterService{

	@Autowired
	private eventTableRepository eventTablerepository;
	
	@Autowired
	private EventRegisterRepository eventRegisterRepository;
	
	@Override
	public String RegisterForEvent(EventRegisterPayload payload) {
		EventRegisterEntity registerDetails=new EventRegisterEntity();
		registerDetails.setUsn(payload.getUsn());
		registerDetails.setBranch(payload.getBranch());
		registerDetails.setEvent_name(payload.getEvent_name());
		String event_id=eventTablerepository.findByEventNameId(payload.getEvent_name());
		registerDetails.setEvent_id(event_id);
		registerDetails.setMailid(payload.getMailid());
		registerDetails.setPhoneno(payload.getPhoneno());
		registerDetails.setSemester(payload.getSemester());
		registerDetails.setName(payload.getName());
		eventRegisterRepository.save(registerDetails);
		return "Register Successfull";
	}

	@Override
	public List<EventRegisterEntity> findRegisteredEvents(String username) {
		return eventRegisterRepository.findByname(username);
	}
}
