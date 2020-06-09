import React from 'react';

import { State, Store } from '@sambego/storybook-state';
import { storiesOf } from '@storybook/react';

import Button from 'components/base/Button';

import Modal from './Modal';

const store = new Store({
  isOpen: false,
});

const handleOpen = () => {
  store.set({
    isOpen: true,
  });
};

const handleClose = () => {
  store.set({
    isOpen: false,
  });
};

storiesOf('Components|Base/Modal', module).add('default', () => (
  <State store={store}>
    {(props) => [
      <>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          actions="Modal buttons ..."
          header="Header"
          isOpen={props.isOpen}
          onClose={handleClose}
        >
          <div style={{ marginBottom: 30 }}>
            Collaboratively promote extensive paradigms rather than emerging
            technologies. Progressively grow team building process improvements
            rather than scalable architectures. Compellingly integrate team
            driven testing procedures rather than just in time imperatives.
            Enthusiastically productize sticky technologies before scalable
            data. Continually facilitate cross-media interfaces rather than
            state of the art vortals. Appropriately leverage next-generation
            e-tailers after holistic e-tailers. Quickly visualize user friendly
            architectures with principle-centered supply chains. Proactively
            strategize enterprise partnerships before parallel customer service.
            Collaboratively maximize functional outsourcing via excellent
            infomediaries. Rapidiously generate fully researched architectures
            for fully researched applications.
          </div>
        </Modal>
      </>,
    ]}
  </State>
));
