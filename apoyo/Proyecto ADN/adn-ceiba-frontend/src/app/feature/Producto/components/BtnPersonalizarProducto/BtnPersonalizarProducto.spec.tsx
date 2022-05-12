import * as React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { BtnPersonalizarProducto } from './../BtnPersonalizarProducto';

describe('BtnPersonalizarProducto Test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof BtnPersonalizarProducto> & {
    onPersonalizar: SinonStub;
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
      onPersonalizar: stub(),
    };
    componentWrapper = render(<BtnPersonalizarProducto {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });
});

export {};
