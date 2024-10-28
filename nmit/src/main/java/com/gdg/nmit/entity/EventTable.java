package com.gdg.nmit.entity;

import java.sql.Date;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="eventstable")
public class EventTable {

	@Id
	@Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Use GenerationType.IDENTITY for auto-increment
	private String id;
	@Column(name="event_name")
	private String event_name;
	@Column(name="description")
	private String description;
	@Column(name="date")
	private LocalDateTime  date;
	
	public LocalDateTime getDate() {
		return date;
	}
	public void setDate(LocalDateTime date) {
		this.date = date;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	@Column(name="location")
	private String location;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getEvent_name() {
		return event_name;
	}
	public void setEvent_name(String event_name) {
		this.event_name = event_name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
//	public String getRegistrationStart() {
//		return registrationStart;
//	}
//	public void setRegistrationStart(String registrationStart) {
//		this.registrationStart = registrationStart;
//	}
//	public String getRegistrationEnd() {
//		return registrationEnd;
//	}
//	public void setRegistrationEnd(String registrationEnd) {
//		this.registrationEnd = registrationEnd;
//	}
}
