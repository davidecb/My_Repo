import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Pedido } from '../../models/Pedido';
import { PedidoContainer } from './styles';
import { TarjetaProductoSolicitado } from '../TarjetaProductoSolicitado';

export interface ListarPedidoProps {
  pedido: Pedido;
  eliminarProductoSolicitado: (idProductoSolicitado: number) => void;
}

export const ListarPedido: React.FC<ListarPedidoProps> = ({
  pedido,
  eliminarProductoSolicitado,
}) => {
  return (
    <PedidoContainer>
      {pedido.productosSolicitados && pedido.productosSolicitados.map((producto, index) => {
        return (
          <TarjetaProductoSolicitado 
              key={index} 
              productoSolicitado={producto}
              onClickPersonalizarProducto={()=>{
                
              }}
              eliminarProductoSolicitado={(idProductoSolicitado: number) => {
                eliminarProductoSolicitado(idProductoSolicitado);
              }}
          />
        );
      })}      
    </PedidoContainer>
  );
};

ListarPedido.propTypes = {
  pedido: PropTypes.any.isRequired,
  eliminarProductoSolicitado: PropTypes.func.isRequired,
};
