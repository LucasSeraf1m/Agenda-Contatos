package com.agenda.agenda.rest;

import com.agenda.agenda.dto.ContatoDTO;
import com.agenda.agenda.service.ContatoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/agenda")
public class ContatoRestController {

    private final ContatoService contatoService;
    private final ObjectMapper objectMapper;

    @Autowired
    public ContatoRestController(ContatoService contatoService, ObjectMapper objectMapper) {
        this.contatoService = contatoService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/contatos")
    public Page<ContatoDTO> listarContatos(Pageable pageable) {
        return contatoService.listarContatos(pageable);
    }

    @GetMapping("/contatos/{idContato}")
    public ContatoDTO buscarContato(@PathVariable int idContato) {
        return contatoService.buscarContato(idContato)
                .orElseThrow(() -> new ContatoNaoEncontradoException("Id do contato não encontrado"));
    }

    @PostMapping("/contato")
    public ContatoDTO inserirContato(@RequestBody ContatoDTO contatoDto) {
        return contatoService.salvarContato(contatoDto);
    }

    @PutMapping("/contato")
    public ContatoDTO atualizarContato(@RequestBody ContatoDTO contatoDto) {
        return contatoService.salvarContato(contatoDto);
    }

    @PatchMapping("/contato/{idContato}")
    public ContatoDTO patchContato(@PathVariable int idContato, @RequestBody Map<String, Object> patchPayload) {
        ContatoDTO contatoDto = contatoService.buscarContato(idContato)
                .orElseThrow(() -> new ContatoNaoEncontradoException("Id do contato não encontrado"));

        ContatoDTO patchedContato = aplicarPatch(patchPayload, contatoDto);
        return contatoService.salvarContato(patchedContato);
    }

    private ContatoDTO aplicarPatch(Map<String, Object> patchPayload, ContatoDTO contatoDto) {
        ObjectNode contatoNode = objectMapper.convertValue(contatoDto, ObjectNode.class);
        ObjectNode patchNode = objectMapper.convertValue(patchPayload, ObjectNode.class);

        contatoNode.setAll(patchNode);

        return objectMapper.convertValue(contatoNode, ContatoDTO.class);
    }

    @DeleteMapping("/contato/{idContato}")
    public void excluirContato(@PathVariable int idContato) {
        contatoService.excluirContato(idContato);
    }

    @GetMapping("/contatos/quantidade")
    public BigDecimal retornarQuantidadeContatos() {
        return contatoService.retornarQuantidadeContatos();
    }
}
