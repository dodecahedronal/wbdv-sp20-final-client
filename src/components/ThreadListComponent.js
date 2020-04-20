import React from "react";
import threadService from "../services/ThreadService";
import {createThread, findThreadsForBook, deleteThread} from "../actions/threadActions";
import {connect} from "react-redux";

class ThreadListComponent extends React.Component {
    state = {
        currentTitle: "New Thread",
    }

    componentDidMount() {
        this.props.findThreadsForBook(this.props.bookId)
    }

    render() {
        return( 
            <div className="thread-list">
                <li>
                    <input
                    onChange={(e) => this.setState({
                            currentTitle: e.target.value
                        })}
                        value={this.state.currentTitle}/>
                    <button onClick={() =>{
                        const thread = {subject: this.state.currentTitle, bookId: this.props.bookId, username: this.props.cookies.get('username'), userId: this.props.cookies.get('uid')}
                        this.props.createThread(thread)
                        this.setState({currentTitle: "New Thread"})
                    }}></button>
                </li>
                    {this.props.threads.map(thread =>
                    <li className="thread" key={thread._id}>
                        {thread.subject}
                        {thread.username}
                        {this.props.cookies.get('uid') === thread.userId && <button onClick={()=>this.props.deleteThread(thread._id)}>Delete</button>}
                    </li>)}
                </div>
        )
    }
}

const stateToPropertyMapper = (state, ownProps) => {
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
