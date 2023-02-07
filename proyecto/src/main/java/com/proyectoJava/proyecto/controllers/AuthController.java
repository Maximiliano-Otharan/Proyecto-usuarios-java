package com.proyectoJava.proyecto.controllers;

import com.proyectoJava.proyecto.dao.UsuarioDao;
import com.proyectoJava.proyecto.models.Usuario;
import com.proyectoJava.proyecto.utils.JWTutil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private UsuarioDao usuarioDao;
    @Autowired
    private JWTutil jwtutil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario) {

        Usuario usuarioLogin = usuarioDao.verificarLogin(usuario);

        if(usuarioLogin != null) {

            String token = jwtutil.create(String.valueOf(usuarioLogin.getId()), usuarioLogin.getEmail());

            return token;
        }
        return "Error 401";
    }
}
