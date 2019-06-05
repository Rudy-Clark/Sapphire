import React, { Fragment, useState, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import { Link as LinkRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  icon: {
    color: '#fff',
    width: '32px',
    height: '32px',
  },
  link: {
    fontSize: '1rem',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

function UserMenu({ user }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const userIconRef = useRef(null);

  const handleClose = () => setOpen(false);
  const handleClick = () => setOpen(true);

  return (
    <Fragment>
      <IconButton
        aria-label="More"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
        ref={userIconRef}
      >
        <AccountCircle className={classes.icon} />
      </IconButton>
      <Paper className={classes.paper}>
        <Menu
          id="user-menu"
          anchorEl={userIconRef.current}
          open={open}
          onClose={handleClose}
        >
          <List>
            <ListItem disabled>
              <ListItemText>{user.name}</ListItemText>
            </ListItem>
            <Divider />
            <ListItem button>
              <Link
                className={classes.link}
                component={LinkRouter}
                to="/user/posts"
              >
                Posts
              </Link>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText>Выйти</ListItemText>
            </ListItem>
          </List>
        </Menu>
      </Paper>
    </Fragment>
  );
}
UserMenu.propTypes = {
  user: PropTypes.object,
};

export default UserMenu;
