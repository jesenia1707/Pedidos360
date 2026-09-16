import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id?: number;
  cliente: string;
  producto: string;
  cantidad: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'https://7ayp94w3m5.execute-api.us-east-1.amazonaws.com/api/pedidos';

  obtenerPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }
}