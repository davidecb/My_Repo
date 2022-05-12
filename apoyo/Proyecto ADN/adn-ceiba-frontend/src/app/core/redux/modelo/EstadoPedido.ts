import { Pedido } from 'app/feature/Pedido/models/Pedido';

export interface EstadoPedido {
  pedido: Pedido;
  cantidadTotalPedido: number;
}
