import styled from 'styled-components';

export const CaracteristicasPedidoContainer = styled.div`
  width: 20%;
  padding: 15px;
  position: fixed;
  left: 80%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 900px) {
    position: static;
    left: 0;
    width: 100%;
  }
`;

export const FormularioContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.95);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
