import React, { Fragment, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UsersTable from '../../Components/UsersTable';
import { request } from '../../api/request';
import PostCard from '../../Components/PostCard';
import { REQUEST, REQUEST_SUCCESS } from '../../actions/constants';

const useStyles = makeStyles(() => ({
  title: {
    margin: '30px 0',
  },
}));

function Admin({ load, endLoad }) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      load();
      const respUsers = await request.get('/admin/users');
      const respPosts = await request.get('/posts');
      setUsers(respUsers.users);
      setPosts(respPosts.posts);
      endLoad();
    };
    fetch();
    return () => {
      setUsers([]);
      setPosts([]);
    };
  }, []);

  return (
    <Fragment>
      <Typography
        className={classes.title}
        align="center"
        variant="h4"
        component="h4"
      >
        Пользователи
      </Typography>
      <UsersTable>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.posts.length}</TableCell>
          </TableRow>
        ))}
      </UsersTable>
      <Typography
        className={classes.title}
        align="center"
        variant="h4"
        component="h4"
      >
        Посты
      </Typography>
      <Grid container spacing={4}>
        {posts.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <PostCard {...post} />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}
Admin.propTypes = {
  load: PropTypes.func,
  endLoad: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  load: () => dispatch({ type: REQUEST }),
  endLoad: () => dispatch({ type: REQUEST_SUCCESS }),
});

export default connect(
  null,
  mapDispatchToProps,
)(Admin);
