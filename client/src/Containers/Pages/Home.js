/* eslint-disable indent */
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Wallpaper from '../../Components/Wallpaper';
import PostCard from '../../Components/PostCard';

// const useStyles = makeStyles(() => ({}));

function Home({ page }) {
  // const classes = useStyles();
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
  page: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  page: state.page,
});

export default connect(mapStateToProps)(Home);
