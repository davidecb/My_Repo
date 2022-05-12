import styled from 'styled-components';

export const FormSolicitarPedidoContainer = styled.div`
  min-width: 300px;
  max-height: 500px;
  margin: 10px;
  padding: 10px;
  background: rgb(216, 216, 216);
  border: 4px groove rgb(10, 10, 114);
  border-radius: 10px;
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  justify-content: center;
`;

export const Cancelar = styled.span`
cursor: pointer;
`;

export const Label = styled.label`
  margin: 3px;
  margin-left: 25px;
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Form = styled.form`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const SpanError = styled.span`
  color: #f62d2d;
  font-weight: bold;
  font-size: 12px;
`;
