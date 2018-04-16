import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';

const styles = () => ({
  root: {
    display: 'inline-block'
  },
  buttonContainer: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    color: green[500],
    position: 'absolute'
  }
});

function ButtonProgress({ classes, isLoading, label }) {
  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <Button
          type="submit"
          variant="raised"
          color="primary"
          disabled={isLoading}
        >
          {label}
        </Button>
        {isLoading && <CircularProgress size={24} className={classes.button} />}
      </div>
    </div>
  );
}

ButtonProgress.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired
};

export default withStyles(styles)(ButtonProgress);
