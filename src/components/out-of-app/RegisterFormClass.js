// import React from 'react';
// import firebase from 'firebase';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

// class RegisterForm extends React.Component {
//     state = { usernameValue: '', emailValue: '', passwordValue: '', confirmPasswordValue: '', messages: [], fieldsWithErrors: [], showPassword: false, showconfirmPassword: false }

//     renderInputFields = () => {
//         this.fields = [{
//             label: 'Username',
//             id: 1,
//             name: 'username',
//             type: 'text',
//             isValid: this.state.usernameValue !== '' ? true : false,
//             errorMessage:
//                 <div className="ui error message">
//                     Please input a username
//                 </div>,
//             value: this.state.usernameValue
//         },
//         {
//             label: 'Email Address',
//             id: 2,
//             name: 'email',
//             type: 'text',
//             isValid: this.state.emailValue.includes('@') && this.state.emailValue.includes('.') ? true : false,
//             errorMessage:
//                 <div className="ui error message">
//                     Please enter a valid email address
//                 </div>,
//             value: this.state.emailValue
//         },
//         {
//             label: 'Password',
//             id: 3,
//             name: 'password',
//             type: this.state.showPassword ? 'text' : 'password',
//             fixedType: 'password',
//             isValid: this.state.passwordValue.length >= 8 ? true : false,
//             errorMessage:
//                 <div className="ui error message">
//                     Please enter a password that is at least eight characters long
//                 </div>,
//             value: this.state.passwordValue,
//             action: 'showPassword'
//         },
//         {
//             label: 'Confirm password',
//             id: 3,
//             name: 'confirmPassword',
//             type: this.state.showConfirmPassword ? 'text' : 'password',
//             fixedType: 'password',
//             isValid: this.state.confirmPasswordValue === this.state.passwordValue ? true : false,
//             errorMessage:
//                 <div className="ui error message">
//                     Passwords do not match
//                 </div>,
//             value: this.state.confirmPasswordValue,
//             action: 'showConfirmPassword'
//         }
//         ]

//         return this.fields.map((field) => {
//             return (
//                 <div
//                     key={field.id}
//                     className={this.state.fieldsWithErrors.includes(field.id) ?
//                         "field undefined error" : "field"}
//                 >
//                     <label>{field.label}</label>
//                     <div className={field.type === "password" ? "ui right labeled input" : "ui input"}>
//                         <input
//                             name={field.name}
//                             type={field.type}
//                             autoComplete="off"
//                             value={field.value}
//                             onChange={(e) => {
//                                 let fieldName = `${field.name}Value`
//                                 this.setState({ [fieldName]: e.target.value })
//                             }}
//                         />
//                         {field.fixedType === "password" &&
//                             <span className="ui basic label">
//                                 <i
//                                     onMouseDown={() => this.setState({ [field.action]: true })}
//                                     onMouseUp={() => this.setState({ [field.action]: false })}
//                                     className={this.state[field.action] ? "eye icon" : "eye slash icon"}
//                                 >
//                                 </i>
//                             </span>
//                         }
//                     </div>
//                 </div>
//             )
//         })
//     };

//     formSubmit = () => {
//         if (this.state.messages.length === 0 && this.state.fieldsWithErrors.length === 0) {
//             firebase.auth().createUserWithEmailAndPassword(this.state.emailValue, this.state.passwordValue)
//                 .then(() => {
//                     let successMessage =
//                         <div className="ui success message">
//                             You've successfully registered!&nbsp;
//                             <Link to="/login" className="ui link">
//                                 Click here to login to your new account.
//                             </Link>
//                         </div>
//                     this.setState(prevState => ({ messages: [...prevState.messages, successMessage] }))
//                 })
//                 .catch((error) => {
//                     this.setState(prevState => ({ messages: [...prevState.messages, error.message] }))
//                 })
//         }
//     };

//     validate = event => {
//         event.preventDefault();
//         let messages = [];
//         let fieldsWithErrors = [];
//         this.fields.forEach((field) => {
//             if (!field.isValid && !messages.includes(field.message)) {
//                 messages.push(field.errorMessage) && fieldsWithErrors.push(field.id)
//             }
//             else if (field.isValid) {
//                 messages.filter((errorMessage) => {
//                     return errorMessage !== field.errorMessage
//                 })
//                 fieldsWithErrors.filter((fieldWithErrors) => {
//                     return fieldWithErrors !== field.id
//                 })
//             }
//         })
//         this.setState({
//             messages, fieldsWithErrors
//         }, () => {
//             this.formSubmit();
//         })
//     };

//     render() {
//         return (
//             <div>
//                 <form className="ui form" onSubmit={this.validate}>
//                     {this.renderInputFields()}
//                     <button className="ui button primary">
//                         Register
//                 </button>
//                 or&nbsp;
//                 <Link to="/login" className="ui button secondary">
//                         <i class="arrow alternate circle left icon" />
//                         Return to log in
//                 </Link>
//                 </form>
//                 {this.state.messages && this.state.messages.map((message) => {
//                     return (
//                         <div key={message}>
//                             {message}
//                         </div>
//                     )
//                 })}
//             </div>
//         )
//     }
// };

// const mapStateToProps = state => {
//     return {
//         user: state.user,
//         isLoggedIn: state.isLoggedIn
//     }
// };

// export default connect(mapStateToProps)(RegisterForm);