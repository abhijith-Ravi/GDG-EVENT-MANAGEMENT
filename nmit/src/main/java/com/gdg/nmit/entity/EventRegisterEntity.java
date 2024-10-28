package com.gdg.nmit.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="eventregister")
public class EventRegisterEntity {

	@Id
	@Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Use GenerationType.IDENTITY for auto-increment
	private String id;
	
	public String getId() {
		return id;
	}
	public String getEvent_id() {
		return event_id;
	}
	public void setEvent_id(String event_id) {
		this.event_id = event_id;
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
	public String getUsn() {
		return usn;
	}
	public void setUsn(String usn) {
		this.usn = usn;
	}
	public String getBranch() {
		return branch;
	}
	public void setBranch(String branch) {
		this.branch = branch;
	}
	public String getMailid() {
		return mailid;
	}
	public void setMailid(String mailid) {
		this.mailid = mailid;
	}
	public String getSemester() {
		return semester;
	}
	public void setSemester(String semester) {
		this.semester = semester;
	}
	public String getPhoneno() {
		return phoneno;
	}
	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}
	@Column(name="event_name")
	private String event_name;
	
	@Column(name="usn")
	private String usn;
	
	@Column(name="branch")
	private String branch;
	@Column(name="mailid")
	private String mailid;
	@Column(name="semester")
	private String semester;
	@Column(name="phoneno")
	private String phoneno;
	@Column(name="name")
	private String name;

	@Column(name="event_id")
	private String event_id;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

}
