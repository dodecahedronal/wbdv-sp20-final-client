import React from "react";
import threadService from "../services/ThreadService";
import {createThread, findThreadsForBook} from "../actions/threadActions";
import {connect} from "react-redux";

class ThreadListComponent extends React.Component {
    state = {
        currentTitle: "New Comment",
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
                        const thread = {subject: this.state.currentTitle, bookId: this.props.bookId}
                        this.props.createThread(thread)
                        this.setState({currentTitle: "New Comment"})
                    }}></button>
                </li>
                    {this.props.threads.map(thread =>
                    <li className="thread" key={thread._id}>{thread.subject}</li>)}
                </div>
        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        threads: state.threads.threads
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
            dispatch(createThread(actualThread)))
        
    }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper)
(ThreadListComponent)

