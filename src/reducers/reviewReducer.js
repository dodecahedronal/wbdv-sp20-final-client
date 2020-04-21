import {ADD_REVIEW, DELETE_REVIEW, FIND_REVIEWS_BY_USER_ID, FIND_REVIEWS_BY_BOOK_ID} from "../actions/ReviewAction";

const initialState = {
    reviews: []
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_REVIEW:
            return {
                reviews: [
                    ...state.reviews,
                    action.review,
                ]
            };
        case FIND_REVIEWS_BY_BOOK_ID:
            return {
                reviews: action.reviews,
            };
        case FIND_REVIEWS_BY_USER_ID:
            return {
                reviews: action.reviews,
            };
        case DELETE_REVIEW:
            return {
                reviews: state.reviews.filter(review => review._id !== action.reviewId),
            };
        default:
            return state;
    }
};

export default reviewReducer;
