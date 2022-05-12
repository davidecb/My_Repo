import * as React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { TarjetaProductoSolicitado } from './../TarjetaProductoSolicitado';

describe('TarjetaProductoSolicitado Test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof TarjetaProductoSolicitado> & {
    onClickPersonalizarProducto: SinonStub;
    eliminarProductoSolicitado: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      productoSolicitado: {
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
      },
      onClickPersonalizarProducto: stub(),
      eliminarProductoSolicitado: stub(),
    };
    componentWrapper = render(<TarjetaProductoSolicitado {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });
});

export {};
