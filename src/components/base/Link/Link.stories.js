import React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import Link from './Link';

import 'resetStyles';
import 'globalStyles';

const acitons = {
  onClick: action('onClick'),
};

storiesOf('Components|Base/Link', module)
  .addDecorator(StoryRouter())
  .add('text', () => (
    <Link {...acitons} anchor="#">
      Link
    </Link>
  ));

storiesOf('Components|Base/Link', module)
  .addDecorator(StoryRouter())
  .add('text disabled', () => (
    <Link {...acitons} isDisabled anchor="#">
      Link
    </Link>
  ));

storiesOf('Components|Base/Link', module)
  .addDecorator(StoryRouter())
  .add('button', () => (
    <Link {...acitons} anchor="#" theme="button">
      Link
    </Link>
  ));

storiesOf('Components|Base/Link', module)
  .addDecorator(StoryRouter())
  .add('button disabled', () => (
    <Link {...acitons} isDisabled anchor="#" theme="button">
      Link
    </Link>
  ));
