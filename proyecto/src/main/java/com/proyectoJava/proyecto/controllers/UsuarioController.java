package com.proyectoJava.proyecto.controllers;

import com.proyectoJava.proyecto.dao.UsuarioDao;
import com.proyectoJava.proyecto.models.Usuario;
import com.proyectoJava.proyecto.utils.JWTutil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioDao usuarioDao;
    @Autowired
    private JWTutil jwtutil;

    @RequestMapping(value = "api/usuariosGet", method = RequestMethod.GET)
    public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token) {
    if(!validarToken(token)) {
        return null;
    }
        return usuarioDao.getUsuarios();
    }

    private boolean validarToken(String token) {
        String idUsuario = jwtutil.getKey(token);
        return idUsuario != null;
    }

    @RequestMapping(value = "api/usuariosGet", method = RequestMethod.POST)
    public void registrarUsuario(@RequestBody Usuario usuario) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);

        usuarioDao.registrar(usuario);
    }

    @RequestMapping(value = "api/usuarios/{id}", method = RequestMethod.GET)
    public Usuario getUsuario(@PathVariable Long id) {
        return usuarioDao.getUsuario(id);
    }

    @RequestMapping(value = "api/usuarioPut", method = RequestMethod.PUT)
    public void putUsuario(@RequestBody Usuario usuario) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, usuario.getPassword());
        usuario.setPassword(hash);
        usuarioDao.newPassword(usuario);
    }

    @RequestMapping(value = "api/usuariosDelete/{id}", method = RequestMethod.DELETE)
    public void deleteUsuario(@RequestHeader(value = "Authorization") String token, @PathVariable Long id) {
        if(!validarToken(token)) {
            return ;
        }
        usuarioDao.deleteUsuario(id);
    }

}
