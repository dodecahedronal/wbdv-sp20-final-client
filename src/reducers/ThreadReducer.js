import {CREATE_THREAD, FIND_THREADS_FOR_BOOK, DELETE_THREAD} from "../actions/threadActions.js";
import {FIND_THREADS_FOR_USER} from "../actions/threadActions";

const initialState = {
    threads: []
}

const threadReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_THREADS_FOR_BOOK:
            return {
                threads: action.threads
            }
        case FIND_THREADS_FOR_USER:
            return {
                threads: action.threads,
            };
        case CREATE_THREAD:
            return {
                threads: [
                    ...state.threads,
                    action.newThread
                ]
            }
        case DELETE_THREAD:
            return {
                threads: state.threads.filter(thread => thread._id !== action.threadId)
            }
        default:
            return state
    }
}

export default threadReducer
