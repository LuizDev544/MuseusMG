package ProjetoMuseu.Crud.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Table(name = "Museus")
public class Museu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "Museu")
    private String museu;
    @Column(name="DescricaoMuseu")
    private String descricaomuseu;
    @Column(name="HorarioAbrir")
    private String horarioabrir;
    @Column(name="HorarioSair")
    private String horariosair;
    @Column(name="Tema")
    private String tema;
    @Column(name="Capacidade")
    private int capacidade;
    @Column(name="Fundacao")
    private String fundacao;
    @Column(name = "Endereco")
    private String endereco;
    @Column(name="Preco")
    private Double preco;
}
