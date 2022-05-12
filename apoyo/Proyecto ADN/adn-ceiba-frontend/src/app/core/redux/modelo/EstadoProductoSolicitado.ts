import { ProductoSolicitado } from 'app/feature/Producto/models/ProductoSolicitado';

export interface EstadoProductoSolicitado {
  productosSolicitados: ProductoSolicitado[];
  cantidadTotalProductoSolicitado: number;
}
