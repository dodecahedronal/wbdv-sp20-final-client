import React from "react";
import reviewService from "../services/ReviewService";

export class ReviewListComponent extends React.Component{

    componentDidMount() {
        reviewService.findReviewsByBookId(this.props.bookId).then(response => {
            this.setState({
                reviews: response,
            })
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            rating: null,
            desc: '',
        }
    }

    addReview() {
        const review = {
            userId: this.props.cookies.userId,
            bookId: this.props.bookId,
            rating: this.state.rating,
            content: this.state.desc,
        };
        reviewService.createReview(review);
    }

    render() {
        console.log(this.state.reviews)
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
                {this.state.reviews.map(rev => {
                    console.log(rev);
                    return (<div>
                        <div>Rating: {rev.rating}/5</div>
                        <div>{rev.content}</div>
                        <div>{this.props.cookies.username}</div>
                    </div>)
                })}
            </div>

        );
    }
}
