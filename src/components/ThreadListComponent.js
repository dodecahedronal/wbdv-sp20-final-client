import React from "react";
import threadService from "../services/ThreadService";
import {createThread, findThreadsForBook, deleteThread} from "../actions/threadActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import './Thread.css';
import {findUser} from "../actions/UserActions";
import {currentUser, findUserById} from "../services/UserService";

class ThreadListComponent extends React.Component {
    state = {
        currentTitle: "New Thread",
    }

    currUser = {};

    componentDidMount() {
        this.props.findThreadsForBook(this.props.bookId)
    }

    render() {
        console.log(this.currUser)
        return( 
            <div className="thread-list">
                <h3>Threads</h3>
                <div className="row add-new-thread">
                    <textarea
                    onChange={(e) => this.setState({
                            currentTitle: e.target.value
                        })}
                        value={this.state.currentTitle}/>
                    <button onClick={() =>{
                        const thread = {subject: this.state.currentTitle, bookId: this.props.bookId, username: this.props.cookies.get('username'), userId: this.props.cookies.get('uid')}
                        this.props.createThread(thread);
                        this.setState({currentTitle: "New Thread"})
                    }}>Post!</button>
                </div>
                <br/>
                <h3>Past Threads: </h3>
                <br/>
                    {this.props.threads.length > 0 ? this.props.threads.map(thread =>
                    <div className="thread" key={thread._id}>
                        <Link to={`/book/${this.props.bookId}/thread/${thread._id}`} className="thread-subject">
                        {thread.subject}
                        </Link>
                        {thread.userId === this.props.cookies.get('uid') ?
                            <Link to="/profile" className="thread-author">- {thread.username}</Link> :
                            <span className="thread-author">- {thread.username}</span>
                        }
                        {this.props.cookies.get('uid') === thread.userId
                        && <button onClick={()=>this.props.deleteThread(thread._id)}>Delete</button>}
                    </div>) : <div>No threads yet! Be the first to add a thread!</div>}
                </div>
        )
    }
}

const stateToPropertyMapper = (state, ownProps) => {
    console.log(ownProps.cookies)
    return {
        threads: state.threads.threads,
        cookies: ownProps.cookies
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findThreadsForBook: (bookId) =>
            threadService.findThreadsForBook(bookId)
                .then(actualThreads => dispatch(findThreadsForBook(actualThreads))),

        createThread: (thread) => 
            threadService.createThread(thread)
                .then(actualThread =>
            dispatch(createThread(actualThread))),

        deleteThread: (threadId) =>
            threadService.deleteThread(threadId)
                    .then(status => dispatch(deleteThread(threadId)))
        
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(ThreadListComponent)

