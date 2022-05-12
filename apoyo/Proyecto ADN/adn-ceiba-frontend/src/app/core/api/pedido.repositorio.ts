import { Pedido } from './../../feature/Pedido/models/Pedido';
import { axiosIntance } from '../config/AxiosConfig';

export const PedidoRepositorio = {
  consultarPedido: async (idPedido: number) => {
    const response = await axiosIntance.get(`/pedidos/${idPedido}`);
    return  response.data;
  },
  crearNuevoPedido: async (pedido: Pedido) => {
    
    const response = await axiosIntance.post('/pedidos', {
      numeroPedido: pedido.numeroPedido,
      direccion: pedido.direccion,
      cliente: pedido.cliente,
      estado: pedido.estado
    });

    pedido.id = response.data;
    sessionStorage.setItem('pedido',JSON.stringify(pedido));
    return pedido;
  },
  finalizarPedido: async (pedido: Pedido) => {
    
    await axiosIntance.patch(`/pedidos/${pedido.id}`, {
      direccion: pedido.direccion,
      cliente: pedido.cliente,
      estado: pedido.estado
    });
    sessionStorage.setItem('pedido',JSON.stringify(pedido));
    return pedido;
  },
};
