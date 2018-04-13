import React, { Component } from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { createUser } from '../services/firebase';

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

class CreateUser extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onSubmit = event => {
    createUser(this.state.email, this.state.password);
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} onSubmit={this.onSubmit}>
          <TextField
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
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
            Opret
          </Button>
        </form>
      </div>
    );
  }
}

CreateUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateUser);
