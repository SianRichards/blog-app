import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import FormField from '../in-and-out-of-app/FormField';
import styles from '../../styles/login.module.scss';
import Button from '../in-and-out-of-app/Button';
import Message from '../in-and-out-of-app/Message';
import WrapperLink from '../in-and-out-of-app/Link';

const RegisterForm = (props) => {
    const [usernameValue, setUsernameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [fieldsWithErrors, setFieldsWithErrors] = useState([]);
    const [showPassword, toggleShowPassword] = useState(false);
    const [showConfirmPassword, toggleShowConfirmPassword] = useState(false);
    const [fields, setFields] = useState([]);
    const [formSubmitStatus, setFormSubmitStatus] = useState(false);

    useEffect(() => {
        const fields = [{
            label: 'Username:',
            id: 1,
            name: 'username',
            type: 'text',
            isValid: usernameValue !== '' ? true : false,
            errorMessage: "Please input a username",
            value: usernameValue
        },
        {
            label: 'Email Address:',
            id: 2,
            name: 'email',
            type: 'text',
            isValid: emailValue.includes('@') && emailValue.includes('.') ? true : false,
            errorMessage: "Please enter a valid email address",
            value: emailValue
        },
        {
            label: 'Password:',
            id: 3,
            name: 'password',
            type: showPassword ? 'text' : 'password',
            fixedType: 'password',
            isValid: passwordValue.length >= 8 ? true : false,
            errorMessage: "Please enter a password that is at least eight characters long",
            value: passwordValue,
            action: 'showPassword'
        },
        {
            label: 'Confirm password:',
            id: 3,
            name: 'confirmPassword',
            type: showConfirmPassword ? 'text' : 'password',
            fixedType: 'password',
            isValid: confirmPasswordValue === passwordValue ? true : false,
            errorMessage: "Passwords do not match",
            value: confirmPasswordValue,
            action: 'showConfirmPassword'
        }
        ]
        setFields(fields)
    }, [usernameValue, emailValue, passwordValue, confirmPasswordValue])

    useEffect(() => {
        if (messages.length === 0 && fieldsWithErrors.length === 0 && formSubmitStatus) {
            firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
                .then(() => {
                    let successMessage =
                        <div className="ui success message">
                            You've successfully registered!&nbsp;
                            <Link to="/login" className="ui link">
                                Click here to login to your new account.
                            </Link>
                        </div>
                    setMessages(messages => [...messages, successMessage])
                })
                .catch((error) => {
                    setMessages(messages => [...messages, error.message])
                })
        }
    }, [messages, fieldsWithErrors, formSubmitStatus])

    const validate = event => {
        event.preventDefault();
        let messages = [];
        let fieldsWithErrors = [];
        fields.forEach((field) => {
            if (!field.isValid && !messages.includes(field.message)) {
                messages.push(field.errorMessage) && fieldsWithErrors.push(field.id)
            }
            else if (field.isValid) {
                messages.filter((errorMessage) => {
                    return errorMessage !== field.errorMessage
                })
                fieldsWithErrors.filter((fieldWithErrors) => {
                    return fieldWithErrors !== field.id
                })
            }
        })
        setMessages(messages);
        setFieldsWithErrors(fieldsWithErrors);
        setFormSubmitStatus(true);
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={validate}>
                {fields.map((field) => {
                    return (
                        <FormField field={field} validate={validate} setPasswordValue={setPasswordValue} setEmailValue={setEmailValue} setUsernameValue={setUsernameValue} setConfirmPasswordValue={setConfirmPasswordValue} />
                    )
                })}
                <div className={styles.orButton}>
                    <Button buttonText="Register" />
            or&nbsp;
            <WrapperLink linkDestination="/login" linkText="Return to log in" />
                </div>
            </form>
            <div className={styles.messageContainer}>
                {messages.map((message) => {
                    return (
                        <Message message={message} />
                    )
                })}
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        user: state.user,
        isLoggedIn: state.isLoggedIn
    }
};

export default connect(mapStateToProps)(RegisterForm);