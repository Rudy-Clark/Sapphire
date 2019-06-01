import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function NotFound() {
  return (
    <Grid container justify="center" alignContent="center" spacing={4}>
      <Grid item xs={12}>
        <Typography align="center" component="h3" variant="h1">
          Not Found
        </Typography>
        <Typography align="center" component="h5" variant="subtitle1">
          404
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NotFound;
