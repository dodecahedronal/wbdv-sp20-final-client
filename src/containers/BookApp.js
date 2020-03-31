
import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import BookHome from './BookHome'
import BookLogin from './BookLogin'
import BookRegister from './BookRegister'
import BookSearch from './BookSearch'
import BookDetail from '../components/BookDetail'
import Profile from './Profile'
import {AuthorDetailComponent} from "../components/AuthorDetailComponent";

export default class BookApp extends Component {
    constructor() {
        super();
    }

    componentDidMount = async () => {
        //
    }

    render() {
        return(
            <div className="container-fluid">
                <Router>
                    <div>
                        <Route path="/" exact component={BookHome}/>
                        <Route path="/home" component={BookHome}/>
                        <Route path="/login" component={BookLogin}/>
                        <Route path="/register" exact component={BookRegister}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/search" component={BookSearch}/>
                        <Route path="/detail/:id" exact component={BookDetail}/>
                        <Route path="/author/:id" exact component={AuthorDetailComponent}/>
                    </div>
                </Router>
            </div>
        )
    }
}
