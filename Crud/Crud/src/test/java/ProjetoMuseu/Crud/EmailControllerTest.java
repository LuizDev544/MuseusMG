package ProjetoMuseu.Crud;

import ProjetoMuseu.Crud.controller.EmailController;
import ProjetoMuseu.Crud.DTO.EmailRequest;
import ProjetoMuseu.Crud.service.EmailService;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EmailController.class)
public class EmailControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmailService emailService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void deveCadastrarEmailEEnviarBoasVindas() throws Exception {
        EmailRequest request = new EmailRequest();
        request.setEmail("teste@example.com");

        Mockito.doNothing().when(emailService).enviarEmailBoasVindas(anyString());

        mockMvc.perform(
                post("/api/newsletter")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
        )
                .andExpect(status().isOk())
                .andExpect(content().string("Email enviado!"));

        Mockito.verify(emailService, Mockito.times(1))
                .enviarEmailBoasVindas("teste@example.com");
    }
}
