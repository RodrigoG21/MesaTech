package com.mesatech.solicitudes.dto;

import com.mesatech.solicitudes.entity.EstadoSolicitud;
import com.mesatech.solicitudes.entity.Solicitud;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class SolicitudResponse {

    private Long id;
    private String titulo;
    private String descripcion;
    private Long categoriaId;
    private String categoriaNombre;
    private Long prioridadId;
    private String prioridadNombre;
    private Integer prioridadNivel;
    private String usuarioSolicitante;
    private String usuarioAsignado;
    private EstadoSolicitud estado;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private String observaciones;

    // Solo en v2: estados posibles a los que puede transicionar
    private List<String> siguientesEstados;

    // Solo en v2: dias desde creacion
    private Long diasAbierto;

    public static SolicitudResponse from(Solicitud s) {
        SolicitudResponse r = new SolicitudResponse();
        r.setId(s.getId());
        r.setTitulo(s.getTitulo());
        r.setDescripcion(s.getDescripcion());
        r.setCategoriaId(s.getCategoriaId());
        r.setCategoriaNombre(s.getCategoriaNombre());
        r.setPrioridadId(s.getPrioridadId());
        r.setPrioridadNombre(s.getPrioridadNombre());
        r.setPrioridadNivel(s.getPrioridadNivel());
        r.setUsuarioSolicitante(s.getUsuarioSolicitante());
        r.setUsuarioAsignado(s.getUsuarioAsignado());
        r.setEstado(s.getEstado());
        r.setFechaCreacion(s.getFechaCreacion());
        r.setFechaActualizacion(s.getFechaActualizacion());
        r.setObservaciones(s.getObservaciones());
        return r;
    }
}
