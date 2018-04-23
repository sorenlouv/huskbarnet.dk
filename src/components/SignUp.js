import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { textField } from './styles';
import { createUser } from '../services/firebase';
import ButtonProgress from './ButtonProgress';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  textField: textField(theme)
});

class SignUp extends Component {
  state = {
    isLoading: false,
    email: '',
    password: '',
    errorCode: null
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onSubmit = async () => {
    this.setState({ isLoading: true });
    try {
      await createUser(this.state.email, this.state.password);
    } catch (e) {
      this.setState({ isLoading: false, errorCode: e.code });
    }
  };

  render() {
    const { classes } = this.props;
    const { isLoading, errorCode } = this.state;

    return (
      <form className={classes.root}>
        <TextField
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
        />
        <TextField
          label="Password"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange('password')}
          type="password"
          margin="normal"
        />

        <ButtonProgress
          isLoading={isLoading}
          label="Opret"
          onClick={this.onSubmit}
        />

        <Snackbar
          open={errorCode != null}
          autoHideDuration={4000}
          onClose={this.handleClose}
          message={<span>{parseError(errorCode)}</span>}
          className={classes.snackbar}
        />
      </form>
    );
  }
}

function parseError(errorCode) {
  switch (errorCode) {
    case null:
      return '';
    case 'auth/email-already-in-use':
      return 'Email-adressen er allerede i brug';
    case 'auth/invalid-email':
      return 'Email-adressen er ugyldig';
    case 'auth/operation-not-allowed':
      return 'Login er deaktiveret';
    case 'auth/weak-password':
      return 'Passwordet er for svagt';
    default:
      console.error(errorCode);
      return 'Der skete en fejl';
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
