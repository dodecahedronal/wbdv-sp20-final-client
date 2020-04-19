
import React, {Component} from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import BookHome from './BookHome'
import BookLogin from './BookLogin'
import BookRegister from './BookRegister'
import BookSearch from './BookSearch'
import BookDetail from '../components/BookDetail'
import Profile from './Profile'
import {AuthorDetailComponent} from "../components/AuthorDetailComponent";
import { withCookies } from 'react-cookie';

class BookApp extends Component {
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
                        <Route path="/" exact render={props => (<BookHome {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/home" render={props => (<BookHome {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/login" render={props => (<BookLogin {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/register" exact render={props => (<BookRegister {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/profile" render={props => (<Profile {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/search" render={props => (<BookSearch {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/detail/:id" exact render={props => (<BookDetail {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/author/:id" exact render={props => (<AuthorDetailComponent {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/profile/comments" exact component={Profile}/>
                        <Route path="/profile/threads" exact component={Profile}/>
                    </div>
                </Router>
            </div>
        )
    }
}

export default withCookies(BookApp)
