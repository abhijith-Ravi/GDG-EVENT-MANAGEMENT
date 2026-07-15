package com.gdg.nmit.dto;

import lombok.Data;

import jakarta.validation.constraints.NotNull;


@Data
public class EventRegisterPayload {

    @NotNull(message = "Student ID is required")
    private Integer studentId;

    @NotNull(message = "Event ID is required")
    private Integer eventId;

    public Integer getStudentId() {
        return studentId;
    }

    public Integer getEventId() {
        return eventId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }

}