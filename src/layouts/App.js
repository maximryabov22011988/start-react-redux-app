import React, { useCallback, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from 'pages/MainPage';
import Page404 from 'pages/Page404';
import Modal from 'components/base/Modal';
import useModalControl from 'hooks/useModalControl';
import Button from 'components/base/Button';

import modalName from 'constants/modalNames';
import routePath from 'constants/routePath';
import keyCode from 'constants/keyCode';

import 'normalize.css/normalize.css';
import '../styles/fonts.less';
import '../styles/reset.less';
import '../styles/global.less';

const App = () => {
  const [modalsState, openModal, closeModal] = useModalControl(modalName.LOGIN, modalName.REGISTRATION);

  const addModalsContainer = useCallback(() => {
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modals';
    document.body.appendChild(modalContainer);
  }, []);

  const addMouseClass = useCallback(() => {
    document.body.classList.add('use-mouse');
  }, []);

  const removeMouseClass = useCallback((event) => {
    if (event.keyCode === keyCode.TAB) {
      document.body.classList.remove('use-mouse');
    }
  }, []);

  useEffect(() => {
    addModalsContainer();
    // Показывает стили фокуса только при управлении с клавиатуры
    document.body.addEventListener('mousedown', addMouseClass);
    document.body.addEventListener('keydown', removeMouseClass);
  }, [addModalsContainer, addMouseClass, removeMouseClass]);

  return (
    <div className="app">
      <Switch>
        <Route exact path={routePath.MAIN}>
          <>
            <MainPage
              openLoginModal={openModal(modalName.LOGIN)}
              openRegistrationModal={openModal(modalName.REGISTRATION)}
            />

            <Button>Test</Button>

            <Modal
              actions="Login modal buttons ..."
              isOpen={modalsState.isOpenLogin}
              onClose={closeModal(modalName.LOGIN)}
            >
              Login content
            </Modal>

            <Modal
              actions="Registration modal buttons ..."
              header="Registration"
              isOpen={modalsState.isOpenRegistration}
              onClose={closeModal(modalName.REGISTRATION)}
            >
              Registration content
            </Modal>
          </>
        </Route>

        <Route path={routePath.NOT_FOUND}>
          <Page404 />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
