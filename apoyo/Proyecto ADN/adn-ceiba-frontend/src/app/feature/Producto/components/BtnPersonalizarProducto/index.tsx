import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Button } from 'app/shared/components/Button';
import { Producto } from '../../models/Producto';

interface BtnPersonalizarProductoProps {
  onPersonalizar: (producto: Producto) => any;
  producto: Producto;
}

export const BtnPersonalizarProducto: React.FC<BtnPersonalizarProductoProps> = ({
  onPersonalizar,
  producto,
}) => {
  const handlePersonalizar = () => onPersonalizar(producto);
  return (
    <Button onClick={handlePersonalizar}>
      <span>
        personalizar
      </span>
    </Button>
  );
};

BtnPersonalizarProducto.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    costo: PropTypes.number.isRequired,
    tiempo: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired
  }).isRequired,
  onPersonalizar: PropTypes.func.isRequired,
};
