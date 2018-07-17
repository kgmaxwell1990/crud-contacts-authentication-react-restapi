import React, {Component} from 'react';
import Contacts from './Contacts'

class Users extends Component {
    constructor() {
        super();
        this.state= {
            users: [],
            clickUserId: 0,
        };
    }

    handleClick = (user_id) => {
        console.log(user_id)
        this.setState({clickUserId:user_id});
      }
      

    componentDidMount() {
        fetch("https://com-devjoy-contactsapi.herokuapp.com/users/")
        .then (results => {
            return results.json();
        }).then(data => {
            let users = data.results.map(user => {
                return(
                    <div key={user.id}>
                        <h4 onClick={this.handleClick.bind(this, user.id)}>{user.username} </h4>
                    </div>
                )
            })
            this.setState({users:users});
        });
    }
    


    render() {
        return(
            <div>
                
                <div className="row">
                    <div className="col-sm-5">
                    <h1>Users </h1>
                    {this.state.users}
                    </div>
                    <div className="col-sm-5">
                    <Contacts user_id={this.state.clickUserId}/>
                    </div>
                </div>
            </div>
        )
    };
    
}

export default Users;
