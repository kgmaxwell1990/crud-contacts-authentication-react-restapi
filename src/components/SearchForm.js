
import React, {Component} from 'react';

class SearchForm extends Component {

    render() {
        return (
            <form className="box searchform">
            <input type="text" name="search" className="form-control" placeholder="Search"/>
            <button disabled type="submit" className="btn btn-success search_btn" >Search - coming soon</button>
            </form>
                
        )}
}

export default SearchForm;


