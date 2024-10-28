package com.gdg.nmit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gdg.nmit.dto.NewUser;
import com.gdg.nmit.dto.signin;
import com.gdg.nmit.dto.updatePassword;
import com.gdg.nmit.entity.LoginEntity;
import com.gdg.nmit.service.loginService;

@Controller
@RequestMapping("/gdg")
public class loginController {

	@Autowired
	private loginService loginservice;
	
	@PostMapping(value="/signup")
	public ResponseEntity<?> AddEvents(@RequestBody NewUser payload) {
		Boolean response=loginservice.addUser(payload);
		System.out.println("User added  successfully");
		return ResponseEntity.ok(response);	
	}
	
	@PostMapping(value="/signin")
	public ResponseEntity<?> signin(@RequestBody signin payload) {
		LoginEntity response=loginservice.signin(payload);
//		System.out.println("signin successfully");
		return ResponseEntity.ok(response);	
	}
	@PutMapping(value="/updateLogin")
	public ResponseEntity<?> update(@RequestBody updatePassword payload) {
		Boolean response=loginservice.update(payload);
//		System.out.println("signin successfully");
		return ResponseEntity.ok(response);	
	}
	@DeleteMapping(value="/deletelogin")
	public ResponseEntity<?> AddEvents(@RequestBody signin payload) {
		Boolean response=loginservice.delete(payload);
//		System.out.println("signin successfully");
		return ResponseEntity.ok(response);	
	}
}
