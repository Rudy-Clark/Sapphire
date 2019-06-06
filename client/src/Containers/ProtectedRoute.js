import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({}));

const ProtectedRoute = ({ user, component: Component, role, ...rest }) => {
  if (user.role && user.role === role) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  return <Redirect to="/signIn" />;
};
ProtectedRoute.propTypes = {
  user: PropTypes.object,
  component: PropTypes.node,
  role: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProtectedRoute);
