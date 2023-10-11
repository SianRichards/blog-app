import React from "react";
import styles from "../../styles/button.module.scss";

const Button = (props) => {
  const { buttonText, type } = props;

  return (
    <button className={styles.button} type={type}>
      {buttonText}
    </button>
  );
};

export default Button;
