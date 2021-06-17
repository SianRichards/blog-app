// import React from 'react';
// import { connect } from 'react-redux';

// import BlogCreatorForm from './BlogCreatorForm';
// import BlogArchive from './BlogArchive';
// import ProfileEdit from './ProfileEdit';
// import ProfileFinal from './ProfileFinal';

// class Profile extends React.Component {
//     state = { showBlogPostArchive: false, showEditMode: false }

//     render() {
//         return (
//             <div>
//                 {
//                     this.props.showProfileEditMode ?
//                         <ProfileEdit /> :
//                         <ProfileFinal />
//                 }
//                 <div className="ui basic segment">
//                     <BlogCreatorForm />
//                     <div className="ui basic segment">
//                         <BlogArchive />
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// };

// const mapStateToProps = state => {
//     return {
//         showProfileEditMode: state.showProfileEditModeReducer
//     }
// };

// export default connect(mapStateToProps)(Profile);