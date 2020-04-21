import React, {Component} from 'react'
import {findBooks, findDetailByBookId, findReviewsByTitle} from '../services/BookService'
import BookItem from '../components/BookItem'
import '../components/Book.css'
import {LoginComponent} from "../components/LoginComponent";
import {Link} from 'react-router-dom'

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
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
                <div className="nav-brand row">
                    <h2 className="col-md-3">Book Search</h2>
                    <input onChange={this.titleChanged} className="col-md-4"/>
                    <button onClick={() => this.findBook()} className="col-md-2">Find</button>
                    <div className="col-md-3 row">
                        {this.props.cookies.get('uid') && <Link className="col-6" to="/profile">My Profile</Link>}
                        <LoginComponent className="col-6" cookies={this.props.cookies}/>
                    </div>
                </div>
                {   this.state.books.length > 1 ?
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
                            )}) :
                    <div className="search-placeholder">
                        Type in the search bar to begin searching!
                    </div>
                }
            </div>
        )
    }
}
