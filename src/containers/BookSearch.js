import React, {Component} from 'react'
import {findBooks, findDetailByBookId, findReviewsByTitle} from '../services/BookService'
import BookItem from '../components/BookItem'

export default class GoodRead extends Component {
    constructor() {
        super();

        this.state = {
            query: "",
            books: []
        }
    }

    componentDidMount = async () => {
        //const allCourses = await findAllCourses()
    }

    titleChanged = (event) => {
        this.setState(
            {
                query: event.target.value,
            });
    }

    findBook = async () => {
        let books = await findBooks(this.state.query);
        
        this.setState({
            books: books
        })
        
        console.log(books);
    }

    findDetailByBookId = async(id) => {
        let reviews = await findDetailByBookId(id);
        console.log(reviews)
    }

    findReviewsByTitle = async(title) => {
        let reviews = await findReviewsByTitle(title);
        console.log(reviews)
    }

    render() {
        return(
            <div className="container-fluid">
                <h2>Book Search</h2>
                <input onChange={this.titleChanged} />
                <button onClick={() => this.findBook()}>Find</button>
                {
                    this.state.books.map(
                        (book) => {
                            return (
                                <BookItem 
                                    key={book.id}
                                    book={book} 
                                    findReview={() => {
                                        this.findDetailByBookId(book.id)
                                    }}
                                />
                            )})
                }
            </div>
        )
    }
}