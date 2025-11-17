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

    public Museu atualizarMuseu(int id, Museu MuseuAtualizado) { // Atualizar Existe!!! (((mentira)))
        return museuRepository.findById(id).map(museu -> {
            museu.setMuseu(MuseuAtualizado.getMuseu());
            museu.setDescricaomuseu(MuseuAtualizado.getDescricaomuseu());
            museu.setHorarioabrir(MuseuAtualizado.getHorarioabrir());
            museu.setHorariosair(MuseuAtualizado.getHorariosair());
            museu.setTema(MuseuAtualizado.getTema());
            museu.setCapacidade(MuseuAtualizado.getCapacidade());
            museu.setFundacao(MuseuAtualizado.getFundacao());
            museu.setEndereco(MuseuAtualizado.getEndereco());
            museu.setPreco(MuseuAtualizado.getPreco());

            return museuRepository.save(museu);
        }).orElseThrow(() -> new RuntimeException("Museu não encontrado"));
    }

}
