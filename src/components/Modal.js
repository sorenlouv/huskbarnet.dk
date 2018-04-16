import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Modal from 'material-ui/Modal';

const styles = theme => ({
  modal: {
    position: 'absolute',
    maxWidth: theme.spacing.unit * 75,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: theme.spacing.unit,
    outline: 0
  }
});

function CentralizedModal({ open, onClose, children, classes }) {
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
    >
      <div className={classes.modal}>{children}</div>
    </Modal>
  );
}

CentralizedModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};

export default withStyles(styles)(CentralizedModal);
