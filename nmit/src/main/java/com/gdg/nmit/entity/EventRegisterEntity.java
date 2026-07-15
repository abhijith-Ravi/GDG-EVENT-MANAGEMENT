package com.gdg.nmit.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "registrations")
public class EventRegisterEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private EventTable event;

    @Column(name = "registered_at")
    private LocalDateTime registeredAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private RegistrationStatus status;

    public Integer getId() {
        return id;
    }

    public StudentEntity getStudent() {
        return student;
    }

    public EventTable getEvent() {
        return event;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public RegistrationStatus getStatus() {
        return status;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setStudent(StudentEntity student) {
        this.student = student;
    }

    public void setEvent(EventTable event) {
        this.event = event;
    }

    public void setRegisteredAt(LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }

    public void setStatus(RegistrationStatus status) {
        this.status = status;
    }
}