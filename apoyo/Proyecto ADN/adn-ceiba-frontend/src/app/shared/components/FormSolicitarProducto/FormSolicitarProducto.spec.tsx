import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { FormSolicitarProducto } from './';

describe('FormSolicitarProducto test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof FormSolicitarProducto> & {
    onSubmit: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      producto: {},
      onSubmit: stub(),
      cerrarFormulario: stub()
    };
    componentWrapper = render(<FormSolicitarProducto {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });

  it('should fail on submit all fields missing', async () => {
    const elem = componentWrapper.container;
    const submitButton = elem.querySelector('button[type="submit"]');
    
    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(3);
    expect(spans[1].textContent).toBe('El campo material es requerido.');
    expect(spans[2].textContent).toBe('El campo color es requerido.');
  });

  it('should fail on submit one field missing', async () => {
    const elem = componentWrapper.container;

    const material = elem.querySelector('select[name="material"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
      material && fireEvent.change(material, { target: { value: 'PLA'}});
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(2);
    expect(spans[1].textContent).toBe('El campo color es requerido.');
  });

  it('should submit', async () => {
    const elem = componentWrapper.container;

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

    const formSubmitted = componentProps.onSubmit.firstCall.args[0];

    expect(formSubmitted.material).toBe('ABS');
    expect(formSubmitted.color).toBe('madera');
    expect(formSubmitted.cantidad).toBe(1);
    expect(formSubmitted.acabado.pulido).toBe(false);
    expect(formSubmitted.acabado.pintado).toBe(false);
    expect(formSubmitted.acabado.barnizado).toBe(false);
    expect(formSubmitted.urgencia).toBe(false);
  });
});
