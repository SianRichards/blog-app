import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  databaseRef,
  setDatabaseValue,
} from "../firebase/database/helperFunctions";
import { increment, decrement, reset } from "../../redux/actions";

const Counter = (props) => {
  const [dataValue, setDataValue] = useState();

  const recordUserValue = () => {
    let authUid = props.user.uid;
    setDatabaseValue("score/" + authUid, props.score);
  };

  useEffect(() => {
    // when component first renders, set displayed
    // counter to 0
    props.reset();
    // if the current user is not null, retrieve
    // their score value from the database
    if (props.user) {
      let authUid = props.user.uid;
      databaseRef("score/" + authUid).on("value", (snapshot) => {
        setDataValue(snapshot.val());
      });
    }
  }, []);

  return (
    <div className="ui segment">
      <button className="button" onClick={props.increment}>
        +
      </button>
      <div>{props.score}</div>
      <button className="button" onClick={props.decrement}>
        -
      </button>
      <button className="ui primary button" onClick={recordUserValue}>
        Save Score
      </button>
      <div>Your saved value is {dataValue}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    score: state.score,
    user: state.user,
  };
};

export default connect(mapStateToProps, { increment, decrement, reset })(
  Counter
);
