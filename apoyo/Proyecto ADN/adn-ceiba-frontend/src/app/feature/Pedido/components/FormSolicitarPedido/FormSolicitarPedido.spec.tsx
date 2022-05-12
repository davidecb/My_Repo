import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { FormSolicitarPedido } from './';
import { setTextEvent } from 'app/shared/utils/test';

describe('FormSolicitarPedido test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof FormSolicitarPedido> & {
    onSubmit: SinonStub;
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
      onSubmit: stub(),
      cerrarFormulario: stub()
    };
    componentWrapper = render(<FormSolicitarPedido {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });

  it('should fail on submit all fields missing', async () => {
    const elem = componentWrapper.container;
    const submitButton = elem.querySelector('button[type="submit"]');;
    
    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(4);
    expect(spans[1].textContent).toBe('El campo direccion es requerido.');
    expect(spans[2].textContent).toBe('El campo cliente es requerido.');
  });

  it('should fail on submit one field missing', async () => {
    const elem = componentWrapper.container;

    const direccion = elem.querySelector('input[name="direccion"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
      direccion && fireEvent.change(direccion, setTextEvent('direccion', 'test street'));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(3);
    expect(spans[1].textContent).toBe('El campo cliente es requerido.');
  });

  it('should submit', async () => {
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

    const formSubmitted = componentProps.onSubmit.firstCall.args[0];

    expect(formSubmitted.direccion).toBe('test street');
    expect(formSubmitted.cliente).toBe('test customer');
    expect(formSubmitted.estado).toBe('solicitado');
  });
});
