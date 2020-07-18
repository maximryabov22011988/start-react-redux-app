import React from 'react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import Button from './Button';

import 'resetStyles';
import 'globalStyles';

const acitons = {
  onClick: action('onClick'),
};

export default {
  title: 'Components|Base/Button',
  component: Button,
  id: 'demo-button-id',
  decorators: [withA11y],
};

export const Default = () => <Button {...acitons}>Button</Button>;
Default.story = {
  name: 'default',
};

export const Disabled = () => (
  <Button {...acitons} isDisabled>
    Button
  </Button>
);
Disabled.story = {
  name: 'disabled',
};

export const WithoutText = () => <Button {...acitons}>{false}</Button>;
WithoutText.story = {
  name: 'without text',
};
