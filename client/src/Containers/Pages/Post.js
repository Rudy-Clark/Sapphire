/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { getPost } from '../../api/posts';
import { REQUEST, REQUEST_SUCCESS } from '../../actions/constants';

const useStyles = makeStyles(theme => ({
  info: {
    color: '#94918e',
    padding: theme.spacing(1),
  },
}));

const parseDate = utc => {
  if (!utc) return '';
  const date = new Date(utc);
  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
};

function Post({ match, dispatch }) {
  const initialState = {
    title: '',
    author: '',
    content: '',
    created_at: '',
  };
  const [page, setPage] = useState({ ...initialState });
  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: REQUEST });

      const {
        data: { post },
      } = await getPost(match.params.id);

      console.log(post);

      setPage({
        title: post.title,
        author: post.user.username,
        content: post.content,
        created_at: post.created_at,
      });

      dispatch({ type: REQUEST_SUCCESS });
    };
    fetch();
    return () => setPage({ ...initialState });
  }, []);
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <Typography align="center" component="h1" variant="h1">
        {page.title}
      </Typography>
      <div className={classes.info}>
        <Typography component="p">Автор: {page.author}</Typography>
        <Typography component="p">
          Опубликован: {parseDate(page.created_at)}
        </Typography>
      </div>
      <div className={classes.content}>{page.content}</div>
    </Container>
  );
}

Post.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  page: state.page,
});

export default connect(mapStateToProps)(Post);
