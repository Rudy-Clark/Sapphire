import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { LOGOUT } from '../actions/constants';
import UserMenu from '../Components/UserMenu';

const useStyles = makeStyles(() => ({
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  button: {
    color: 'inherit',
  },
}));

const StatusUser = ({ user, logout }) => {
  const classes = useStyles();
  if (isEmpty(user.name)) {
    return (
      <Fragment>
        <Link className={classes.link} to="/signIn">
          <Button className={classes.button}>Войти</Button>
        </Link>
        <Link className={classes.link} to="/signUp">
          <Button className={classes.button}>Регистрация</Button>
        </Link>
      </Fragment>
    );
  }
  return <UserMenu user={user} handleLogout={logout} />;
};
StatusUser.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ user: state.user });

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: LOGOUT }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatusUser);
