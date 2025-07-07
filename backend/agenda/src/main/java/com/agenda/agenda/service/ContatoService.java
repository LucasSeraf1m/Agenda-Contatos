package com.agenda.agenda.service;

import com.agenda.agenda.dto.ContatoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.Optional;

public interface ContatoService {

    Page<ContatoDTO> listarContatos(Pageable pageable);

    Optional<ContatoDTO> buscarContato(int idContato);

    ContatoDTO salvarContato(ContatoDTO contatoDto);

    void excluirContato(int idContato);

    BigDecimal retornarQuantidadeContatos();
}
