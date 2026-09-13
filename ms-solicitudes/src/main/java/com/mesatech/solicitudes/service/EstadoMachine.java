package com.mesatech.solicitudes.service;

import com.mesatech.solicitudes.entity.EstadoSolicitud;
import com.mesatech.solicitudes.exception.EstadoInvalidoException;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static com.mesatech.solicitudes.entity.EstadoSolicitud.*;

// Define las transiciones validas entre estados de una solicitud
@Component
public class EstadoMachine {

    private static final Map<EstadoSolicitud, Set<EstadoSolicitud>> TRANSICIONES;

    static {
        TRANSICIONES = new EnumMap<>(EstadoSolicitud.class);
        TRANSICIONES.put(CREADA,     EnumSet.of(ASIGNADA, CANCELADA));
        TRANSICIONES.put(ASIGNADA,   EnumSet.of(EN_PROCESO, CANCELADA));
        TRANSICIONES.put(EN_PROCESO, EnumSet.of(RESUELTA, CANCELADA));
        TRANSICIONES.put(RESUELTA,   EnumSet.of(CERRADA));
        TRANSICIONES.put(CERRADA,    EnumSet.noneOf(EstadoSolicitud.class));
        TRANSICIONES.put(CANCELADA,  EnumSet.noneOf(EstadoSolicitud.class));
    }

    public void validarTransicion(EstadoSolicitud actual, EstadoSolicitud nuevo) {
        Set<EstadoSolicitud> permitidos = TRANSICIONES.getOrDefault(actual, Collections.emptySet());
        if (!permitidos.contains(nuevo)) {
            throw new EstadoInvalidoException(String.format(
                "No se puede cambiar de '%s' a '%s'. Estados permitidos desde '%s': %s",
                actual, nuevo, actual, permitidos
            ));
        }
    }

    public List<String> getSiguientesEstados(EstadoSolicitud actual) {
        return TRANSICIONES.getOrDefault(actual, Collections.emptySet())
                .stream()
                .map(Enum::name)
                .collect(Collectors.toList());
    }
}
