
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
import CommentListComponent from '../components/CommentListComponent'
import './Container.css'
import {PrivacyPolicyComponent} from "../components/PrivacyPolicy";

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
                        <Route path="/profile/:id" render={props => (<Profile {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/profile" exact render={props => (<Profile {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/search" render={props => (<BookSearch {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/detail/:id" exact render={props => (<BookDetail {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/author/:id" exact render={props => (<AuthorDetailComponent {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/book/:bid/thread/:tid" exact render={props => (<CommentListComponent {...props} cookies={this.props.cookies}/>)}/>
                        <Route path="/privacy-policy" exact render={props => (<PrivacyPolicyComponent {...props} cookies={this.props.cookies}/>)}/>
                    </div>
                </Router>
            </div>
        )
    }
}

export default withCookies(BookApp)
