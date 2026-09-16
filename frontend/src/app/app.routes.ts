import { Routes } from '@angular/router';

import { Pedidos } from './pedidos/pedidos';
import { Productos } from './productos/productos';
import { Admin } from './admin/admin';
import { Cliente } from './cliente/cliente';
import { Colaborador } from './colaborador/colaborador';

export const routes: Routes = [
  {
    path: 'pedidos',
    component: Pedidos
  },
  {
    path: 'productos',
    component: Productos
  },
  {
    path: 'admin',
    component: Admin
  },
  {
    path: 'cliente',
    component: Cliente
  },
  {
    path: 'colaborador',
    component: Colaborador
  }
];