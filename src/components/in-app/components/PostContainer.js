import React from "react";
import Post from "./Post";
import styles from "../../../styles/post.module.scss";

const PostContainer = (props) => {
  const { publicPosts } = props;

  return (
    <div className={styles.postsContainer}>
      {publicPosts.map((blogPost, index) => {
        return <Post key={index} blogPost={blogPost} />;
      })}
    </div>
  );
};

export default PostContainer;
