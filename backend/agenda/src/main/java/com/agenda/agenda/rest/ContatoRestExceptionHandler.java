package com.agenda.agenda.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ContatoRestExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ContatoErrorResponse> handleException(ContatoNaoEncontradoException exc) {

        ContatoErrorResponse erro = new ContatoErrorResponse();
        erro.setStatus(HttpStatus.NOT_FOUND.value());
        erro.setMensagem(exc.getMessage());
        erro.setTimeStamp(System.currentTimeMillis());

        return new ResponseEntity<>(erro, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<ContatoErrorResponse> handleException(Exception exc) {

        ContatoErrorResponse erro = new ContatoErrorResponse();
        erro.setStatus(HttpStatus.BAD_REQUEST.value());
        erro.setMensagem(exc.getMessage());
        erro.setTimeStamp(System.currentTimeMillis());

        return new ResponseEntity<>(erro, HttpStatus.BAD_REQUEST);
    }
}
