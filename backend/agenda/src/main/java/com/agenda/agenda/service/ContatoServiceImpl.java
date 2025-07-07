package com.agenda.agenda.service;

import com.agenda.agenda.dto.ContatoDTO;
import com.agenda.agenda.dto.ContatoMapper;
import com.agenda.agenda.entity.Contato;
import com.agenda.agenda.rest.ContatoNaoEncontradoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class ContatoServiceImpl implements ContatoService {

    private final ContatoRepository contatoRepository;
    private final ContatoMapper contatoMapper;

    @Autowired
    public ContatoServiceImpl(ContatoRepository contatoRepository, ContatoMapper contatoMapper) {
        this.contatoRepository = contatoRepository;
        this.contatoMapper = contatoMapper;
    }

    @Override
    public Page<ContatoDTO> listarContatos(Pageable pageable) {
        return contatoRepository.findAll(pageable).map(contatoMapper::toDTO);
    }

    @Override
    public Optional<ContatoDTO> buscarContato(int idContato) {
        return contatoRepository.findById(idContato).map(contatoMapper::toDTO);
    }

    @Transactional
    @Override
    public ContatoDTO salvarContato(ContatoDTO contatoDto) {
        Contato contato = contatoRepository.save(contatoMapper.toEntity(contatoDto));

        return contatoMapper.toDTO(contato);
    }

    @Override
    public void excluirContato(int idContato) {
        Contato contato = contatoRepository.findById(idContato)
                .orElseThrow(() -> new ContatoNaoEncontradoException("Id do contato não encontrado"));

        contato.setExcluido(true);
        contatoRepository.save(contato);
    }

    @Override
    public BigDecimal retornarQuantidadeContatos() {
        return BigDecimal.valueOf(contatoRepository.count());
    }
}
