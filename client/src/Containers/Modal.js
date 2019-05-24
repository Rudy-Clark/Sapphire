import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useDispatch } from 'react-redux'

import SignUp from '../Components/Form/SignUp';
import SignIn from '../Components/Form/SignIn';

const useStyles = makeStyles(theme => ({

}));

function FormModal() {
  const classes = useStyles();
  const modal = useSelector(state => state.modal);
  const dispatch = useDispatch();
  if ('signUp' in modal) {
    return (
      <Modal
        className={classes.root}
        open={modal.signUp}
        onClose={() => dispatch()}
      >
        <SignUp />
      </Modal>
    );
  } else if ('signIn' in modal) {
    return (
      <Modal
        className={classes.root}
        open={modal.signIn}
        onClose={() => dispatch()}
      >
        <SignIn />
      </Modal>
    );
  } else return null;
}

export default FormModal;
