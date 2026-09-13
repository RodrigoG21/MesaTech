package com.mesatech.catalogo.service;

import com.mesatech.catalogo.dto.CategoriaRequest;
import com.mesatech.catalogo.dto.CatalogoResponse;
import com.mesatech.catalogo.dto.PrioridadRequest;
import com.mesatech.catalogo.entity.Categoria;
import com.mesatech.catalogo.entity.Prioridad;
import com.mesatech.catalogo.repository.CategoriaRepository;
import com.mesatech.catalogo.repository.PrioridadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CatalogoService {

    private final CategoriaRepository categoriaRepository;
    private final PrioridadRepository prioridadRepository;

    public CatalogoResponse getCatalogo() {
        CatalogoResponse response = new CatalogoResponse();
        response.setCategorias(categoriaRepository.findByActivoTrue());
        response.setPrioridades(prioridadRepository.findByActivoTrueOrderByNivelAsc());
        return response;
    }

    public List<Categoria> getCategorias() {
        return categoriaRepository.findByActivoTrue();
    }

    @Transactional
    public Categoria createCategoria(CategoriaRequest request) {
        Categoria categoria = new Categoria();
        categoria.setNombre(request.getNombre());
        categoria.setDescripcion(request.getDescripcion());
        categoria.setActivo(request.isActivo());
        return categoriaRepository.save(categoria);
    }

    @Transactional
    public Categoria updateCategoria(Long id, CategoriaRequest request) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada: " + id));
        categoria.setNombre(request.getNombre());
        categoria.setDescripcion(request.getDescripcion());
        categoria.setActivo(request.isActivo());
        return categoriaRepository.save(categoria);
    }

    @Transactional
    public void deleteCategoria(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria no encontrada: " + id));
        categoria.setActivo(false);
        categoriaRepository.save(categoria);
    }

    public List<Prioridad> getPrioridades() {
        return prioridadRepository.findByActivoTrueOrderByNivelAsc();
    }

    @Transactional
    public Prioridad createPrioridad(PrioridadRequest request) {
        Prioridad prioridad = new Prioridad();
        prioridad.setNombre(request.getNombre());
        prioridad.setNivel(request.getNivel());
        prioridad.setDescripcion(request.getDescripcion());
        prioridad.setActivo(request.isActivo());
        return prioridadRepository.save(prioridad);
    }

    @Transactional
    public Prioridad updatePrioridad(Long id, PrioridadRequest request) {
        Prioridad prioridad = prioridadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prioridad no encontrada: " + id));
        prioridad.setNombre(request.getNombre());
        prioridad.setNivel(request.getNivel());
        prioridad.setDescripcion(request.getDescripcion());
        prioridad.setActivo(request.isActivo());
        return prioridadRepository.save(prioridad);
    }

    @Transactional
    public void deletePrioridad(Long id) {
        Prioridad prioridad = prioridadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prioridad no encontrada: " + id));
        prioridad.setActivo(false);
        prioridadRepository.save(prioridad);
    }
}
