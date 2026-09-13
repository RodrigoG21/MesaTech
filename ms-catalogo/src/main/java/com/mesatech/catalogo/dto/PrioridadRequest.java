package com.mesatech.catalogo.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PrioridadRequest {

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotNull(message = "El nivel es obligatorio")
    @Min(value = 1, message = "El nivel minimo es 1 (Baja)")
    @Max(value = 4, message = "El nivel maximo es 4 (Critica)")
    private Integer nivel;

    private String descripcion;

    private boolean activo = true;
}
