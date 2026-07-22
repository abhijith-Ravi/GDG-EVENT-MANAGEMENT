package com.gdg.nmit.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gdg.nmit.dto.EventRegisterPayload;
import com.gdg.nmit.dto.RegistrationEmailDTO;
import com.gdg.nmit.entity.EventRegisterEntity;
import com.gdg.nmit.entity.EventTable;
import com.gdg.nmit.entity.RegistrationStatus;
import com.gdg.nmit.entity.StudentEntity;
import com.gdg.nmit.exception.NoSeatsAvailableException;
import com.gdg.nmit.repository.EventRegisterRepository;
import com.gdg.nmit.repository.StudentRepository;
import com.gdg.nmit.repository.eventTableRepository;
import com.gdg.nmit.service.EventRegisterService;
import com.gdg.nmit.service.RabbitMQProducerService;

import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EventRegisterServiceImpl implements EventRegisterService {

    private static final Logger log =
            LoggerFactory.getLogger(EventRegisterServiceImpl.class);

    @Autowired
    private eventTableRepository eventTableRepository;

    @Autowired
    private EventRegisterRepository eventRegisterRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private RabbitMQProducerService rabbitMQProducerService;

    @Override
    @Transactional
    public String registerForEvent(EventRegisterPayload payload) {

        StudentEntity student = studentRepository.findById(payload.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        EventTable event = eventTableRepository.findById(payload.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        if (eventRegisterRepository.existsByStudentIdAndEventId(
                payload.getStudentId(),
                payload.getEventId())) {

            return "Student already registered for this event";
        }

        if (event.getAvailableSeats() <= 0) {
            throw new NoSeatsAvailableException("No seats available for this event.");
        }

        EventRegisterEntity registration = new EventRegisterEntity();

        registration.setStudent(student);
        registration.setEvent(event);
        registration.setRegisteredAt(LocalDateTime.now());
        registration.setStatus(RegistrationStatus.REGISTERED);

        event.setAvailableSeats(event.getAvailableSeats() - 1);

        eventTableRepository.save(event);
        eventRegisterRepository.save(registration);
        log.info("Event {} created", event.getEvent_name());


        RegistrationEmailDTO dto = new RegistrationEmailDTO();

        dto.setStudentName(student.getName());

        dto.setStudentEmail(student.getEmail());

        dto.setEventName(event.getEvent_name());

        dto.setEventDate(event.getDate().toString());

        dto.setLocation(event.getLocation());

        rabbitMQProducerService.sendRegistrationMessage(dto);

        return "Registration Successful";
    }

    @Override
    public List<EventRegisterEntity> findRegisteredEvents(Integer studentId) {

        return eventRegisterRepository.findByStudentId(studentId);

    }

}