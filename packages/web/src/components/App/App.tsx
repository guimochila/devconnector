import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getCookie } from '../../lib/helpers';
import { StoreState } from '../../store';
import { Authenticate, loadUser } from '../../store/auth';
import Dashboard from '../Dashboard';
import DisplayAlert from '../DisplayAlert';
import Landing from '../Landing';
import Navbar from '../Nav';
import PrivateRoute from '../PrivateRoute';
import './App.css';

/* Lazy loading not working - TODO: FIX IT */
const Register = lazy(() => import('../Register'));
const Login = lazy(() => import('../Login'));

interface AppProps {
  auth: Authenticate;
  loadUser: () => void;
}

function App({ loadUser, auth }: AppProps): JSX.Element {
  useEffect(() => {
    const cookie = getCookie('_token');
    if (cookie && !auth.isAuthenticated && !auth.user) {
      loadUser();
    }
  }, [auth.isAuthenticated, auth.user]);
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Suspense fallback={<h1>Loading routes...</h1>}>
          <Route exact={true} path="/" component={Landing} />
          <section className="container">
            <DisplayAlert />
            <Switch>
              <Route exact={true} path="/register" component={Register} />
              <Route exact={true} path="/login" component={Login} />
              <PrivateRoute
                exact={true}
                path="/dashboard"
                component={Dashboard}
              />
            </Switch>
          </section>
        </Suspense>
      </Fragment>
    </Router>
  );
}

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { loadUser },
)(App);
