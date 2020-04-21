import React from "react";
import reviewService from "../services/ReviewService";
import {addReview, deleteReview, findReviewsByBookId, findReviewsByUserId} from "../actions/ReviewAction";
import {connect} from 'react-redux';

export class ReviewListComponent extends React.Component{

    state = {
        rating: null,
        desc: '',
    };

    componentDidMount() {
        this.props.findReviewsByBookId(this.props.bookId);
    }


    addReview() {
        const review = {
            userId: this.props.cookies.get('uid'),
            bookId: this.props.bookId,
            rating: this.state.rating,
            content: this.state.desc,
        };
        this.props.createReview(review);
    }

    render() {
        return (
            <div>
                <h3>Review List</h3>
                <br/>
                <div>
                    <span>
                        <label>Rating: </label>
                        <input onChange={event => this.setState({rating: event.target.value})}
                               type="number" min="1" max="5"/> / 5 stars
                    </span>
                </div>
                <div className="row">
                    <textarea onChange={event => this.setState({desc: event.target.value})}/>
                    <button onClick={() => this.addReview()}>Post!</button>
                </div>
                <br/>
                <h3>Past Reviews:</h3>
                {this.props.reviews && this.props.reviews.map(rev => {
                    console.log(rev);
                    return (<div key={rev._id} className="review">
                        <div className="review-rating">Rating: {
                            rev.rating
                        } / 5 <i className="fas fa-star"/>
                        </div>
                        <div className="review-content">{rev.content}</div>
                        <div className="review-author">By: {this.props.cookies.get('uid') === rev.userId ?
                            <a href='/profile'>{this.props.cookies.get('username')}</a> :
                            <div>{this.props.cookies.get('username')}</div>}
                        {this.props.cookies.get('uid') === rev.userId &&
                        <button onClick={() => this.props.deleteReview(rev._id)}>Delete</button>
                        }</div>
                    </div>)
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

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)(ReviewListComponent);
