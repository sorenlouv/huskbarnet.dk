import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Progress from './Progress';
import Modal from './Modal';
import AddFab from './AddFab';
import firebase from '../services/firebase';
import { textField } from './styles';
import { mapValues, get } from 'lodash';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: textField(theme),
  list: {
    paddingBottom: theme.spacing.unit * 10
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column'
  }
});

class ListEmails extends Component {
  state = {
    isLoading: true,
    open: false,
    user: null,
    newEmail: ''
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ newEmail: '', open: false });
    await this.userRef.child('emails').push(this.state.newEmail);

    updateReminders({
      remindersRef: this.remindersRef,
      user: this.state.user,
      authUser: this.props.authUser
    });
  };

  deleteEmail = async key => {
    await this.userRef
      .child('emails')
      .child(key)
      .remove();

    updateReminders({
      remindersRef: this.remindersRef,
      user: this.state.user,
      authUser: this.props.authUser
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const emails = get(this.state.user, 'emails');

    if (this.state.isLoading) {
      return <Progress />;
    }

    return (
      <div>
        <p>Der vil blive sendt påmindelser til følgende emails-adresser:</p>
        <List className={classes.list}>
          <ListItem divider>
            <ListItemText primary={this.props.authUser.email} />
            <Tooltip id="tooltip-icon" title="Kan ikke slettes">
              <span>
                <IconButton aria-label="Fjern" disabled>
                  <DeleteIcon />
                </IconButton>
              </span>
            </Tooltip>
          </ListItem>

          {emails &&
            Object.entries(emails).map(([key, email]) => {
              return (
                <ListItem divider key={key}>
                  <ListItemText primary={email} />
                  <Tooltip id="tooltip-icon" title="Fjern">
                    <IconButton
                      aria-label="Fjern"
                      onClick={() => this.deleteEmail(key)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              );
            })}
        </List>

        <Modal onClose={this.handleClose} open={this.state.open}>
          <form onSubmit={this.onSubmit} className={classes.modalContent}>
            <TextField
              autoFocus
              label="Email"
              className={classes.textField}
              value={this.state.newEmail}
              onChange={this.handleChange('newEmail')}
              margin="normal"
            />
            <Button type="submit" variant="raised" color="primary">
              Tilføj
            </Button>
          </form>
        </Modal>

        <AddFab onClick={this.handleOpen} />
      </div>
    );
  }
}

function updateReminders({ remindersRef, user, authUser }) {
  if (!user) {
    return;
  }

  const emails = { ...user.emails, auth: authUser.email };
  const newReminders =
    user.kids && mapValues(user.kids, kid => ({ ...kid, emails }));

  return remindersRef.update(newReminders);
}

ListEmails.propTypes = {
  classes: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired
};

export default withStyles(styles)(ListEmails);
