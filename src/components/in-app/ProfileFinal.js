import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "../../styles/profile.module.scss";
import {
  editProfileAction,
  showProfileEditModeAction,
} from "../../redux/actions";
import { firebaseStorage } from "../../index";
import { orderDatabaseValuesByChild } from "../firebase/database/helperFunctions";

const ProfileFinal = (props) => {
  const [profileText, setProfileText] = useState("");
  const [imageURL, setImageURL] = useState("https://via.placeholder.com/150");

  useEffect(() => {
    let authUID = props.user.uid;
    if (props.user) {
      orderDatabaseValuesByChild("profileInformation", "userUID", authUID).once(
        "value",
        (snapshot) => {
          if (snapshot.val()) {
            const returnedProfileDescription = Object.values(snapshot.val());
            setProfileText(returnedProfileDescription[0].profileDescription);
          }
        }
      );
    }
    let profilePictureStorageRef = firebaseStorage.ref(
      "profilePicture/" + authUID
    );
    profilePictureStorageRef.listAll().then((response) => {
      if (response.items.length > 0) {
        response.items[0]
          .getDownloadURL()
          .then((url) => {
            setImageURL(url);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Profile Page</h1>
      <i
        onClick={() => {
          props.showProfileEditModeAction();
        }}
        className={`right floated edit icon ${styles.pointer}`}
      ></i>
      <div>
        <img className={styles.image} src={imageURL} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2 className={styles.username}>Username</h2>
          <p className={styles.description}>
            {" "}
            {profileText ? profileText : "Complete your bio here..."}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profileText: state.profileText,
    storageRef: state.storageRef,
  };
};

export default connect(mapStateToProps, {
  editProfileAction,
  showProfileEditModeAction,
})(ProfileFinal);
