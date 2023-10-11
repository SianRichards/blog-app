import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  modalInfoAction,
  cancelDeleteBlogPostAction,
  sendBlogPostIdAction,
} from "../../redux/actions";
import CustomModal from "../in-app/CustomModal";
import styles from "../../styles/post.module.scss";
import {
  orderDatabaseValuesByChild,
  removeDatabaseValue,
  updateDatabaseValue,
} from "../firebase/database/helperFunctions";

const BlogArchive = (props) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showMessageIds, setMessageIds] = useState([]);

  useEffect(() => {
    if (props.user && props.user !== {}) {
      let authUID = props.user.uid;
      orderDatabaseValuesByChild("posts", "userUID", authUID).on(
        "value",
        (snapshot) => {
          // firebase returns an object of objects (the blog entries)
          // so the code below turns it into an array of objects
          if (snapshot.val()) {
            let arrayedBlogEntries = Object.keys(snapshot.val()).map(
              (entry) => snapshot.val()[entry]
            );
            // obtains the id for each post
            let blogPostIds = Object.keys(snapshot.val());
            // adds the id for each post to the post object
            arrayedBlogEntries.forEach((entry, i) => {
              entry.id = blogPostIds[i];
            });
            // reverses the order of the array of the posts
            // to display in reverse chronological order
            let reverseArrayedBlogEntries = arrayedBlogEntries.reverse();
            setBlogPosts(reverseArrayedBlogEntries);
          } else setBlogPosts([]);
        }
      );
    }
  }, []);

  // component updates (receives delete blog post confirmation)
  useEffect(() => {
    if (props.deleteBlogPost) {
      removeDatabaseValue("posts/" + props.modalInfo.payload.id);
      props.modalInfoAction({});
      props.cancelDeleteBlogPostAction();
    }
  }, [props.deleteBlogPost]);

  // helper functions
  const deleteBlogPost = (blogPostToDelete) => {
    let modalInfo = {
      yesAction: "deleteBlogPostAction",
      noAction: "cancelDeleteBlogPostAction",
      payload: blogPostToDelete,
      modalMessage: "Are you sure you want to delete this post?",
    };
    props.modalInfoAction(modalInfo);
  };

  const editBlogPost = (blogPost) => {
    props.sendBlogPostIdAction(blogPost.id);
  };

  const sharePostOnDashboard = (blogPost) => {
    if (!blogPost.shareOnDashboard) {
      updateDatabaseValue("posts/" + blogPost.id, { shareOnDashboard: true });
      setMessageIds((showMessageIds) => [...showMessageIds, blogPost.id]);
    } else if (blogPost.shareOnDashboard) {
      updateDatabaseValue("posts/" + blogPost.id, { shareOnDashboard: false });
      setMessageIds((showMessageIds) =>
        showMessageIds.filter((messageId) => messageId !== blogPost.id)
      );
    }
  };

  return (
    <div>
      <div>Blog Posts</div>
      <div className={styles.postsContainer}>
        {blogPosts.map((blogPost) => {
          return (
            <div key={blogPost.id} className={styles.post}>
              <div className="content">
                <i
                  className={`right floated trash alternate icon ${styles.pointer}`}
                  onClick={() => deleteBlogPost(blogPost)}
                ></i>
                <i
                  className={`right floated edit icon ${styles.pointer}`}
                  onClick={() => editBlogPost(blogPost)}
                ></i>
                <i
                  className={
                    blogPost.shareOnDashboard
                      ? `right floated globe icon ${styles.pointer} ${styles.active}`
                      : `right floated globe icon ${styles.pointer}`
                  }
                  onClick={() => sharePostOnDashboard(blogPost)}
                ></i>
                <div
                  className="header"
                  dangerouslySetInnerHTML={{ __html: blogPost.postTitle }}
                ></div>
                <p className="meta">Posted {blogPost.postTimeStamp}</p>
                {blogPost.updatedTimeStamp && (
                  <p className="meta">Updated {blogPost.updatedTimeStamp}</p>
                )}
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: blogPost.postContent }}
                ></div>
              </div>
              <CustomModal />
              {showMessageIds.includes(blogPost.id) ? (
                <div className="ui message" style={{ maxWidth: "520px" }}>
                  <i
                    className="close icon"
                    onClick={() => {
                      setMessageIds((showMessageIds) =>
                        showMessageIds.filter(
                          (messageId) => messageId !== blogPost.id
                        )
                      );
                    }}
                  ></i>
                  This post is now viewable to other users on the dashboard. To
                  cancel this action, click on the 'make public' icon
                  <i className="globe icon"></i> featured on the post again.
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogPostId: state.collectBlogPostIdsReducer,
    deleteBlogPost: state.deleteBlogPost,
    modalInfo: state.modalInfo,
  };
};

export default connect(mapStateToProps, {
  modalInfoAction,
  cancelDeleteBlogPostAction,
  sendBlogPostIdAction,
})(BlogArchive);
