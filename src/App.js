import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Secret from './Components/Secret';
import Login from './Components/Login';
import withAuth from './Components/withAuth';
import Orders from './Components/Orders';
import Logout from './Components/Logout';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul className="nav">
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/secret'>Secret</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/orders'>Orders</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          </ul>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path="/secret" component={withAuth(Secret)} />
            <Route path="/orders" component={withAuth(Orders)} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
          </Switch>
        </div>
      </Router>
    );
  }
}
