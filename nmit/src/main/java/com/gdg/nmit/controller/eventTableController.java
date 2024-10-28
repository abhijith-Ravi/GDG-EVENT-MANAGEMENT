package com.gdg.nmit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gdg.nmit.dto.addEventPayload;
import com.gdg.nmit.entity.EventTable;
import com.gdg.nmit.service.eventTableService;

@Controller
@RequestMapping("/api")
public class eventTableController {

	@Autowired
	private eventTableService eventTableService;
	
	@PostMapping(value="/events")
	public ResponseEntity<?> AddEvents(@RequestBody addEventPayload payload) {
		Boolean response=eventTableService.addEvents(payload);
		System.out.println("event saved successfully");
		return ResponseEntity.ok(response);	
	}
	
	@GetMapping("/Allevents")
	public ResponseEntity<?> findAllEvents() {
		List<EventTable> response=eventTableService.findAllEvents();
		System.out.println("event saved successfully");
		return ResponseEntity.ok(response);	
	}
	
	@GetMapping("/events")
	public ResponseEntity<?> AddEvents(@RequestParam("eventName") String eventName) {
		EventTable response=eventTableService.findByEventName(eventName);
		System.out.println("event saved successfully");
		return ResponseEntity.ok(response);	
	}
	
	
	
	@PutMapping("/events")
	public ResponseEntity<?> updateEvent(@RequestBody addEventPayload payload) {
		Boolean response=eventTableService.updateEvent(payload);
		System.out.println("event updated successfully");
		return ResponseEntity.ok(response);	
	}
	
	@DeleteMapping("/events")
	public ResponseEntity<?> deleteEvent(@RequestBody addEventPayload payload) {
		Boolean response=eventTableService.deleteEvent(payload);
		System.out.println("event deleted successfully");
		return ResponseEntity.ok(response);	
	}
	
	@GetMapping("/pastEvents")
	public ResponseEntity<?> findAllPastEvents() {
		List<EventTable> response=eventTableService.findAllPastEvents();
		System.out.println("event fetched successfully");
		return ResponseEntity.ok(response);	
	}
	
	@GetMapping("/upcomingEvents")
	public ResponseEntity<?> findAllUpcomingEvents() {
		List<EventTable> response=eventTableService.findAllUpcomingEvents();
		System.out.println("event fetched successfully");
		return ResponseEntity.ok(response);	
	}
}

