package com.gdg.nmit.service;

import com.gdg.nmit.dto.NewUser;
import com.gdg.nmit.dto.signin;
import com.gdg.nmit.dto.updatePassword;
import com.gdg.nmit.entity.LoginEntity;

public interface loginService {

	Boolean addUser(NewUser payload);

	LoginEntity signin(signin payload);

	Boolean update(updatePassword payload);

	Boolean delete(signin payload);

}
