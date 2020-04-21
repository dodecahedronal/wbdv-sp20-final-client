import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {currentUser, logout} from '../services/UserService'

export default class BookApp extends Component {
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
            <div>
                <h2> Hello Books</h2>
                <ul>
                    <li>
                        <Link to='/search'>Search</Link>
                    </li>
                    <li>
                        <Link to='/user'>Profile</Link>
                    </li>
                    {this.state.currentUser == null &&
                        <li>
                            <Link to='/login'>Login</Link>
                            /
                            <Link to='/register'>Register</Link>
                        </li>
                    }
                </ul>

                {this.state.currentUser != null &&
                    <div>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
                        <div className="nav-brand row">Home</div>
                        <br></br>
                        <h3>{this.state.currentUser.username} logged in</h3>
                        <button onClick={() => this.logout()}>Logout</button>
                    </div>
                }
            </div>
        )
    }
}
