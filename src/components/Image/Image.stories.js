import React from 'react';

import Image from './Image';
import reactJS from './reactJS.jpg';

export default {
  title: 'Components|Base/Image',
  component: Image,
  id: 'demo-image-id',
};

export const Default = () => <Image alt="icon" height="270" src={reactJS} width="480" />;
Default.story = {
  name: 'default',
};
