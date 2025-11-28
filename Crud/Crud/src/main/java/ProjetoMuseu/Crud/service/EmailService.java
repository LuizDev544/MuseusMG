package ProjetoMuseu.Crud.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    public boolean enviarEmailBoasVindas(String destinatario) {
        try {
            if (destinatario == null || !destinatario.contains("@")) {
                return false;
            }

            MimeMessage mensagem = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensagem, true, "UTF-8");

            helper.setTo(destinatario);
            helper.setSubject("Obrigado por visitar nosso site!");
            helper.setFrom("luizfernando.carrupt@gmail.com"); 
            
            String html = """
                <div style="font-family: Arial; padding: 20px;">
                    <h2 style="color: #4CAF50;">Obrigado por se inscrever!</h2>
                    <p>Estamos muito felizes em ter você conosco.</p>
                    <p>Em breve enviaremos novidades incríveis!</p>
                    <br>
                    <strong>Equipe do Site</strong>
                </div>
            """;

            helper.setText(html, true);

            mailSender.send(mensagem);
            return true;

        } catch (MessagingException | MailException e) {
            System.err.println("Erro ao enviar email: " + e.getMessage());
            return false;
        }
    }
}