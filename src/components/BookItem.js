import React from 'react'
import {Link} from 'react-router-dom'
import './Book.css'

class BookItem extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        book: this.props.book
      };
    }

    render() {
        console.log(this.state.book);
        return (
            <div className="book-item">
                <img src={this.state.book.small_image_url} aligh='left'></img>
                <Link to={`/detail/${this.state.book.id}`}>
                    {this.state.book.title}
                </Link>
            </div>
        )
    }
}

export default BookItem
