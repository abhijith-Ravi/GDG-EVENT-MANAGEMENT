package com.gdg.nmit.dto;

public class addEventPayload {

	private String id;
	private String date;
	private String location;
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	private String description;
//	private String registrationEnd;
//	private String registrationStart;
	private String event_name;
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
//	public String getRegistrationEnd() {
//		return registrationEnd;
//	}
//	public void setRegistrationEnd(String registrationEnd) {
//		this.registrationEnd = registrationEnd;
//	}
//	public String getRegistrationStart() {
//		return registrationStart;
//	}
//	public void setRegistrationStart(String registrationStart) {
//		this.registrationStart = registrationStart;
//	}
	public String getEvent_name() {
		return event_name;
	}
	public void setEvent_name(String event_name) {
		this.event_name = event_name;
	}
}
