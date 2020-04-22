import React from "react";
import reviewService from "../services/ReviewService";
import {addReview, deleteReview, findReviewsByBookId, findReviewsByUserId} from "../actions/ReviewAction";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

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
            username: this.props.cookies.get('username'),
            bookId: this.props.bookId,
            rating: this.state.rating,
            content: this.state.desc,
        };
        this.props.createReview(review);
    }

    render() {
        return (
            <div className="review-list">
                <h3>New Review</h3>
                <br/>
                { this.props.cookies.get('uid') ?
                <div className="add-new-review">
                    <div className="row add-rating">
                    <div>
                        <label>Rating: </label>
                        <input onChange={event => this.setState({rating: event.target.value})}
                               type="number" min="1" max="5"/> / 5 stars
                    </div>
                    </div>
                    <div className="row">
                        <textarea className="add-review-content"
                                  onChange={event => this.setState({desc: event.target.value})}/>
                        <button className="post-review-button" onClick={() => this.addReview()}>Post!</button>
                    </div>
                </div> :
                <span className="row comment-post">
                It seems you aren't logged in.
            <a href="/login" className="link-to-auth">Log in</a> or
            <a href="/register" className="link-to-auth"> register</a> to add a review.
                </span>
    }
                <br/>
                <h3>Past Reviews:</h3>
                {this.props.reviews.length > 0 ? this.props.reviews.map(rev => {
                    console.log(rev);
                    return (<div key={rev._id} className="review">
                        <div className="review-rating">Rating: {
                            rev.rating
                        } / 5 <i className="fas fa-star"/>
                        </div>
                        <div className="review-content">{rev.content}</div>
                        <div className="review-author">By: <Link to={`/profile/${rev.userId}`} className="review-author">{rev.username}</Link>

                        {(this.props.cookies.get('uid') === rev.userId || this.props.cookies.get('role') === 'ADMIN')&&
                        <button onClick={() => this.props.deleteReview(rev._id)}>Delete</button>
                        }</div>
                    </div>)
                }) : <div>No reviews yet! Be the first to add a review!</div>}
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
            reviewService.deleteReview(reviewId).then(response => dispatch(deleteReview(reviewId)))
    };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)(ReviewListComponent);
