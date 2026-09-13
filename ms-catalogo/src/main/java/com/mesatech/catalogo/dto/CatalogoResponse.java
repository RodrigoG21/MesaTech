package com.mesatech.catalogo.dto;

import com.mesatech.catalogo.entity.Categoria;
import com.mesatech.catalogo.entity.Prioridad;
import lombok.Data;

import java.util.List;

@Data
public class CatalogoResponse {
    private List<Categoria> categorias;
    private List<Prioridad> prioridades;
}
