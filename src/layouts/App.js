import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from 'pages/MainPage';
import Page404 from 'pages/Page404';
import Modal from 'components/base/Modal';
import Icon from 'components/base/Icon';
import Button from 'components/base/Button';
import Image from 'components/base/Image';
import Input from 'components/base/Input';
import useModalControl from 'hooks/useModalControl';
import testImage from 'components/base/Image/reactJS.jpg';

import modalName from 'constants/modalNames';
import routePath from 'constants/routePath';
import keyCode from 'constants/keyCode';

import { ReactComponent as ArrowIcon } from 'assets/images/icons/arrow.inline.svg';
import arrow from 'assets/images/icons/sprite/arrow.svg';
import 'normalize.css/normalize.css';
import '../styles/fonts.less';
import '../styles/reset.less';
import '../styles/global.less';

const App = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
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

            {/* Test HMR */}
            <Button onClick={() => setCount((prev) => prev + 1)}>Test 12</Button>
            <span>{count}</span>

            <Input
              label="Label"
              value={input}
              onChange={(value) => {
                setInput(value);
              }}
            />
            {/* Test HMR */}

            {/* Test use svg as ReactComponent, sprite */}
            <Icon height="8" src={arrow} width="12" />
            <ArrowIcon />
            {/* Test use svg as ReactComponent, sprite */}

            {/* Test use jpg image */}
            <Image alt="" height={270} src={testImage} width={480} />
            {/* Test use jpg image */}

            {/* Test use Modal */}
            <Button onClick={openModal(modalName.LOGIN)}>Open login modal</Button>
            <Modal
              actions="Login modal buttons ..."
              isOpen={modalsState.isOpenLogin}
              onClose={closeModal(modalName.LOGIN)}
            >
              Login content
            </Modal>

            <Button onClick={openModal(modalName.REGISTRATION)}>Open registration modal</Button>
            <Modal
              actions="Registration modal buttons ..."
              header="Registration"
              isOpen={modalsState.isOpenRegistration}
              onClose={closeModal(modalName.REGISTRATION)}
            >
              Registration content
            </Modal>
            {/* Test use Modal */}
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
