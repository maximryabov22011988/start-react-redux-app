import React from 'react';
import { storiesOf } from '@storybook/react';

import Image from './Image';

import reactJS from './reactJS.jpg';

storiesOf('Components|Base/Image', module).add('default', () => (
  <Image src={reactJS} width="480" height="270" alt="icon" />
));
