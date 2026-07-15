package com.gdg.nmit.dto;

import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class updatePassword {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Current password is required")
    private String password;

    @NotBlank(message = "New password is required")
    @Size(min = 8, message = "New password must be at least 8 characters")
    private String newPassword;

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

}