package com.gdg.nmit.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gdg.nmit.dto.EventRegisterPayload;
import com.gdg.nmit.entity.EventRegisterEntity;
import com.gdg.nmit.entity.EventTable;
import com.gdg.nmit.entity.RegistrationStatus;
import com.gdg.nmit.entity.StudentEntity;
import com.gdg.nmit.repository.EventRegisterRepository;
import com.gdg.nmit.repository.StudentRepository;
import com.gdg.nmit.repository.eventTableRepository;
import com.gdg.nmit.service.EventRegisterService;

import jakarta.transaction.Transactional;

@Service
public class EventRegisterServiceImpl implements EventRegisterService {

    @Autowired
    private eventTableRepository eventTableRepository;

    @Autowired
    private EventRegisterRepository eventRegisterRepository;

    @Autowired
    private StudentRepository studentRepository;

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
            return "No seats available";
        }

        EventRegisterEntity registration = new EventRegisterEntity();

        registration.setStudent(student);
        registration.setEvent(event);
        registration.setRegisteredAt(LocalDateTime.now());
        registration.setStatus(RegistrationStatus.REGISTERED);

        event.setAvailableSeats(event.getAvailableSeats() - 1);

        eventTableRepository.save(event);
        eventRegisterRepository.save(registration);

        return "Registration Successful";
    }

    @Override
    public List<EventRegisterEntity> findRegisteredEvents(Integer studentId) {

        return eventRegisterRepository.findByStudentId(studentId);

    }

}