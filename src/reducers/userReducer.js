import {ADD_USER, UPDATE_USER} from '../actions/UserActions';

const initialState = {
    users: []
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_USER:
            return {
                ...state,
                users: [
                    ...state.users,
                    action.user,
                ]
            }
        case UPDATE_USER:
            return {
                ...state,
                users: [
                    ...state.users.filter(us => us.id === action.user.id),
                    action.user,
                ]
            }
    }
}
