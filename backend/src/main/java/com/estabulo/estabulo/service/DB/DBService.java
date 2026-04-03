package com.estabulo.estabulo.service.DB;

import com.estabulo.estabulo.model.Cavalo;
import com.estabulo.estabulo.model.Usuario;
import com.estabulo.estabulo.repository.CavaloRepository;
import com.estabulo.estabulo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;

@Service
public class DBService {

    @Autowired
    private CavaloRepository cavaloRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Bean
    public void instanciarDB() {

        Cavalo cavalo1 = new Cavalo("Romario", 4, "Trabalho", "Turcomeno", "Branco", "Fêmea", 1250.63F, true, "https://w0.peakpx.com/wallpaper/940/4/HD-wallpaper-running-stallion-young-lovely-brown-cavalo-horse-animais-cabalo.jpg");
        Cavalo cavalo2 = new Cavalo("Relâmpago", 4, "Corrida", "Boliviano", "Marrom", "Macho", 1250.63F, false, "https://img.freepik.com/fotos-premium/cavalo-galopante-irlandes-funileiro-egua-irlandesa-funileiro-equus-przewalskii-f-caballus_621486-3723.jpg");

        Usuario usuario1 = new Usuario("login@email.com", passwordEncoder.encode("senha"));
        Usuario usuario2 = new Usuario("joaquin@email.com", passwordEncoder.encode("senha"));


        cavaloRepository.saveAll(Arrays.asList(cavalo1, cavalo2));
        usuarioRepository.saveAll(List.of(usuario1, usuario2));

        // Log de confirmação
        System.out.println("✅ Banco de dados inicializado com sucesso!");
        System.out.println("✅ Usuários criados com senhas criptografadas!");
    }
}
