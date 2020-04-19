import React from "react";

export default class UserProfileComponent extends React.Component{
    componentDidMount() {

    }

    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    render() {
        return (

            <div>
                <h1>My Profile</h1>
                <div>hello world</div>
            </div>
        );
    }
}
