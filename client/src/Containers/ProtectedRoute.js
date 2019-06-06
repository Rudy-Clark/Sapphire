import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { goBack } from 'connected-react-router';

const ProtectedRoute = ({
  user,
  component: Component,
  role,
  back,
  ...rest
}) => {
  if (user.role && user.role === role) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
  if (user.role) {
    return back();
  }
  return <Redirect to="/signIn" />;
};
ProtectedRoute.propTypes = {
  user: PropTypes.object,
  component: PropTypes.func,
  back: PropTypes.func,
  role: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  back: () => dispatch(goBack()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProtectedRoute);
