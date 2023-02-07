package com.proyectoJava.proyecto.dao;

import com.proyectoJava.proyecto.models.Usuario;

import java.util.List;

public interface UsuarioDao {
    List<Usuario> getUsuarios();

    void deleteUsuario(Long id);

    void registrar(Usuario usuario);

    Usuario verificarLogin(Usuario usuario);

    Usuario getUsuario(Long id);

    void newPassword(Usuario usuario);
}
