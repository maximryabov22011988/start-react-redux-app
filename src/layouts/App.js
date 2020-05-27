import modalName from 'constants/modalNames';
import routePath from 'constants/routePath';

import PropTypes from 'prop-types';
import React from 'react';

import Modal from 'components/base/Modal';
import withModalControl from 'hocs/withModalControl';
import MainPage from 'pages/MainPage';
import Page404 from 'pages/Page404';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';

import 'normalize.css/normalize.css';
import '../styles/fonts.less';
import '../styles/reset.less';
import '../styles/global.less';

const rootClass = 'app';

const propTypes = {
  modals: PropTypes.shape({
    isOpenLogin: PropTypes.bool,
    isOpenRegistration: PropTypes.bool,
  }),
  onModalOpen: PropTypes.func,
  onModalClose: PropTypes.func,
};

class App extends React.Component {
  componentDidMount() {
    this.addModalsContainer();
  }

  addModalsContainer = () => {
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modals';
    document.body.appendChild(modalContainer);
  };

  handleLoginModalOpen = () => {
    const { onModalOpen } = this.props;
    onModalOpen(modalName.LOGIN)();
  };

  handleLoginModalClose = () => {
    const { onModalClose } = this.props;
    onModalClose(modalName.LOGIN)();
  };

  handleRegistrationModalOpen = () => {
    const { onModalOpen } = this.props;
    onModalOpen(modalName.REGISTRATION)();
  };

  handleRegistrationModalClose = () => {
    const { onModalClose } = this.props;
    onModalClose(modalName.REGISTRATION)();
  };

  render() {
    const { modals } = this.props;

    return (
      <div className={rootClass}>
        <Switch>
          <Route exact path={routePath.MAIN}>
            <>
              <MainPage
                onLoginModalOpen={this.handleLoginModalOpen}
                onRegistrationModalOpen={this.handleRegistrationModalOpen}
              />

              <Modal
                actions="Login modal buttons ..."
                isOpen={modals.isOpenLogin}
                onClose={this.handleLoginModalClose}
              >
                Login content
              </Modal>

              <Modal
                actions="Registration modal buttons ..."
                header="Registration"
                isOpen={modals.isOpenRegistration}
                onClose={this.handleRegistrationModalClose}
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
  }
}

App.propTypes = propTypes;

export default compose(
  withModalControl(modalName.LOGIN, modalName.REGISTRATION),
  connect(),
)(App);
