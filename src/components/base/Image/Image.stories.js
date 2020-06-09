import React from 'react';

import { storiesOf } from '@storybook/react';

import Image from './Image';
import reactJS from './reactJS.jpg';

storiesOf('Components|Base/Image', module).add('default', () => (
  <Image alt="icon" height="270" src={reactJS} width="480" />
));
