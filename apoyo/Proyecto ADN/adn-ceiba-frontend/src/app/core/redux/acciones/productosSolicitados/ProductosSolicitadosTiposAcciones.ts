import { ProductoSolicitado } from 'app/feature/Producto/models/ProductoSolicitado';

export const LISTAR_PRODUCTOS_SOLICITADOS = 'LISTAR_PRODUCTOS_SOLICITADOS';
export const AGREGAR_PRODUCTO_SOLICITADO = 'AGREGAR_PRODUCTO_SOLICITADO';
export const ELIMINAR_PRODUCTO_SOLICITADO = 'ELIMINAR_PRODUCTO_SOLICITADO';

interface AccionListarProductosSolicitados {
  type: typeof LISTAR_PRODUCTOS_SOLICITADOS;
  payload: ProductoSolicitado[];
  cantidadTotalProductoSolicitado: number;
}

interface AccionAgregarProductoSolicitado {
  type: typeof AGREGAR_PRODUCTO_SOLICITADO;
  payload: ProductoSolicitado;
}

interface AccionEliminarProductoSolicitado {
  type: typeof ELIMINAR_PRODUCTO_SOLICITADO;
  payload: number;
}

export type TiposAccionesProductoSolicitado =
  | AccionListarProductosSolicitados
  | AccionAgregarProductoSolicitado
  | AccionEliminarProductoSolicitado;
