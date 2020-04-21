import React from "react";
import reviewService from "../services/ReviewService";
import {addReview, deleteReview, findReviewsByBookId, findReviewsByUserId} from "../actions/ReviewAction";
import {connect} from 'react-redux';

export class ReviewListComponent extends React.Component{

    componentDidMount() {
        this.props.findReviewsByBookId(this.props.bookId);
    }

    constructor(props) {
        super(props);
        this.state = {
            rating: null,
            desc: '',
        }
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
                <div>Review List</div>
                <div>
                    <span>
                        <label>Rating:</label>
                        <input onChange={event => this.setState({rating: event.target.value})}
                               type="number" min="1" max="5"/> / 5 stars
                    </span>
                    <textarea onChange={event => this.setState({desc: event.target.value})}/>
                    <button onClick={() => this.addReview()}>Post!</button>
                </div>
                {this.props.reviews && this.props.reviews.map(rev => {
                    console.log(rev);
                    return (<div key={rev._id}>
                        <div>Rating: {rev.rating}/5</div>
                        <div>{rev.content}</div>
                        <div>{this.props.cookies.get('username')}</div>
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
        findReviewsByUserId: (userId) => {
            reviewService.findReviewsByUserId(userId).then(response =>
                dispatch(findReviewsByUserId(response)));
        },
        findReviewsByBookId: (bookId) => {
            reviewService.findReviewsByBookId(bookId).then(response => dispatch(findReviewsByBookId(response)));
        },
        createReview: (review) => {
            reviewService.createReview(review).then(response => dispatch(addReview(response)));
        },
        deleteReview: (reviewId) => {
            reviewService.deleteReview(reviewId).then(response => dispatch(deleteReview(response)));
        }
    };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(ReviewListComponent);
