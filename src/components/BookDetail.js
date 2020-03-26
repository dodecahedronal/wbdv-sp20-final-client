import React from 'react'
import {findDetailByBookId} from '../services/BookService'
import {AuthorListComponent} from './AuthorListComponent'

class BookDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      book: undefined,
      bookId : props.match.params.id
    }
  }

  componentDidMount = async () => {
    const book = await findDetailByBookId(this.state.bookId)
    this.setState({
        book: book
    })
  }

  description() {
    return {__html: this.state.book.description};
  }

  render() {
    console.log(this.state.book)
    if (!this.state.book)
        return ("<div> Loading </div>");
    else
        return (
            <div>
                <img src={this.state.book.image_url}></img>
                <h3>{this.state.book.title}</h3>
                <AuthorListComponent authors={this.state.book.authors}/>
                <div dangerouslySetInnerHTML={this.description()}/>
            </div>
        )
  }
}
export default BookDetail
