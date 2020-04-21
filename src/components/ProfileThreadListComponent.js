import React from "react";
import threadService from "../services/ThreadService";
import './Thread.css'
import { Link } from "react-router-dom";

class ProfileThreadListComponent extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentTitle: "New Thread",
            threads: [],
        }
    }

    componentDidMount() {
        threadService.findThreadsForUser(this.props.userId).then(response => {
            console.log(response)
            this.setState({
                threads: response,
            })
        })
    }

    deleteThread(tid) {
        threadService.deleteThread(tid)
        this.setState({
            threads: this.state.threads.filter(thread => thread._id != tid)
        })
    }

    render() {
        console.log(this.state.threads)
        if (!this.state.threads)
            return ("<div> Loading </div>");
        else
            return (
                <div className="thread-list">
                    {this.state.threads.map(thread =>
                        <ul className="thread" key={thread._id}>
                            <Link to={`/book/${this.props.bookId}/thread/${thread._id}`}>
                                {thread.subject}
                            </Link>
                            <div className='float-right'>
                                &nbsp; &nbsp;
                                {thread.username}
                                &nbsp; &nbsp;
                                <button onClick={() => this.deleteThread(thread._id)}>Delete</button>
                            </div>
                        </ul>)}
                </div>
            )
    }
}

//{this.props.cookies.get('uid') === thread.userId && <button onClick={() => this.props.deleteThread(thread._id)}>Delete</button>}

export default ProfileThreadListComponent