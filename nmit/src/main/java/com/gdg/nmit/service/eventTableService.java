package com.gdg.nmit.service;

import java.util.List;

import com.gdg.nmit.dto.addEventPayload;
import com.gdg.nmit.entity.EventTable;

public interface eventTableService {

	Boolean addEvents(addEventPayload payload);

	List<EventTable> findAllEvents();

	EventTable findByEventName(String eventName);

	Boolean updateEvent(addEventPayload payload);

	Boolean deleteEvent(addEventPayload payload);

	List<EventTable> findAllPastEvents();

	List<EventTable> findAllUpcomingEvents();


}
