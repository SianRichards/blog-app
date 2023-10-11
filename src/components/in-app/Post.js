import React, { useState } from "react";

import styles from "../../styles/post.module.scss";
import { updateDatabaseValue } from "../firebase/database/helperFunctions";

const Post = (props) => {
  const [commentInput, showCommentInput] = useState(false);

  const [commentInputValue, setCommentInputValue] = useState("");

  const { blogPost } = props;

  const submitComment = (event) => {
    event.preventDefault();
    updateDatabaseValue("posts/" + blogPost.id, { comment: commentInputValue })
      .then(() => setCommentInputValue(""))
      .catch((error) => console.log(error));
  };

  console.log(blogPost.id);

  return (
    <div key={blogPost.id} className={styles.post}>
      <div className="content">
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
        <div>
          <label onClick={() => showCommentInput(!commentInput)}>Comment</label>
          {commentInput && (
            <form onSubmit={submitComment}>
              <input
                type="text"
                value={commentInputValue}
                onChange={(e) => setCommentInputValue(e.target.value)}
              />
              <button>Submit Comment</button>
            </form>
          )}
          <div>{blogPost.comment}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
