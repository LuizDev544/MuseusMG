package ProjetoMuseu.Crud.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ProjetoMuseu.Crud.DTO.EmailRequest;
import ProjetoMuseu.Crud.service.EmailService;

@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5500"})
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<String> cadastrar(@RequestBody EmailRequest request) {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email é obrigatório");
        }

        boolean emailEnviado = emailService.enviarEmailBoasVindas(request.getEmail());
        
        if (emailEnviado) {
            return ResponseEntity.ok("Email de boas-vindas enviado com sucesso!");
        } else {
            return ResponseEntity.status(500).body("Erro ao enviar email. Tente novamente.");
        }
    }
}