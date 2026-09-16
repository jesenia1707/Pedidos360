import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido, PedidoService } from '../services/pedido';

@Component({
  selector: 'app-pedidos',
  imports: [CommonModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {

  private readonly pedidoService = inject(PedidoService);
  private readonly router = inject(Router);

  pedidos: Pedido[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {

    this.cargando = true;
    this.error = '';

    this.pedidoService.obtenerPedidos().subscribe({

      next: (datos) => {

        this.pedidos = datos;
        this.cargando = false;

        console.log('Pedidos recibidos:', datos);

      },

      error: (error) => {

        console.error('Error al obtener pedidos:', error);

        this.error = 'No fue posible obtener los pedidos.';
        this.cargando = false;

      }

    });
  }

  volverInicio(): void {
    this.router.navigate(['/']);
  }
}