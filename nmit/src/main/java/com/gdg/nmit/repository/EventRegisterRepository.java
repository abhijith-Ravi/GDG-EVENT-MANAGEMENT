package com.gdg.nmit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.gdg.nmit.entity.EventRegisterEntity;

import jakarta.transaction.Transactional;

public interface EventRegisterRepository extends JpaRepository<EventRegisterEntity, Integer> {

    @Modifying
    @Transactional
    @Query("DELETE FROM EventRegisterEntity e WHERE e.event.id = :eventId")
    void deleteByEventId(Integer eventId);

		

    List<EventRegisterEntity> findByStudentId(Integer studentId);

    List<EventRegisterEntity> findByEventId(Integer eventId);

    boolean existsByStudentIdAndEventId(Integer studentId, Integer eventId);
}