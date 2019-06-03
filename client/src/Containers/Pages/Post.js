/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { isEmpty } from 'lodash';
import { push as routerPush } from 'connected-react-router';

import { postById } from '../../api/pages';
import { REQUEST, REQUEST_SUCCESS } from '../../actions/constants';

const useStyles = makeStyles(theme => ({
  info: {
    color: '#94918e',
    padding: theme.spacing(1),
  },
  content: {
    lineHeight: 1.8,
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
  };

  const [post, setPost] = useState(initialState);

  useEffect(() => {
    const req = async () => {
      load();
      const resp = await postById(match.params.id);
      if (isEmpty(resp)) {
        endLoad();
        return push('/404');
      }
      setPost({
        title: resp.title,
        author: resp.user.username,
        content: resp.content,
        created_at: resp.created_at,
      });
      endLoad();

      return resp;
    };
    req();
    return () => setPost(initialState);
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <Typography align="center" component="h1" variant="h1">
        {post.title}
      </Typography>
      <div className={classes.info}>
        <Typography component="p">Автор: {post.author}</Typography>
        <Typography component="p">
          Опубликован: {parseDate(post.created_at)}
        </Typography>
      </div>
      <div className={classes.content}>{post.content}</div>
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
