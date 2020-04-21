const COMMENT_URL = "http://localhost:4000/api/comment/"
const COMMENT_BY_THREAD_URL = "http://localhost:4000/api/thread/"

export const findCommentsForThread = async(threadId) => {
    let url = COMMENT_BY_THREAD_URL + threadId + '/comment/'
    const response = await fetch(url)
    return await response.json()
}

export const createComment = (comment) => 
    fetch(COMMENT_URL, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())

export const deleteComment = (cid) =>
    fetch(COMMENT_URL + cid, {
        method: 'DELETE'
    })
    .then(response => response.json())

export default {
    createComment,
    findCommentsForThread,
    deleteComment
}