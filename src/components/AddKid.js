import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { textField } from './styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: textField(theme),
  gender: {
    margin: theme.spacing.unit
  }
});

const initialState = {
  name: '',
  dob: '',
  gender: 'female'
};

class AddKid extends Component {
  state = initialState;

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  addKid = e => {
    e.preventDefault();

    const newKid = {
      name: this.state.name,
      dateOfBirth: this.state.dob,
      gender: this.state.gender
    };

    const emails = { ...this.props.emails, auth: this.props.authUser.email };
    const kidId = this.props.userRef
      .child('kids')
      .push(newKid)
      .getKey();
    this.props.remindersRef.child(kidId).set({ ...newKid, emails });

    this.setState(initialState);
    this.props.onSubmit();
  };

  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.addKid} className={classes.root}>
        <TextField
          autoFocus
          label="Navn"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          label="Fødselsdag"
          className={classes.textField}
          type="date"
          value={this.state.dob}
          onChange={this.handleChange('dob')}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
        />
        <FormControl component="fieldset" className={classes.gender}>
          <FormLabel component="legend">Køn</FormLabel>
          <RadioGroup
            aria-label="gender"
            value={this.state.gender}
            onChange={this.handleChange('gender')}
          >
            <FormControlLabel value="female" control={<Radio />} label="Pige" />
            <FormControlLabel value="male" control={<Radio />} label="Dreng" />
          </RadioGroup>
        </FormControl>

        <Button type="submit" variant="raised" color="primary">
          Tilføj
        </Button>
      </form>
    );
  }
}

AddKid.propTypes = {
  classes: PropTypes.object.isRequired,
  userRef: PropTypes.object.isRequired,
  remindersRef: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  emails: PropTypes.array,
  authUser: PropTypes.object
};

export default withStyles(styles)(AddKid);
