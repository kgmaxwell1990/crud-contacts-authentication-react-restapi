import React, { Component } from 'react';
import '../index.css'
import Users from './Users';

class App extends Component {
  render() {
      return (
        <div className="container">
          <Users />
        </div>
      );
    }
}

export default App;