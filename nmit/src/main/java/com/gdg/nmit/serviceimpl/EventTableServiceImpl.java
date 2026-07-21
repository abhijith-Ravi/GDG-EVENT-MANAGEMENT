package com.gdg.nmit.serviceimpl;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gdg.nmit.dto.addEventPayload;
import com.gdg.nmit.entity.EventStatus;
import com.gdg.nmit.entity.EventTable;
import com.gdg.nmit.exception.EventNotFoundException;
import com.gdg.nmit.repository.EventRegisterRepository;
import com.gdg.nmit.repository.eventTableRepository;
import com.gdg.nmit.service.RabbitMQProducerService;
import com.gdg.nmit.service.eventTableService;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EventTableServiceImpl implements eventTableService {

    private static final Logger log =
            LoggerFactory.getLogger(EventTableServiceImpl.class);

    @Autowired
    private EventRegisterRepository eventRegisterRepository;

    @Autowired
    private eventTableRepository eventtableRepository;

     

    @Override
    @CacheEvict(value = "events", allEntries = true)
    public Boolean addEvents(addEventPayload payload) {

        if (eventtableRepository.findByEventName(payload.getEvent_name()).isPresent()) {
            return false;
        }
       

        EventTable event = new EventTable();

        event.setEvent_name(payload.getEvent_name());
        event.setDescription(payload.getDescription());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

        event.setDate(LocalDateTime.parse(payload.getDate(), formatter));

        event.setLocation(payload.getLocation());

        event.setCapacity(payload.getCapacity());

        event.setAvailableSeats(payload.getCapacity());

        if (payload.getRegistrationDeadline() != null
                && !payload.getRegistrationDeadline().isBlank()) {

            event.setRegistrationDeadline(
                    LocalDateTime.parse(payload.getRegistrationDeadline(), formatter));
        }

        event.setStatus(EventStatus.valueOf(payload.getStatus().toUpperCase()));

        event.setRegistrationFee(payload.getRegistrationFee());

        eventtableRepository.save(event);
        
        

        return true;
    }

    @Override
    @Cacheable("events")
    public List<EventTable> findAllEvents() {
        log.info("Fetching events from MySQL");

        return eventtableRepository.findAll();
    }

    @Override
    public EventTable findByEventName(String eventName) {
        log.info("Fetching events from MySQL");

        return eventtableRepository
                .findByEventName(eventName)
                .orElse(null);
    }

    @Override
    @CacheEvict(value = "events", allEntries = true)
    public Boolean updateEvent(addEventPayload payload) {

        EventTable event = eventtableRepository
                .findByEventName(payload.getEvent_name())
                .orElse(null);

        if (event == null) {
            throw new EventNotFoundException("Event not found.");
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");

        event.setDescription(payload.getDescription());
        event.setLocation(payload.getLocation());
        event.setDate(LocalDateTime.parse(payload.getDate(), formatter));

        event.setCapacity(payload.getCapacity());

        if (payload.getRegistrationDeadline() != null
                && !payload.getRegistrationDeadline().isBlank()) {

            event.setRegistrationDeadline(
                    LocalDateTime.parse(payload.getRegistrationDeadline(), formatter));
        }

        event.setStatus(EventStatus.valueOf(payload.getStatus().toUpperCase()));

        event.setRegistrationFee(payload.getRegistrationFee());

        eventtableRepository.save(event);

        return true;
    }

    @Override
    @CacheEvict(value = "events", allEntries = true)
    public Boolean deleteEvent(Integer eventId) {

        EventTable event = eventtableRepository.findById(eventId).orElse(null);

        if (event == null) {
            throw new EventNotFoundException("Event not found.");
        }

        eventRegisterRepository.deleteByEventId(eventId);

        eventtableRepository.delete(event);
        log.info("Event {} deleted", eventId);

        return true;
    }

    @Override
    public List<EventTable> findAllPastEvents() {

        return eventtableRepository.findByDateBefore(LocalDateTime.now());

    }

    @Override
    public List<EventTable> findAllUpcomingEvents() {

        return eventtableRepository.findByDateAfter(LocalDateTime.now());

    }

}