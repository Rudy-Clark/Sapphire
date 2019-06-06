import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
}));

function Post({ id, title, content, user }) {
  const classes = useStyles();
  return (
    <CardActionArea component={Link} to={`/posts/${id}`}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {user.username}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {`${content.substr(0, 120)}...`}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Подробнее...
            </Typography>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia
            className={classes.cardMedia}
            image="/images/wallpaper.jpg"
            title="Image title"
          />
        </Hidden>
      </Card>
    </CardActionArea>
  );
}

Post.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  user: PropTypes.object,
};

export default Post;
