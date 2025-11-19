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

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<String> cadastrar(@RequestBody EmailRequest request) {
        emailService.enviarEmailBoasVindas(request.getEmail());
        return ResponseEntity.ok("Email enviado!");
    }
}
