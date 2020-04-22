const REVIEW_URL = "https://salty-dawn-90176.herokuapp.com/api/review/";//'http://localhost:4000/api/review/';
const REVIEW_USER_URL = "https://salty-dawn-90176.herokuapp.com/api/user/" //'http://localhost:4000/api/user/';
const REVIEW_BOOK_URL = "https://salty-dawn-90176.herokuapp.com/api/book/" //'http://localhost:4000/api/book/';

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

export const deleteReview = async (rid) => {
    const response = await fetch(REVIEW_URL + rid, {
        method: 'DELETE'
    })
        console.log(response)
        return await response.json()

}

export default {
    findReviewsByBookId,
    findReviewsByUserId,
    findAllReviews,
    createReview,
    deleteReview,
}
