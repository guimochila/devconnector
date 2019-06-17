import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Landing from '../Landing';
import Navbar from '../Nav';
import store from '../../store';
import Alert from '../Alert';

import './App.css';

const Register = lazy(() => import('../Register'));
const Login = lazy(() => import('../Login'));

const App = () => (
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

export default App;
