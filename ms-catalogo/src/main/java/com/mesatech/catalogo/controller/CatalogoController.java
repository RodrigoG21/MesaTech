package com.mesatech.catalogo.controller;

import com.mesatech.catalogo.dto.CategoriaRequest;
import com.mesatech.catalogo.dto.CatalogoResponse;
import com.mesatech.catalogo.dto.PrioridadRequest;
import com.mesatech.catalogo.entity.Categoria;
import com.mesatech.catalogo.entity.Prioridad;
import com.mesatech.catalogo.service.CatalogoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/catalogo")
@RequiredArgsConstructor
public class CatalogoController {

    private final CatalogoService catalogoService;

    // Todos los roles autenticados pueden consultar el catalogo completo
    @GetMapping
    public ResponseEntity<CatalogoResponse> getCatalogo() {
        return ResponseEntity.ok(catalogoService.getCatalogo());
    }

    @GetMapping("/categorias")
    public ResponseEntity<List<Categoria>> getCategorias() {
        return ResponseEntity.ok(catalogoService.getCategorias());
    }

    @PostMapping("/categorias")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Categoria> createCategoria(@Valid @RequestBody CategoriaRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(catalogoService.createCategoria(request));
    }

    @PutMapping("/categorias/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Categoria> updateCategoria(@PathVariable Long id,
                                                     @Valid @RequestBody CategoriaRequest request) {
        return ResponseEntity.ok(catalogoService.updateCategoria(id, request));
    }

    @DeleteMapping("/categorias/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        catalogoService.deleteCategoria(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/prioridades")
    public ResponseEntity<List<Prioridad>> getPrioridades() {
        return ResponseEntity.ok(catalogoService.getPrioridades());
    }

    @PostMapping("/prioridades")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Prioridad> createPrioridad(@Valid @RequestBody PrioridadRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(catalogoService.createPrioridad(request));
    }

    @PutMapping("/prioridades/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Prioridad> updatePrioridad(@PathVariable Long id,
                                                     @Valid @RequestBody PrioridadRequest request) {
        return ResponseEntity.ok(catalogoService.updatePrioridad(id, request));
    }

    @DeleteMapping("/prioridades/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<Void> deletePrioridad(@PathVariable Long id) {
        catalogoService.deletePrioridad(id);
        return ResponseEntity.noContent().build();
    }
}
