import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from 'react-redux'

import SignUp from '../Components/Form/SignUp';
import SignIn from '../Components/Form/SignIn';
import { CLOSE_ALL } from '../actions/modal';

const centered = '50%';
const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    top: centered,
    left: centered,
    transform: `translate(-${centered}, -${centered})`
  },
}));

function FormModal({ modal, closeAll }) {
  const classes = useStyles();
  return (
    <div>
      <Modal open={modal.signIn} onClose={() => closeAll()}>
        <div className={classes.paper}>
          <SignIn />
        </div>
      </Modal>
      <Modal open={modal.signUp} onClose={() => closeAll()}>
        <div className={classes.paper}>
          <SignUp />
        </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  modal: state.modal
});

const mapDispatchToProps = dispatch => ({
  closeAll: () => dispatch({ type: CLOSE_ALL })
});

export default connect(mapStateToProps, mapDispatchToProps)(FormModal);
