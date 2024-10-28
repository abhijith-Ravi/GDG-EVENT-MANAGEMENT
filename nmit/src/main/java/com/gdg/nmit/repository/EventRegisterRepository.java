package com.gdg.nmit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gdg.nmit.entity.EventRegisterEntity;
import com.gdg.nmit.entity.EventTable;

import jakarta.transaction.Transactional;

public interface EventRegisterRepository extends JpaRepository<EventRegisterEntity, String>{
	 @Modifying
	    @Transactional
	 @Query("DELETE FROM EventRegisterEntity e WHERE e.event_id = :eventId")
	    void deleteByEventId(@Param("eventId") String eventId);
	
	@Query("SELECT e FROM EventRegisterEntity  e WHERE e.name = ?1")
	List<EventRegisterEntity> findByname(@Param("name") String name);

	
}
