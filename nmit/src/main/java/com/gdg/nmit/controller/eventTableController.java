package com.gdg.nmit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gdg.nmit.dto.addEventPayload;
import com.gdg.nmit.entity.EventTable;
import com.gdg.nmit.service.eventTableService;
import com.gdg.nmit.dto.ApiResponse;


@RestController
@RequestMapping("/api")
public class eventTableController {

    @Autowired
    private eventTableService eventTableService;

    @PostMapping("/events")
    public ResponseEntity<?> addEvents(@RequestBody addEventPayload payload) {

        Boolean response = eventTableService.addEvents(payload);

        return ResponseEntity.ok(new ApiResponse<>(
            true,
            "Event Added successfully",
            response
        ));
    }

    @GetMapping("/Allevents")
    public ResponseEntity<?> findAllEvents() {

        List<EventTable> response = eventTableService.findAllEvents();

        return ResponseEntity.ok(new ApiResponse<>(
            true,
            "Found All Events successfully",
            response
        ));
    }

    @GetMapping("/events")
    public ResponseEntity<?> findEvent(@RequestParam("eventName") String eventName) {

        EventTable response = eventTableService.findByEventName(eventName);

        return ResponseEntity.ok(new ApiResponse<>(
            true,
            "Found Event successfully",
            response
        ));
    }

    @PutMapping("/events")
    public ResponseEntity<?> updateEvent(@RequestBody addEventPayload payload) {

        Boolean response = eventTableService.updateEvent(payload);

        return ResponseEntity.ok(new ApiResponse<>(
            true,
            "Event Updated successfully",
            response
        ));
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Integer id) {

        Boolean response = eventTableService.deleteEvent(id);

        return ResponseEntity.ok(new ApiResponse<>(
            true,
            "Event Deleted successfully",
            response
        ));
    }

    @GetMapping("/pastEvents")
    public ResponseEntity<?> findAllPastEvents() {

        return ResponseEntity.ok(eventTableService.findAllPastEvents());

    }

    @GetMapping("/upcomingEvents")
    public ResponseEntity<?> findAllUpcomingEvents() {

        return ResponseEntity.ok(eventTableService.findAllUpcomingEvents());

    }
}