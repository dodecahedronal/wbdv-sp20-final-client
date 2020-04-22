import React from "react";
import {Link} from "react-router-dom";
import {LoginComponent} from "./LoginComponent";
import './PrivacyPolicy.css';

export class PrivacyPolicyComponent extends React.Component{
    render() {
        return (<div>
            <div className="privacy-policy">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" />
                <div className="nav-brand row">
                    <h2 className="col-md-7">Privacy Policy</h2>
                    <div className="col-md-5 row">
                        <Link className="search-nav" to="/search">
                            <i className="fas fa-search"/> Search For Books</Link>
                        <Link to="/" className="home-nav"><i className="fas fa-home"/> Home</Link>
                        {this.props.cookies.get('uid') && <Link to="/profile" className="profile-nav"><i className="fas fa-user"/> My Profile</Link>}
                        <LoginComponent className="col-6" cookies={this.props.cookies} />
                    </div>
                </div>
            </div>
            <div className="policy-content">
                <p>Here at Hello Books, we pride ourselves on only collecting the data that we need for our website to function. We do not collect any additional data for advertising purposes, nor do we sell any of your data to third party vendors.</p>
                <p>We collect the following data from our users: username and password, as well as threads, comments, and reviews that users make on books. The data is stored in a remote database, and after account creation, the password is never again accessed, keeping it secure. We use cookies only to keep track of the current logged-in user, and our website is not connected to any sort of social media, so you won’t be tracked by facebook/twitter/etc on our site. If you do not want us to collect any data whatsoever, you can opt out by not making an account. You are free to look at the books on our website and view any reviews/threads/comments, however, in order to participate in discussion, we need to collect the aforementioned data from you.</p>
            </div>
        </div>);
    }
}
