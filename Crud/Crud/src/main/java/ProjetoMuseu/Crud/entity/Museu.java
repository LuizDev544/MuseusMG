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
@Table(name = "museus")
public class Museu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "museu") 
    private String museu;
    @Column(name = "descricao_museu")
    private String descricaomuseu;
    @Column(name = "horario_abrir")
    private String horarioabrir;
    @Column(name = "horario_sair") 
    private String horariosair;
    @Column(name = "tema") 
    private String tema;
    @Column(name = "capacidade") 
    private int capacidade;
    @Column(name = "fundacao") 
    private String fundacao;
    @Column(name = "endereco") 
    private String endereco;
    @Column(name = "preco") 
    private Double preco;
}
