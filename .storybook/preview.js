import { addDecorator, addParameters } from '@storybook/react';
import { withPropsTable } from 'storybook-addon-react-docgen';
import StoryRouter from 'storybook-react-router';
import { configureActions } from '@storybook/addon-actions';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import { pageTitle } from '../project.settings';

addParameters({
  darkMode: {
    current: 'light',
  },
});

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
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

configureActions({
  depth: 100,
  limit: 100,
});
