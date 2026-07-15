package com.gdg.nmit.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "students")
public class StudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private LoginEntity user;

    @Column(name = "usn", nullable = false, unique = true)
    private String usn;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "branch", nullable = false)
    private String branch;

    @Column(name = "semester", nullable = false)
    private Integer semester;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "student")
    private List<EventRegisterEntity> registrations;

    public Integer getId() {
        return id;
    }

    public LoginEntity getUser() {
        return user;
    }

    public String getUsn() {
        return usn;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getBranch() {
        return branch;
    }

    public Integer getSemester() {
        return semester;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public List<EventRegisterEntity> getRegistrations() {
        return registrations;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUser(LoginEntity user) {
        this.user = user;
    }

    public void setUsn(String usn) {
        this.usn = usn;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setRegistrations(List<EventRegisterEntity> registrations) {
        this.registrations = registrations;
    }
}