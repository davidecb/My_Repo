import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Button } from 'app/shared/components/Button';
import { Pedido } from '../../models/Pedido';

interface BtnSolicitarPedidoProps {
  onSolicitar: (pedido: Pedido) => any;
  pedido: Pedido;
}

export const BtnSolicitarPedido: React.FC<BtnSolicitarPedidoProps> = ({
  onSolicitar,
  pedido,
}) => {
  const handleSolicitar = () => onSolicitar(pedido);
  return (
    <Button onClick={handleSolicitar}>
      <span>
        Realizar Pedido
      </span>
    </Button>
  );
};

BtnSolicitarPedido.propTypes = {
  pedido: PropTypes.any.isRequired,
  onSolicitar: PropTypes.func.isRequired,
};
