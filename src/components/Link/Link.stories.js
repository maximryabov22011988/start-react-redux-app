import React from 'react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import Link from './Link';

import 'resetStyles';
import 'globalStyles';

const acitons = {
  onClick: action('onClick'),
};

export default {
  title: 'Components|Base/Link',
  component: Link,
  id: 'demo-link-id',
  decorators: [withA11y],
};

export const Text = () => (
  <Link {...acitons} anchor="#">
        Link
  </Link>
);
Text.story = {
  name: 'text',
};

export const TextDisabled = () => (
  <Link {...acitons} isDisabled anchor="#">
        Link
  </Link>
);
TextDisabled.story = {
  name: 'text disabled',
};

export const Button = () => (
  <Link {...acitons} anchor="#" theme="button">
        Link
  </Link>
);
Button.story = {
  name: 'button',
};

export const ButtonDisabled = () => (
  <Link {...acitons} isDisabled anchor="#" theme="button">
        Link
  </Link>
);
ButtonDisabled.story = {
  name: 'button disabled',
};
