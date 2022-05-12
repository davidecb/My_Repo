import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  Acabados,
  CaracteristicasProducto,
  CostoProducto,
  Eliminar,
  NombreProducto,
  ProductoImagen,
  TarjetaProductoSolicitadoContainer,
  TiempoEjecucion
} from './styles';
import { ProductoSolicitado } from '../../../Producto/models/ProductoSolicitado';


export interface TarjetaProductoSolicitadoProps {
  productoSolicitado: any;
  onClickPersonalizarProducto: (productoSolicitado: ProductoSolicitado) => void;
  eliminarProductoSolicitado: (idProductoSolicitado: number) => void;
}

export const TarjetaProductoSolicitado: React.FC<TarjetaProductoSolicitadoProps> = ({
  productoSolicitado,
  onClickPersonalizarProducto,
  eliminarProductoSolicitado,
}) => {
  const handleEliminar = () => {
    eliminarProductoSolicitado(productoSolicitado.id);
    window.location.reload();
  };

  return (
    <TarjetaProductoSolicitadoContainer>
      <Eliminar onClick={handleEliminar}>❌</Eliminar>
      <ProductoImagen src={productoSolicitado.productoSolicitado.producto.imagen} />
      <NombreProducto>{productoSolicitado.productoSolicitado.producto.nombre}</NombreProducto>
      <CostoProducto><b>costo/unidad:</b> ${productoSolicitado.productoSolicitado.costo}</CostoProducto>
      <TiempoEjecucion><b>tiempo/unidad:</b> {productoSolicitado.productoSolicitado.tiempo} min.</TiempoEjecucion>
      <CaracteristicasProducto>
        <div><b>material:</b> {productoSolicitado.productoSolicitado.material}</div>
        <div><b>color:</b> {productoSolicitado.productoSolicitado.color}</div>
        <div>
          <b>acabado:</b>
          <Acabados>
            <div>pulido: <input type='checkbox' defaultChecked={productoSolicitado.productoSolicitado.acabado.pulido as boolean} /></div>
            <div>pintado: <input type='checkbox' defaultChecked={productoSolicitado.productoSolicitado.acabado.pintado as boolean} /></div>
            <div>barnizado: <input type='checkbox' defaultChecked={productoSolicitado.productoSolicitado.acabado.barnizado as boolean} /></div>
          </Acabados>
        </div>
        <div>
          <b>urgencia:</b> 
          <input type='checkbox' defaultChecked={productoSolicitado.productoSolicitado.urgencia as boolean} />
        </div>
        <div><b>cantidad:</b> {productoSolicitado.cantidad}</div>
      </CaracteristicasProducto>
      <CostoProducto><b>costo total:</b> ${productoSolicitado.productoSolicitado.costo * productoSolicitado.cantidad}</CostoProducto>
      <TiempoEjecucion><b>tiempo total:</b> {productoSolicitado.productoSolicitado.tiempo * productoSolicitado.cantidad} min.</TiempoEjecucion>
    </TarjetaProductoSolicitadoContainer>
  );
};

TarjetaProductoSolicitado.propTypes = {
  productoSolicitado: PropTypes.any.isRequired,
  onClickPersonalizarProducto: PropTypes.func.isRequired,
  eliminarProductoSolicitado: PropTypes.func.isRequired,
};
