import {
    ADD_USER,
    UPDATE_USER,
    FIND_USER,
    FIND_ALL_USERS
} from '../actions/UserActions';

const initialState = {
    users: [],
    user: {},
    displaySettings: false,
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_USER:
            return {
                ...state,
                user: action.user,
            };
        case FIND_ALL_USERS:
            return {
                ...state,
                users: action.users,
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
            console.log(action.user, 'in action')
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
