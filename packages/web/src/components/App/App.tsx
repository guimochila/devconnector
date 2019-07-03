import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Landing from '../Landing';
import Navbar from '../Nav';
import store from '../../store';
import Alert from '../Alert';
import setAuthToken from '../../utils/setAuthToken';
import { loadUser } from '../../actionCreators/changeAuth';

import './App.css';
import { Socket } from 'net';

const Register = lazy(() => import('../Register'));
const Login = lazy(() => import('../Login'));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Suspense fallback={<h1>Loading routes...</h1>}>
            <Route exact={true} path="/" component={Landing} />
            <section className="container">
              <Alert alerts={[]} />
              <Switch>
                <Route exact={true} path="/register" component={Register} />
                <Route exact={true} path="/login" component={Login} />
              </Switch>
            </section>
          </Suspense>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
