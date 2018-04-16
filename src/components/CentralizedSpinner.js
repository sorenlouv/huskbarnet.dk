import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

export default function CentralizedSpinner({ loading = true }) {
  if (!loading) {
    return null;
  }
  return (
    <div style={{ textAlign: 'center' }}>
      <CircularProgress style={{ margin: '16px' }} />
    </div>
  );
}
