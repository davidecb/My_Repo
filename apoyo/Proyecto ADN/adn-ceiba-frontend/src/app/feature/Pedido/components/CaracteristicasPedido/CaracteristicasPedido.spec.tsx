import * as React from 'react';
import { RenderResult, render, fireEvent, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { CaracteristicasPedido } from './../CaracteristicasPedido';
import { setTextEvent } from 'app/shared/utils/test';

describe('CaracteristicasPedido Test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof CaracteristicasPedido> & {
    onClickFinalizarPedido: SinonStub;
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
      onClickFinalizarPedido: stub(),
    };
    componentWrapper = render(<CaracteristicasPedido {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });

  it('should show formSolicitarPedido on FinalizarPedido click', async () => {
    const elem = componentWrapper.container;
    const solicitarButton = elem.querySelectorAll('button')[0];
    
    await wait(() => {
      solicitarButton && fireEvent.click(solicitarButton);
    });

    const divs = elem.querySelectorAll('div');
    const forms = elem.querySelectorAll('form');
    const h2s = elem.querySelectorAll('h2');

    expect(divs.length).toBe(7);
    expect(forms.length).toBe(1);
    expect(h2s.length).toBe(1);
    expect(h2s[0].textContent).toBe('Solicitar Pedido');
  });

  it('should close formSolicitarProducto on cancelar button click', async () => {
    const elem = componentWrapper.container;
    const solicitarButton = elem.querySelectorAll('button')[0];
    
    await wait(() => {
      solicitarButton && fireEvent.click(solicitarButton);
    });

    const cancelarButton = elem.querySelectorAll('span')[1];
    expect(cancelarButton.textContent).toBe('❌');

    await wait(() => {
      cancelarButton && fireEvent.click(cancelarButton);
    });

    const divs = elem.querySelectorAll('div');
    const forms = elem.querySelectorAll('form');

    expect(divs.length).toBe(5);
    expect(forms.length).toBe(0);
  });
  
  it('should submit and close the form when click on agregar al carrito button', async () => {
    const elem = componentWrapper.container;
 
    const direccion = elem.querySelector('input[name="direccion"]');
    const cliente = elem.querySelector('input[name="cliente"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
      direccion && fireEvent.change(direccion, setTextEvent('direccion', 'test street'));
    });
    await wait(() => {
      cliente && fireEvent.change(cliente, setTextEvent('cliente', 'test customer'));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    const divs = elem.querySelectorAll('div');
    const forms = elem.querySelectorAll('form');

    expect(divs.length).toBe(5);
    expect(forms.length).toBe(0);
  });
});

export {};
