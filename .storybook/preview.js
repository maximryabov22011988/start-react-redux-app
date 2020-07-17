import { addDecorator, addParameters } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import StoryRouter from 'storybook-react-router';
import { configureActions } from '@storybook/addon-actions';

import { pageTitle } from '../project.settings';

configureActions({
  depth: 100,
  limit: 100, // Limit the number of items logged into the actions panel
});

addParameters({
  options: {
    name: pageTitle,
    showNav: true,
    showPanel: true,
    panelPosition: 'bottom',
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: true,
    enableShortcuts: true,
    isToolshown: true,
    theme: undefined,
  },
});

addDecorator(withPropsTable);
addDecorator(StoryRouter());
