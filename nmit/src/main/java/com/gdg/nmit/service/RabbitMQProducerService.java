package com.gdg.nmit.service;

import com.gdg.nmit.dto.RegistrationEmailDTO;

public interface RabbitMQProducerService {
   
   void sendRegistrationMessage(RegistrationEmailDTO dto);
  
}
