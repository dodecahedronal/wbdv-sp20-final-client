import React from 'react'
import {findDetailByBookId} from '../services/BookService'
import {AuthorListComponent} from './AuthorListComponent'
import ThreadListComponent from './ThreadListComponent'
import ReviewListComponent from "./ReviewListComponent";

class BookDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      book: undefined,
      bookId : props.match.params.id,
      active: 'Reviews',
    }
  }

  componentDidMount = async () => {
    const book = await findDetailByBookId(this.state.bookId);
    this.setState({
        book: book,
        active: 'Reviews',
    })
  }

  description() {
    return {__html: this.state.book.description};
  }

  toggleStateTab(switchToTab) {
      this.setState({active: switchToTab});
  }

  render() {
    console.log(this.state.cookies)
    if (!this.state.book)
        return ("<div> Loading </div>");
    else
        return (
            <div className="book-detail">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"/>
                <div className="nav-brand row">
                    <a className="return-to-search" href="/search/">
                        <i className="fas fa-home"/> Back to Search
                    </a>
                    <span className="greeting-span">Hi there {this.props.cookies.get('username')} </span>
                </div>
                <div className="book-info">
                    <img className="book-cover-img" src={this.state.book.image_url}></img>
                    <h3>{this.state.book.title}</h3>
                    <AuthorListComponent authors={this.state.book.authors}/>
                    <div dangerouslySetInnerHTML={this.description()}/>
                </div>
                <div className="row book-detail-tabs nav-tabs">
                    <div className="nav-item col-md" onClick={() => this.toggleStateTab('Reviews')}>
                        <label>Reviews</label>
                    </div>

                    <div className="nav-item col-md" onClick={() => this.toggleStateTab('Threads')}>
                        <label>Threads</label>
                    </div>
                </div>
                {this.state.active === 'Reviews' &&
                <ReviewListComponent bookId={this.state.book.id} cookies={this.props.cookies}/>}
                {this.state.active === 'Threads' &&
                <ThreadListComponent bookId={this.state.bookId} cookies={this.props.cookies}/>}
            </div>
        )
  }
}
export default BookDetail
