/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { push as routerPush } from 'connected-react-router';

import { REQUEST, REQUEST_SUCCESS } from '../../actions/constants';
import { home } from '../../api/pages';

import Wallpaper from '../../Components/Wallpaper';
import PostCard from '../../Components/PostCard';

function Home({ load, push, endLoad }) {
  const initialState = {
    title: '',
    subtitle: '',
    wallpaper: '',
    posts: [],
  };

  const [page, setPage] = useState(initialState);

  useEffect(() => {
    const req = async () => {
      load();
      const response = await home();
      if (!response) push('/404');
      setPage(response);
      endLoad();
    };
    req();
    return () => setPage(initialState);
  }, []);

  return (
    <main>
      <Wallpaper
        title={page.title}
        subtitle={page.subtitle}
        url={page.wallpaper}
      />
      <Grid container spacing={4}>
        {!page.posts.length
          ? 'Нет сататьей'
          : page.posts.map(post => (
              <Grid item key={post.title} xs={12} md={6}>
                <PostCard {...post} />
              </Grid>
            ))}
      </Grid>
    </main>
  );
}
Home.propTypes = {
  load: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  endLoad: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  load: () => dispatch({ type: REQUEST }),
  push: url => dispatch(routerPush(url)),
  endLoad: () => dispatch({ type: REQUEST_SUCCESS }),
});

export default connect(
  null,
  mapDispatchToProps,
)(Home);
