import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { login } from '../services/firebase';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import ButtonProgress from './ButtonProgress';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: `0 ${theme.spacing.unit * 5}px`
  },
  introText: {
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  buttons: {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'space-around'
  },
  links: {
    textDecoration: 'none'
  },
  textField: {
    width: '100%'
  }
});

class Login extends Component {
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
      await login(this.state.email, this.state.password);
    } catch (e) {
      this.setState({ isLoading: false, errorCode: e.code });
    }
  };

  render() {
    const { classes } = this.props;
    const { isLoading, errorCode, email, password } = this.state;

    return (
      <div className={classes.root}>
        <Paper elevation={1} className={classes.introText}>
          HuskBarnet.dk er en gratis hjælp til forældre med børn i alderen 0 til
          12 år. Ved at oprette dig, får du påmindelser på email hver gang dit
          barn skal vaccineres, samt information om denne. <br />
          Du kan få påmindelser på alle dine børn og modtage påmindelser på
          flere emails - du kan f.eks. tilføje din glemsomme ægtefælle.
        </Paper>

        <form onSubmit={this.onSubmit}>
          <TextField
            label="Email"
            className={classes.textField}
            value={email}
            onChange={this.handleChange('email')}
            margin="normal"
          />

          <TextField
            label="Password"
            className={classes.textField}
            value={password}
            onChange={this.handleChange('password')}
            type="password"
            margin="normal"
          />

          <div className={classes.buttons}>
            <a href="#/reset_password" className={classes.links}>
              Glemt adgangskode?
            </a>

            <a href="#/signup" className={classes.links}>
              Opret konto
            </a>
            <ButtonProgress
              type="submit"
              isLoading={isLoading}
              label="Log ind"
            />
          </div>

          <Snackbar
            open={errorCode != null}
            autoHideDuration={4000}
            message={<span>{parseError(errorCode)}</span>}
            className={classes.snackbar}
          />
        </form>
      </div>
    );
  }
}

function parseError(errorCode) {
  switch (errorCode) {
    case null:
      return '';
    case 'auth/invalid-email':
      return 'Emailadressen er ugyldig';
    case 'auth/user-disabled':
      return 'Brugeren er deaktiveret';
    case 'auth/user-not-found':
      return 'Emailadressen eksisterer ikke';
    case 'auth/wrong-password':
      return 'Forkert adgangskode';
    case 'auth/too-many-requests':
      return 'For mange forsøg. Prøv igen senere';
    default:
      console.error(errorCode);
      return 'Der skete en fejl';
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
