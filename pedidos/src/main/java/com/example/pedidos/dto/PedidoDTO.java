package com.example.pedidos.dto;

public record PedidoDTO(
        Long id,
        String cliente,
        String producto,
        Integer cantidad,
        Double total
) {
}