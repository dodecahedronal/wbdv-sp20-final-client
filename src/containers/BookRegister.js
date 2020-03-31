import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {createUser} from '../services/UserService'

export default class BookRegister extends Component {
    constructor() {
        super();

        this.state = {
            registered : false,
            username: '',
            password: '',
            verifyPassword: '',
            role: 'Reader',
            error : false,
            errorText : 'password not match'
        }
    }

    usernameChanged = (event) => {
        this.setState(
            {
                username: event.target.value,
            });
    }

    passwordChanged = (event) => {
        this.setState(
            {
                password: event.target.value,
            });
    }

    verifyPasswordChanged = (event) => {
        this.setState(
            {
                verifyPassword: event.target.value,
            });
    }

    addUser = async (e) => {
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password,
            role: 'Reader'
        }
        if (this.state.password != this.state.verifyPassword) {
            this.setState({
                error : true
            })
        }
        else {
            let response =  await createUser(user);
            this.setState({
                registered: true
            })
            console.log(response)
        }
    }

    render() {
        console.log(this.state);
        if (this.state.registered) {
            return (<Redirect to="/login"/>);
        }
        else {
            return (
                <div className="container">
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
                    <div className="nav-brand row">
                    <h1>Sign Up</h1>
                    </div>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                                Username
                        </label>
                            <div className="col-sm-10">
                                <input className="form-control" onChange={this.usernameChanged} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                                Password
                        </label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" onChange={this.passwordChanged} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                                Verify Password
                        </label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" onChange={this.verifyPasswordChanged} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label text-warning">
                                {this.state.error && 
                                    <div>{this.state.errorText}</div>
                                }
                            </label>
                            <div className="col-sm-10">
                                <button className="btn btn-primary btn-block" onClick={this.addUser}>
                                    Sign in
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }
}
