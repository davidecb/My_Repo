import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Button } from 'app/shared/components/Button';
import { Producto } from '../../models/Producto';

interface BtnSolicitarProductoProps {
  onSolicitar: (producto: Producto) => any;
  producto: Producto;
}

export const BtnSolicitarProducto: React.FC<BtnSolicitarProductoProps> = ({
  onSolicitar,
  producto,
}) => {
  const handleSolicitar = () => onSolicitar(producto);
  return (
    <Button onClick={handleSolicitar}>
      <span>
        Solicitar
      </span>
    </Button>
  );
};

BtnSolicitarProducto.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    costo: PropTypes.number.isRequired,
    tiempo: PropTypes.number.isRequired,
    imagen: PropTypes.string.isRequired
  }).isRequired,
  onSolicitar: PropTypes.func.isRequired,
};
