import React from "react";
import threadService from "../services/ThreadService";
import './Thread.css'
import { Link } from "react-router-dom";
import {createThread, deleteThread, findThreadsForBook, findThreadsForUser} from "../actions/threadActions";
import {connect} from "react-redux";

class ProfileThreadListComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentTitle: "New Thread",
        }
    }

    componentDidMount() {
        this.props.findThreadsForUser(this.props.cookies.get('uid'));
    }

    render() {
        if (!this.props.threads)
            return ("<div> Loading </div>");
        else
            return (
                <div className="thread-list">
                    {this.props.threads.map(thread =>
                        <ul className="thread" key={thread._id}>
                            <Link to={`/book/${thread.bookId}/thread/${thread._id}`}>
                                {thread.subject}
                            </Link>
                            <div className='float-right'>
                                &nbsp; &nbsp;
                                {thread.username}
                                &nbsp; &nbsp;
                                <button onClick={() => this.props.deleteThread(thread._id)}>Delete</button>
                            </div>
                        </ul>)}
                </div>
            )
    }
}

const stateToPropertyMapper = (state, ownProps) => {
    return {
        threads: state.threads.threads,
        cookies: ownProps.cookies
    }
};

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findThreadsForUser: (userId) => threadService.findThreadsForUser(userId)
            .then(threads => dispatch(findThreadsForUser(threads))),
        createThread: (thread) =>
            threadService.createThread(thread)
                .then(actualThread =>
                    dispatch(createThread(actualThread))),

        deleteThread: (threadId) =>
            threadService.deleteThread(threadId)
                .then(status => dispatch(deleteThread(threadId)))

    }
};

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(ProfileThreadListComponent)
