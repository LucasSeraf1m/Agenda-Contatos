package com.agenda.agenda.dto;

import com.agenda.agenda.entity.Contato;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ContatoMapper {

    ContatoDTO toDTO(Contato contato);

    Contato toEntity(ContatoDTO contatoDTO);
}



