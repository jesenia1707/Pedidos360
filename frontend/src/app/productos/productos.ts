import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Producto, ProductoService } from '../services/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NgIf, NgFor, DecimalPipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit {

  private readonly productoService = inject(ProductoService);
  private readonly router = inject(Router);
  private readonly changeDetector = inject(ChangeDetectorRef);

  productos: Producto[] = [];

  cargando = true;

  error = '';

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {

    this.cargando = true;
    this.error = '';

    this.productoService.obtenerProductos().subscribe({

      next: (datos: Producto[]) => {

        console.log('Productos recibidos:', datos);

        this.productos = datos;
        this.cargando = false;

        this.changeDetector.detectChanges();
      },

      error: (error: unknown) => {

        console.error('Error al obtener productos:', error);

        this.error = 'No fue posible cargar los productos.';
        this.cargando = false;

        this.changeDetector.detectChanges();
      }

    });
  }

  volverInicio(): void {
    this.router.navigate(['/']);
  }
}