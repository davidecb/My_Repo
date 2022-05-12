import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Button } from 'app/shared/components/Button';
import { Pedido } from '../../models/Pedido';

interface BtnFinalizarPedido {
  onSolicitar: (pedido: Pedido) => any;
  pedido: Pedido;
}

export const BtnFinalizarPedido: React.FC<BtnFinalizarPedido> = ({
  onSolicitar,
  pedido,
}) => {
  const handleSolicitar = () => onSolicitar(pedido);
  return (
    <Button type='submit' onClick={handleSolicitar}>
      <span>
        Realizar Pedido
      </span>
    </Button>
  );
};

BtnFinalizarPedido.propTypes = {
  pedido: PropTypes.any.isRequired,
  onSolicitar: PropTypes.func.isRequired,
};
