import React from 'react';
import AppBar from '@material-ui/core/AppBar';
// import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Diamond from './diamond.svg';
// import FormButtons from '../../Containers/Buttons';

const useStyles = makeStyles(() => ({
  logo: {
    width: 32,
    height: 32,
  },
  mainTitle: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <AppBar position="relative">
      <Container maxWidth="lg">
        <Toolbar>
          <Link to="/">
            <img className={classes.logo} alt="Diamond" src={Diamond} />
          </Link>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.mainTitle}
          >
            Sapphire
          </Typography>
          <Link to="/signIn">
            <Button>Login</Button>
          </Link>
          <Link to="/signUp">
            <Button>Register</Button>
          </Link>
          {/* <FormButtons /> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
