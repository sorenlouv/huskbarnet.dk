import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation, {
  BottomNavigationAction
} from 'material-ui/BottomNavigation';
import { withRouter } from 'react-router';
import LockOpen from '@material-ui/icons/LockOpen';
import HelpIcon from '@material-ui/icons/Help';

const styles = theme => ({
  navigation: {
    backgroundColor: '#eee'
  }
});

function GuestNavigation({ location, classes }) {
  return (
    <BottomNavigation
      value={location.pathname}
      className={classes.navigation}
      showLabels
    >
      <BottomNavigationAction
        href="#/login"
        label="Login"
        icon={<LockOpen />}
        value={'/login'}
      />
      <BottomNavigationAction
        href="#/help"
        label="Hjælp"
        icon={<HelpIcon />}
        value={'/help'}
      />
    </BottomNavigation>
  );
}

GuestNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(GuestNavigation));
