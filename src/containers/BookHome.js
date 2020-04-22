import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {currentUser, logout} from '../services/UserService'
import './BookHome.css';

export default class BookHome extends Component {
    constructor() {
        super();

        this.state = {
            currentUser: null
        }
    }

    componentDidMount = async () => {
        const user = await currentUser();
        this.setState({
            currentUser : user
        })
        console.log(user)
    }

    logout = async () => {
        await logout();
        
        this.setState({
            currentUser : null
        })
    }

    render() {
        return(
            <div className="hb-home">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
                <div className="nav-brand row"><h3>Hello Books</h3></div>
                <br></br>
                {this.props.cookies.get('uid') ? <div className="logged-in-home">
                    <h3>Hello {this.props.cookies.get('username')}!</h3>
                    <br/>
                    <div className="search-message">
                        <p>Looking for a book?</p>
                        Go to <Link to="/search">Search</Link>
                    </div>
                    <br/>
                    <div className="profile-message">
                        <p>Want to view your info?</p>
                        Go to <Link to="/profile">My Profile</Link>
                    </div>
                    <br/>
                    <div className="logout-message">
                        <p>Had enough for the day?</p>
                        <Link to='/' onClick={() => this.logout()}>Log out</Link>
                    </div>
                </div> : <div className="anon-home">
                    <h3>Welcome to Hello Books!</h3>
                    <br/>
                    <div className="search-message">
                        <p>Looking for a book?</p>
                        Go to <Link to="/search">Search</Link>
                    </div>
                    <br/>
                    <div className="sign-in-message">
                        <p>Want to do more than just view books?</p>
                        <Link to="/login">Log in</Link> or <Link to="/register">Register</Link> to start!
                    </div>
                </div>
                }
                <br/>
                <div className="privacy-message">
                    Our users' privacy and safety is of the utmost importance to us here at Hello Books.
                    View our <a>Privacy Policy</a>  for more details.
                </div>
            </div>
        )
    }
}
