import React from "react";
import reviewService from "../services/ReviewService";
import './Review.css'

class ProfileReviewListComponent extends React.Component {

    componentDidMount() {
        reviewService.findReviewsByUserId(this.props.userId).then(response => {
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

    render() {
        console.log(this.state.reviews)
        if (!this.state.reviews)
            return ("<div> Loading </div>");
        else
            return (
                <div>
                    {this.state.reviews.map(rev => {
                        console.log(rev);
                        return (<ul className='review-list' key={rev._id}>
                            <div className='rating'>Rating: {rev.rating}/5</div>
                            <div className='revcontent'>{rev.content}</div>
                            <div>{this.props.cookies.username}</div>
                        </ul>)
                    })}
                </div>

            );
    }
}

export default ProfileReviewListComponent
