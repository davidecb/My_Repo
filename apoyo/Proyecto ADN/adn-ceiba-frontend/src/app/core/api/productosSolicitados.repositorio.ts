import { ProductoSolicitado } from './../../feature/Producto/models/ProductoSolicitado';
import { axiosIntance } from '../config/AxiosConfig';

export const ProductoSolicitadoRepositorio = {
  consultarPorPagina: (page: number) => axiosIntance.get('/productos-solicitados'),
  eliminarProductoSolicitado: async (idProductoSolicitado: number) => {
    await axiosIntance.delete(`/productos-por-pedido/${idProductoSolicitado}`);
  },
  agregarNuevoProductoSolicitado: async (productoSolicitado: ProductoSolicitado, pedidoId: number) => {
    const response = await axiosIntance.post('/productos-solicitados', {
      material: productoSolicitado.material,
      color: productoSolicitado.color,
      acabado: productoSolicitado.acabado,
      urgencia: productoSolicitado.urgencia,
      producto: productoSolicitado.producto,
    }); 
    const idPedido = pedidoId === 0 ? JSON.parse(sessionStorage.getItem('pedido') as string).id : pedidoId;
    productoSolicitado.id = response.data;
    const body = {
      pedido: idPedido,
      productoSolicitado: productoSolicitado.id,
      cantidad: productoSolicitado.cantidad
    };
    await axiosIntance.post('/productos-por-pedido', body);
    return productoSolicitado;
  },
};
