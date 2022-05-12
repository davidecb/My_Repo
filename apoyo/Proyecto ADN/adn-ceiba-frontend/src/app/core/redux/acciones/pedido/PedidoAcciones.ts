import {
  CREAR_PEDIDO,
  ELIMINAR_PEDIDO,
  FINALIZAR_PEDIDO,
  LISTAR_PEDIDO,
  TiposAccionesPedido,
} from './PedidoTiposAcciones';
import { Pedido } from 'app/feature/Pedido/models/Pedido';
import { PedidoRepositorio } from 'app/core/api/pedido.repositorio';

export function listarPedido(
  pedido: Pedido,
  cantidadTotalPedido: number
): TiposAccionesPedido {
  return {
    type: LISTAR_PEDIDO,
    payload: pedido,
    cantidadTotalPedido,
  };
}

export function crearPedido(
  pedido: Pedido
): TiposAccionesPedido {
  return {
    type: CREAR_PEDIDO,
    payload: pedido,
  };
}

export function finalizarPedido(
  pedido: Pedido
): TiposAccionesPedido {
  return {
    type: FINALIZAR_PEDIDO,
    payload: pedido,
  };
}

export function eliminarPedido(
  pedido: Pedido
): TiposAccionesPedido {
  return {
    type: ELIMINAR_PEDIDO,
    payload: pedido,
  };
}

export function crearPedidoAsync(pedido: Pedido) {
  return function (dispacth: any) {
    PedidoRepositorio.crearNuevoPedido(pedido).then((respuesta: any) =>
      dispacth(
        crearPedido(respuesta)
      )
    );
  };
}

export function finalizarPedidoAsync(pedido: Pedido) {
  return function (dispacth: any) {
    PedidoRepositorio.finalizarPedido(pedido).then((respuesta: any) =>
      dispacth(
        finalizarPedido(respuesta)
      )
    );
  };
}

export function listarPedidoAsync(idPedido: number) {
  return function (dispacth: any) {
    PedidoRepositorio.consultarPedido(idPedido).then((respuesta: any) =>
      dispacth(
        listarPedido(respuesta, respuesta.length)
      )
    );
  };
}
