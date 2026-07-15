package com.gdg.nmit.service;

import com.gdg.nmit.dto.NewUser;
import com.gdg.nmit.dto.signin;
import com.gdg.nmit.dto.updatePassword;
import com.gdg.nmit.entity.LoginEntity;
import com.gdg.nmit.dto.LoginResponse;

public interface loginService {

    Boolean addUser(NewUser payload);

    LoginResponse signin(signin payload);

    Boolean update(updatePassword payload);

    Boolean delete(Integer userId);

}