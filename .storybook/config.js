import { configure, addDecorator, addParameters } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';
import { withPropsTable } from 'storybook-addon-react-docgen';

import CenterDecorator from './CenterDecorator';

addDecorator(CenterDecorator);
addDecorator(withPropsTable);
configureActions({
  depth: 100,
  limit: 100, // Limit the number of items logged into the actions panel
});

addParameters({
  options: {
    name: 'Project name',
    url: 'git url',
    showNav: true,
    showPanel: true,
    panelPosition: 'right',
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
    sidebarAnimations: true,
    enableShortcuts: true,
    isToolshown: true,
    theme: undefined,
  },
});

require('./docs');
configure(require.context('../src', true, /\.stories\.js$/), module);
