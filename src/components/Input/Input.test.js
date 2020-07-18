import React from 'react';
import { mount } from 'enzyme';

import Input from './Input';

describe('Input', () => {
  it('render', () => {
    const app = mount(<Input
      label="Label"
      value=""
      onChange={() => {
      }}
    />);

    expect(app.find('.input').length).toEqual(1);
    expect(app.find('.input__input').length).toEqual(1);
    expect(app.find('.input__placeholder').length).toEqual(1);
  });
});

describe('Input', () => {
  it('render with error', () => {
    const app = mount(<Input
      label="Label"
      value=""
      onChange={() => {
      }}
    />);

    expect(app.find('.input').length).toEqual(0);
  });
});
