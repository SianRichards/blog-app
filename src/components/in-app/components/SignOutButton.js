import React from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { userIsLoggedOut } from "../../../redux/actions";

class SignOutButton extends React.Component {
  state = { errorMessages: [] };

  signOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.userIsLoggedOut();
      })
      .catch((error) => {
        if (!this.state.errorMessages.includes(error.message)) {
          this.setState((prevState) => ({
            errorMessages: [...prevState.errorMessages, error.message],
          }));
        }
      });
  };

  render() {
    return (
      <div onClick={this.signOutUser} className={this.props.className}>
        <i className="sign out alternate icon" />
        Sign Out
        {this.state.errorMessages &&
          this.state.errorMessages.map((errorMessage) => {
            return (
              <div key={errorMessage} className="ui error message">
                {errorMessage}
              </div>
            );
          })}
      </div>
    );
  }
}

export default connect(null, { userIsLoggedOut })(SignOutButton);
