const REVIEW_URL = 'http://localhost:4000/api/review/';
const REVIEW_USER_URL = 'http://localhost:4000/api/user/';
const REVIEW_BOOK_URL = 'http://localhost:4000/api/book/';

const findAllReviews = async () => {
    const response = await fetch(REVIEW_URL);
    return await response.json();
};

const findReviewsByUserId = async (userId) => {
    const response = await fetch(REVIEW_USER_URL + userId + '/review');
    return await response.json();
};

const findReviewsByBookId = async (bookId) => {
    console.log(REVIEW_BOOK_URL + bookId + '/review')
    const response = await fetch(REVIEW_BOOK_URL + bookId + '/review');
    return await response.json();
}

const createReview = async (review) => {
    const response = await fetch(REVIEW_URL, {
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
            'content-type': 'application/json'
        }
    });
    return await response.json();
};

const deleteReview = async (reviewId) => {
    const response = await fetch(REVIEW_URL + reviewId, {
        method: 'DELETE',
    });
};

export default {
    findReviewsByBookId,
    findReviewsByUserId,
    findAllReviews,
    createReview,
    deleteReview,
}
