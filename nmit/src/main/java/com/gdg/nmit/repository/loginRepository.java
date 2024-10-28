package com.gdg.nmit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gdg.nmit.entity.LoginEntity;

public interface loginRepository  extends JpaRepository<LoginEntity, String>{

	@Query("SELECT e from LoginEntity e Where e.username=?1 and e.pwd=?2")
	LoginEntity findByUsernameAndPassword(@Param("username") String username,@Param("pwd") String password);
	

}
