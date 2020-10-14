import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import Secret from './Components/Secret';
import Login from './Components/Login';
import withAuth from './Components/withAuth';
import Admin from './Components/Admin';
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
              <Link to='/admin'>Admin</Link>
            </li>
          </ul>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path="/secret" component={withAuth(Secret)} />
            <Route path="/admin" component={withAuth(Admin)} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}
