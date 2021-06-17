// import React from 'react';
// import { connect } from 'react-redux';

// import styles from '../../styles/styles.module.scss';
// import { editProfileAction, showProfileEditModeAction } from '../../redux/actions';
// import { firebaseStorage } from '../../index';
// import { orderDatabaseValuesByChild } from '../firebase/database/helperFunctions';

// class ProfileFinal extends React.Component {
//     state = { showEditMode: false, profileText: '', imageURL: 'https://via.placeholder.com/150' }

//     componentDidMount() {
//         if (this.props.user) {
//             let authUID = this.props.user.uid;
//             orderDatabaseValuesByChild('profileInformation', 'userUID', authUID).once('value', (snapshot) => {
//                 if (snapshot.val()) {
//                     const returnedProfileDescription = Object.values(snapshot.val())
//                     this.setState({ profileText: returnedProfileDescription[0].profileDescription })
//                 }
//             })
//             let profilePictureStorageRef = firebaseStorage.ref('profilePicture/' + authUID)
//             profilePictureStorageRef.listAll().then((response) => {
//                 if (response.items.length > 0) {
//                     response.items[0].getDownloadURL().then((url) => {
//                         console.log(url)
//                         this.setState({ imageURL: url })
//                     }).catch((error) => {
//                         console.log(error)
//                     })
//                 }
//             })
//         }
//     }

//     render() {
//         return (
//             <div className="ui basic segment">
//                 <h1>Profile Page</h1>
//                 <i className={`right floated edit icon ${styles.pointer}`}
//                     onClick={() => {
//                         this.props.showProfileEditModeAction()
//                     }}
//                 ></i>
//                 <div>
//                     <img className="ui left floated circular image" src={this.state.imageURL} />
//                     <h2 className="ui aligned right">Username</h2>
//                     <p> {this.state.profileText}
//                     </p>
//                 </div>
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         user: state.user,
//         profileText: state.profileText,
//         storageRef: state.storageRef
//     }
// }

// export default connect(mapStateToProps, { editProfileAction, showProfileEditModeAction })(ProfileFinal);