package com.proyectoJava.proyecto.dao;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.proyectoJava.proyecto.models.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class UsuarioDaoImp implements UsuarioDao{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<Usuario> getUsuarios() {
        String query = "FROM Usuario";
        List<Usuario> lista = entityManager.createQuery(query).getResultList();
        return lista;
    }

    @Override
    public void deleteUsuario(Long id) {
        Usuario usuario = entityManager.find(Usuario.class, id);
        entityManager.remove(usuario);
    }

    @Override
    public void registrar(Usuario usuario) {
        entityManager.merge(usuario);
    }

    @Override
    public Usuario verificarLogin(Usuario usuario) {
        String query = "FROM Usuario WHERE email = :email";
        List<Usuario> lista = entityManager.createQuery(query)
                .setParameter("email", usuario.getEmail())
                .getResultList();

        if(lista.isEmpty()) {
            return null;
        }

        String passwordHashed = lista.get(0).getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, usuario.getPassword())) {
            return lista.get(0);
        }
        return null;
    }

    @Override
    public Usuario getUsuario(Long id) {
        String query = "FROM Usuario Where id = :id";
        List<Usuario> users = entityManager.createQuery(query)
                .setParameter("id", id)
                .getResultList();

        if(users.isEmpty()) {
            return null;
        }

        return users.get(0);
    }

    @Override
    public void newPassword(Usuario usuario) {
        String query = "FROM Usuario Where email = :email";
        List<Usuario> users = entityManager.createQuery(query)
                .setParameter("email", usuario.getEmail())
                .getResultList();

        users.get(0).setPassword(usuario.getPassword());

        entityManager.persist(users.get(0));
    }
}
