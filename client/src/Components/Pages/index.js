import React from 'react';
import Container from '@material-ui/core/Container';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Home from './home';
import SignUp from './SignUp';
import SignIn from './SignIn';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4),
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
      </Switch>
    </Container>
  );
}

export default Pages;
