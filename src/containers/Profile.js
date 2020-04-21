import React, { Component } from 'react';
import {connect} from 'react-redux';
import userService from "../services/UserService";
import {findUser, updateUser} from "../actions/UserActions";
import "./Profile.css"
import ProfileThreadListComponent from '../components/ProfileThreadListComponent';
import ProfileReviewListComponent from '../components/ProfileReviewListComponent';
import {Redirect} from "react-router-dom";
import ManageUserComponent from "../components/ManageUserComponent";
import { LoginComponent } from '../components/LoginComponent';
import {Link} from 'react-router-dom'

class Profile extends Component {

    users = [];

    componentDidMount() {
        this.props.match.params.id ?
        this.props.findUser(this.props.match.params.id):
        this.props.findUser(this.props.cookies.get('uid')) 
        if(this.props.cookies.get('role') == 'ADMIN') {
            userService.findAllUsers().then(response => this.users = response)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        return prevProps !== this.props || prevState !== this.state;
    }

    constructor() {
        super();
        this.state = {
            username: '',
            editing: false,
            currentUsername: '',
            active: 'Reviews',
            usernameDuplicated: false,
            displayOptions: false,
        }
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


    selectManage() {
        this.setState({
            active: 'Manage Users'
        })
    }

    render() {
            return (
                this.props.cookies.get('uid') ?
                <div className="user-profile">
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"/>
                    <div className="nav-brand row">
                        <h2 className="col-md-9">My Profile</h2>
                        <div className="col-md-3 row">
                            <Link className="col-6" to="/search">Search For Books</Link>
                            <LoginComponent className="col-6" cookies={this.props.cookies}/>
                        </div>

                    </div>
                    {
                        this.state.editing ?
                            <div className="row username">
                                <h4>Username: </h4>
                                <input value={this.state.currentUsername} onChange={(event) =>
                                    this.setState({ currentUsername: event.target.value })} />
                                <button onClick={() => {
                                    let updatedUser = { ...this.currUser, username: this.state.currentUsername };
                                    if (this.users.find(user => user.username === updatedUser.username) &&
                                        updatedUser.username !== this.props.user.username) {
                                        this.setState({
                                            usernameDuplicated: true
                                        })
                                    } else {
                                        userService.updateUser(this.state.userId, updatedUser).then(() => {
                                            this.setState({
                                                editing: false,
                                                username: this.state.currentUsername
                                            });
                                        })
                                        this.props.cookies.set('username', this.state.currentUsername);
                                    }
                                }
                                }>Save</button>
                                <button onClick={() => {
                                    this.setState({
                                        currentUsername: '',
                                        editing: false,
                                    })
                                }}>Cancel</button>
                               {this.state.usernameDuplicated &&
                               <div className="duplicate-error">
                                   Sorry! This username has already been taken, please try another one.</div>}
                            </div> :
                            <div className="row username">
                                <span>Username: &nbsp;</span>
                                <span>{this.props.user.username}</span>
                                &nbsp; &nbsp;
                                {(!this.props.match.params.id || this.props.match.params.id === this.props.cookies.get('uid')) &&
                                 <button onClick={() => this.setState({ editing: true })}>Edit</button>}
                            </div>
                    }
                    <ul className="nav nav-tabs">
                        <div className="nav-item" onClick={() => this.selectReview()}>
                            <a className={this.state.active == 'Reviews' ? "nav-link active" : "nav-link"}>Reviews</a>
                        </div>
                        <div className="nav-item" onClick={() => this.selectThread()}>
                            <a className={this.state.active == 'Threads' ? "nav-link active" : "nav-link"}>Threads</a>
                        </div>
                        {console.log(this.props.user)}
                        {this.props.cookies.get('role') === 'ADMIN' &&
                            <div className="nav-item" onClick={() => this.selectManage()}>
                            <a className={this.state.active == 'Manage Users' ? "nav-link active" : "nav-link"}>
                                Manage Users
                            </a>
                        </div>}
                    </ul>
                    {this.state.active == 'Reviews' &&
                        <ProfileReviewListComponent userId={this.props.match.params.id ? this.props.match.params.id : this.props.cookies.get('uid')} cookies={this.props.cookies} />
                    }
                    {this.state.active == 'Threads' &&
                        <ProfileThreadListComponent userId={this.props.match.params.id ? this.props.match.params.id : this.props.cookies.get('uid')} cookies={this.props.cookies} />
                    }
                    {this.state.active === 'Manage Users' &&
                        <ManageUserComponent userId={this.props.user.userId} cookies={this.props.cookies}/>
                    }
                </div>
                    : <Redirect to="/search"></Redirect>
            )
    }
}

const stateToPropertyMapper = (state, ownProps) => {
    return {
        user: state.user.user,
        cookies: ownProps.cookies,
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        updateUser : (user) => {
            userService.updateUser(user).then(updatedUser => {
                dispatch(updateUser(updatedUser))
            })
        },
        findUser : (userId) => {
            userService.findUserById(userId).then(user => {
                dispatch(findUser(user))});
        },
    }
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(Profile);
