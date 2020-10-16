import React, { Component } from 'react';
//mport Cookies from 'universal-cookie';
 
//const cookies = new Cookies();
 
//cookies.set('myCat', 'Pacman', { path: '/' });
// console.log(cookies.get('myCat'))

export default class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
    };
  }
  // Cookie jar overflow. We can't access the HttpOnly cookie to delete it. Instead we can 
  // creae hundreds of new cookies to pop our cookie from the stack 
  logout = (event) => {
   
  }

  render() {
    return (
      <div>
        <h1>Logout</h1>
          <button onClick={this.logout}>Logout</button>
        </div>
    );
  }
}