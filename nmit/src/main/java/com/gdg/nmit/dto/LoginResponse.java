package com.gdg.nmit.dto;

public class LoginResponse {

    private String token;
    private String username;
    private String role;

    public LoginResponse(String token, String username, String role){
        this.role = role;
        this.token = token;
        this.username = username;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    

}