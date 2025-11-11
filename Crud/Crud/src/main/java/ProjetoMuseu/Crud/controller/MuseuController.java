package ProjetoMuseu.Crud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")

public class MuseuController {
    @Autowired
    private MuseuService museuService;

    @GetMapping("/public/museus")
    public List<Museu> listarMuseusPublicos () {
        return museuService
    }
}
