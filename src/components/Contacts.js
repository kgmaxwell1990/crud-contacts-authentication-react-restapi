import React, {Component} from 'react';
import AddContactForm from './AddContactForm';
import Pagination from './Pagination';
import SearchForm from './SearchForm';
import anon from '../static/images/anon.png';

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state= {
            contacts: [],
            next: "",
            prev: "",
        };
    }

  componentDidMount() {
        this.updateContacts('https://com-devjoy-contactsapi.herokuapp.com/contacts/')
  }

 updateContacts = (url) => {
    if (this.props.logged_in) {
        fetch(url, {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
          
        })
          .then(res => res.json())
          .then(data => {
              let contacts = data.results.map(contact => {
                  return(
                      <div className="box contact" key={contact.id}>
                      <div className="profile_img col-sm-2">
                      <img src={anon} width="60" />
                      </div>
                      <div className="details col-sm-4">
                      
                          <h4>{contact.first_name} {contact.last_name}</h4>
                          <h5>{contact.email}</h5>
                        </div>
                        <div className="edit_del_btns">
                          <button disabled className="btn btn-warning" onClick={this.editItem.bind(this, contact.id)}>Edit</button>
                          <button className="btn btn-danger"onClick={this.deleteItem.bind(this, contact.id)}>Delete</button>
                          </div>
                      </div>
                  )
              })
              this.setState({next: data.next ? data.next : "null"})
              this.setState({prev: data.previous ? data.previous : "null"})
              this.setState({contacts:contacts});
          });
      }
    } 


    handlePagination = (url) => {
        this.updateContacts(url)
     }


     editItem = (id) => {
        console.log(id)
    }


    deleteItem = (id) => {
        this.updateContacts("https://com-devjoy-contactsapi.herokuapp.com/contacts/")
        const conf = {
        method: "delete",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
            }
        };

        fetch("https://com-devjoy-contactsapi.herokuapp.com/contacts/" + id + "/", conf)
        this.updateContacts("https://com-devjoy-contactsapi.herokuapp.com/contacts/")
    }

    render() {
            return(
                <div>
                    <div className="add_contact col-sm-4">
                    
                    <AddContactForm updateContacts={this.updateContacts}/>
                    {this.state.contacts.length === 0 ? "" : <SearchForm /> }
                    </div>
                    <div className="col-sm-8">
                    {this.state.contacts.length === 0 ? "<< You need to add some contacts" : this.state.contacts }
                    {this.state.contacts.length === 0 
                        ? "" 
                        : <Pagination prev={this.state.prev} 
                                      next={this.state.next} 
                                      handlePagination={this.handlePagination}/> }
                    
                    
                    </div>
                </div>
            )
    };
    
}


export default Contacts;
