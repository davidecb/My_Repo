import { Pedido } from 'app/feature/Pedido/models/Pedido';

export const LISTAR_PEDIDO = 'LISTAR_PEDIDO';
export const CREAR_PEDIDO = 'CREAR_PEDIDO';
export const FINALIZAR_PEDIDO = 'FINALIZAR_PEDIDO';
export const ELIMINAR_PEDIDO = 'ELIMINAR_PEDIDO';

interface AccionListarPedido {
  type: typeof LISTAR_PEDIDO;
  payload: Pedido;
  cantidadTotalPedido: number;
}

interface AccionCrearPedido {
  type: typeof CREAR_PEDIDO;
  payload: Pedido;
}

interface AccionFinalizarPedido {
  type: typeof FINALIZAR_PEDIDO;
  payload: Pedido;
}

interface AccionEliminarPedido {
  type: typeof ELIMINAR_PEDIDO;
  payload: Pedido;
}

export type TiposAccionesPedido =
  | AccionListarPedido
  | AccionCrearPedido
  | AccionFinalizarPedido
  | AccionEliminarPedido;
