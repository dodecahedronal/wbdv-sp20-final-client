import React from 'react'
import {findDetailByBookId} from '../services/BookService'
import {AuthorListComponent} from './AuthorListComponent'
import ThreadListComponent from './ThreadListComponent'

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
            <div className="book-detail">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
                <div className="nav-brand row">
                    <a className="return-to-search" href="/search/">
                        Back to Search
                    </a>
                    <span>Hi there {this.props.cookies.get('username')} </span>
                </div>
                <img className="book-cover-img" src={this.state.book.image_url}></img>
                <h3>{this.state.book.title}</h3>
                <AuthorListComponent authors={this.state.book.authors}/>
                <div dangerouslySetInnerHTML={this.description()}/>
                <ThreadListComponent bookId={this.state.bookId} cookies={this.props.cookies}/>
            </div>
        )
  }
}
export default BookDetail
