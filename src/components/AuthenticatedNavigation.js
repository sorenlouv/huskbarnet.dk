import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, {
  BottomNavigationAction
} from 'material-ui/BottomNavigation';
import { withRouter } from 'react-router';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitIcon from '@material-ui/icons/ExitToApp';
import firebase from '../services/firebase';

const styles = theme => ({
  navigation: {
    backgroundColor: '#eee'
  }
});

const onSignOut = () => {
  firebase
    .auth()
    .signOut()
    .catch(function(error) {
      console.log('error', error);
    });
};

function AuthenticatedNavigation({ location, classes }) {
  return (
    <BottomNavigation
      value={location.pathname}
      className={classes.navigation}
      showLabels
    >
      <BottomNavigationAction
        href="#/"
        label="Børn"
        icon={<ChildCareIcon />}
        value={'/'}
      />
      <BottomNavigationAction
        href="#/settings"
        label="Indstillinger"
        icon={<SettingsIcon />}
        value={'/settings'}
      />
      <BottomNavigationAction
        onClick={onSignOut}
        label="Log ud"
        icon={<ExitIcon />}
      />
    </BottomNavigation>
  );
}

AuthenticatedNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(AuthenticatedNavigation));
