import React, {Component} from 'react';

class ContactForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const first_name = this.getFname.value;
        const last_name =  this.getLname.value;
        const email =  this.getEmail.value;
        const data = {
          first_name,
          last_name,
          email,
        }

        const conf = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              }
          };

        fetch("https://com-devjoy-contactsapi.herokuapp.com/contacts/", conf)

        this.getFname.value = '';
        this.getLname.value = '';
        this.getEmail.value = '';
      }
    render() {
        return(
            <div className="contact-container">
                <form className="box" onSubmit={this.handleSubmit}>
                <h3>Add a contact</h3>
                    <input required type="text" name="first_name" ref={(input)=>this.getFname = input} className="form-control" placeholder="First Name"/>
                    <input required type="text" name="last_name" ref={(input)=>this.getLname = input} className="form-control" placeholder="Last Name"/>
                    <input required type="email" name="email" ref={(input)=>this.getEmail = input} className="form-control" placeholder="Email"/>
                    <input type="submit" value="Add A Contact" className="btn btn-success add_btn" />
                </form>
            </div>
        );
    }
}

export default ContactForm;
