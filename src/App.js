import React, { Component } from 'react';
import Users from './All_Users_All_Contacts';

class App extends Component {
  
  render() {
    return (
      <div className="Anything">
        <div className="row">
        <div className="col-sm-4">
        <Users />
        </div>
        <div className="col-sm-8">
       
        </div>
        </div>
      </div>
    );
  }
}

export default App;