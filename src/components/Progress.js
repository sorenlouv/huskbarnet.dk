import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Progress({ isLoading = true }) {
  if (!isLoading) {
    return null;
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <CircularProgress style={{ margin: '16px' }} />
    </div>
  );
}

Progress.propTypes = {
  isLoading: PropTypes.bool
};
