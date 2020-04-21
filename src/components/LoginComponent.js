import React from "react";
import userService from "../services/UserService";

export class LoginComponent extends React.Component {

    loggedIn = false;

    componentDidMount() {

    }

    render() {
        return (
            <div>
            {this.props.cookies.get('uid') ?
            <a onClick={() => {
                userService.logout()
                .then(() => {this.props.cookies.remove('uid')
                            this.props.cookies.remove('username')})
            }
            } href="/">Log Out</a> :
            <a href="/login">Log In/Register</a>
        }
        </div>
        )
    }
}
