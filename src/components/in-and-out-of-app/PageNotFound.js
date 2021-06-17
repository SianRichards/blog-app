import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const PageNotFound = props => {
    if (props.user && props.isLoggedIn)
        return (
            <div>
                <div className="ui header center aligned">Page Not Found</div>
                <div className="ui message">
                    To return to dashboard&nbsp;
                        <Link to="/dashboard" className="ui link">
                        please click here.
                        </Link>
                </div>
            </div>
        )
    else return (
        <div>
            <div className="ui header center aligned">Page Not Found</div>
            <div className="ui message">
                To return to login&nbsp;
                    <Link to="/login" className="ui link">
                    please click here.
                    </Link>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        user: state.user,
        isLoggedIn: state.loggedInOutReducer
    }
};

export default connect(mapStateToProps)(PageNotFound);