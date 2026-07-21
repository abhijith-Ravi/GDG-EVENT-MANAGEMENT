package com.gdg.nmit.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.gdg.nmit.service.emailService;

@Service
public class emailServiceImpl implements emailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(String to, String subject, String body) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);

        System.out.println("Email sent successfully to " + to);
    }
}