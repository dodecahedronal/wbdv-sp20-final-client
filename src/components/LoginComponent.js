import React from "react";
import userService from "../services/UserService";

export class LoginComponent extends React.Component {

    loggedIn = false;

    componentDidMount() {
        userService.currentUser().then(response => {
            this.loggedIn = response !== null && response !== undefined;
        });
    }

    render() {
        return (
            this.loggedIn ?
            <a onClick={() => userService.logout()} href="/">Log Out</a> :
            <a href="/login">Log In/Register</a>
        )
    }
}
