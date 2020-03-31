import React from "react";
import {Link} from "react-router-dom";
import {AuthorDetailComponent} from "./AuthorDetailComponent";

export class AuthorListComponent extends React.Component{
    render() {
        return (<span>
            <Link to={`/author/${this.props.authors.author.id}`}>{this.props.authors.author.name}
            </Link>
        </span>)
    }
}
