package com.gdg.nmit.dto;

import lombok.Data;
import jakarta.validation.constraints.*;


@Data
public class addEventPayload {

    private Integer id;

    @NotBlank(message = "Event name is required")
    private String event_name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Event date is required")
    private String date;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;

    @NotBlank(message = "Registration deadline is required")
    private String registrationDeadline;

    @NotBlank(message = "Event status is required")
    private String status;


    public Integer getId() {
        return id;
    }

    public String getEvent_name() {
        return event_name;
    }

    public String getDescription() {
        return description;
    }

    public String getDate() {
        return date;
    }

    public String getLocation() {
        return location;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public String getRegistrationDeadline() {
        return registrationDeadline;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public void setRegistrationDeadline(String registrationDeadline) {
        this.registrationDeadline = registrationDeadline;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}