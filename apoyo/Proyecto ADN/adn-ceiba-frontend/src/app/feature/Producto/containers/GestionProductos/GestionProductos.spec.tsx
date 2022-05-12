import * as React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { GestionProductos } from './../GestionProductos';

describe('GestionProductos Test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof GestionProductos> & {
    listarProductos: SinonStub;
    agregarProductoSolicitado: SinonStub;
    crearPedido: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      productos: [{
        id: 1,
        nombre: 'producto testing',
        costo: 10000,
        tiempo: 30,
        imagen: 'imagen.jpg'
      },{
        id: 2,
        nombre: 'producto testing 2',
        costo: 20000,
        tiempo: 60,
        imagen: 'imagen2.jpg'
      }],
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
      listarProductos: stub(),
      agregarProductoSolicitado: stub(),
      crearPedido: stub(),
      cantidadTotalProducto: 2,
    };
    componentWrapper = render(<GestionProductos {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });
});

export {};
