package com.gdg.nmit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gdg.nmit.entity.LoginEntity;

public interface loginRepository extends JpaRepository<LoginEntity, Integer> {

    Optional<LoginEntity> findByUsername(String username);

}