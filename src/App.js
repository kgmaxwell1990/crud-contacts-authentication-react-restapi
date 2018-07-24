import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import './index.css';
import Contacts from './components/Contacts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('https://com-devjoy-contactsapi.herokuapp.com/api-token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: data.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = (form) => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    return (
      <div className="App">
        <Nav logged_in={this.state.logged_in} handle_logout={this.handle_logout} />
        <h3>
          {this.state.logged_in
            ? <Contacts logged_in={this.state.logged_in} />
            : <LoginForm handle_login={this.handle_login} />}
        </h3>
      </div>
    );
  }
}

export default App;