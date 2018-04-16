import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';

export default function CentralizedSpinner({ isLoading = true }) {
  if (!isLoading) {
    return null;
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <CircularProgress style={{ margin: '16px' }} />
    </div>
  );
}

CentralizedSpinner.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool
};
