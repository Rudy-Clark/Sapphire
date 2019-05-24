import React from 'react'
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'

import { TOGGLE_SIGN_IN, TOGGLE_SIGN_UP } from '../actions/modal';

function ActionButtons({ handleClick }) {
  return (
    <div>
      <Button variant="contained" onClick={() => handleClick(TOGGLE_SIGN_IN)}>
        Login
      </Button>
      <Button variant="contained" onClick={() => handleClick(TOGGLE_SIGN_UP)}>
        Register
      </Button>
    </div>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  handleClick: type => dispatch({ type }),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons);
