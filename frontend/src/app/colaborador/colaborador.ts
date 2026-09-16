import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colaborador',
  standalone: true,
  templateUrl: './colaborador.html',
  styleUrl: './colaborador.css'
})
export class Colaborador {

  private readonly router = inject(Router);

  irAPedidos(): void {
    this.router.navigate(['/pedidos']);
  }

  irAProductos(): void {
    this.router.navigate(['/productos']);
  }

  volverInicio(): void {
    this.router.navigate(['/']);
  }
}