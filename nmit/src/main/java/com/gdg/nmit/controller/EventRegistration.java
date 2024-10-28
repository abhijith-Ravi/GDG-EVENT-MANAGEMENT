package com.gdg.nmit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gdg.nmit.dto.EventRegisterPayload;
import com.gdg.nmit.entity.EventRegisterEntity;
import com.gdg.nmit.service.EventRegisterService;

@Controller
@RequestMapping("/gdg")
public class EventRegistration {

	@Autowired
	private EventRegisterService eventRegisterService;
	
	@PostMapping(value="/EventRegister")
	public ResponseEntity<?> RegisterForEvent(@RequestBody EventRegisterPayload payload) {
		String response=eventRegisterService.RegisterForEvent(payload);
		System.out.println("saved successfully");
		return ResponseEntity.ok("Registered Successfully");	
	}
	
	@GetMapping("/getRegisteredEvents")
	public ResponseEntity<?> getRegisteredEvents(@RequestParam("username") String username) {
		List<EventRegisterEntity> response=eventRegisterService.findRegisteredEvents(username);
		System.out.println("event fetched successfully");
		return ResponseEntity.ok(response);	
	}
}
