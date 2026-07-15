package com.gdg.nmit.service;

import java.util.List;

import com.gdg.nmit.dto.EventRegisterPayload;
import com.gdg.nmit.entity.EventRegisterEntity;

public interface EventRegisterService {

    String registerForEvent(EventRegisterPayload payload);

    List<EventRegisterEntity> findRegisteredEvents(Integer studentId);

}