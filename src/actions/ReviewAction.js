export const ADD_REVIEW = 'ADD_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const FIND_REVIEWS_BY_BOOK_ID = 'FIND_REVIEWS_BY_BOOK_ID';
export const FIND_REVIEWS_BY_USER_ID = 'FIND_REVIEWS_BY_USER_ID';

export const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review,
    };
};

export const findReviewsByBookId = (bookId, reviews) => {
    return {
        type: FIND_REVIEWS_BY_BOOK_ID,
        bookId,
        reviews,
    };
};

export const findReviewsByUserId = (userId, reviews) => {
    return {
        type: FIND_REVIEWS_BY_USER_ID,
        userId,
        reviews,
    };
};

export const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId,
    }
};
