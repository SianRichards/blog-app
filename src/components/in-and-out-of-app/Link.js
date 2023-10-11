import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/link.module.scss";

const WrapperLink = (props) => {
  return (
    <Link className={styles.link} to={props.linkDestination}>
      {props.linkText}
    </Link>
  );
};

export default WrapperLink;
