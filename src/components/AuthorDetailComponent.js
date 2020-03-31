import React from "react";
import {findBookByAuthor} from "../services/BookService";

export class AuthorDetailComponent extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            author: undefined,
            id: this.props.match.params.id,
        }

    }

    componentDidMount() {
        const author = findBookByAuthor(this.state.id)
        this.setState({
            author: author
        })
    }

    render() {
        console.log(this.state.author);
        if (!this.state.book)
            return ("<div> Loading </div>");
        else{
            return (
                <div className="author-detail">
                    {this.state.author.name}
                </div>
            )
        }
    }
}
