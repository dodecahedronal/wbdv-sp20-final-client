
export const CREATE_THREAD = "CREATE_THREAD"
export const FIND_THREADS_FOR_BOOK = "FIND_THREADS_FOR_BOOK"

export const createThread = (thread) => ({
    type: CREATE_THREAD,
    newThread: thread
})

export const findThreadsForBook = (actualThreads) => ({
    type: FIND_THREADS_FOR_BOOK,
    threads: actualThreads
})
