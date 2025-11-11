package ProjetoMuseu.Crud.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ProjetoMuseu.Crud.entity.Museu;
import ProjetoMuseu.Crud.repository.MuseuRepository;

@Service
public class MuseuService {
    @Autowired
    private MuseuRepository museuRepository;

    public List<Museu> listarMuseus() {
        return museuRepository.findAll();
    }

    public Museu salvarMuseu(Museu museu) {
        return museuRepository.save(museu);
    }

    public Optional <Museu> buscarPorId (int id){
        return museuRepository.findById(id);
    }

    public void deletarMuseu (int id) {
        if (!museuRepository.existsById(id)) {
            throw new RuntimeException("Evento não encontrado");
        }
        museuRepository.deleteById(id);
    }

    public Optional <Museu> getMuseuService(Integer id){
        return museuRepository.findById(id);
    }
}
