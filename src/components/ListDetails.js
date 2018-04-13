import React, { Component } from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import firebase from '../services/firebase';

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

class ListDetails extends Component {
  state = {
    todoList: {},
    newTodoText: ''
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        const userId = user.uid;
        this.firebaseRef = firebase.database().ref('/users/' + userId);
        this.firebaseCallback = this.firebaseRef.on('value', snap => {
          this.setState({ todoList: snap.val() });
        });
      }
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off('value', this.firebaseCallback);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    this.firebaseRef.push({
      text: this.state.newTodoText
    });

    this.setState({ text: '' });
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
            onChange={this.handleChange('newTodoText')}
            margin="normal"
          />
          <Button type="submit" variant="raised" color="primary">
            Opret
          </Button>
        </form>

        {Object.entries(this.state.todoList).map(([key, item]) => {
          return <div key={key}>{item.text}</div>;
        })}
      </div>
    );
  }
}

ListDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListDetails);
