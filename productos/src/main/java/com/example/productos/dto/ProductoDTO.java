package com.example.productos.dto;

public record ProductoDTO(
        Long id,
        String nombre,
        Double precio,
        Integer stock
) {
}