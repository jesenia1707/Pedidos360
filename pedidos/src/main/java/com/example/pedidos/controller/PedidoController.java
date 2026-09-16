package com.example.pedidos.controller;

import com.example.pedidos.entity.Pedido;
import com.example.pedidos.service.PedidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('admin','Colaborador','Cliente')")
    public List<Pedido> obtenerTodos() {
        return pedidoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('admin','Colaborador','Cliente')")
    public ResponseEntity<Pedido> obtenerPorId(@PathVariable Long id) {

        Pedido pedido = pedidoService.obtenerPorId(id);

        if (pedido == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(pedido);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('admin','Colaborador')")
    public ResponseEntity<Pedido> crear(@RequestBody Pedido pedido) {
        return ResponseEntity.ok(pedidoService.guardar(pedido));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {

        pedidoService.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}