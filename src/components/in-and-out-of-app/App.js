import React, { useEffect } from "react";
import { compose } from "redux";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";

import LoginForm from "../out-of-app/LoginForm";
import RegisterForm from "../out-of-app/RegisterForm";
import Header from "./Header";
import Counter from "../in-app/Counter";
import Dashboard from "../in-app/Dashboard";
import Profile from "../in-app/Profile";
import { firebaseAuth } from "../../index";
import { setUserAction } from "../../redux/actions";
import PrivateRoute from "../routing/PrivateRoute";
import PublicRoute from "../routing/PublicRoute";
import PageNotFound from "./PageNotFound";
import styles from "../../styles/app.module.scss";

const App = (props) => {
  useEffect(() => {
    // when the app component renders, check
    // to see if there is a user currently
    // authenticated and logged in
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        // if yes, then set global state
        // to authenticated user object
        let appUser = {
          email: user.email,
          uid: user.uid,
        };
        props.setUserAction(appUser);
      } else props.setUserAction(null);
    });
  }, []);

  // <Switch> renders the first resulting <Route>
  // that matches the history.location.pathname
  // rather than rendering all results

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <Switch>
          <PublicRoute path="/login" component={LoginForm} />
          <PublicRoute path="/register" component={RegisterForm} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
  };
};

// wrap instead of compose?
export default compose(
  withRouter,
  connect(mapStateToProps, { setUserAction })
)(App);
