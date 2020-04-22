
export const CREATE_THREAD = "CREATE_THREAD"
export const FIND_THREADS_FOR_BOOK = "FIND_THREADS_FOR_BOOK"
export const DELETE_THREAD = "DELETE_THREAD"
export const FIND_THREADS_FOR_USER = 'FIND_THREADS_FOR_USER';

export const createThread = (thread) => ({
    type: CREATE_THREAD,
    newThread: thread
})

export const findThreadsForBook = (actualThreads) => ({
    type: FIND_THREADS_FOR_BOOK,
    threads: actualThreads
})

export const deleteThread = (threadId) => ({
    type: DELETE_THREAD,
    threadId: threadId
})

export const findThreadsForUser = (threads) => ({
    type: FIND_THREADS_FOR_USER,
    threads: threads
})
