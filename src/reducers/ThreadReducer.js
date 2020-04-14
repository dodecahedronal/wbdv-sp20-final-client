import {CREATE_THREAD, FIND_THREADS_FOR_BOOK} from "../actions/threadActions.js";

const initialState = {
    threads: []
}

const threadReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_THREADS_FOR_BOOK:
            return {
                threads: action.threads
            }
        case CREATE_THREAD:
            return {
                threads: [
                    ...state.threads,
                    action.newThread
                ]
            }
        default:
            return state
    }
}

export default threadReducer
