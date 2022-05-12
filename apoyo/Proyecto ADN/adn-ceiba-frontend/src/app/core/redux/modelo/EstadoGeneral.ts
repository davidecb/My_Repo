import { EstadoPedido } from './EstadoPedido';
import { EstadoProducto } from './EstadoProducto';
import { EstadoProductoSolicitado } from './EstadoProductoSolicitado';

export interface EstadoGeneral {
  pedido: EstadoPedido;
  productos: EstadoProducto;
  productosSolicitados: EstadoProductoSolicitado;
}
