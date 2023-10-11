import React from "react";
import styles from "../../styles/message.module.scss";

const Message = (props) => {
  const { message } = props;

  return (
    <div key={message} className={styles.message}>
      {message}
    </div>
  );
};

export default Message;
