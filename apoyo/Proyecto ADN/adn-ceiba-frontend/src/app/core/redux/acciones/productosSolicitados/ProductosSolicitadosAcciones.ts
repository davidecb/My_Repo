import {
  AGREGAR_PRODUCTO_SOLICITADO,
  ELIMINAR_PRODUCTO_SOLICITADO,
  LISTAR_PRODUCTOS_SOLICITADOS,
  TiposAccionesProductoSolicitado,
} from './ProductosSolicitadosTiposAcciones';
import { ProductoSolicitado } from 'app/feature/Producto/models/ProductoSolicitado';
import { ProductoSolicitadoRepositorio } from 'app/core/api/productosSolicitados.repositorio';

export function listarProductosSolicitados(
  productosSolicitados: Array<ProductoSolicitado>,
  cantidadTotalProductoSolicitado: number
): TiposAccionesProductoSolicitado {
  return {
    type: LISTAR_PRODUCTOS_SOLICITADOS,
    payload: productosSolicitados,
    cantidadTotalProductoSolicitado,
  };
}

export function agregarProductoSolicitado(
  productoSolicitado: ProductoSolicitado
): TiposAccionesProductoSolicitado {
  return {
    type: AGREGAR_PRODUCTO_SOLICITADO,
    payload: productoSolicitado,
  };
}

export function eliminarProductoSolicitado(idProductoSolicitado: number): TiposAccionesProductoSolicitado {
  return {
    type: ELIMINAR_PRODUCTO_SOLICITADO,
    payload: idProductoSolicitado,
  };
}

export function agregarProductoSolicitadoAsync(productoSolicitado: ProductoSolicitado, pedidoId: number) {
  return function (dispacth: any) {
    ProductoSolicitadoRepositorio.agregarNuevoProductoSolicitado(
      productoSolicitado,
      pedidoId
    ).then((respuesta: any) =>
      dispacth(
        agregarProductoSolicitado(respuesta)
      )
    );
  };
}

export function eliminarProductoSolicitadoAsync(idProductoSolicitado: number) {
  return function (dispacth: any) {
    ProductoSolicitadoRepositorio.eliminarProductoSolicitado(
      idProductoSolicitado
    ).then((respuesta: any) =>
      dispacth(
        eliminarProductoSolicitado(respuesta)
      )
    );
  };
}

export function listarProductosSolicitadosAsync(numeroPagina: number) {
  return function (dispacth: any) {
    ProductoSolicitadoRepositorio.consultarPorPagina(
      numeroPagina
    ).then((respuesta: any) =>
      dispacth(
        listarProductosSolicitados(respuesta.data, respuesta.data.length)
      )
    );
  };
}
