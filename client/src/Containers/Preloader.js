import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  hidden: {
    display: 'none',
  },
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 99,
  },
}));

const Preloader = ({ request }) => {
  const classes = useStyles();
  return (
    <div
      className={classnames(classes.hidden, {
        [classes.overlay]: request.loading,
      })}
    >
      <CircularProgress size={77} />
    </div>
  );
};
Preloader.propTypes = {
  request: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.bool,
    msg: PropTypes.string,
  }),
};

const mapStateToProps = state => ({ request: state.request });

export default connect(mapStateToProps)(Preloader);
