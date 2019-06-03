import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

import { signUp } from '../../actions';

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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp({
  handleSubmit,
  handleBlur,
  handleChange,
  errors,
  values,
  touched,
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
          Регистрация
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="lname"
                name="username"
                variant="outlined"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && !!errors.username}
                helperText={errors.username ? errors.username : ''}
                fullWidth
                id="username"
                label="Логин"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && !!errors.email}
                helperText={errors.email ? errors.email : ''}
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && !!errors.password}
                helperText={errors.password ? errors.password : ''}
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Отправить
          </Button>
        </form>
      </div>
    </Container>
  );
}

SignUp.propTypes = {
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
};

const wrapWithFormik = withFormik({
  mapPropsToValues: ({ reg, serErrors }) => ({
    email: '',
    password: '',
    username: '',
    reg,
    serErrors,
  }),
  handleSubmit: values => {
    values.reg({
      email: values.email,
      password: values.password,
      username: values.username,
    });
  },
  validate: values => {
    const errors = {};

    if (!values.username) {
      errors.username = 'Логин не может быть пустым';
    } else if (values.serErrors.username) {
      errors.username = values.serErrors.username;
    }

    if (!values.email) {
      errors.email = 'E-mail не может быть пустым';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Неправильный формат Email';
    } else if (values.serErrors.email) {
      errors.email = values.serErrors.email;
    }

    if (!values.password) {
      errors.password = 'Пароль не может быть пустым';
    }

    return errors;
  },
  displayName: 'SignUp',
})(SignUp);

const mapStateToProps = state => ({
  serErrors: state.formErrors.reg,
});

const mapDispatchToProps = dispatch => ({
  reg: data => dispatch(signUp(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(wrapWithFormik);
