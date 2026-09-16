import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  private readonly router = inject(Router);

  irAPedidos(): void {
    this.router.navigate(['/pedidos']);
  }

  irAProductos(): void {
    this.router.navigate(['/productos']);
  }

  cerrarSesion(): void {
    this.router.navigate(['/']);
  }
}