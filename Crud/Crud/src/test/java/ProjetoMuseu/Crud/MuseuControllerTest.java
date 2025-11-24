package ProjetoMuseu.Crud;

import ProjetoMuseu.Crud.controller.MuseuController;
import ProjetoMuseu.Crud.entity.Museu;
import ProjetoMuseu.Crud.service.MuseuService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MuseuController.class)
public class MuseuControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MuseuService museuService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void deveListarMuseusPublicos() throws Exception {
        Mockito.when(museuService.listarMuseus())
                .thenReturn(Arrays.asList(new Museu(), new Museu()));

        mockMvc.perform(get("/api/public/museus"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    void deveBuscarMuseuPorId_Publico() throws Exception {
        Museu museu = new Museu();
        museu.setId(1);
        museu.setMuseu("Museu Teste");

        Mockito.when(museuService.buscarPorId(1))
                .thenReturn(Optional.of(museu));

        mockMvc.perform(get("/api/public/museus/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.museu").value("Museu Teste"));
    }

    @Test
    void deveRetornarNotFound_Publico() throws Exception {
        Mockito.when(museuService.buscarPorId(99))
                .thenReturn(Optional.empty());

        mockMvc.perform(get("/api/public/museus/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void deveSalvarMuseu() throws Exception {
        Museu museu = new Museu();
        museu.setId(1);
        museu.setMuseu("Novo Museu");

        Mockito.when(museuService.salvarMuseu(any(Museu.class)))
                .thenReturn(museu);

        mockMvc.perform(post("/api/admin/museus")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(museu)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.museu").value("Novo Museu"));
    }

    @Test
    void deveAtualizarMuseu() throws Exception {
        Museu museuAtualizado = new Museu();
        museuAtualizado.setId(1);
        museuAtualizado.setMuseu("Museu Atualizado");

        Mockito.when(museuService.atualizarMuseu(eq(1), any(Museu.class)))
                .thenReturn(museuAtualizado);

        mockMvc.perform(put("/api/admin/museus/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(museuAtualizado)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.museu").value("Museu Atualizado"));
    }

    @Test
    void deveDeletarMuseu() throws Exception {
        Mockito.when(museuService.getMuseuService(1))
                .thenReturn(Optional.of(new Museu()));

        mockMvc.perform(delete("/api/admin/museus/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void deveRetornarNotFound_AoDeletar() throws Exception {
        Mockito.when(museuService.getMuseuService(99))
                .thenReturn(Optional.empty());

        mockMvc.perform(delete("/api/admin/museus/99"))
                .andExpect(status().isNotFound());
    }
}
