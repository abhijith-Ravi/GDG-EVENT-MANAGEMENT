package com.gdg.nmit.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gdg.nmit.dto.signin;
import com.gdg.nmit.dto.updatePassword;
import com.gdg.nmit.dto.NewUser;
import com.gdg.nmit.entity.LoginEntity;
import com.gdg.nmit.repository.loginRepository;
import com.gdg.nmit.service.loginService;
@Service
public class loginServiceImpl implements loginService {

	@Autowired
	private loginRepository loginrepository;
	
	@Override
	public Boolean addUser(NewUser payload) {
LoginEntity login=new LoginEntity();
login.setUsername(payload.getUsername());
login.setPwd(payload.getPassword());
login.setUsertype(payload.getUsertype());
loginrepository.save(login);
		return true;
	}

	@Override
	public LoginEntity signin(signin payload) {
		LoginEntity user=loginrepository.findByUsernameAndPassword(payload.getUsername(),payload.getPassword());
		if (user!=null)
			return user;
		return null;
	}

	@Override
	public Boolean update(updatePassword payload) {
		LoginEntity user=loginrepository.findByUsernameAndPassword(payload.getUsername(),payload.getPassword());
		user.setPwd(payload.getNewPassword());
		loginrepository.save(user);
		return true;
	}

	@Override
	public Boolean delete(signin payload) {
		LoginEntity user=loginrepository.findByUsernameAndPassword(payload.getUsername(),payload.getPassword());
		if (user!=null) {
			loginrepository.delete(user);
		return true;}
		return false;
	}

}
