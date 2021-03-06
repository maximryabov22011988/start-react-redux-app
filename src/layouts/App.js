import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchOffers } from 'features/offers/storeSlice';

import MainPage from 'pages/MainPage';
import Page404 from 'pages/Page404';
import Dialog from 'components/Dialog';
import Icon from 'components/Icon';
import Button from 'components/Button';
import Link from 'components/Link';
import Image from 'components/Image';
import Input from 'components/Input';
import { useModalControl } from 'hooks/useModalControl';
import testImage from 'components/Image/reactJS.jpg';

import { modalNames } from 'constants/modalNames';
import { routePath } from 'constants/routePath';
import { keyCode } from 'constants/keyCode';

import { ReactComponent as ArrowIcon } from 'assets/images/icons/arrow.inline.svg';
import arrow from 'assets/images/icons/sprite/arrow.svg';

import 'normalize.css/normalize.css';
import '../styles/fonts.less';
import '../styles/reset.less';
import '../styles/global.less';

const App = () => {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');
  const [modalsState, openModal, closeModal] = useModalControl(modalNames.LOGIN, modalNames.REGISTRATION);

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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  return (
    <div className="app">
      <Switch>
        <Route exact path={routePath.MAIN}>
          <>
            <MainPage
              openLoginModal={openModal(modalNames.LOGIN)}
              openRegistrationModal={openModal(modalNames.REGISTRATION)}
            />

            <Link url="https://www.google.com/">Link</Link>

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

            {/* Test use Dialog */}
            <div style={{ marginTop: 200 }}>
              <Button onClick={openModal(modalNames.LOGIN)}>Open login modal</Button>
            </div>

            <Dialog
              footer="Buttons ..."
              isOpen={modalsState.isOpenLogin}
              title="Title"
              onClose={closeModal(modalNames.LOGIN)}
            >
              <p>Login content</p>
              <div style={{ height: 200 }} />
            </Dialog>

            <Button onClick={openModal(modalNames.REGISTRATION)}>Open registration modal</Button>
            <Dialog
              footer="Buttons ..."
              isOpen={modalsState.isOpenRegistration}
              title="Title"
              onClose={closeModal(modalNames.REGISTRATION)}
            >
              <p>Registration content</p>
              <div style={{ height: 1000 }} />
            </Dialog>
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
