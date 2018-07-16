import React, {Component} from 'react';

class Users extends Component {
    constructor() {
        super();
        this.state= {
            users: [],
            contacts: [],
        };
    }

    componentDidMount() {

        let userApiCall = fetch("https://com-devjoy-contactsapi.herokuapp.com/users/")
        .then (results => {
            return results.json();
        }).then(data => {
            let users = data.results.map(user => {
                return(
                    <div key={user.id}> 
                        <h3>{user.username} </h3>
                    </div>
                )
            })
            this.setState({users:users});
            console.log("state", this.state.users)
        });

        let contactApiCall = fetch("https://com-devjoy-contactsapi.herokuapp.com/users/1/")
        .then (results => {
            return results.json();
        }).then(data => {
            let contact_urls = data.contacts
            for (let i = 0; i <= contact_urls.length -1; i++) {
                fetch(contact_urls[i])
                .then (results => {
                    return results.json();
                }).then(data => {
                    let contact = <div key={data.id}> 
                                        <h3>{data.first_name} {data.last_name}</h3>
                                        <p>{data.email}</p>
                                    </div>
                    this.setState({contacts:this.state.contacts.concat(contact)});
                })
            }
            console.log("state", this.state.contacts)
        })

        var combinedData = {"userApiCall":{},"contactApiCall":{}};
        Promise.all([userApiCall,contactApiCall]).then(function(values){
            combinedData["userApiCall"] = values[0];
            combinedData["contactApiCall"] = values[1];
            return combinedData;
        });

    }

    
    render() {
        return(
            <div>
                <h1>Users </h1>
                {this.state.users}
                <h1> Contacts </h1>
                {this.state.contacts}
            </div>
        )
    };
    
}

export default Users;
