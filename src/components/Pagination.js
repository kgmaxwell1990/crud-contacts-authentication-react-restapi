import React, {Component} from 'react';

class Pagination extends Component {

    render() {
        return (
            <div className="pag_buttons">
            <button 
            className={"btn pag_btn " + (this.props.prev === "null" ? "disabled": "" )} 
            onClick={this.props.handlePagination.bind(this, this.props.prev)}>
            <i className="fas fa-chevron-left"></i>
            prev
            </button>

            <button 
            className={"btn pag_btn " + (this.props.next === "null" ? "disabled": "" )} 
            onClick={this.props.handlePagination.bind(this, this.props.next)}>
            next
            <i className="fas fa-chevron-right"></i>
            </button>
            </div>
                
        )}
}

export default Pagination;