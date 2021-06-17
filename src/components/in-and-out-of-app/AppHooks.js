// import React, { useReducer, useEffect } from 'react';
// import { compose } from 'redux'
// import { Route, Switch, withRouter } from 'react-router-dom';

// import { rootReducer, initialState } from '../../redux/reducers';
// import LoginForm from '../out-of-app/LoginForm';
// import RegisterForm from '../out-of-app/RegisterForm';
// import Header from './Header';
// import CounterHooks from '../in-app/CounterHooks';
// import Dashboard from '../in-app/Dashboard';
// import Profile from '../in-app/Profile'
// import { firebaseAuth } from '../../index';
// import { setUserAction } from '../../redux/actions';
// import PrivateRoute from '../routing/PrivateRoute';
// import PublicRoute from '../routing/PublicRoute';
// import PageNotFound from './PageNotFound';

// const AppHooks = ({ id }) => {
//     const [state, dispatch] = useReducer(rootReducer, initialState, (state => state), id)

//     useEffect(() => {
//         firebaseAuth.onAuthStateChanged((user) => {
//             if (user) {
//                 let appUser = {
//                     email: user.email,
//                     uid: user.uid
//                 }
//                 dispatch({ type: 'SET_USER', payload: appUser })
//                 console.log('user sent')
//             }
//             else dispatch({ type: 'SET_USER', payload: null })
//         })
//     }, [])

//     return (
//         <div className="ui container">
//             <Header />
//             <Switch>
//                 <PublicRoute path="/login" component={LoginForm} />
//                 <PublicRoute path="/register" component={RegisterForm} />
//                 <PrivateRoute path="/home" component={CounterHooks} />
//                 <PrivateRoute path="/dashboard" component={Dashboard} />
//                 <PrivateRoute path="/profile" component={Profile} />
//                 <Route component={PageNotFound} />
//             </Switch>
//         </div>
//     )
// };

// export default compose(withRouter)(AppHooks);