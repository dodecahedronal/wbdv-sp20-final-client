import React from "react";
import userService from "../services/UserService";
import './Login.css'

export class LoginComponent extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
            {this.props.cookies.get('uid') ?
            <a onClick={() => {
                userService.logout()
                .then(() => {this.props.cookies.remove('uid')
                            this.props.cookies.remove('username')
                            this.props.cookies.remove('role')})
            }
            } href="/" className="logout-nav">Log Out</a> :
            <a className="login-nav" href="/login">Log In/Register</a>
        }
        </div>
        )
    }
}
