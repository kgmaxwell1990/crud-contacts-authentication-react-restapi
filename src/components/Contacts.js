import React, {Component} from 'react';

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state= {
            contacts: [],
            owner: "",
            next: "",
            prev: ""
        };
    }

  componentDidMount() {
    if (this.props.logged_in) {
      fetch('https://com-devjoy-contactsapi.herokuapp.com/contacts/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
        
      })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let contacts = data.results.map(contact => {
                return(
                    <div className="contact" key={contact.id}>
                        <h4>{contact.first_name} {contact.last_name}</h4>
                        <h5>{contact.email}</h5>
                    </div>
                )
                
            })
            this.setState({next: data.next ? data.next : "null"})
            this.setState({prev: data.previous ? data.previous : "null"})
            this.setState({owner:data.results[0].owner})
            this.setState({contacts:contacts});
        });
    }
  }


  handle_pagination = (url) => {
    fetch(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let contacts = data.results.map(contact => {
            return(
                <div className="contact" key={contact.id}>
                    <h4>{contact.first_name} {contact.last_name}</h4>
                    <h5>{contact.email}</h5>
                </div>
            )
            
        })
        this.setState({next: data.next ? data.next : "null"})
        this.setState({prev: data.previous ? data.previous : "null"})
        this.setState({owner:data.results[0].owner})
        this.setState({contacts:contacts});
    });

 }

  

    render() {
            return(
                <div>
                    <h2 className="welcome">Welcome back {this.state.owner}</h2>
                    <div className="add_contact col-sm-4">
                    
                        <form className="contact">
                        <h3>Add a contact</h3>
                            <input type="text" name="first_name" className="form-control" placeholder="First Name"/>
                            <input type="text" name="last_name" className="form-control" placeholder="Last Name"/>
                            <input type="email" name="email" className="form-control" placeholder="Email"/>
                            <input type="submit" value="add" className="btn btn-success" />
                        </form>
                    </div>
                    <div className="col-sm-8">
                    
                    {this.state.contacts}

                    <button 
                    className={"btn " + (this.state.prev == "null" ? "disabled": "" )} 
                    onClick={this.handle_pagination.bind(this, this.state.prev)}>
                    <i className="fas fa-chevron-left"></i>
                    prev
                    </button>

                    <button 
                    className={"btn " + (this.state.next == "null" ? "disabled": "" )} 
                    onClick={this.handle_pagination.bind(this, this.state.next)}>
                    next
                    <i class="fas fa-chevron-right"></i>
                    </button>
                    </div>
                </div>
            )
    };
    
}

export default Contacts;
