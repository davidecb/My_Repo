import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DivContainer, DivRow } from './styles';
import { ListarProductos } from '../../components/ListarProductos';
import { PaginadorProductos } from '../../components/PaginadorProductos';
import { Pedido } from 'app/feature/Pedido/models/Pedido';
import { Producto } from '../../models/Producto';
import { ProductoSolicitado } from '../../models/ProductoSolicitado';
import { useEffect } from 'react';


interface GestionProductosProps {
  productos: Array<Producto>;
  pedido: Pedido;
  listarProductos: (numeroPagina: number) => void;
  agregarProductoSolicitado: (productoSolicitado: ProductoSolicitado, idPedido: number) => void;
  crearPedido: (pedido: Pedido) => void;
  cantidadTotalProducto: number;
}

export const GestionProductos: React.FC<GestionProductosProps> = ({
  productos,
  pedido,
  listarProductos,
  agregarProductoSolicitado,
  crearPedido,
  cantidadTotalProducto,
}) => {
  useEffect(() => {
    listarProductos(0);
    if (!pedido || pedido.id === 0) {
      crearPedido({
        id: 0,
        numeroPedido: Date.now().toString(),
        direccion: '',
        cliente: '',
        estado: 'inicializando',
        costo: 0,
        tiempo: 0,
        productosSolicitados: []
      });
    }
  }, [listarProductos]);

  return (
    <DivContainer>
      <DivRow>
        <ListarProductos
          productos={productos}
          onClickAgregarProductoSolicitado={async (productoSolicitado) => {
            const pedidoString = sessionStorage.getItem('pedido') || '{}';
            const pedidoId = JSON.parse(pedidoString);
            agregarProductoSolicitado(productoSolicitado, pedido.id);
          }}
        />
        <PaginadorProductos
          cantidadTotalProductos={cantidadTotalProducto}
          onClickCambiarPagina={listarProductos}
        />
      </DivRow>
    </DivContainer>
  );
};

GestionProductos.propTypes = {
  productos: PropTypes.array.isRequired,
  pedido: PropTypes.any.isRequired,
  listarProductos: PropTypes.func.isRequired,
  agregarProductoSolicitado: PropTypes.func.isRequired,
  crearPedido: PropTypes.func.isRequired,
  cantidadTotalProducto: PropTypes.number.isRequired,
};
