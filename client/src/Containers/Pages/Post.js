/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { isEmpty } from 'lodash';
import { push as routerPush } from 'connected-react-router';
import YouTube from 'react-youtube';

import request from '../../api/request';
import { REQUEST, REQUEST_SUCCESS } from '../../actions/constants';
import Wallpaper from '../../Components/Wallpaper';

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(3),
  },
  info: {
    color: '#94918e',
    padding: theme.spacing(1),
  },
  content: {
    lineHeight: 1.8,
    marginBottom: theme.spacing(4),
  },
}));

const parseDate = utc => {
  if (!utc) return '';
  const date = new Date(utc);
  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
};

function Post({ match, push, load, endLoad }) {
  const classes = useStyles();
  const initialState = {
    title: '',
    author: '',
    content: '',
    created_at: '',
    url: '',
    videoId: '',
  };

  const [post, setPost] = useState(initialState);

  useEffect(() => {
    const req = async () => {
      load();
      const resp = await request(`/posts/${match.params.id}`);
      if (isEmpty(resp.post)) {
        endLoad();
        return push('/404');
      }
      setPost({
        title: resp.post.title,
        author: resp.post.user.username,
        content: resp.post.content,
        created_at: resp.post.created_at,
        url: `/images/${resp.post.image.lg}`,
        videoId: resp.post.video.uid,
      });
      endLoad();

      return post;
    };
    req();
    return () => setPost(initialState);
  }, []);

  return (
    <Container className={classes.root} component="main" maxWidth="md">
      <Wallpaper title={post.title} url={post.url} />
      <div className={classes.info}>
        <Typography component="p">Автор: {post.author}</Typography>
        <Typography component="p">
          Опубликован: {parseDate(post.created_at)}
        </Typography>
      </div>
      <div className={classes.content}>{post.content}</div>
      <YouTube
        videoId={post.videoId}
        opts={{
          height: '390',
          width: '100%',
        }}
      />
    </Container>
  );
}

Post.propTypes = {
  load: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  endLoad: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  load: () => dispatch({ type: REQUEST }),
  push: url => dispatch(routerPush(url)),
  endLoad: () => dispatch({ type: REQUEST_SUCCESS }),
});

export default connect(
  null,
  mapDispatchToProps,
)(Post);
