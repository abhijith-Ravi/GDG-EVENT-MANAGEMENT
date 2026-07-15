package com.gdg.nmit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gdg.nmit.dto.NewUser;
import com.gdg.nmit.dto.signin;
import com.gdg.nmit.dto.updatePassword;
import com.gdg.nmit.entity.LoginEntity;
import com.gdg.nmit.service.loginService;
import com.gdg.nmit.dto.LoginResponse;

import jakarta.validation.Valid;
import com.gdg.nmit.dto.ApiResponse;


@RestController
@RequestMapping("/gdg")
public class loginController {

    @Autowired
    private loginService loginservice;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody NewUser payload) {

        Boolean response = loginservice.addUser(payload);

        if (response == false) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>(
                            false,
                            "Invalid username or password",
                            null
                    ));
        }

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Signin successful",
                        response
                )
        );
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@Valid @RequestBody signin payload) {

        LoginResponse response = loginservice.signin(payload);

        if (response == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }

        return ResponseEntity.ok(new ApiResponse<>(
            true,
            "Signin successfully",
            response
        ));
    }

    @PutMapping("/updateLogin")
    public ResponseEntity<?> update(@Valid @RequestBody updatePassword payload) {

        Boolean response = loginservice.update(payload);

        return ResponseEntity.ok(new ApiResponse<>(
            true,
            "Login updated successfully",
            response
        ));
    }

    @DeleteMapping("/deletelogin/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {

        Boolean response = loginservice.delete(id);

        return ResponseEntity.ok(new ApiResponse<>(
            true,
            "Login deleted successfully",
            response
        ));
    }
}