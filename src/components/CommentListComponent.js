import React from "react";
import commentService from "../services/CommentService";
import {createComment, findCommentsForThread, deleteComment} from "../actions/commentActions";
import {connect} from "react-redux";

class CommentListComponent extends React.Component {
    state = {
        currentText: "New Comment",
    }

    componentDidMount() {
        console.log(this.props.match.params)
        this.props.findCommentsForThread(this.props.match.params.tid)
    }

    render() {
        return( 
            <div className="comment-list">
                <li>
                    <input
                    onChange={(e) => this.setState({
                            currentText: e.target.value
                        })}
                        value={this.state.currentText}/>
                    <button onClick={() =>{
                        const comment = {content: this.state.currentText, threadId: this.props.match.params.tid, bookId: this.props.match.params.bid, username: this.props.cookies.get('username'), userId: this.props.cookies.get('uid')}
                        this.props.createComment(comment)
                        this.setState({currentText: "New Comment"})
                    }}></button>
                </li>
                    {this.props.comments.map(comment =>
                    <li className="comment" key={comment._id}>
                        {comment.content}
                        {comment.username}
                        {this.props.cookies.get('uid') === comment.userId && <button onClick={()=>this.props.deleteComment(comment._id)}>Delete</button>}
                    </li>)}
                </div>
        )
    }
}

const stateToPropertyMapper = (state, ownProps) => {
    return {
        comments: state.comments.comments,
        cookies: ownProps.cookies
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findCommentsForThread: (threadId) =>
            commentService.findCommentsForThread(threadId)
                .then(actualComments => dispatch(findCommentsForThread(actualComments))),

        createComment: (comment) => 
            commentService.createComment(comment)
                .then(actualComment =>
            dispatch(createComment(actualComment))),

        deleteComment: (commentId) =>
            commentService.deleteComment(commentId)
                    .then(status => dispatch(deleteComment(commentId)))
        
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(CommentListComponent)

