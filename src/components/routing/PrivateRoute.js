import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// if there is an authenticated
// user, render the component
// passed as a prop, otherwise
// redirect to the login component

const PrivateRoute = props => {
    if (props.isLoggedIn && props.user)
        return <Route path={props.path} component={props.component} />
    else return <Redirect to="/login" />
};

const mapStateToProps = state => {
    return {
        user: state.user,
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(PrivateRoute);