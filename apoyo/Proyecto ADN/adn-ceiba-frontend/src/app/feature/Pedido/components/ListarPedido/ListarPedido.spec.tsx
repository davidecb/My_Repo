import * as React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { ListarPedido } from './../ListarPedido';

describe('ListarPedido Test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof ListarPedido> & {
    onClickFinalizarPedido: SinonStub;
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
        productosSolicitados:[{
          id: 1,
          pedido: 1,
          cantidad: 2,
          productoSolicitado: {
            material: 'PLA',
            color: 'negro',
            acabado: {
              pulido: false,
              pintado: false,
              barnizado: false
            },
            urgencia: false,
            producto: {
              id: 1,
              nombre: 'producto testing',
              costo: 10000,
              tiempo: 30,
              imagen: 'imagen.jpg'
            }
          }
        }]
      },
      onClickFinalizarPedido: stub(),
      eliminarProductoSolicitado: stub(),
    };
    componentWrapper = render(<ListarPedido {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });
});

export {};
