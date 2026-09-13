package com.mesatech.catalogo.repository;

import com.mesatech.catalogo.entity.Prioridad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrioridadRepository extends JpaRepository<Prioridad, Long> {
    List<Prioridad> findByActivoTrueOrderByNivelAsc();
}
