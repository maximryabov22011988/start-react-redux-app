import { addDecorator } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import StoryRouter from 'storybook-react-router';

import CenterDecorator from './CenterDecorator';

addDecorator(CenterDecorator);
addDecorator(withPropsTable);
addDecorator(StoryRouter());
