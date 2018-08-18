import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
  modal: {
    overflow: 'scroll'
  },
  modalInner: {
    position: 'absolute',
    maxWidth: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    margin: '40px 0',
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: theme.spacing.unit,
    outline: 0,
    overflow: 'scroll'
  }
});

function CentralizedModal({ open, onClose, children, classes }) {
  return (
    <Modal
      classes={{ root: classes.modal }}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
    >
      <div className={classes.modalInner}>{children}</div>
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
