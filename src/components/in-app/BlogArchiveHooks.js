// import React, { useState, useEffect, useReducer } from 'react';

// import { updateDatabaseValue, orderDatabaseValuesByChild, removeDatabaseValue } from '../firebase/database/helperFunctions';
// import { initialState, rootReducer } from '../../redux/reducers';
// import CustomModal from '../in-app/CustomModal';
// import styles from '../../styles/styles.module.scss';

// const BlogArchiveHooks = () => {
//     const [blogPosts, setBlogPosts] = useState([]);
//     const [showMessageIds, setMessageIds] = useState([]);

//     const [state, dispatch] = useReducer(rootReducer, initialState);

//     console.log(state.user.uid)

//     // component did mount
//     useEffect(() => {
//         if (state.user && state.user !== {}) {
//             let authUID = state.user.uid;
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
//                     setBlogPosts(reverseArrayedBlogEntries)
//                 }
//                 else setBlogPosts([])
//             })
//         }
//     }, [])

//     // component updates (receives delete blog post confirmation)
//     useEffect(() => {
//         if (state.deleteBlogPost) {
//             removeDatabaseValue('posts/' + state.modalInfo.payload.id)
//             dispatch({ type: 'UPDATE_MODAL', payload: {} })
//             dispatch({ type: 'CANCEL_DELETE_BLOG_POST' })
//         }
//     }, [state.deleteBlogPost])

//     // helper functions
//     const deleteBlogPost = (blogPostToDelete) => {
//         let modalInfo = {
//             yesAction: 'deleteBlogPostAction',
//             noAction: 'cancelDeleteBlogPostAction',
//             payload: blogPostToDelete,
//             modalMessage: 'Are you sure you want to delete this post?'
//         }
//         dispatch({ type: 'UPDATE_MODAL', payload: modalInfo })
//     }

//     const editBlogPost = (blogPost) => {
//         dispatch({ type: 'SEND_POST_ID', payload: blogPost.id })
//     }

//     const sharePostOnDashboard = (blogPost) => {
//         if (!blogPost.shareOnDashboard) {
//             updateDatabaseValue('posts/' + blogPost.id, { shareOnDashboard: true })
//             setMessageIds(showMessageIds => [...showMessageIds, blogPost.id])
//         }
//         else if (blogPost.shareOnDashboard) {
//             updateDatabaseValue('posts/' + blogPost.id, { shareOnDashboard: false })
//             setMessageIds(showMessageIds => showMessageIds.filter((messageId) => messageId !== blogPost.id))
//         }
//     }

//     // rendered JSX
//     return (
//         <div>
//             <div>Blog Posts</div>
//             {blogPosts.map((blogPost) => {
//                 return (
//                     <div key={blogPost.id} className="ui card">
//                         <div className="content">
//                             <i className={`right floated trash alternate icon ${styles.pointer}`}
//                                 onClick={() => deleteBlogPost(blogPost)}></i>
//                             <i className={`right floated edit icon ${styles.pointer}`}
//                                 onClick={() => editBlogPost(blogPost)}></i>
//                             <i className={
//                                 blogPost.shareOnDashboard ?
//                                     `right floated globe icon ${styles.pointer} ${styles.active}` :
//                                     `right floated globe icon ${styles.pointer}`}
//                                 onClick={() => sharePostOnDashboard(blogPost)}></i>
//                             <div className="header" dangerouslySetInnerHTML={blogPost.postTitle}>
//                             </div>
//                             <p className="meta">
//                                 Posted {blogPost.postTimeStamp}
//                             </p>
//                             {blogPost.updatedTimeStamp && <p className="meta">
//                                 Updated {blogPost.updatedTimeStamp}
//                             </p>}
//                             <div className="description" dangerouslySetInnerHTML={blogPost.postContent}>
//                             </div>
//                         </div>
//                         <CustomModal />
//                         {showMessageIds.includes(blogPost.id) ?
//                             <div className="ui message">
//                                 <i className="close icon" onClick={() => {
//                                     setMessageIds(showMessageIds => showMessageIds.filter((messageId) => messageId !== blogPost.id))
//                                 }}></i>
//                                 This post is now viewable to other users on the dashboard.
//                                  To cancel this action, click on the 'make public' icon <i className="globe icon"></i> featured on the
//                                 post again.
//                             </div>
//                             : null}
//                     </div>
//                 )
//             })}
//         </div>

//     )

// };

// export default BlogArchiveHooks;