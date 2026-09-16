import { Routes } from '@angular/router';
import { Pedidos } from './pedidos/pedidos';
import { Productos } from './productos/productos';

export const routes: Routes = [
  {
    path: 'pedidos',
    component: Pedidos
  },
  {
    path: 'productos',
    component: Productos
  }
];