
export const CREATE_COMMENT = "CREATE_COMMENT"
export const FIND_COMMENTS_FOR_THREAD = "FIND_COMMENTS_FOR_THREAD"
export const DELETE_COMMENT = "DELETE_COMMENT"

export const createComment = (comment) => ({
    type: CREATE_COMMENT,
    newComment: comment
})

export const findCommentsForThread = (actualComments) => ({
    type: FIND_COMMENTS_FOR_THREAD,
    comments: actualComments
})

export const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId: commentId
})