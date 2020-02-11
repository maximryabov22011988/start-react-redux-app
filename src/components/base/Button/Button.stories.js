import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

import 'resetStyles';
import 'globalStyles';

const acitons = {
  onClick: action('onClick'),
};

storiesOf('Components|Base/Button', module).add('default', () => (
  <Button {...acitons}>Button</Button>
));

storiesOf('Components|Base/Button', module).add('disabled', () => (
  <Button {...acitons} isDisabled>
    Button
  </Button>
));

storiesOf('Components|Base/Button', module).add('without text', () => (
  <Button {...acitons} />
));
