import React, {Component} from 'react'
import {findBooks, findDetailByBookId, findReviewsByTitle} from '../services/BookService'
import BookItem from '../components/BookItem'
import '../components/Book.css'
import {LoginComponent} from "../components/LoginComponent";
import {Link} from 'react-router-dom'
import './Search.css';

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
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"/>
                <div className="nav-brand row">
                    <h2 className="col-md-3">Book Search</h2>
                    <input onChange={this.titleChanged} className="col-md-3"/>
                    <button onClick={() => this.findBook()} className="col-md-2"><i className="fas fa-search"/>Find</button>
                    <div className="col-md-3 row">
                        {this.props.cookies.get('uid') && <Link className="profile-nav" to="/profile">
                            <i className="fas fa-user"/> My Profile</Link>}
                        <Link to="/" className="home-nav"><i className="fas fa-home"/> Home</Link>
                        <LoginComponent cookies={this.props.cookies}/>
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
