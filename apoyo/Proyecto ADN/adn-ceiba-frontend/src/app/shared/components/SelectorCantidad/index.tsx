import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Cantidad, Selector, SelectorCantidadContainer } from './styles';

interface SelectorCantidadProps {
  setCantidad: (cantidad: number) => any;
  cantidad: number;
}

export const SelectorCantidad: React.FC<SelectorCantidadProps> = ({
  setCantidad,
  cantidad,
}) => {
  const [cantidadSelector, setCantidadSelector] = React.useState(cantidad);

  return (
    <SelectorCantidadContainer>
      <Selector onClick={() => {
        if (cantidadSelector > 1) {
          setCantidadSelector(cantidadSelector - 1);
          setCantidad(cantidadSelector - 1);
        }
      }}>
        ➖
      </Selector>
      <Cantidad>
        {cantidadSelector}
      </Cantidad>
      <Selector onClick={() => {
        setCantidadSelector(cantidadSelector + 1);
        setCantidad(cantidadSelector + 1);
      }}>
        ➕
      </Selector>
    </SelectorCantidadContainer>
  );
};

SelectorCantidad.propTypes = {
  setCantidad: PropTypes.func.isRequired,
  cantidad: PropTypes.number.isRequired,
};
