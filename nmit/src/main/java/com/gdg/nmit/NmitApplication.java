package com.gdg.nmit;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
@EnableCaching
public class NmitApplication {

    private static final Logger log =
            LoggerFactory.getLogger(NmitApplication.class);
    

    public static void main(String[] args) {
        SpringApplication.run(NmitApplication.class, args);
        log.info("Application started successfully.");
    }
    
}
