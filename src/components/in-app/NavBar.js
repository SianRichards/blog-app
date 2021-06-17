import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutButton from '../in-app/SignOutButton';
import styles from '../../styles/navbar.module.scss';

const NavBar = (props) => {
    if (props.user && props.isLoggedIn) {
        return (
            <nav className={styles.navbar}>
                <Link to="/dashboard" className={styles.item} >Dashboard</Link>
                <Link to="/profile" className={styles.item} >Profile</Link>
                <SignOutButton className={styles.item}/>
            </nav>
        )
    }
    return null;
}

const mapStateToProps = state => {
    return {
        user: state.user,
        isLoggedIn: state.isLoggedIn
    }
};

export default connect(mapStateToProps)(NavBar);