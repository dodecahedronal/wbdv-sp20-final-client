const THREAD_URL = "http://localhost:4000/api/thread/"
const THREAD_BY_BOOK_URL = "http://localhost:4000/api/book/"
const THREAD_BY_USER_URL = "http://localhost:4000/api/user/"

export const findThreadsForBook = async (bookId) => {
    let url = THREAD_BY_BOOK_URL + bookId + '/thread/'
    const response = await fetch(url)
    return await response.json()
}

export const createThread = (thread) =>
    fetch(THREAD_URL, {
        method: 'POST',
        body: JSON.stringify(thread),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())


export const deleteThread = async (tid) => {
    console.log(tid)
    const response = await fetch(THREAD_URL + tid, {
        method: 'DELETE'
    })
        console.log(response)
        return await response.json()

}

export const findThreadsForUser = async (userId) => {
    console.log(userId)
    let url = THREAD_BY_USER_URL + userId + '/thread'
    const response = await fetch(url)
    console.log(response)
    return await response.json()
}


export default {
    createThread,
    findThreadsForBook,
    deleteThread,
    findThreadsForUser
}