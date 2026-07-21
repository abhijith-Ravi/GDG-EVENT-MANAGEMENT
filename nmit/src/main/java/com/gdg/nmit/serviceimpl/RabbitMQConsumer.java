package com.gdg.nmit.serviceimpl;


import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gdg.nmit.service.emailService;


import com.gdg.nmit.config.RabbitMQConfig;



@Service
public class RabbitMQConsumer {

    @Autowired
    private emailService emailService;

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void consume(String message) {

        System.out.println("Received : " + message);

        emailService.sendEmail(
                "1nt23is005.abhijith@gmail.com",
                "Event Registration",
                message);
    }
}