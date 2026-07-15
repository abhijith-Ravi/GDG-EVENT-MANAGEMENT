package com.gdg.nmit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gdg.nmit.entity.StudentEntity;

public interface StudentRepository extends JpaRepository<StudentEntity, Integer> {

    Optional<StudentEntity> findByUsn(String usn);

    Optional<StudentEntity> findByEmail(String email);

    Optional<StudentEntity> findByUserId(Integer userId);

}