import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { orderDatabaseValuesByChild } from "../firebase/database/helperFunctions";
import PostContainer from "./PostContainer";
import styles from "../../styles/dashboard.module.scss";

const Dashboard = () => {
  const [publicPosts, setPublicPosts] = useState([]);
  const [displayFilterMenu, toggleDisplayFilterMenu] = useState(false);

  const originalPostArray = useRef();
  const originalPostArrayReversed = useRef();

  useEffect(() => {
    orderDatabaseValuesByChild("posts", "shareOnDashboard", true).on(
      "value",
      (snapshot) => {
        if (snapshot.exists()) {
          const publicPostInfoArray = Object.values(snapshot.val()).reverse();
          // reverse order to have newest posts first

          originalPostArray.current = Object.values(snapshot.val()).reverse();
          // make a reference to this returned order

          originalPostArrayReversed.current = Object.values(snapshot.val());
          // make a reference to this returned order reversed (oldest first)

          setPublicPosts(publicPostInfoArray);
        } else setPublicPosts([]);
      }
    );
  }, []);

  const filterPosts = (filterType) => {
    if (filterType === "most recent") {
      setPublicPosts(originalPostArray.current);
    } else if (filterType === "least recent") {
      setPublicPosts(originalPostArrayReversed.current);
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.title}>Dashboard</div>
      <div className={styles.filter}>
        <div>Filter posts</div>
        <i
          className="filter icon"
          onClick={() => toggleDisplayFilterMenu(!displayFilterMenu)}
        ></i>
        {displayFilterMenu && (
          <div>
            <div className="item" onClick={() => filterPosts("most recent")}>
              Most recent
            </div>
            <div className="item" onClick={() => filterPosts("least recent")}>
              Least recent
            </div>
          </div>
        )}
      </div>
      <PostContainer publicPosts={publicPosts} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Dashboard);
