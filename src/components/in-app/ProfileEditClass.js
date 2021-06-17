// import React from 'react';
// import { connect } from 'react-redux';

// import { showProfileFinalModeAction, editProfileAction, sendStorageRefAction } from '../../redux/actions';
// import { orderDatabaseValuesByChild, updateDatabaseValue, addDatabaseValue } from '../firebase/database/helperFunctions';
// import { firebaseStorageRef, listAllStoragePathwayContents, putFileInStoragePathway } from '../firebase/storage/helperFunctions';

// const ProfileEdit = () => {
    
// }

// class ProfileEdit extends React.Component {
//     state = { editValue: '', imagePathway: '', imageURL: 'https://via.placeholder.com/150', storageRef: '' }

//     fileInput = React.createRef()

//     componentDidMount() {
//         let authUID = this.props.user.uid;
//         orderDatabaseValuesByChild('profileInformation', 'userUID', authUID).once('value', (snapshot) => {
//             if (snapshot.val()) {
//                 const returnedProfileDescription = Object.values(snapshot.val())
//                 this.setState({ editValue: returnedProfileDescription[0].profileDescription })
//             }
//         })
//         // when component loads, go into profile picture storage pathway for this 
//         // user and list all of the contents. Retrieve first item in list and get
//         // the URL for this picture
//         // set the imageURL to this retrieved URL
//         listAllStoragePathwayContents('profilePicture/' + authUID).then((response) => {
//             if (response.items.length > 0) {
//                 response.items[0].getDownloadURL().then((url) => {
//                     this.setState({ imageURL: url })
//                 }).catch((error) => {
//                     console.log(error)
//                 })
//             }
//         })
//     }

//     uploadProfileImage = (event) => {
//         event.preventDefault()
//         let authUID = this.props.user.uid
//         let file = this.fileInput.current.files[0]
//         if (file) {
//             // deletes all existing profile pictures for this user
//             listAllStoragePathwayContents('profilePicture/' + authUID).then((response) => {
//                 response.items.forEach((item) => item.delete())
//             }).catch((error) => console.log(error))
//             // adds selected file to user's storage for profile pictures
//             putFileInStoragePathway('profilePicture/' + authUID + '/' + file.name, file).then(() => {
//                 // retrieves the URL for this file and sets state so 
//                 // component's <img>'s src now refers to this URL
//                 firebaseStorageRef('profilePicture/' + authUID + '/' + file.name).getDownloadURL().then((url) => {
//                     this.setState({ imageURL: url })
//                 }).catch((storageRefDownloadURLError) => {
//                     console.log(storageRefDownloadURLError)
//                 })
//             })
//                 .catch((storageRefPutError) => console.log(storageRefPutError))
//         }
//         else alert('Please select an image to upload')
//     }

//     postProfileInformation = () => {
//         let authUID = this.props.user.uid
//         // check if this user already has posted profileInformation
//         orderDatabaseValuesByChild('profileInformation', 'userUID', authUID).once('value', (snapshot) => {
//             if (snapshot.val()) {
//                 // if they have already posted it, then update
//                 // that pathway
//                 let profileInformationID = Object.keys(snapshot.val())[0]
//                 // profileInformationID is the obtained post id for 
//                 // the user's existing profile info in database
//                 updateDatabaseValue('profileInformation/' + profileInformationID, { profileDescription: this.state.editValue })
//             }
//             // if they haven't already posted profile info
//             // then add a new entry for that user and their
//             // profile info
//             else addDatabaseValue('profileInformation', { profileDescription: this.state.editValue, userUID: authUID })
//         }).then(() => {
//             this.props.showProfileFinalModeAction()
//         })
//     }

//     render() {
//         return (
//             <div className="ui container" >
//                 <h1>Profile Page</h1>
//                 <div>
//                     <img className="ui left floated circular image" src={this.state.imageURL} />
//                     <form onSubmit={this.uploadProfileImage}>
//                         <input type="file" accept="image/*"
//                             ref={this.fileInput} />
//                         <button>Upload profile picture</button>
//                     </form>
//                     <h2 className="ui aligned right">Username</h2>
//                     <form
//                         className="ui form"
//                         onSubmit={(event) => {
//                             event.preventDefault();
//                             this.postProfileInformation()
//                         }}
//                     >
//                         <div className="field">
//                             <label>Edit your bio</label>
//                             <textarea
//                                 name="edit-profile-description"
//                                 value={this.state.editValue} onChange={(e) => this.setState({ editValue: e.target.value })} />
//                         </div>
//                         <button>Update Bio</button>
//                     </form>
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

// export default connect(mapStateToProps, { showProfileFinalModeAction, editProfileAction, sendStorageRefAction })(ProfileEdit);