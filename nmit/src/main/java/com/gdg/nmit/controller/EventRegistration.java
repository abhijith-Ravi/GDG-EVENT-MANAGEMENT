package com.gdg.nmit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.gdg.nmit.dto.EventRegisterPayload;
import com.gdg.nmit.entity.EventRegisterEntity;
import com.gdg.nmit.service.EventRegisterService;
import com.gdg.nmit.dto.ApiResponse;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/gdg")
public class EventRegistration {

    @Autowired
    private EventRegisterService eventRegisterService;

    @PostMapping("/EventRegister")
    public ResponseEntity<?> registerForEvent(@Valid @RequestBody EventRegisterPayload payload) {

        String response = eventRegisterService.registerForEvent(payload);

        return ResponseEntity.ok(new ApiResponse<>(
            true,
            "Event Registered successfully",
            response
        ));
    }

    @GetMapping("/getRegisteredEvents")
    public ResponseEntity<?> getRegisteredEvents(
            @RequestParam("studentId") Integer studentId) {

        List<EventRegisterEntity> response =
                eventRegisterService.findRegisteredEvents(studentId);

        return ResponseEntity.ok(new ApiResponse<>(
            true,
            "Events fetched successfully",
            response
        ));
    }
}