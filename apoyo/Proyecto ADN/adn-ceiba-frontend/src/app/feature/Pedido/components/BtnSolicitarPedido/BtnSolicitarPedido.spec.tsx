import * as React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { BtnSolicitarPedido } from './../BtnSolicitarPedido';

describe('BtnSolicitarPedido Test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof BtnSolicitarPedido> & {
    onSolicitar: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      pedido: {
        id: 1,
        numeroPedido: '123456789',
        direccion: '',
        cliente: '',
        estado: '',
        costo: 10000,
        tiempo: 30,
        productosSolicitados:[]
      },
      onSolicitar: stub(),
    };
    componentWrapper = render(<BtnSolicitarPedido {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });
});

export {};
