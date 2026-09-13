package com.mesatech.solicitudes.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "solicitudes")
@Data
@NoArgsConstructor
public class Solicitud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descripcion;

    // IDs del catalogo (sin FK para mantener independencia de microservicios)
    @Column(nullable = false)
    private Long categoriaId;

    @Column(nullable = false, length = 100)
    private String categoriaNombre;

    @Column(nullable = false)
    private Long prioridadId;

    @Column(nullable = false, length = 50)
    private String prioridadNombre;

    @Column(nullable = false)
    private Integer prioridadNivel;

    // Usuario que creo la solicitud (email/sub del JWT)
    @Column(nullable = false, length = 150)
    private String usuarioSolicitante;

    // Operador asignado (se puebla al pasar a ASIGNADA)
    @Column(length = 150)
    private String usuarioAsignado;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private EstadoSolicitud estado;

    @Column(nullable = false)
    private LocalDateTime fechaCreacion;

    @Column
    private LocalDateTime fechaActualizacion;

    // Notas del operador al cambiar estado
    @Column(columnDefinition = "TEXT")
    private String observaciones;
}
