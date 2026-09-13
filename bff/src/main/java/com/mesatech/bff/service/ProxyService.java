package com.mesatech.bff.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProxyService {

    private final RestTemplate restTemplate;

    /**
     * Reenvía la petición al microservicio destino conservando el JWT y el body.
     * La respuesta del microservicio (incluyendo errores 4xx/5xx) se devuelve tal cual.
     */
    public ResponseEntity<String> forward(HttpMethod method,
                                          String targetUrl,
                                          String body,
                                          HttpServletRequest request) {
        log.debug("BFF proxy: {} {}", method, targetUrl);

        HttpHeaders headers = buildHeaders(request);
        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.exchange(targetUrl, method, entity, String.class);

        // Reenviar respuesta conservando status y body; omitir headers de transferencia
        return ResponseEntity
                .status(response.getStatusCode())
                .contentType(MediaType.APPLICATION_JSON)
                .body(response.getBody());
    }

    private HttpHeaders buildHeaders(HttpServletRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Reenviar el JWT al microservicio para que este pueda validarlo tambien
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader != null) {
            headers.set(HttpHeaders.AUTHORIZATION, authHeader);
        }

        return headers;
    }

    /**
     * Construye el query string de la peticion original para reenviarlo al microservicio.
     */
    public String buildQueryString(HttpServletRequest request) {
        String qs = request.getQueryString();
        return qs != null && !qs.isBlank() ? "?" + qs : "";
    }
}
