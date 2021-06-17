import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// if there is an authenticated
// user trying to access a public
// route such as Login or Register,
// redirect them to home otherwise
// show them the public Route

const PublicRoute = props => {
    if (props.user && props.isLoggedIn) {
        return <Redirect to="/dashboard" />
    }
     return <Route path={props.path} component={props.component} />
}

const mapStateToProps = state => {
    return {
        user: state.user,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(PublicRoute);