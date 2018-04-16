import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Tooltip from 'material-ui/Tooltip';
import List, { ListItem, ListItemText } from 'material-ui/List';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from 'material-ui/IconButton';
import firebase from '../services/firebase';
import AddKid from './AddKid';
import CentralizedSpinner from './CentralizedSpinner';
import Modal from './Modal';
import AddFab from './AddFab';
import ViewKid from './ViewKid';

const styles = theme => ({
  list: {
    paddingBottom: theme.spacing.unit * 10
  }
});

class ListKids extends Component {
  state = {
    isLoading: true,
    user: null,
    modals: {
      viewKid: false,
      addKid: false
    }
  };

  componentDidMount() {
    const userId = this.props.authUser.uid;
    this.remindersRef = firebase.database().ref(`/reminders/`);
    this.userRef = firebase.database().ref(`/users/${userId}`);

    this.firebaseCallback = this.userRef.on('value', snap => {
      this.setState({ user: snap.val(), isLoading: false });
    });
  }

  componentWillUnmount() {
    this.userRef.off('value', this.firebaseCallback);
  }

  deleteKid = key => {
    this.userRef
      .child('kids')
      .child(key)
      .remove();

    this.remindersRef.child(key).remove();
  };

  handleOpen = name => () => {
    this.setState({ modals: { ...this.state.modals, [name]: true } });
  };

  handleClose = name => () => {
    this.setState({ modals: { ...this.state.modals, [name]: false } });
  };

  render() {
    const { classes } = this.props;
    const kids = get(this.state.user, 'kids');
    const emails = get(this.state.user, 'emails');
    const activeKid = get(kids, this.state.activeKidKey);

    if (this.state.isLoading) {
      return <CentralizedSpinner />;
    }

    return (
      <div>
        {kids == null && <p>Der er endnu ikke tilføjet nogen børn</p>}
        <List className={classes.list}>
          {kids &&
            Object.entries(kids).map(([key, item]) => {
              return (
                <ListItem divider key={key}>
                  <ListItemText
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      this.handleOpen('viewKid')();
                      this.setState({ activeKidKey: key });
                    }}
                    primary={item.name}
                    secondary={formatDob(item.dateOfBirth)}
                  />
                  <Tooltip id="tooltip-icon" title="Fjern">
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.deleteKid(key)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              );
            })}
        </List>

        <Modal
          onClose={this.handleClose('viewKid')}
          open={this.state.modals.viewKid}
        >
          <ViewKid kid={activeKid} />
        </Modal>

        <Modal
          onClose={this.handleClose('addKid')}
          open={this.state.modals.addKid}
        >
          <AddKid
            authUser={this.props.authUser}
            emails={emails}
            userRef={this.userRef}
            remindersRef={this.remindersRef}
            onSubmit={this.handleClose('addKid')}
          />
        </Modal>

        <AddFab onClick={this.handleOpen('addKid')} />
      </div>
    );
  }
}

function formatDob(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
}

ListKids.propTypes = {
  classes: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired
};

export default withStyles(styles)(ListKids);
