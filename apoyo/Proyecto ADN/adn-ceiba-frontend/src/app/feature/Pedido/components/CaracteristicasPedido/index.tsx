import * as PropTypes from 'prop-types';
import * as React from 'react';
import { CaracteristicasPedidoContainer, FormularioContainer } from './styles';
import { BtnSolicitarPedido } from '../BtnSolicitarPedido';
import { FormSolicitarPedido } from '../FormSolicitarPedido';
import { Pedido } from '../../models/Pedido';

export interface CaracteristicasPedidoProps {
  pedido: Pedido;
  onClickFinalizarPedido: (pedido: Pedido) => void;
}

export const CaracteristicasPedido: React.FC<CaracteristicasPedidoProps> = ({
  pedido,
  onClickFinalizarPedido,
}) => {

  const [finalizarPedidoClicked, setFinalizarPedidoClicked] = React.useState(false);
  return (
    <CaracteristicasPedidoContainer>
      <div><b>numero de pedido:</b> {pedido.numeroPedido}</div>
      <div><b>cantidad productos:</b> {pedido.productosSolicitados.length}</div>
      <div><b>costo total:</b> ${pedido.costo}</div>
      <div><b>tiempo total:</b> {pedido.tiempo} min.</div>
      <BtnSolicitarPedido pedido={pedido} onSolicitar={() => {
        setFinalizarPedidoClicked(true);
      }} />
      {finalizarPedidoClicked && 
        <FormularioContainer>
          <FormSolicitarPedido 
            pedido={pedido} 
            onSubmit={(pedido) => {
              onClickFinalizarPedido(pedido); 
            }}
            cerrarFormulario={() => {
              setFinalizarPedidoClicked(false);
            }}
          />
        </FormularioContainer>      
      }
    </CaracteristicasPedidoContainer>    
  );
};

CaracteristicasPedido.propTypes = {
  pedido: PropTypes.any.isRequired,
  onClickFinalizarPedido: PropTypes.func.isRequired,
};
