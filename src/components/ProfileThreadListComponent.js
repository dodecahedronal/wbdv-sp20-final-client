import React from "react";
import threadService from "../services/ThreadService";

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

    render() {
        console.log(this.state.threads)
        if (!this.state.threads)
            return ("<div> Loading </div>");
        else
            return (
                <div className="thread-list">
                    {this.state.threads.map(thread =>
                        <li className="thread" key={thread._id}>
                            {thread.subject}
                            &nbsp;&nbsp; by &nbsp;&nbsp;
                            {thread.username}
                        </li>)}
                </div>
            )
    }
}

//{this.props.cookies.get('uid') === thread.userId && <button onClick={() => this.props.deleteThread(thread._id)}>Delete</button>}

export default ProfileThreadListComponent