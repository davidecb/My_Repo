import * as PropTypes from 'prop-types';
import * as React from 'react';
import { FormularioContainer, ProductosContainer } from './styles';
import { FormSolicitarProducto } from 'app/shared/components/FormSolicitarProducto';
import { Producto } from '../../models/Producto';
import { ProductoSolicitado } from '../../models/ProductoSolicitado';
import { TarjetaProducto } from '../TarjetaProducto';

export interface ListarProductosProps {
  productos: Array<Producto>;
  onClickAgregarProductoSolicitado: (productoSolicitado: ProductoSolicitado) => void;
}

export const ListarProductos: React.FC<ListarProductosProps> = ({
  productos,
  onClickAgregarProductoSolicitado,
}) => {
  const prod: Producto = {
    'id': 0,
    'nombre': '',
    'costo': 0,
    'tiempo': 0,
    'imagen': ''
};
  const [personalizarClicked, setPersonalizarClicked] = React.useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = React.useState(prod);
  return (
    <ProductosContainer>
      {productos && productos.map((producto, index) => {
        return (
          <TarjetaProducto 
              key={index} 
              producto={producto}
              onClickPersonalizarProducto={()=>{
                setPersonalizarClicked(true);
                setProductoSeleccionado(producto);
              }}/>);
      })}
      {personalizarClicked && 
        <FormularioContainer>
          <FormSolicitarProducto 
            producto={productoSeleccionado} 
            onSubmit={(productoSolicitado) => {
              onClickAgregarProductoSolicitado(productoSolicitado); 
            }}
            cerrarFormulario={() => {
              setPersonalizarClicked(false);
              setProductoSeleccionado(prod);
            }}
          />
        </FormularioContainer>      
      }
    </ProductosContainer>
  );
};

ListarProductos.propTypes = {
  productos: PropTypes.array.isRequired,
  onClickAgregarProductoSolicitado: PropTypes.func.isRequired,
};
