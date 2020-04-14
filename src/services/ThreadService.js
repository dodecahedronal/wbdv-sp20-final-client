const THREAD_URL = "https://salty-dawn-90176.herokuapp.com/api/thread/"
const THREAD_BY_BOOK_URL = "https://salty-dawn-90176.herokuapp.com/api/book/"

export const findThreadsForBook = async(bookId) => {
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


export default {
    createThread,
    findThreadsForBook
}