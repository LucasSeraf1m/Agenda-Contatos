package com.agenda.agenda.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ContatoDTO {

    private int idContato;
    private String nome;
    private String telefone;
    private Integer idade;
    private LocalDate dataNascimento;
    private String email;
}
