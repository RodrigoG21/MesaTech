package com.mesatech.solicitudes.dto;

import com.mesatech.solicitudes.entity.EstadoSolicitud;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CambioEstadoRequest {

    @NotNull(message = "El nuevo estado es obligatorio")
    private EstadoSolicitud nuevoEstado;

    private String observaciones;

    // Requerido cuando nuevoEstado = ASIGNADA
    private String usuarioAsignado;
}
