package com.gdg.nmit.serviceimpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gdg.nmit.dto.NewUser;
import com.gdg.nmit.dto.signin;
import com.gdg.nmit.dto.updatePassword;
import com.gdg.nmit.entity.LoginEntity;
import com.gdg.nmit.entity.StudentEntity;
import com.gdg.nmit.entity.UserRole;
import com.gdg.nmit.exception.DuplicateResourceException;
import com.gdg.nmit.exception.InvalidCredentialsException;
import com.gdg.nmit.exception.UserNotFoundException;
import com.gdg.nmit.repository.StudentRepository;
import com.gdg.nmit.repository.loginRepository;
import com.gdg.nmit.service.loginService;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.gdg.nmit.dto.LoginResponse;
import com.gdg.nmit.security.JwtService;

import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class loginServiceImpl implements loginService {

    private static final Logger log =
            LoggerFactory.getLogger(loginServiceImpl.class);


    @Autowired
    private loginRepository loginrepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Override
    @Transactional
    public Boolean addUser(NewUser payload) {

        if (loginrepository.findByUsername(payload.getUsername()).isPresent()) {
            return false;
        }

        LoginEntity login = new LoginEntity();

        login.setUsername(payload.getUsername());
        login.setPwd(passwordEncoder.encode(payload.getPassword()));
        login.setUsertype(UserRole.valueOf(payload.getUsertype().toUpperCase()));

        loginrepository.save(login);

        if (login.getUsertype() == UserRole.STUDENT) {

            StudentEntity student = new StudentEntity();
            if (studentRepository.findByEmail(payload.getEmail()).isPresent()) {
                
                throw new DuplicateResourceException("Email already exists.");
            }

            if (studentRepository.findByUsn(payload.getUsn()).isPresent()) {
                throw new DuplicateResourceException("USN already exists.");
            }

            student.setUser(login);
            student.setUsn(payload.getUsn());
            student.setName(payload.getName());
            student.setEmail(payload.getEmail());
            student.setPhone(payload.getPhone());
            student.setBranch(payload.getBranch());
            student.setSemester(payload.getSemester());

            try {
                studentRepository.save(student);
            } catch (Exception e) {
                e.printStackTrace();
                throw e;
            }
        }

        return true;
    }

    @Override
    public LoginResponse signin(signin payload) {

        Optional<LoginEntity> user =
                loginrepository.findByUsername(payload.getUsername());

        if (user.isPresent()
                && passwordEncoder.matches(payload.getPassword(), user.get().getPwd())) {

            String token = jwtService.generateToken(user.get());
            log.info("User {} signed in", user.get().getUsername());

            return new LoginResponse(
                    token,
                    user.get().getUsername(),
                    user.get().getUsertype().name()
            );
        }
        log.warn("Invalid credentials for {}", user.get().getUsername());

        throw new InvalidCredentialsException("Invalid username or password.");
    }

    @Override
    public Boolean update(updatePassword payload) {

        Optional<LoginEntity> user =
                loginrepository.findByUsername(payload.getUsername());

        if (user.isEmpty()) {
            return false;
        }

        if (!passwordEncoder.matches(payload.getPassword(), user.get().getPwd())) {
            throw new InvalidCredentialsException("Current password is incorrect.");
        }

        user.get().setPwd(passwordEncoder.encode(payload.getNewPassword()));

        loginrepository.save(user.get());

        return true;
    }

    @Override
    public Boolean delete(Integer userId) {

        Optional<LoginEntity> user = loginrepository.findById(userId);

        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found.");
        }

        loginrepository.delete(user.get());

        return true;
    }

}