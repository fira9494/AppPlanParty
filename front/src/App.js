import React, { Fragment, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import NewParty from './components/NewParty/NewParty';
import Alert from './components/layout/Alert';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken'
import {loadUser} from './actions/auth'
import MyParties from './components/MyParties/MyParties';


if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser());
  }, []);

  return(
    <Provider store={store}>
    <Router>
    <Fragment>
      <Navbar/>
      <Route exact path='/' component={Landing}/>
      <section className="container">
        <Alert/>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/newparty" component={NewParty}/>
          <PrivateRoute exact path="/myparties" component={MyParties}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </section>
    </Fragment>
    </Router>
  </Provider>
  )
};

export default App;