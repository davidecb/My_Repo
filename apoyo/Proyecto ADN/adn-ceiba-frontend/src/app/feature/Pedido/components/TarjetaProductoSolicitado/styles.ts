import styled from 'styled-components';

export const TarjetaProductoSolicitadoContainer = styled.div`
  width: 250px;
  margin: 10px;
  padding: 10px;
  border: 2px groove rgb(10, 10, 114);
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const Eliminar = styled.div`
width: 100%;
text-align: rigth;
cursor: pointer;
`;

export const NombreProducto = styled.div`
  width: 100%;
  font-size: large;
  text-align: center;
  font-weight: bolder;
`;

export const CostoProducto = styled.span`
  margin: 0 10px;
  font-size: large;
  text-align: center;
`;

export const TiempoEjecucion = styled.span`
  margin: 0 10px;
  font-size: large;
  text-align: center;
`;

export const Acabados = styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin-left: 20px;  
`;

export const CaracteristicasProducto = styled.div`
  width: 100%;
  padding: 5px;
  font-size: medium;
  border: 2px groove rgb(200, 200, 200);
  border-radius: 10px;
  pointer-events: none;
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
