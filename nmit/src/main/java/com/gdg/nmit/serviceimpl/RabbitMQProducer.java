package com.gdg.nmit.serviceimpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.gdg.nmit.config.RabbitMQConfig;
import com.gdg.nmit.dto.RegistrationEmailDTO;
import com.gdg.nmit.service.RabbitMQProducerService;

@Service
public class RabbitMQProducer implements RabbitMQProducerService {

    private static final Logger log = LoggerFactory.getLogger(RabbitMQProducer.class);

    private final RabbitTemplate rabbitTemplate;

    public RabbitMQProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public void sendRegistrationMessage(RegistrationEmailDTO registrationEmailDTO) {

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE,
                RabbitMQConfig.ROUTING_KEY,
                registrationEmailDTO);

        log.info("Registration email queued for {} ({})",
                registrationEmailDTO.getStudentName(),
                registrationEmailDTO.getStudentEmail());
    }
}