
package com.example.productos.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecretGatewayFilter extends OncePerRequestFilter {

    @Value("${app.gateway.secret}")
    private String expectedSecret;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String secretHeader = request.getHeader("X-Secret-Gateway");

        System.out.println("=== DIAGNOSTICO GATEWAY ===");
        System.out.println("Secreto configurado: "
                + (expectedSecret != null && !expectedSecret.isBlank()));
        System.out.println("Cabecera recibida: "
                + (secretHeader != null && !secretHeader.isBlank()));
        System.out.println("Secretos coinciden: "
                + (expectedSecret != null
                        && expectedSecret.equals(secretHeader)));
        System.out.println("===========================");

        if (expectedSecret == null
                || expectedSecret.isBlank()
                || !expectedSecret.equals(secretHeader)) {

            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("text/plain;charset=UTF-8");
            response.getWriter().write(
                    "Acceso denegado: Secreto de pasarela inválido o ausente");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
