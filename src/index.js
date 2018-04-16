import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './index.css';
import ListKids from './components/ListKids';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ListEmails from './components/ListEmails';
import AuthenticatedNavigation from './components/AuthenticatedNavigation';
import GuestNavigation from './components/GuestNavigation';
import Help from './components/Help';
import WithAuthenticatedUser from './components/WithAuthenticatedUser';
import CentralizedSpinner from './components/CentralizedSpinner';
import registerServiceWorker from './registerServiceWorker';

const styles = theme => ({
  mainContainer: {
    maxWidth: '600px',
    position: 'relative',
    margin: '0 auto'
  },
  loggedInContainer: {
    position: 'relative'
  }
});

function App({ classes }) {
  return (
    <Router>
      <div className={classes.mainContainer}>
        <WithAuthenticatedUser
          render={(authUser, loading) => {
            if (loading) {
              return <CentralizedSpinner />;
            }

            if (!authUser) {
              return (
                <div>
                  <GuestNavigation />
                  <Switch>
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/help" component={Help} />
                    <Route component={Login} />
                  </Switch>
                </div>
              );
            }

            return (
              <div className={classes.loggedInContainer}>
                <AuthenticatedNavigation />
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <ListKids {...props} authUser={authUser} />
                    )}
                  />
                  <Route
                    path="/settings"
                    render={props => (
                      <ListEmails {...props} authUser={authUser} />
                    )}
                  />
                  <Redirect to="/" />
                </Switch>
              </div>
            );
          }}
        />
      </div>
    </Router>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const AppWithStyles = withStyles(styles)(App);

ReactDOM.render(<AppWithStyles />, document.getElementById('root'));
registerServiceWorker();
