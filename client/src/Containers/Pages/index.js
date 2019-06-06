/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router';

import Home from './Home';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Post from './Post';
import NotFound from './NotFound';
import User from './User';
import ProtectedRoute from '../ProtectedRoute';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(12),
  },
}));

function Pages() {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="lg">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/posts/:id" component={Post} />
        <ProtectedRoute path="/user/posts" role="user" component={User} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
}

export default Pages;
