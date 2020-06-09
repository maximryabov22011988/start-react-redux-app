import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import routePath from 'constants/routePath';

const propTypes = {
  children: PropTypes.node,
  isAuthUser: PropTypes.bool,
  userIsLogOut: PropTypes.bool,
};

const defaultProps = {
  isAuthUser: false,
  userIsLogOut: false,
};

const PrivateRoute = ({
  children, isAuthUser, userIsLogOut, ...props
}) => (
  <Route {...props}>
    {!isAuthUser && !userIsLogOut && <Redirect to={routePath.LOGIN} />}
    {isAuthUser && children}
  </Route>
);

PrivateRoute.propTypes = propTypes;
PrivateRoute.defaultProps = defaultProps;

const mapStateToProps = () => ({
  isAuthUser: false,
  userIsLogOut: false,
});

export default connect(mapStateToProps)(PrivateRoute);
