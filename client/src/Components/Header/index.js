import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';

import Diamond from './diamond.svg';
import StatusUser from '../../Containers/StatusUser';

const useStyles = makeStyles(() => ({
  logo: {
    width: 32,
    height: 32,
  },
  mainTitle: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  button: {
    color: 'inherit',
  },
}));

function ElevationScroll({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

function Header(props) {
  const classes = useStyles();
  return (
    <ElevationScroll {...props}>
      <AppBar>
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
            <StatusUser />
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}

export default Header;
