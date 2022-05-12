import * as React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { BtnSolicitarProducto } from './../BtnSolicitarProducto';

describe('BtnSolicitarProducto Test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof BtnSolicitarProducto> & {
    onSolicitar: SinonStub;
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
      onSolicitar: stub(),
    };
    componentWrapper = render(<BtnSolicitarProducto {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });
});

export {};
