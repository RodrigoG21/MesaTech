package com.mesatech.catalogo.config;

import com.mesatech.catalogo.entity.Categoria;
import com.mesatech.catalogo.entity.Prioridad;
import com.mesatech.catalogo.repository.CategoriaRepository;
import com.mesatech.catalogo.repository.PrioridadRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

// Carga datos iniciales si la BD esta vacia
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final CategoriaRepository categoriaRepository;
    private final PrioridadRepository prioridadRepository;

    @Override
    public void run(String... args) {
        seedCategorias();
        seedPrioridades();
    }

    private void seedCategorias() {
        if (categoriaRepository.count() > 0) return;

        List<Categoria> categorias = List.of(
            crearCategoria("Hardware", "Problemas con equipos fisicos"),
            crearCategoria("Software", "Problemas con aplicaciones o sistemas operativos"),
            crearCategoria("Red", "Problemas de conectividad e internet"),
            crearCategoria("Seguridad", "Incidentes de seguridad informatica"),
            crearCategoria("Accesos", "Gestion de usuarios, cuentas y permisos")
        );
        categoriaRepository.saveAll(categorias);
        log.info("Categorias iniciales cargadas: {}", categorias.size());
    }

    private void seedPrioridades() {
        if (prioridadRepository.count() > 0) return;

        List<Prioridad> prioridades = List.of(
            crearPrioridad("Baja", 1, "Sin urgencia, puede esperar"),
            crearPrioridad("Media", 2, "Requiere atencion en las proximas horas"),
            crearPrioridad("Alta", 3, "Requiere atencion urgente"),
            crearPrioridad("Critica", 4, "Atencion inmediata, impacto en produccion")
        );
        prioridadRepository.saveAll(prioridades);
        log.info("Prioridades iniciales cargadas: {}", prioridades.size());
    }

    private Categoria crearCategoria(String nombre, String descripcion) {
        Categoria c = new Categoria();
        c.setNombre(nombre);
        c.setDescripcion(descripcion);
        c.setActivo(true);
        return c;
    }

    private Prioridad crearPrioridad(String nombre, int nivel, String descripcion) {
        Prioridad p = new Prioridad();
        p.setNombre(nombre);
        p.setNivel(nivel);
        p.setDescripcion(descripcion);
        p.setActivo(true);
        return p;
    }
}
