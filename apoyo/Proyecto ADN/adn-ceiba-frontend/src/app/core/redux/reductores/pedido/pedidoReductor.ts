import {
  CREAR_PEDIDO,
  ELIMINAR_PEDIDO,
  FINALIZAR_PEDIDO,
  LISTAR_PEDIDO,
  TiposAccionesPedido,
} from '../../acciones/pedido/PedidoTiposAcciones';
import { EstadoPedido } from '../../modelo/EstadoPedido';

const initialState: EstadoPedido = {
  pedido: sessionStorage.getItem('pedido') ? 
    JSON.parse(sessionStorage.getItem('pedido') as string) :
    {
      id: 0,
      numeroPedido: '',
      direccion: '',
      cliente: '',
      estado: '',
      costo: 0,
      tiempo: 0,
      productosSolicitados: []
    },
  cantidadTotalPedido: 0,
};

export default function (
  state = initialState,
  action: TiposAccionesPedido
): EstadoPedido {
  switch (action.type) {
    case LISTAR_PEDIDO: {
      const pedido = action.payload;
      return {
        ...state,
        pedido,
        cantidadTotalPedido: action.cantidadTotalPedido,
      };
    }
    
    case CREAR_PEDIDO: {
      const pedido = action.payload;
      return {
        ...state,
        pedido,
      };
    }

    case FINALIZAR_PEDIDO: {
      const pedido = action.payload;
      return {
        ...state,
        pedido,
      };
    }

    case ELIMINAR_PEDIDO: {
      const pedido = action.payload;
      return {
        ...state,
        pedido: state.pedido.id === pedido.id ? initialState.pedido : state.pedido,
      };
    }

    default:
      return state;
  }
}
