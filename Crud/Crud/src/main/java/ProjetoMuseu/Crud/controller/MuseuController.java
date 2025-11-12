package ProjetoMuseu.Crud.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ProjetoMuseu.Crud.entity.Museu;
import ProjetoMuseu.Crud.service.MuseuService;

@RestController
@RequestMapping("/api")

public class MuseuController {
    @Autowired
    private MuseuService museuService;

    @GetMapping("/public/museus")
    public MuseuService listarMuseusPublicos () {
        return museuService;
    }
    @GetMapping("/public/museus/{id}")
    public ResponseEntity<Museu> buscarMuseuPorId(@PathVariable int id) {
        Optional<Museu> evento = museuService.buscarPorId(id);
        return evento.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/admin/museus")
    public List<Museu> listarMuseusAdmin() {
        return museuService.listarMuseus();
    }

    @GetMapping("/admin/museus/{id}")
    public ResponseEntity<Museu> buscarMuseuPorIdAdmin(@PathVariable int id) {
        Optional<Museu> evento = museuService.buscarPorId(id);
        return evento.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/admin/museus")
    public ResponseEntity<Museu> salvarMuseu(@RequestBody Museu museu) {
        Museu novoMuseu = museuService.salvarMuseu(museu);
        return ResponseEntity.ok(novoMuseu); 
    }


    // Criar a porra do atualizar o museu
    @PutMapping("/admin/museus/{id}")
    public Museu atualizarMuseu(@PathVariable int id, @RequestBody Museu museuAtualizado) {
        return museuService.atualizarMuseu(id, museuAtualizado);
    }

    @DeleteMapping("/admin/museus/{id}")
    public ResponseEntity<Void> deletarMuseu(@PathVariable int id) {
        if (museuService.getMuseuService(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }else{
            museuService.deletarMuseu(id);
            return ResponseEntity.noContent().build();
        }
    }
}
