import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Message from "../in-and-out-of-app/Message";
import Button from "../in-and-out-of-app/Button";
import WrapperLink from "../in-and-out-of-app/Link";
import FormField from "../in-and-out-of-app/FormField";
import { userIsLoggedIn } from "../../redux/actions";
import styles from "../../styles/login.module.scss";

const LoginForm = (props) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [fieldsWithErrors, setFieldsWithErrors] = useState([]);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fields = [
      {
        label: "Email Address:",
        id: 1,
        name: "email",
        type: "text",
        message: "Please enter a valid email address",
        isValid:
          emailValue.includes("@") && emailValue.includes(".") ? true : false,
        value: emailValue,
      },
      {
        label: "Password:",
        id: 2,
        name: "password",
        type: "password",
        isValid: passwordValue.length >= 8 ? true : false,
        message: "Please enter your password",
        value: passwordValue,
      },
    ];
    setFields(fields);
  }, [emailValue, passwordValue]);

  const formSubmit = () => {
    if (messages.length === 0 && fieldsWithErrors.length === 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
          props.userIsLoggedIn();
          props.history.push("/dashboard");
        })
        .catch((error) => {
          if (!messages.includes(error.message)) {
            console.log(error);
            setMessages((messages) => [...messages, error.message]);
          }
          // else if (messages.includes(error.message)) {
          //     setMessages(messages => messages.filter((message) => message !== error.message))
          // }
        });
    }
  };

  const validate = (event) => {
    event.preventDefault();
    let messages = [];
    let fieldsWithErrors = [];
    fields.forEach((field) => {
      if (!field.isValid && !messages.includes(field.message)) {
        messages.push(field.message) && fieldsWithErrors.push(field.id);
      } else if (field.isValid) {
        messages.filter((message) => {
          return message !== field.message;
        });
        fieldsWithErrors.filter((fieldWithErrors) => {
          return fieldWithErrors !== field.id;
        });
      }
      setMessages(messages);
      setFieldsWithErrors(fieldsWithErrors);
      formSubmit();
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={validate}>
        {fields.map((field) => (
          <FormField
            field={field}
            setPasswordValue={setPasswordValue}
            setEmailValue={setEmailValue}
          />
        ))}
        <div className={styles.orButton}>
          <Button buttonText="Log In" />
          or&nbsp;
          <WrapperLink linkDestination="/register" linkText="Register" />
        </div>
      </form>
      <div className={styles.messageContainer}>
        {messages.map((message) => {
          return <Message message={message} />;
        })}
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

export default compose(
  withRouter,
  connect(mapStateToProps, { userIsLoggedIn })
)(LoginForm);
