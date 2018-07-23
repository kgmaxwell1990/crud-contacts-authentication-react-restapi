import React, {Component} from 'react';

class Contacts extends Component {
    constructor() {
        super();
        this.state= {
            contacts: [],
        };
    }

    componentWillReceiveProps() {
        if (this.props.user_id === 0){
            this.setState({contacts: []})
        }else {
        fetch("https://com-devjoy-contactsapi.herokuapp.com/users/" + this.props.user_id + "/")
        .then (results => {
            return results.json();
        }).then(data => {
            let contact_urls = data.contacts
            this.setState({contacts: []})
            for (let i = 0; i <= contact_urls.length -1; i++) {
                fetch(contact_urls[i])
                .then( results => {
                    return results.json();
                }).then(data => {
                    let contact = <div key={data.id}> 
                                        <h3>{data.first_name} {data.last_name}</h3>
                                        <p>{data.email}</p>
                                  </div>
                    
                    this.setState({contacts:this.state.contacts.concat(contact)});
                })
            }
        });
    }
    }

    render() {

        if (this.props.user_id === 0){
            return(
                <div>
                </div>
            )
        }else{
            return(
                <div>
                    <h1> Contacts </h1>
                    {this.state.contacts}
                </div>
            )
        }

    };
    
}

export default Contacts;
