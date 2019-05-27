import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Square from '../../components/Square';

afterEach(cleanup);

describe('Square', () => {
  it('On Click Handler is called on Press', () => {
    const fn = jest.fn();
    const { getByTitle } = render(<Square position={4} value={0} onClick={fn} />);
    fireEvent.click(getByTitle('Square 4'));
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it('If Already Pressed, onClick Handler is not called', () => {
    const fn = jest.fn();
    const { getByTitle } = render(<Square position={4} value={1} onClick={fn} />);
    fireEvent.click(getByTitle('Square 4'));
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it('On keyboard \'Enter\' the onClick handler is called', () => {
    const fn = jest.fn();
    const { getByTitle } = render(<Square position={4} value={0} onClick={fn} />);
    fireEvent.keyPress(getByTitle('Square 4'), { key: 'Enter', charCode: 13 });
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
