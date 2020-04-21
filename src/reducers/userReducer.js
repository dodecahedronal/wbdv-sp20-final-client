import {ADD_USER, UPDATE_USER, FIND_USER} from '../actions/UserActions';

const initialState = {
    user: {}
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_USER:
            console.log(action.user)
            return {
                ...state,
                user: action.user,
            };
        case ADD_USER:
            return {
                ...state,
                users: [
                    ...state.users,
                    action.user,
                ]
            };
        case UPDATE_USER:
            return {
                ...state,
                users: [
                    ...state.users.filter(us => us.id === action.user.id),
                    action.user,
                ]
            };
        default:
            return state;
    }
};

export default userReducer;
