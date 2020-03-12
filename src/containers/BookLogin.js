import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {login} from '../services/UserService'

export default class BookLogin extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            logged_in: false,
            error : false,
            errorText : 'failed to login'
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

    login = async (e) => {
        e.preventDefault();
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        let u = await login(user);
        if (u == null) {
            this.setState({
                error : true
            })
        }
        else {
            this.setState({
                logged_in : true
            })
        }
        
        console.log(u);
    }

    render() {
        if (this.state.logged_in){
            return (<Redirect to="/profile"/>);
        }
        else {
            return (
                <div className="container">
                    <h1>Login</h1>
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
                            <label className="col-sm-2 col-form-label text-warning">
                                {this.state.error && 
                                    <div>{this.state.errorText}</div>
                                }
                            </label>
                            <div className="col-sm-10">
                                <button className="btn btn-primary btn-block" onClick={this.login}>
                                    Login
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }
}