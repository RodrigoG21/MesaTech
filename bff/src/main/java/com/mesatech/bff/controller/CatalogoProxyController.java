package com.mesatech.bff.controller;

import com.mesatech.bff.service.ProxyService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class CatalogoProxyController {

    private final ProxyService proxyService;

    @Value("${services.catalogo.url}")
    private String catalogoUrl;

    // Todos los roles autenticados pueden consultar el catalogo
    @GetMapping("/v1/catalogo")
    public ResponseEntity<String> getCatalogo(HttpServletRequest request) {
        return proxyService.forward(HttpMethod.GET, catalogoUrl + "/v1/catalogo", null, request);
    }

    @GetMapping("/v1/catalogo/categorias")
    public ResponseEntity<String> getCategorias(HttpServletRequest request) {
        return proxyService.forward(HttpMethod.GET, catalogoUrl + "/v1/catalogo/categorias", null, request);
    }

    @PostMapping("/v1/catalogo/categorias")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<String> createCategoria(@RequestBody(required = false) String body,
                                                  HttpServletRequest request) {
        return proxyService.forward(HttpMethod.POST, catalogoUrl + "/v1/catalogo/categorias", body, request);
    }

    @PutMapping("/v1/catalogo/categorias/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<String> updateCategoria(@PathVariable Long id,
                                                  @RequestBody(required = false) String body,
                                                  HttpServletRequest request) {
        return proxyService.forward(HttpMethod.PUT, catalogoUrl + "/v1/catalogo/categorias/" + id, body, request);
    }

    @DeleteMapping("/v1/catalogo/categorias/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<String> deleteCategoria(@PathVariable Long id,
                                                  HttpServletRequest request) {
        return proxyService.forward(HttpMethod.DELETE, catalogoUrl + "/v1/catalogo/categorias/" + id, null, request);
    }

    @GetMapping("/v1/catalogo/prioridades")
    public ResponseEntity<String> getPrioridades(HttpServletRequest request) {
        return proxyService.forward(HttpMethod.GET, catalogoUrl + "/v1/catalogo/prioridades", null, request);
    }

    @PostMapping("/v1/catalogo/prioridades")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<String> createPrioridad(@RequestBody(required = false) String body,
                                                  HttpServletRequest request) {
        return proxyService.forward(HttpMethod.POST, catalogoUrl + "/v1/catalogo/prioridades", body, request);
    }

    @PutMapping("/v1/catalogo/prioridades/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<String> updatePrioridad(@PathVariable Long id,
                                                  @RequestBody(required = false) String body,
                                                  HttpServletRequest request) {
        return proxyService.forward(HttpMethod.PUT, catalogoUrl + "/v1/catalogo/prioridades/" + id, body, request);
    }

    @DeleteMapping("/v1/catalogo/prioridades/{id}")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<String> deletePrioridad(@PathVariable Long id,
                                                  HttpServletRequest request) {
        return proxyService.forward(HttpMethod.DELETE, catalogoUrl + "/v1/catalogo/prioridades/" + id, null, request);
    }
}
