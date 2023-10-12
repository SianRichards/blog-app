import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  modalInfoAction,
  cancelDeleteBlogPostAction,
  sendBlogPostIdAction,
} from "../../../redux/actions";
import CustomModal from "../components/CustomModal";
import styles from "../../../styles/post.module.scss";
import {
  orderDatabaseValuesByChild,
  removeDatabaseValue,
  updateDatabaseValue,
} from "../../firebase/database/helperFunctions";

const BlogArchive = (props) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showMessageIds, setMessageIds] = useState([]);

  useEffect(() => {
    if (!props.user) {
      return;
    }
    const authUID = props.user.uid;
    const postsRef = orderDatabaseValuesByChild("posts", "userUID", authUID);

    const postsListener = postsRef.on("value", (snapshot) => {
      if (!snapshot.exists()) {
        setBlogPosts([]);
        return;
      }
      // if there are posts for the authenticated user
      const blogEntries = snapshot.val();
      // blogEntries: { postOneId: { postOneContent }, postTwoId: { postTwoContent } }
      const blogPostIds = Object.keys(blogEntries);
      // blogPostIds: [postOneId, postTwoId]
      const arrayedBlogEntries = blogPostIds.map((entryId) => ({
        ...blogEntries[entryId],
        id: entryId,
      }));
      // arrayedBlogEntries: [{ postOneId, postOneContent... }, { postTwoId, postTwoContent }]

      setBlogPosts(arrayedBlogEntries.reverse());
    });
    return () => {
      postsRef.off("value", postsListener);
    };
  }, [props.user]);

  useEffect(() => {
    const {
      deleteBlogPost,
      modalInfo,
      modalInfoAction,
      cancelDeleteBlogPostAction,
    } = props;

    if (deleteBlogPost) {
      removeDatabaseValue(`posts/${modalInfo.payload.id}`);
      modalInfoAction({});
      cancelDeleteBlogPostAction();
    }
  }, [props.deleteBlogPost]);

  const deleteBlogPost = (blogPostToDelete) => {
    const { modalInfoAction } = props;
    let modalInfo = {
      yesAction: "deleteBlogPostAction",
      noAction: "cancelDeleteBlogPostAction",
      payload: blogPostToDelete,
      modalMessage: "Are you sure you want to delete this post?",
    };
    modalInfoAction(modalInfo);
  };

  const editBlogPost = (blogPost) => {
    const { sendBlogPostIdAction } = props;
    sendBlogPostIdAction(blogPost.id);
  };

  const sharePostOnDashboard = (blogPost) => {
    const { shareOnDashboard, id } = blogPost;
    if (!shareOnDashboard) {
      updateDatabaseValue(`posts/${id}`, { shareOnDashboard: true });
      setMessageIds((showMessageIds) => [...showMessageIds, id]);
    } else if (shareOnDashboard) {
      updateDatabaseValue(`posts/${id}`, { shareOnDashboard: false });
      setMessageIds((showMessageIds) =>
        showMessageIds.filter((messageId) => messageId !== id)
      );
    }
  };

  return (
    <div>
      <h2 className="ui dividing header">Blog Posts</h2>
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
