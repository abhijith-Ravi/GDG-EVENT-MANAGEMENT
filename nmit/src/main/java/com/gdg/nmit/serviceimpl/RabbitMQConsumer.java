package com.gdg.nmit.serviceimpl;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gdg.nmit.config.RabbitMQConfig;
import com.gdg.nmit.dto.RegistrationEmailDTO;
import com.gdg.nmit.service.emailService;

@Service
public class RabbitMQConsumer {

    @Autowired
    private emailService emailService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void consume(RegistrationEmailDTO dto) {

        String body = """
                Hello %s,

                Your registration has been confirmed successfully.

                Event Details
                -------------------------
                Event    : %s
                Date     : %s
                Location : %s

                We look forward to seeing you.

                Regards,
                GDG NMIT
                """
                .formatted(
                        dto.getStudentName(),
                        dto.getEventName(),
                        dto.getEventDate(),
                        dto.getLocation());

        emailService.sendEmail(
                dto.getStudentEmail(),
                "Event Registration Successful",
                body);

        System.out.println("Email sent to " + dto.getStudentEmail());
    }
}