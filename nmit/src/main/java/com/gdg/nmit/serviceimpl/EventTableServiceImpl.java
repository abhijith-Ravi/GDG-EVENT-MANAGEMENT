package com.gdg.nmit.serviceimpl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gdg.nmit.dto.addEventPayload;
import com.gdg.nmit.entity.EventTable;
import com.gdg.nmit.repository.EventRegisterRepository;
import com.gdg.nmit.repository.eventTableRepository;
import com.gdg.nmit.service.eventTableService;
@Service
public class EventTableServiceImpl implements eventTableService
{
	@Autowired
	private EventRegisterRepository eventRegisterRepository;
	
	@Autowired
	private eventTableRepository  eventtableRepository;
	
	@Override
	public Boolean addEvents(addEventPayload payload) {
EventTable event=new EventTable();
EventTable eveentexist= eventtableRepository.findByEventName(payload.getEvent_name());
if(eveentexist!=null) {
	return false;
}
event.setEvent_name(payload.getEvent_name());
event.setDescription(payload.getDescription());
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
event.setDate(LocalDateTime.parse(payload.getDate(), formatter));
event.setLocation(payload.getLocation());
eventtableRepository.save(event);
return true;
	}

	@Override
	public List<EventTable> findAllEvents() {
		return eventtableRepository.findAll();
	}

	@Override
	public EventTable findByEventName(String eventName) {
		return eventtableRepository.findByEventName(eventName);
	}

	@Override
	public Boolean updateEvent(addEventPayload payload) {
		EventTable eveentexist= eventtableRepository.findByEventName(payload.getEvent_name());
if(eveentexist!=null) {
	eveentexist.setDescription(payload.getDescription());
	eveentexist.setLocation(payload.getLocation());
	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
	eveentexist.setDate(LocalDateTime.parse(payload.getDate(), formatter));
	eventtableRepository.save(eveentexist);
	return true;
}
		return false;
	}

	@Override
	public Boolean deleteEvent(addEventPayload payload) {
		EventTable eveentexist= eventtableRepository.findByEventName(payload.getEvent_name());
		if(eveentexist!=null) {
			eventRegisterRepository.deleteByEventId(eveentexist.getId());
			eventtableRepository.delete(eveentexist);
			return true;
		}
		return false;
	}

	@Override
	public List<EventTable> findAllPastEvents() {
        LocalDateTime currentDateTime = LocalDateTime.now();

		return eventtableRepository.findAllPastEvents(currentDateTime);
		
	}

	@Override
	public List<EventTable> findAllUpcomingEvents() {
		 LocalDateTime currentDateTime = LocalDateTime.now();

			return eventtableRepository.findAllUpcomingEvent(currentDateTime);
			
	}

	

}
