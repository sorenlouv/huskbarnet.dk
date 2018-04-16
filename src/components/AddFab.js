import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Tooltip from 'material-ui/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Button from 'material-ui/Button';

const styles = theme => ({
  addIcon: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  }
});

function AddFab({ classes, onClick }) {
  return (
    <Tooltip title="Tilføj">
      <Button
        variant="fab"
        color="secondary"
        className={classes.addIcon}
        onClick={onClick}
      >
        <AddIcon />
      </Button>
    </Tooltip>
  );
}

export default withStyles(styles)(AddFab);

AddFab.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};
