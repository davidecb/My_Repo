import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  CostoProducto,
  NombreProducto,
  ProductoImagen,
  TarjetaProductoContainer,
  TiempoEjecucion
} from './styles';
import { BtnPersonalizarProducto } from '../BtnPersonalizarProducto';
import { Producto } from '../../models/Producto';


export interface TarjetaProductoProps {
  producto: Producto;
  onClickPersonalizarProducto: (producto: Producto) => void;
}

export const TarjetaProducto: React.FC<TarjetaProductoProps> = ({
  producto,
  onClickPersonalizarProducto,
}) => {
  return (
    <TarjetaProductoContainer>
      <ProductoImagen src={producto.imagen} />
      <NombreProducto>{producto.nombre}</NombreProducto>
      <CostoProducto>$ {producto.costo}</CostoProducto>
      <TiempoEjecucion>{producto.tiempo} min.</TiempoEjecucion>
      <BtnPersonalizarProducto onPersonalizar={onClickPersonalizarProducto} producto={producto} />
    </TarjetaProductoContainer>
  );
};

TarjetaProducto.propTypes = {
  producto: PropTypes.any.isRequired,
  onClickPersonalizarProducto: PropTypes.func.isRequired,
};
