import * as React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { GestionPedido } from './../GestionPedido';

describe('GestionPedido Test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof GestionPedido> & {
    listarPedido: SinonStub;
    finalizarPedido: SinonStub;
    eliminarProductoSolicitado: SinonStub;
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
      listarPedido: stub(),
      finalizarPedido: stub(),
      eliminarProductoSolicitado: stub(),
    };
    componentWrapper = render(<GestionPedido {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });
});

export {};
