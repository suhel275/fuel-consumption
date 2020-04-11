import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Airport from './components/pages/Airport';
import Aircraft from './components/pages/Aircraft';
import Transaction from './components/pages/Transaction.js';
import Report from './components/pages/Report';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/AuthState';
import FuelState from './context/fuel/FuelState';
import FetchState from './context/fetch/FetchState';
import AlertState from './context/alert/AlertState';
import './App.css';

const App = () => {
  return (
    <AuthState>
      <FuelState>
        <FetchState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/' component={Report} />
                    <Route exact path='/login' component={Login} />
                    <PrivateRoute exact path='/airport' component={Airport} />
                    <PrivateRoute exact path='/aircraft' component={Aircraft} />
                    <PrivateRoute
                      exact
                      path='/transaction'
                      component={Transaction}
                    />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </FetchState>
      </FuelState>
    </AuthState>
  );
};

export default App;
