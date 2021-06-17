// import React from 'react';
// import { connect } from 'react-redux';

// import { orderDatabaseValuesByChild } from '../firebase/database/helperFunctions';

// class Dashboard extends React.Component {
//     state = { publicPosts: [] }

//     componentDidMount() {
//         orderDatabaseValuesByChild('posts', 'shareOnDashboard', true).on('value', (snapshot) => {
//             if (snapshot.val()) {
//                 const publicPostInfoArray = Object.values(snapshot.val())
//                 this.setState({ publicPosts: publicPostInfoArray })
//                 // creates an array containing all public post info
//                 // e.g. [ {authUID: '1234a', postId: '5678b'}, ...]
//             }
//             else this.setState({ publicPosts: [] })
//         })
//     }

//     createMarkup(postArea) {
//         return {
//             __html: postArea
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <div>Dashboard</div>
//                 {this.state.publicPosts.map((blogPost) => {
//                     let blogPostId = this.state.publicPosts.indexOf(blogPost)
//                     return (
//                         <div key={blogPostId} className="ui segment">
//                             <div className="content">
//                                 <div className="header" dangerouslySetInnerHTML={this.createMarkup(blogPost.postTitle)}>
//                                 </div>
//                                 <p className="meta">
//                                     Posted {blogPost.postTimeStamp}
//                                 </p>
//                                 {blogPost.updatedTimeStamp && <p className="meta">
//                                     Updated {blogPost.updatedTimeStamp}
//                                 </p>}
//                                 <div className="description" dangerouslySetInnerHTML={this.createMarkup(blogPost.postContent)}>
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 })
//                 }
//             </div>
//         )
//     }
// };

// const mapStateToProps = state => {
//     return {
//         user: state.user
//     }
// };

// export default connect(mapStateToProps)(Dashboard);