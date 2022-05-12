import * as React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { TarjetaProducto } from './../TarjetaProducto';

describe('TarjetaProducto Test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof TarjetaProducto> & {
    onClickPersonalizarProducto: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      producto: {
        id: 1,
        nombre: 'producto testing',
        costo: 10000,
        tiempo: 30,
        imagen: 'imagen.jpg'
      },
      onClickPersonalizarProducto: stub(),
    };
    componentWrapper = render(<TarjetaProducto {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });
});

export {};
