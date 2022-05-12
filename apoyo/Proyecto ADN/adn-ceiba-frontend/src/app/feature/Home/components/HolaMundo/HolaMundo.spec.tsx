import * as React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { HolaMundo } from './../HolaMundo';

describe('HolaMundo Test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof HolaMundo> & {
    
  };

  beforeEach(() => {
    componentProps = {
      msg: 'bienvenida'
    };
    componentWrapper = render(<HolaMundo {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });
});

export {};
