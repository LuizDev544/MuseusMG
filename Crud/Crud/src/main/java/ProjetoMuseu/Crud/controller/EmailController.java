package ProjetoMuseu.Crud.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ProjetoMuseu.Crud.DTO.EmailRequest;
import ProjetoMuseu.Crud.service.EmailService;

@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin(origins = "*") 
public class EmailController {

    private final EmailService emailService;

    // Injeção de dependência via construtor
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    // Endpoint para cadastrar um email na newsletter e mandar uma mensagem de boas-vindas de forma pública
    @PostMapping
    public ResponseEntity<String> cadastrar(@RequestBody EmailRequest request) {
        emailService.enviarEmailBoasVindas(request.getEmail());
        return ResponseEntity.ok("Email enviado!");
    }
}
