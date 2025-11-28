package ProjetoMuseu.Crud;

import ProjetoMuseu.Crud.controller.MuseuController;
import ProjetoMuseu.Crud.entity.Museu;
import ProjetoMuseu.Crud.service.MuseuService;
import ProjetoMuseu.Crud.security.JwtUtil;
import ProjetoMuseu.Crud.security.JwtAuthenticationFilter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(
        controllers = MuseuController.class,
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = {JwtAuthenticationFilter.class}
        )
)
@TestPropertySource(properties = {
        "spring.security.basic.enabled=false",
        "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration"
})
public class MuseuControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private MuseuService museuService;

        @MockBean
        private JwtUtil jwtUtil;

        private final ObjectMapper objectMapper = new ObjectMapper();

        private Museu criarMuseuTeste(int id, String nome) {
        Museu museu = new Museu();
        museu.setId(id);
        museu.setMuseu(nome);
        museu.setDescricaomuseu("Descrição do " + nome);
        museu.setHorarioabrir("09:00");
        museu.setHorariosair("18:00");
        museu.setTema("Arte Contemporânea");
        museu.setCapacidade(200);
        museu.setFundacao("1990-05-15");
        museu.setEndereco("Rua das Artes, 123");
        museu.setPreco(25.50);
        return museu;
        }

        @Test
        void deveListarMuseusPublicos() throws Exception {
        List<Museu> museus = Arrays.asList(
                criarMuseuTeste(1, "Museu de Arte Moderna"),
                criarMuseuTeste(2, "Museu Histórico Nacional")
        );

        Mockito.when(museuService.listarMuseus())
                .thenReturn(museus);

        mockMvc.perform(get("/api/public/museus")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].museu").value("Museu de Arte Moderna"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].museu").value("Museu Histórico Nacional"));
        }

        @Test
        void deveBuscarMuseuPorId_Publico() throws Exception {
        Museu museu = criarMuseuTeste(1, "Museu de Arte Moderna");

        Mockito.when(museuService.buscarPorId(1))
                .thenReturn(Optional.of(museu));

        mockMvc.perform(get("/api/public/museus/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.museu").value("Museu de Arte Moderna"))
                .andExpect(jsonPath("$.descricaomuseu").exists());
        }

        @Test
        void deveRetornarNotFound_Publico() throws Exception {
        Mockito.when(museuService.buscarPorId(99))
                .thenReturn(Optional.empty());

        mockMvc.perform(get("/api/public/museus/99")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
        }

        @Test
        @WithMockUser
        void deveListarMuseusAdmin() throws Exception {
        List<Museu> museus = Arrays.asList(
                criarMuseuTeste(1, "Museu Admin 1"),
                criarMuseuTeste(2, "Museu Admin 2")
        );

        Mockito.when(museuService.listarMuseus())
                .thenReturn(museus);

        mockMvc.perform(get("/api/admin/museus")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].museu").value("Museu Admin 1"));
        }

        @Test
        @WithMockUser
        void deveBuscarMuseuPorIdAdmin() throws Exception {

        Museu museu = criarMuseuTeste(1, "Museu Administrativo");

        Mockito.when(museuService.buscarPorId(1))
                .thenReturn(Optional.of(museu));

        mockMvc.perform(get("/api/admin/museus/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.museu").value("Museu Administrativo"));
        }

        @Test
        @WithMockUser
        void deveSalvarMuseu() throws Exception {

        Museu museuRequest = criarMuseuTeste(0, "Novo Museu");
        museuRequest.setId(0);

        Museu museuResponse = criarMuseuTeste(1, "Novo Museu");

        Mockito.when(museuService.salvarMuseu(any(Museu.class)))
                .thenReturn(museuResponse);

        mockMvc.perform(post("/api/admin/museus")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(museuRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.museu").value("Novo Museu"));
        }

        @Test
        @WithMockUser
        void deveAtualizarMuseu() throws Exception {

        Museu museuAtualizado = criarMuseuTeste(1, "Museu Atualizado");
        museuAtualizado.setDescricaomuseu("Nova descrição atualizada");
        museuAtualizado.setPreco(30.00);

        Mockito.when(museuService.atualizarMuseu(eq(1), any(Museu.class)))
                .thenReturn(museuAtualizado);

        mockMvc.perform(put("/api/admin/museus/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(museuAtualizado)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.museu").value("Museu Atualizado"));
        }

        @Test
        @WithMockUser
        void deveDeletarMuseu() throws Exception {

        Museu museu = criarMuseuTeste(1, "Museu para Deletar");

        Mockito.when(museuService.getMuseuService(1))
                .thenReturn(Optional.of(museu));

        Mockito.doNothing().when(museuService).deletarMuseu(1);

        mockMvc.perform(delete("/api/admin/museus/1")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
        }

        @Test
        @WithMockUser
        void deveRetornarNotFound_AoDeletar() throws Exception {

        Mockito.when(museuService.getMuseuService(99))
                .thenReturn(Optional.empty());

        mockMvc.perform(delete("/api/admin/museus/99")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
        }

        @Test
        @WithMockUser
        void deveRetornarNotFound_Admin() throws Exception {

        Mockito.when(museuService.buscarPorId(99))
                .thenReturn(Optional.empty());

        mockMvc.perform(get("/api/admin/museus/99")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
        }
}
