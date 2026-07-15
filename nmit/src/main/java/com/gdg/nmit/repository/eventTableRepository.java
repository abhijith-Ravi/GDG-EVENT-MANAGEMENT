package com.gdg.nmit.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gdg.nmit.entity.EventStatus;
import com.gdg.nmit.entity.EventTable;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface eventTableRepository extends JpaRepository<EventTable, Integer> {

    @Query("SELECT e FROM EventTable e WHERE e.event_name = :eventName")
		Optional<EventTable> findByEventName(@Param("eventName") String eventName);	

    List<EventTable> findByDateBefore(LocalDateTime currentDateTime);

    List<EventTable> findByDateAfter(LocalDateTime currentDateTime);

    List<EventTable> findByStatus(EventStatus status);

}