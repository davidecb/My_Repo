import { finalizarPedidoAsync, listarPedidoAsync } from 'app/core/redux/acciones/pedido/PedidoAcciones';
import { EstadoGeneral } from 'app/core/redux/modelo/EstadoGeneral';
import { GestionPedido } from '../containers/GestionPedido';
import { connect } from 'react-redux';
import { eliminarProductoSolicitadoAsync } from 'app/core/redux/acciones/productosSolicitados/ProductosSolicitadosAcciones';

const mapStateToProps = (state: EstadoGeneral) => {
  return state.pedido;
};

export const ProveedorGestionPedido = connect(mapStateToProps, {
  listarPedido: listarPedidoAsync,
  finalizarPedido: finalizarPedidoAsync,
  eliminarProductoSolicitado: eliminarProductoSolicitadoAsync
})(GestionPedido);
