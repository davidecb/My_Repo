import styled from 'styled-components';

export const TarjetaProductoContainer = styled.div`
  width: 250px;
  height: 320px;
  margin: 10px;
  padding: 10px;
  border: 2px groove rgb(10, 10, 114);
  border-radius: 10px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const NombreProducto = styled.div`
  width: 100%;
  font-size: large;
  text-align: center;
  font-weight: bolder;
`;

export const CostoProducto = styled.div`
  width: 100%;
  font-size: large;
  text-align: center;
`;

export const TiempoEjecucion = styled.div`
  width: 100%;
  font-size: large;
  text-align: center;
`;

export const ProductoImagen = styled.img`
  border: 3px outset rgb(200, 200, 200);
  border-radius: 10px;
  min-height: 180px;
  min-width: 200px;
  max-height: 180px;
  max-width: 200px;
  object-fit: contain;
`;
