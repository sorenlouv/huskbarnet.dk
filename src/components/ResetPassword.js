import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { textField } from './styles';
import { sendPasswordResetEmail } from '../services/firebase';
import ButtonProgress from './ButtonProgress';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: `0 ${theme.spacing.unit * 5}px`
  },
  textField: textField(theme, '100%')
});

class SignUp extends Component {
  state = {
    resetSuccess: false,
    isLoading: false,
    email: '',
    errorCode: null
  };

  onChangeEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true, errorCode: null, resetSuccess: false });
    try {
      await sendPasswordResetEmail(this.state.email);
      this.setState({ isLoading: false, resetSuccess: true });
    } catch (e) {
      this.setState({ isLoading: false, errorCode: e.code });
    }
  };

  render() {
    const { classes } = this.props;
    const { isLoading, errorCode, resetSuccess } = this.state;

    return (
      <form className={classes.root} onSubmit={this.onSubmit}>
        <TextField
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.onChangeEmail}
          margin="normal"
        />

        <div style={{ textAlign: 'right' }}>
          <ButtonProgress
            type="submit"
            isLoading={isLoading}
            label="Nulstil adgangskode"
          />
        </div>

        <Snackbar
          open={errorCode != null || resetSuccess}
          autoHideDuration={4000}
          message={<span>{getToastMessage(errorCode, resetSuccess)}</span>}
          className={classes.snackbar}
        />
      </form>
    );
  }
}

function getToastMessage(errorCode, resetSuccess) {
  if (resetSuccess) {
    return 'En midlertidig adgangskode er sendt til din email';
  }

  return parseError(errorCode);
}

function parseError(errorCode) {
  switch (errorCode) {
    case null:
      return '';
    case 'auth/invalid-email':
      return 'Email-adressen er ugyldig';
    case 'auth/user-not-found':
      return 'Email-adressen eksisterer ikke';
    default:
      console.error(errorCode);
      return 'Der skete en fejl';
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
