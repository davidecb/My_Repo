import * as PropTypes from 'prop-types';
import * as React from 'react';
import { CaracteristicasPedido } from '../../components/CaracteristicasPedido';
import { DivContainer } from './styles';
import { ListarPedido } from '../../components/ListarPedido';
import { Pedido } from '../../models/Pedido';
import { useEffect } from 'react';


interface GestionPedidoProps {
  pedido: Pedido;
  listarPedido: (idpedido: number) => void;
  finalizarPedido: (pedido: Pedido) => void;
  eliminarProductoSolicitado: (idProductoSolicitado: number) => void;
}

export const GestionPedido: React.FC<GestionPedidoProps> = ({
  pedido,
  listarPedido,
  finalizarPedido,
  eliminarProductoSolicitado,
}) => {
  useEffect(() => {
    listarPedido(pedido.id);
  }, [listarPedido]);

  return (
    <DivContainer>
          {(!pedido || pedido.costo === 0) && <h2>Aun no tienes productos en el carrito</h2>} 
          {(pedido && pedido.costo !== 0) && 
            <ListarPedido 
              pedido={pedido} 
              eliminarProductoSolicitado={
                (idProductoSolicitado: number) => eliminarProductoSolicitado(idProductoSolicitado)
              } 
            />}    
          {(pedido && pedido.costo !== 0) && 
            <CaracteristicasPedido 
              pedido={pedido} 
              onClickFinalizarPedido={finalizarPedido} 
            />}
    </DivContainer>
  );
};

GestionPedido.propTypes = {
  pedido: PropTypes.any.isRequired,
  listarPedido: PropTypes.func.isRequired,
  finalizarPedido: PropTypes.func.isRequired,
  eliminarProductoSolicitado: PropTypes.func.isRequired,
};
