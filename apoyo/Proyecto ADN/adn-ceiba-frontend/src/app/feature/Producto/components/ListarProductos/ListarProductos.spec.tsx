import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { ListarProductos } from './../ListarProductos';

describe('ListarProductos Test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof ListarProductos> & {
    onClickAgregarProductoSolicitado: SinonStub;
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
      onClickAgregarProductoSolicitado: stub(),
    };
    componentWrapper = render(<ListarProductos {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });

  it('should show formSolicitarProducto on personalizarProducto click', async () => {
    const elem = componentWrapper.container;
    const personalizarButton = elem.querySelectorAll('button')[0];
    
    await wait(() => {
      personalizarButton && fireEvent.click(personalizarButton);
    });

    const divs = elem.querySelectorAll('div');
    const forms = elem.querySelectorAll('form');
    const h2s = elem.querySelectorAll('h2');

    expect(divs.length).toBe(16);
    expect(forms.length).toBe(1);
    expect(h2s.length).toBe(1);
    expect(h2s[0].textContent).toBe('Personalizar producto testing');
  });

  it('should close formSolicitarProducto on cancelar button click', async () => {
    const elem = componentWrapper.container;
    const personalizarButton = elem.querySelectorAll('button')[0];
    
    await wait(() => {
      personalizarButton && fireEvent.click(personalizarButton);
    });

    const cancelarButton = elem.querySelectorAll('span')[2];
    expect(cancelarButton.textContent).toBe('❌');

    await wait(() => {
      cancelarButton && fireEvent.click(cancelarButton);
    });

    const divs = elem.querySelectorAll('div');
    const forms = elem.querySelectorAll('form');

    expect(divs.length).toBe(9);
    expect(forms.length).toBe(0);
  });
  
  it('should submit and close the form when click on agregar al carrito button', async () => {
    const elem = componentWrapper.container;
    const personalizarButton = elem.querySelectorAll('button')[0];
    
    await wait(() => {
      personalizarButton && fireEvent.click(personalizarButton);
    });
    
    const material = elem.querySelector('select[name="material"]');
    const color = elem.querySelector('select[name="color"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
      material && fireEvent.change(material, { target: { value: 'ABS'}});
    });
    await wait(() => {
      color && fireEvent.change(color, { target: { value: 'madera'}});
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    const divs = elem.querySelectorAll('div');
    const forms = elem.querySelectorAll('form');

    expect(divs.length).toBe(9);
    expect(forms.length).toBe(0);
  });
});

export {};
