package com.gdg.nmit.serviceimpl;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import com.gdg.nmit.service.RabbitMQProducerService;


import com.gdg.nmit.config.RabbitMQConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class RabbitMQProducer implements RabbitMQProducerService {

    private final RabbitTemplate rabbitTemplate;
    private static final Logger log = LoggerFactory.getLogger(RabbitMQProducer.class);

    public RabbitMQProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendRegistrationMessage(String message) {

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE,
                RabbitMQConfig.ROUTING_KEY,
                message);

        log.info("Message Published: {}", message);
    }
}