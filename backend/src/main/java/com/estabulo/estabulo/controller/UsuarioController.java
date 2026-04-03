package com.estabulo.estabulo.controller;

import com.estabulo.estabulo.dto.LoginDTO;
import com.estabulo.estabulo.model.Usuario;
import com.estabulo.estabulo.repository.UsuarioRepository;
import com.estabulo.estabulo.service.usuario.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value="/usuario")
@CrossOrigin(origins = "*", maxAge = 33600)
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<?> gravarUsuario(@RequestBody Usuario usuario) {
        try {
            // Verificar se email já existe
            Optional<Usuario> usuarioExistente = usuarioRepository.findByEmail(usuario.getEmail());

            if (usuarioExistente.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new ErrorResponse("Email já cadastrado"));
            }

            // Gravar usuário (a senha será criptografada no service)
            usuario = usuarioService.gravarUsuario(usuario);

            URI uri = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(usuario.getId())
                    .toUri();

            return ResponseEntity.created(uri).body(usuario);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao cadastrar usuário: " + e.getMessage()));
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<Object> login(@RequestBody LoginDTO loginDTO) {
        try {
            // Buscar usuário por email
            Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(loginDTO.getEmail());

            if (usuarioOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse("Email não encontrado"));
            }

            Usuario usuario = usuarioOpt.get();

            // Verificar senha usando BCrypt
            if (passwordEncoder.matches(loginDTO.getSenha(), usuario.getSenha())) {
                // Login bem-sucedido
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login realizado com sucesso!");
                response.put("usuario", Map.of(
                        "id", usuario.getId(),
                        "email", usuario.getEmail(),
                        "nome", usuario.getNome() != null ? usuario.getNome() : ""
                ));
                return ResponseEntity.ok(response);
            } else {
                // Senha incorreta
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ErrorResponse("Senha incorreta"));
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Erro ao processar login: " + e.getMessage()));
        }
    }

    public static class ErrorResponse {
        private String resposta;

        public ErrorResponse(String resposta) {
            this.resposta = resposta;
        }

        public String getResposta() {
            return resposta;
        }

        public void setResposta(String resposta) {
            this.resposta = resposta;
        }
    }
}