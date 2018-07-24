import React, {Component} from 'react';

class Nav extends Component {

    render() {
        return (
                <nav className="navbar navbar-default">
                <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand">
                        ContactsApp
                    </a>
                    </div>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Address Book</a></li>
                    <li>{this.props.logged_in ? <a href="#" onClick={this.props.handle_logout}>logout</a> : ''}</li>
                </ul>
                
                </div>
                
                </nav>

                
        )}
}

export default Nav;
