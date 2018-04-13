import React, { Component } from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { get } from 'lodash';
import firebase, { login, onAuthChangeState } from '../services/firebase';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class Login extends Component {
  state = {
    user: null,
    email: '',
    password: ''
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onSubmit = event => {
    login(this.state.email, this.state.password);
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const currentUser = this.state.user || {};

    return (
      <div>
        {currentUser.email}
        <form className={classes.container} onSubmit={this.onSubmit}>
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
          <Button type="submit" variant="raised" color="primary">
            Log ind
          </Button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
