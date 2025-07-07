package com.agenda.agenda.service;

import com.agenda.agenda.entity.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Integer> {

}
