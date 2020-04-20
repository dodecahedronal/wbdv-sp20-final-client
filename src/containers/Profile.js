import React, { Component } from 'react';
//import redux, {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import userService from "../services/UserService";
import { ADD_USER, UPDATE_USER } from "../actions/UserActions";
import "./Profile.css"
import ProfileThreadListComponent from '../components/ProfileThreadListComponent';

export default class Profile extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            editing: false,
            currentUsername: '',
            userId: '',
            active: 'Reviews'
        }
    }

    currUser = {};

    componentDidMount() {
        userService.currentUser().then(response => {
            console.log(response)
            this.setState({
                username: response.username,
                currentUsername: response.username,
                userId: response._id,
            })
            this.currUser = response;
        })
    }

    selectReview() {
        this.setState({
            active: 'Reviews'
        })
    }

    selectThread() {
        this.setState({
            active: 'Threads'
        })
    }

    render() {
        console.log(this.state)
        if (!this.state.userId)
            return ("<div> Loading </div>");
        else
            return (
                <div className="user-profile">
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                    <div className="nav-brand row">
                        <h2 className="col-md-3">My Profile</h2>
                        <a onClick={() => userService.logout()} href="/">Log Out</a>
                    </div>
                    {
                        this.state.editing ?
                            <div className="row username">
                                <h4>Username: </h4>
                                <input value={this.state.currentUsername} onChange={(event) =>
                                    this.setState({ currentUsername: event.target.value })} />
                                <button onClick={() => {
                                    let updatedUser = { ...this.currUser, username: this.state.currentUsername };
                                    userService.updateUser(updatedUser).then(() => {
                                        this.setState({
                                            editing: false,
                                            username: this.state.currentUsername
                                        });
                                    })
                                }
                                }>Save</button>
                                <button onClick={() => {
                                    this.setState({
                                        currentUsername: '',
                                        editing: false,
                                    })
                                }}>Cancel</button>
                            </div> :
                            <div className="row username">
                                <span>Username: </span>
                                <span>{this.state.username}</span>
                                <button onClick={() => this.setState({ editing: true })}>Edit</button>
                            </div>
                    }
                    <div className="row nav-tabs">
                        <div className="nav-item" onClick={() => this.selectReview()}>
                            <a className={this.state.active == 'Reviews' ? "nav-link active" : "nav-link"}>Reviews</a>
                        </div>
                        <div className="nav-item" onClick={() => this.selectThread()}>
                            <a className={this.state.active == 'Threads' ? "nav-link active" : "nav-link"}>Threads</a>
                            {this.state.active == 'Threads' &&
                                <ProfileThreadListComponent userId={this.state.userId} cookies={this.props.cookies} />
                            }
                        </div>
                    </div>
                </div>
            )
    }
}
//
// const stateToPropertyMapper = (state) => {
//     return {
//         user: state.user
//     }
// }
//
// const dispatchToPropertyMapper = (dispatch) => {
//     return {
//         updateUser : (user) => {
//             userService.updateUser(user).then(updatedUser => {
//                 dispatch({
//                     type: UPDATE_USER,
//                     user: updatedUser
//                 })
//             })
//         }
//     }
// }

//TODO: continue adding redux
