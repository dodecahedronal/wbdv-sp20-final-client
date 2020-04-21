import React from "react";
import reviewService from "../services/ReviewService";
import './Review.css'
import {connect} from 'react-redux'
import {addReview, deleteReview, findReviewsByBookId, findReviewsByUserId} from "../actions/ReviewAction";
import bookService from '../services/BookService';

class ProfileReviewListComponent extends React.Component {

    componentDidMount() {
        // reviewService.findReviewsByUserId(this.props.userId).then(response => {
        //     this.setState({
        //         reviews: response,
        //     })
        // })
        this.props.findReviewsByUserId(this.props.cookies.get('uid'))
    }

    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            rating: null,
            desc: '',
        }
    }

    render() {
        console.log(this.state.reviews)
        if (!this.props.reviews)
            return ("<div> Loading </div>");
        else
            return (
                <div>
                    {this.props.reviews.map(rev => {
                        return (<ul className='review-list' key={rev._id}>
                            <div className='rating'>Rating: {rev.rating}/5
                            <a href={`/detail/${rev.bookId}`}> View review</a>
                            </div>
                            <div className='revcontent'>{rev.content}</div>
                            <div>{this.props.cookies.username}</div>
                        </ul>)
                    })}
                </div>

            );
    }
}

const stateToPropertyMapper = (state, ownProps) => {
    return {
        reviews: state.reviews.reviews,
        cookies: ownProps.cookies,
    };
};

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findReviewsByUserId: (userId) =>
            reviewService.findReviewsByUserId(userId).then(response =>
                dispatch(findReviewsByUserId(userId, response))),
        findReviewsByBookId: (bookId) =>
            reviewService.findReviewsByBookId(bookId).then(response => dispatch(findReviewsByBookId(bookId, response))),
        createReview: (review) =>
            reviewService.createReview(review).then(response => dispatch(addReview(response))),
        deleteReview: (reviewId) =>
            reviewService.deleteReview(reviewId).then(response => dispatch(deleteReview(response)))
    };
};

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(ProfileReviewListComponent)
