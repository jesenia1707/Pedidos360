import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  templateUrl: './cliente.html',
  styleUrl: './cliente.css'
})
export class Cliente {

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