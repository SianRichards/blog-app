import React from "react";

import NavBar from "../in-app/NavBar";
import styles from "../../styles/header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTitle}>Blog Creator</div>
      <NavBar />
    </header>
  );
};

export default Header;
