import React, {Component} from 'react';
//import redux, {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import userService from "../services/UserService";
import {ADD_USER, UPDATE_USER} from "../actions/UserActions";
import "./Profile.css"

export default class Profile extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            editing: false,
            currentUsername: '',
        }
    }

    currUser = {};

    componentDidMount() {
        userService.currentUser().then(response => {
            console.log(response)
            this.setState({
                username: response.username,
                currentUsername: response.username,
            })
            this.currUser = response;
        })
    }

    render() {
        return (
            <div className="user-profile">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
                <div className="nav-brand row">
                    <h2 className="col-md-3">My Profile</h2>
                    <a onClick={() => userService.logout()} href="/">Log Out</a>
                </div>
                {
                    this.state.editing ?
                    <div className="row username">
                        <h4>Username: </h4>
                        <input value={this.state.currentUsername} onChange={(event) =>
                            this.setState({currentUsername: event.target.value})}/>
                        <button onClick={() => {
                            let updatedUser = {...this.currUser, username: this.state.currentUsername};
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
                        <button onClick={() => this.setState({editing: true})}>Edit</button>
                    </div>
                }
                <div className="row nav-tabs">
                    <div className="nav-link">
                        <a href="/profile/comments">Comments</a>
                    </div>
                    <div className="nav-link">
                        <a href="/profile/threads">Threads</a>
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
