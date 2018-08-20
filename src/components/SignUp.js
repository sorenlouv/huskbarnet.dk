import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import { createUser } from '../services/firebase';
import ButtonProgress from './ButtonProgress';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: `0 ${theme.spacing.unit * 5}px`
  },
  textField: {
    width: '100%'
  }
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

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true, errorCode: null });
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
      <form className={classes.root} onSubmit={this.onSubmit}>
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

        <div style={{ textAlign: 'right' }}>
          <ButtonProgress type="submit" isLoading={isLoading} label="Opret" />
        </div>

        <Snackbar
          open={errorCode != null}
          autoHideDuration={4000}
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
