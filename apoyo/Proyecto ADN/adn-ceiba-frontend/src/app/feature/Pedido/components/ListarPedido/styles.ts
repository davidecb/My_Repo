import styled from 'styled-components';

export const PedidoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const FormularioContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.95);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
