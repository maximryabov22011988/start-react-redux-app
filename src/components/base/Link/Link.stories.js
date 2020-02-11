import React from 'react';
import StoryRouter from 'storybook-react-router';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

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
    <Link {...acitons} anchor="#" isDisabled>
      Link
    </Link>
  ));

storiesOf('Components|Base/Link', module)
  .addDecorator(StoryRouter())
  .add('button', () => (
    <Link {...acitons} appearance="button" anchor="#">
      Link
    </Link>
  ));

storiesOf('Components|Base/Link', module)
  .addDecorator(StoryRouter())
  .add('button disabled', () => (
    <Link {...acitons} appearance="button" anchor="#" isDisabled>
      Link
    </Link>
  ));
