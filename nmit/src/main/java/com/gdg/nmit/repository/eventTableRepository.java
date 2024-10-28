package com.gdg.nmit.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gdg.nmit.entity.EventTable;

public interface eventTableRepository extends JpaRepository<EventTable, String>{

	@Query("SELECT e.id FROM EventTable  e WHERE e.event_name = ?1")
    String findByEventNameId(@Param("event_name") String eventName);
	
	@Query("SELECT e FROM EventTable  e WHERE e.event_name = ?1")
	EventTable findByEventName(@Param("event_name") String eventName);

	@Query("SELECT e FROM EventTable e WHERE e.date<?1")
	List<EventTable> findAllPastEvents(@Param("date") LocalDateTime currentDateTime);

	@Query("SELECT e FROM EventTable e WHERE e.date>?1")
	List<EventTable> findAllUpcomingEvent(@Param("date") LocalDateTime currentDateTime);

}
