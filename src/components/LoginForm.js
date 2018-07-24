import React, { Component } from 'react';

class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    console.log(this.state.username)
    return (
    <div className="login_form box">
      <form onSubmit={e => this.props.handle_login(e, this.state)}>
      
        <h1>Log In To Your Account</h1>
        <input
          type="text"
          name="username"
          placeholder="Enter Your Username" 
          className="form-control" 
          value={this.state.username}
          onChange={this.handle_change}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password" 
          className="form-control" 
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input type="submit" value="Login" className="btn btn-success"/>
      </form>
      </div>
    );
  }
}

export default LoginForm;
