import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { SelectorCantidad } from './';

describe('SelectorCantidad test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof SelectorCantidad> & {
    setCantidad: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      cantidad: 1,
      setCantidad: stub(),
    };
    componentWrapper = render(<SelectorCantidad {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });

  it('should not allow to select quantity less than one', async () => {
    const elem = componentWrapper.container;
    const lessButton = elem.querySelectorAll('div')[1];
    
    await wait(() => {
      lessButton && fireEvent.click(lessButton);
      lessButton && fireEvent.click(lessButton);
      lessButton && fireEvent.click(lessButton);
      lessButton && fireEvent.click(lessButton);
      lessButton && fireEvent.click(lessButton);
    });
    const divCantidad = elem.querySelectorAll('div');

    expect(divCantidad.length).toBe(4);
    expect(divCantidad[2].textContent).toBe('1');
  });

  it('should show 3 before click 2 times the more button', async () => {
    const elem = componentWrapper.container;
    const moreButton = elem.querySelectorAll('div')[3];
    
    await wait(() => {
      moreButton && fireEvent.click(moreButton);
      moreButton && fireEvent.click(moreButton);
    });
    const divCantidad = elem.querySelectorAll('div');

    expect(divCantidad.length).toBe(4);
    expect(divCantidad[2].textContent).toBe('3');
  });

  it('should show 4 before click 4 times the more button and 1 time the less button', async () => {
    const elem = componentWrapper.container;
    const lessButton = elem.querySelectorAll('div')[1];
    const moreButton = elem.querySelectorAll('div')[3];
    
    await wait(() => {
      moreButton && fireEvent.click(moreButton);
      moreButton && fireEvent.click(moreButton);
      moreButton && fireEvent.click(moreButton);
      moreButton && fireEvent.click(moreButton);
      lessButton && fireEvent.click(lessButton);
    });
    const divCantidad = elem.querySelectorAll('div');

    expect(divCantidad.length).toBe(4);
    expect(divCantidad[2].textContent).toBe('4');
  });
});
