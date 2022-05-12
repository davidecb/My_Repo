import styled from 'styled-components';

export const DivContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;

export const DivRow = styled.div`
  min-height: 1px;
`;
