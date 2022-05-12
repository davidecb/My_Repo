import {
  AGREGAR_PRODUCTO_SOLICITADO,
  ELIMINAR_PRODUCTO_SOLICITADO,
  LISTAR_PRODUCTOS_SOLICITADOS,
  TiposAccionesProductoSolicitado,
} from '../../acciones/productosSolicitados/ProductosSolicitadosTiposAcciones';
import { EstadoProductoSolicitado } from '../../modelo/EstadoProductoSolicitado';
import { ProductoSolicitado } from 'app/feature/Producto/models/ProductoSolicitado';

const initialState: EstadoProductoSolicitado = {
  productosSolicitados: Array<ProductoSolicitado>(),
  cantidadTotalProductoSolicitado: 0,
};

export default function (
  state = initialState,
  action: TiposAccionesProductoSolicitado
): EstadoProductoSolicitado {
  switch (action.type) {
    case LISTAR_PRODUCTOS_SOLICITADOS: {
      const productosSolicitados = action.payload;
      return {
        ...state,
        productosSolicitados,
        cantidadTotalProductoSolicitado: action.cantidadTotalProductoSolicitado,
      };
    }
    case AGREGAR_PRODUCTO_SOLICITADO: {
      const productoSolicitado = action.payload;
      return {
        ...state,
        productosSolicitados: [...state.productosSolicitados, productoSolicitado],
      };
    }

    case ELIMINAR_PRODUCTO_SOLICITADO: {
      const idProductoSolicitado = action.payload;
      return {
        ...state,
        productosSolicitados: [
          ...state.productosSolicitados.filter((p) => p.id !== idProductoSolicitado),
        ],
      };
    }

    default:
      return state;
  }
}
