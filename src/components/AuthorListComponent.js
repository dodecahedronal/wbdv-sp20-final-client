import React from "react";

export class AuthorListComponent extends React.Component{
    render() {
        return (<span>
            <Link to={`/author/${this.props.authors.author.id}`}>{this.props.authors.author.name}</Link>
        </span>)
    }
}
