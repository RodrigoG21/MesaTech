package com.mesatech.solicitudes.repository;

import com.mesatech.solicitudes.entity.EstadoSolicitud;
import com.mesatech.solicitudes.entity.Solicitud;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {

    List<Solicitud> findByUsuarioSolicitanteOrderByFechaCreacionDesc(String usuarioSolicitante);

    List<Solicitud> findAllByOrderByFechaCreacionDesc();

    Page<Solicitud> findAll(Pageable pageable);

    Page<Solicitud> findByEstado(EstadoSolicitud estado, Pageable pageable);
}
