/* eslint-disable no-param-reassign */
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import red from '@material-ui/core/colors/red';

import { signIn } from '../../actions';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errors: {
    textAlign: 'center',
    color: red[500],
  },
}));

function SignIn({
  handleSubmit,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  serErrors,
  submitting,
}) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={e => {
              handleChange.call(this, e);
              serErrors.msg = null;
            }}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={errors.email ? errors.email : ''}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            value={values.password}
            onChange={e => {
              handleChange.call(this, e);
              serErrors.msg = null;
            }}
            onBlur={handleBlur}
            autoComplete="current-password"
            error={touched.password && Boolean(errors.password)}
            helperText={errors.password ? errors.password : ''}
          />
          <p className={classes.errors}>
            {serErrors.msg ? serErrors.msg : null}
          </p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={submitting}
          >
            Войти
          </Button>
        </form>
      </div>
    </Container>
  );
}

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  serErrors: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
};

const wrapWithFormik = withFormik({
  mapPropsToValues: ({ login, loading }) => ({
    email: '',
    password: '',
    login,
    loading,
  }),
  handleSubmit: values => {
    values.login({ email: values.email, password: values.password });
  },
  validate: values => {
    const errors = {};

    if (!values.email) {
      errors.email = 'E-mail не может быть пустым';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Неверный формат';
    }

    if (!values.password) {
      errors.password = 'Пароль не может быть пустым';
    } else if (values.password.trim().length < 4) {
      errors.password = 'не меньше 4 символа';
    }

    return errors;
  },
  displayName: 'SignIn',
})(SignIn);

const mapStateToProps = state => ({
  serErrors: state.formErrors.login,
  submitting: state.formErrors.loading,
  loading: state.request.loading,
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(signIn(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(wrapWithFormik);
