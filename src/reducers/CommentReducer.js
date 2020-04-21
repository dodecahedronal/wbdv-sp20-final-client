import {CREATE_COMMENT, FIND_COMMENTS_FOR_THREAD, DELETE_COMMENT} from "../actions/commentActions.js";

const initialState = {
    comments: []
}

const commentReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_COMMENTS_FOR_THREAD:
            return {
                comments: action.comments
            }
        case CREATE_COMMENT:
            return {
                comments: [
                    ...state.comments,
                    action.newComment
                ]
            }
        case DELETE_COMMENT:
            return {
                comments: state.comments.filter(comment => comment._id !== action.commentId)
            }
        default:
            return state
    }
}

export default commentReducer
