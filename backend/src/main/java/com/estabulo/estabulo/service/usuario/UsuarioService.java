package com.estabulo.estabulo.service.usuario;

import com.estabulo.estabulo.model.Usuario;
import com.estabulo.estabulo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Usuario gravarUsuario(Usuario usuario) {
        // Criptografar a senha antes de salvar
        if (usuario.getSenha() != null && !usuario.getSenha().isEmpty()) {
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        }
        return usuarioRepository.save(usuario);
    }
    public List<Usuario> login(Usuario usuario) {
        return usuarioRepository.login(usuario.getEmail(), usuario.getSenha());
    }
}
