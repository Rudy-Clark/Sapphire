import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { TOGGLE_SIGN_IN, TOGGLE_SIGN_UP } from '../actions/modal';

const useStyle = makeStyles(() => ({
  button: {
    margin: 2,
    color: '#fff',
  },
}));

function ActionButtons({ handleClick }) {
  const classes = useStyle();
  return (
    <Fragment>
      <Button
        className={classes.button}
        onClick={() => handleClick(TOGGLE_SIGN_IN)}
      >
        Login
      </Button>
      <Button
        className={classes.button}
        onClick={() => handleClick(TOGGLE_SIGN_UP)}
      >
        Register
      </Button>
    </Fragment>
  );
}
ActionButtons.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  handleClick: type => dispatch({ type }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActionButtons);
