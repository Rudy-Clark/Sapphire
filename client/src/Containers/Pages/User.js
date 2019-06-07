/* eslint-disable prettier/prettier */
import React, { Fragment, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import request from '../../api/request';
import PostCard from '../../Components/PostCard';
import { REQUEST, REQUEST_SUCCESS } from '../../actions/constants';

const useStyles = makeStyles(() => ({
  title: {
    margin: '30px 0',
  },
}));

function Admin({ load, endLoad }) {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        load();
        const resp = await request.get('/user/posts');
        setPosts(resp.posts);
        endLoad();
      } catch (error) {
        console.error(error);
      } finally {
        endLoad();
      }
    };
    fetch();
    return () => {
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
        Посты
      </Typography>
      <Grid container spacing={4}>
        {posts.length
          ? posts.map(post => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <PostCard {...post} />
            </Grid>
          ))
          : 'Нет статей'}
      </Grid>
    </Fragment>
  );
}
Admin.propTypes = {
  load: PropTypes.func,
  endLoad: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  load: () => dispatch({ type: REQUEST }),
  endLoad: () => dispatch({ type: REQUEST_SUCCESS }),
});

export default connect(
  null,
  mapDispatchToProps,
)(Admin);
