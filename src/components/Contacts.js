import React, {Component} from 'react';
import ContactForm from './ContactForm'

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state= {
            contacts: [],
            owner: "",
            next: "",
            prev: "",
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
            let contacts = data.results.map(contact => {
                return(
                    <div className="box" key={contact.id}>
                        <h4>{contact.first_name} {contact.last_name}</h4>
                        <h5>{contact.email}</h5>
                        <button onClick={this.delete_item.bind(this, contact.id)}>Delete</button>
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
        let contacts = data.results.map(contact => {
            return(
                <div className="box" key={contact.id}>
                    <h4>{contact.first_name} {contact.last_name}</h4>
                    <h5>{contact.email}</h5>
                    <button onClick={this.delete_item.bind(this, contact.id)}>Delete</button>
                </div>
            )
            
        })
        this.setState({next: data.next ? data.next : "null"})
        this.setState({prev: data.previous ? data.previous : "null"})
        this.setState({owner:data.results[0].owner})
        this.setState({contacts:contacts});
    });

 }

    delete_item = (id) => {
        const conf = {
        method: "delete",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
            }
        };

        fetch("https://com-devjoy-contactsapi.herokuapp.com/contacts/" + id + "/", conf)
    }

    render() {
            return(
                <div>
                    <h2 className="welcome">Welcome back {this.state.owner}</h2>
                    <div className="add_contact col-sm-4">
                    
                    <ContactForm />

                        <form className="box searchform">
                            <input type="text" name="search" className="form-control" placeholder="Search"/>
                            <input type="submit" value="Search" className="btn btn-success search_btn" />
                        </form>
                    </div>
                    <div className="col-sm-8">
                    
                    {this.state.contacts}
                    <div className="pag_buttons">
                    <button 
                    className={"btn pag_btn " + (this.state.prev === "null" ? "disabled": "" )} 
                    onClick={this.handle_pagination.bind(this, this.state.prev)}>
                    <i className="fas fa-chevron-left"></i>
                    prev
                    </button>

                    <button 
                    className={"btn pag_btn " + (this.state.next === "null" ? "disabled": "" )} 
                    onClick={this.handle_pagination.bind(this, this.state.next)}>
                    next
                    <i className="fas fa-chevron-right"></i>
                    </button>
                    </div>
                    </div>
                </div>
            )
    };
    
}

export default Contacts;
