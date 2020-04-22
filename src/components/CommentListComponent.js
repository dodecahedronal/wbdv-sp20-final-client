import React from "react";
import commentService from "../services/CommentService";
import {createComment, findCommentsForThread, deleteComment} from "../actions/commentActions";
import {connect} from "react-redux";
import threadService from "../services/ThreadService";
import './Comment.css'

class CommentListComponent extends React.Component {
    state = {
        currentText: "",
        threadSubject: '',
        threadCreator: '',
        threadCreatorId: '',
    };

    componentDidMount() {
        console.log(this.props.match.params)
        this.props.findCommentsForThread(this.props.match.params.tid)
        threadService.findThreadsForBook(this.props.match.params.bid)
            .then(threads => {
                let thread = threads.filter(thread => thread._id === this.props.match.params.tid)[0];
                this.setState({
                    threadSubject: thread.subject,
                    threadCreator: thread.username,
                    threadCreatorId: thread.userId,
                });
            });
    }

    render() {
        return(
            !this.state.threadSubject ? <div>Loading...</div> :
            <div className="thread-detail">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"/>
                <div className="row nav-brand">
                    <h3>Thread Comments</h3>
                </div>
                <div className="thread-info">
                    <div className="thread-subject">{this.state.threadSubject}</div>
                    <div>
                        Thread by: <a href={`/profile/${this.state.threadCreatorId}`}>{this.state.threadCreator}</a>
                    </div>
                </div>
                <br/>
                <h3 className="add-comment-label">Add a comment:</h3>
                {this.props.cookies.get('uid') ? <div className="row comment-post">
                        <textarea
                            onChange={(e) => this.setState({
                                currentText: e.target.value
                            })}
                            value={this.state.currentText}
                            placeholder="New comment"
                        />
                    <button onClick={() =>{
                        const comment = {content: this.state.currentText, threadId: this.props.match.params.tid, bookId: this.props.match.params.bid, username: this.props.cookies.get('username'), userId: this.props.cookies.get('uid')}
                        this.props.createComment(comment)
                        this.setState({currentText: ""})
                    }}>Post!</button>
                </div> : <span className="row comment-post">
                        It seems you aren't logged in.
                    <a href="/login" className="link-to-auth">Log in</a> or
                    <a href="/register" className="link-to-auth"> register</a> to comment.
                        </span>}
                <br/>
                <div className="comment-list">
                    <h3>Comments:</h3>
                    {this.props.comments.length > 0 ? this.props.comments.map(comment =>
                        <div className="comment" key={comment._id}>
                            <div>{comment.content}</div>
                            <div><a href={`/profile/${comment.userId}`}>{comment.username}</a></div>
                            {this.props.cookies.get('uid') === comment.userId && <i
                                onClick={()=>this.props.deleteComment(comment._id)}
                                className="fas fa-trash"
                            >
                                Delete this comment</i>}
                        </div>) : <div>No comments yet! Be the first to add one!</div>}
                </div>
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

