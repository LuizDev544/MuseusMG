package ProjetoMuseu.Crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ProjetoMuseu.Crud.entity.Museu;

@Repository
public interface MuseuRepository extends JpaRepository<Museu, Integer> {
    
}
