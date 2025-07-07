package com.agenda.agenda.rest;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ContatoErrorResponse {

    private int status;
    private String mensagem;
    private long timeStamp;
}
