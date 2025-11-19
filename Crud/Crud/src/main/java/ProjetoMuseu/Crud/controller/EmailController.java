package ProjetoMuseu.Crud.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ProjetoMuseu.Crud.DTO.EmailDTO;
import ProjetoMuseu.Crud.service.EmailService;

@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin(origins = "*") // permite chamadas do seu HTML
public class EmailController {

    private final EmailService emailService;

    public NewsletterController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<String> inscrever(@RequestBody EmailDTO emailDTO) {
        emailService.enviarEmail(
            emailDTO.getEmail(),
            "Bem-vindo!",
            "Obrigado por se inscrever na nossa newsletter!"
        );

        return ResponseEntity.ok("E-mail enviado!");
    }
}
