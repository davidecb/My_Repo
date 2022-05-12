import { EstadoGeneral } from 'app/core/redux/modelo/EstadoGeneral';
import { GestionProductos } from '../containers/GestionProductos';
import { agregarProductoSolicitadoAsync } from 'app/core/redux/acciones/productosSolicitados/ProductosSolicitadosAcciones';
import { connect } from 'react-redux';
import { crearPedidoAsync } from 'app/core/redux/acciones/pedido/PedidoAcciones';
import { listarProductosAsync } from 'app/core/redux/acciones/productos/ProductosAcciones';

const mapStateToProps = (state: EstadoGeneral) => {
  return {
    productos: state.productos.productos,
    cantidadTotalProducto: state.productos.cantidadTotalProducto,
    pedido: state.pedido.pedido
  };
};

export const ProveedorGestionProductos = connect(mapStateToProps, {
  listarProductos: listarProductosAsync,
  agregarProductoSolicitado: agregarProductoSolicitadoAsync,
  crearPedido: crearPedidoAsync,
})(GestionProductos);
