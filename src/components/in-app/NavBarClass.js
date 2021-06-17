// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

// import SignOutButton from '../in-app/SignOutButton';

// class NavBar extends React.Component {
//     state = {}

//     render() {
//         if (this.props.user) {
//             return (
//                 <nav className="ui four item menu">
//                     <Link to="/home" className="item" >Home</Link>
//                     <Link to="/dashboard" className="item" >Dashboard</Link>
//                     <Link to="/profile" className="item" >Profile</Link>
//                     <SignOutButton />
//                 </nav>
//             )
//         }
//         return null;
//     }
// };

// const mapStateToProps = state => {
//     return {
//         user: state.user
//     }
// };

// export default connect(mapStateToProps)(NavBar);