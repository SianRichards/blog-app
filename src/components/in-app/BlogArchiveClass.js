// import React, { useState, useEffect, useReducer } from 'react';
// import { connect } from 'react-redux';

// import { modalInfoAction, cancelDeleteBlogPostAction, sendBlogPostIdAction } from '../../redux/actions';
// import CustomModal from '../in-app/CustomModal';
// import styles from '../../styles/styles.module.scss';
// import { orderDatabaseValuesByChild, removeDatabaseValue, updateDatabaseValue } from '../firebase/database/helperFunctions';

// class BlogArchive extends React.Component {
//     state = { blogPosts: [], messages: [], showMessageIds: [] }

//     componentDidMount() {
//         if (this.props.user) {
//             let authUID = this.props.user.uid;
//             orderDatabaseValuesByChild('posts', 'userUID', authUID).on('value', (snapshot) => {
//                 // firebase returns an object of objects (the blog entries)
//                 // so the code below turns it into an array of objects
//                 if (snapshot.val()) {
//                     let arrayedBlogEntries = Object.keys(snapshot.val()).map(entry => snapshot.val()[entry])
//                     // obtains the id for each post
//                     let blogPostIds = Object.keys(snapshot.val())
//                     // adds the id for each post to the post object
//                     arrayedBlogEntries.forEach((entry, i) => {
//                         entry.id = blogPostIds[i]
//                     })
//                     // reverses the order of the array of the posts
//                     // to display in reverse chronological order
//                     let reverseArrayedBlogEntries = arrayedBlogEntries.reverse();
//                     this.setState({ blogPosts: reverseArrayedBlogEntries })
//                 }
//                 else this.setState({ blogPosts: [] })
//             })

//         }
//     }

//     componentDidUpdate(prevProps) {
//         if (prevProps.deleteBlogPost !== this.props.deleteBlogPost) {
//             if (this.props.deleteBlogPost) {
//                 removeDatabaseValue('posts/' + this.props.modalInfo.payload.id)
//                 this.props.modalInfoAction({})
//                 this.props.cancelDeleteBlogPostAction()
//             }
//         }
//     }

//     deleteBlogPost = (blogPostToDelete) => {
//         let modalInfo = {
//             yesAction: 'deleteBlogPostAction',
//             noAction: 'cancelDeleteBlogPostAction',
//             payload: blogPostToDelete,
//             modalMessage: 'Are you sure you want to delete this post?'
//         }
//         this.props.modalInfoAction(modalInfo)
//     }

//     editBlogPost = (blogPost) => {
//         this.props.sendBlogPostIdAction(blogPost.id)
//     }

//     sharePostOnDashboard = (blogPost) => {
//         if (!blogPost.shareOnDashboard) {
//             updateDatabaseValue('posts/' + blogPost.id, { shareOnDashboard: true })
//             this.setState(prevState => ({ showMessageIds: [...prevState.showMessageIds, blogPost.id] }))
//         }
//         else if (blogPost.shareOnDashboard) {
//             updateDatabaseValue('posts/' + blogPost.id, { shareOnDashboard: false })
//             this.setState({ showMessageIds: this.state.showMessageIds.filter((messageId) => messageId !== blogPost.id) })
//         }
//     }

//     createMarkup(postArea) {
//         return {
//             __html: postArea
//         }
//     }

//     render() {
//         return (
//             <div>
//                 <div>Blog Posts</div>
//                 {this.state.blogPosts.map((blogPost) => {
//                     return (
//                         <div key={blogPost.id} className="ui segment">
//                             <div className="content">
//                                 <i className={`right floated trash alternate icon ${styles.pointer}`}
//                                     onClick={() => this.deleteBlogPost(blogPost)}></i>
//                                 <i className={`right floated edit icon ${styles.pointer}`}
//                                     onClick={() => this.editBlogPost(blogPost)}></i>
//                                 <i className={
//                                     blogPost.shareOnDashboard ?
//                                         `right floated globe icon ${styles.pointer} ${styles.active}` :
//                                         `right floated globe icon ${styles.pointer}`}
//                                     onClick={() => this.sharePostOnDashboard(blogPost)}></i>
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
//                             <CustomModal />
//                             {this.state.showMessageIds.includes(blogPost.id) ?
//                                 <div className="ui message">
//                                     <i className="close icon" onClick={() => { this.setState({ showMessageIds: this.state.showMessageIds.filter((messageId) => messageId !== blogPost.id) }) }}></i>
//                                     This post is now viewable to other users on the dashboard.
//                                      To cancel this action, click on the 'make public' icon <i className="globe icon"></i> featured on the
//                                     post again.
//                                 </div>
//                                 : null}
//                         </div>
//                     )
//                 })}
//             </div>

//         )
//     };

// };

// const mapStateToProps = state => {
//     return {
//         user: state.user,
//         blogPostId: state.collectBlogPostIdsReducer,
//         deleteBlogPost: state.deleteBlogPost,
//         modalInfo: state.modalInfo
//     }
// };

// export default connect(mapStateToProps, { modalInfoAction, cancelDeleteBlogPostAction, sendBlogPostIdAction })(BlogArchive);