import React from "react";
import {connect} from "react-redux";
import userService from "../services/UserService";
import {findUser, updateUser, findAllUsers} from "../actions/UserActions";

class ManageUserComponent extends React.Component{
    componentDidMount() {
        this.props.findAllUsers();
    }

    upgradeUser(user) {
        const newUser = {...user, role: 'ADMIN'};
        console.log(newUser);
        this.props.updateUser(newUser);
    }

    render() {
        return (<div>
            {this.props.users.map(user =>
                user.role === 'USER' && (<div className="user-tbm row">
                    <div className="user-tbm-name">{user.username}</div>
                    <div className="row manage-buttons">
                        <button className="make-admin" onClick={() => this.props.updateUser({...user, role: 'ADMIN'})}>Upgrade User</button>
                        <button className="delete-user">Delete User</button>
                    </div>
                </div>)
            )}
        </div>);
    }
}

const stateToPropertyMapper = (state, ownProps) => {
    return {
        user: state.user.user,
        cookies: ownProps.cookies,
        users: state.user.users,
    }
};

const dispatchToPropertyMapper = (dispatch) => {
    return {
        updateUser : (user) => {
            console.log(user, 'in dispatch')
            userService.updateUser(user).then(updatedUser => {
                dispatch(updateUser(updatedUser))
            })
        },
        findUser : (userId) => {
            userService.findUserById(userId).then(user => {
                dispatch(findUser(user))});
        },
        findAllUsers : () =>
            userService.findAllUsers().then(users => dispatch(findAllUsers(users))),
    };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(ManageUserComponent);
