package com.gdg.nmit.dto;

import lombok.Data;
import jakarta.validation.constraints.*;


@Data
public class NewUser {

    // users table

    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 30, message = "Username must be between 4 and 30 characters")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @NotBlank(message = "User type is required")
    private String usertype;

    // students table

    // @NotBlank(message = "USN is required")
    private String usn;

    // @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    // @NotBlank(message = "Email is required")
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must contain exactly 10 digits")
    private String phone;

    // @NotBlank(message = "Branch is required")
    private String branch;

    // @NotNull(message = "Semester is required")
    private Integer semester;
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getUsertype() {
        return usertype;
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

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsertype(String usertype) {
        this.usertype = usertype;
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
}