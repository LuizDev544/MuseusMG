package com.example.demo.entity;
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
@NoArgsConstructor
@Entity
@Table(name = "Eventos")
public class Museus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "Museu")
    private String museu;
    @Column(name="DescricaoMuseu")
    private String descricaomuseu;
    @Column(name="HorarioAbrir")
    private String horaioabrir;
    @Column(name="HoraioSair")
    private String horaiosair;
    @Column(name="Tema")
    private double tema;
    @Column(name="Capacidade")
    private int capacidade;
    @Column(name="Fundacao")
    private String tipodoevento;
    @Column(name = "Endereco")
    private String endereco;
    @Column(name="Preco")
    private String preco;
}