// import React from 'react';
// import firebase from 'firebase';
// import { compose } from 'redux';
// import { Link, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

// import { userIsLoggedIn } from '../../redux/actions';

// class LoginForm extends React.Component {
//     state = { emailValue: '', passwordValue: '', messages: [], fieldsWithErrors: [], hasLoggedIn: false }

//     formSubmit = () => {
//         if (this.state.messages.length === 0 && this.state.fieldsWithErrors.length === 0) {
//             firebase.auth().signInWithEmailAndPassword(this.state.emailValue, this.state.passwordValue)
//                 .then(() => {
//                     this.props.userIsLoggedIn()
//                     this.props.history.push("/home")
//                 })
//                 .catch((error) => {
//                     if (!this.state.messages.includes(error.message)) {
//                         this.setState(prevState => ({ messages: [...prevState.messages, error.message] }))
//                     }
//                 })
//         }
//     };

//     validate = event => {
//         event.preventDefault();
//         let messages = [];
//         let fieldsWithErrors = [];
//         this.fields.forEach((field) => {
//             if (!field.isValid && !messages.includes(field.message)) {
//                 messages.push(field.message) && fieldsWithErrors.push(field.id)
//             }
//             else if (field.isValid) {
//                 messages.filter((message) => {
//                     return message !== field.message
//                 })
//                 fieldsWithErrors.filter((fieldWithErrors) => {
//                     return fieldWithErrors !== field.id
//                 })
//             }
//             this.setState({
//                 messages, fieldsWithErrors
//             }, () => {
//                 this.formSubmit();
//             })
//         })
//     }

//     renderInputFields = () => {
//         this.fields = [{
//             label: 'Email Address',
//             id: 1,
//             name: 'email',
//             type: 'text',
//             message: 'Please enter a valid email address',
//             isValid: this.state.emailValue.includes('@') && this.state.emailValue.includes('.') ? true : false,
//             value: this.state.emailValue
//         },
//         {
//             label: 'Password',
//             id: 2,
//             name: 'password',
//             type: 'password',
//             isValid: this.state.passwordValue.length >= 8 ? true : false,
//             message: 'Please enter your password',
//             value: this.state.passwordValue
//         }
//         ]

//         return this.fields.map((field) => {
//             return (
//                 <div key={field.id} className={this.state.fieldsWithErrors.includes(field.id)
//                     ? "field undefined error" : "field"}>
//                     <label>{field.label}</label>
//                     <input
//                         name={field.name}
//                         type={field.type}
//                         pattern={field.pattern}
//                         title={field.title}
//                         autoComplete="off"
//                         value={field.value}
//                         onChange={(e) => {
//                             let fieldName = `${field.name}Value`;
//                             this.setState({ [fieldName]: e.target.value })
//                         }}
//                     />
//                 </div>
//             )
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <form className="ui form" onSubmit={this.validate}>
//                     {this.renderInputFields()}
//                     <button className="ui button primary">
//                         <i className="sign in alternate icon" />
//                         Log in
//                     </button>
//                     or&nbsp;
//                     <Link to="/register" className="ui button">
//                         Register
//                     </Link>
//                 </form>
//                 {this.state.messages && this.state.messages.map((message) => {
//                     return <div key={message} className="ui error message">{message}</div>
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

// export default compose(withRouter, connect(mapStateToProps, {userIsLoggedIn}))(LoginForm);