import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  showProfileFinalModeAction,
  editProfileAction,
  sendStorageRefAction,
} from "../../../redux/actions";
import {
  orderDatabaseValuesByChild,
  updateDatabaseValue,
  addDatabaseValue,
} from "../../firebase/database/helperFunctions";
import {
  firebaseStorageRef,
  listAllStoragePathwayContents,
  putFileInStoragePathway,
} from "../../firebase/storage/helperFunctions";
import Button from "../../in-and-out-of-app/Button";
import styles from "../../../styles/profile.module.scss";

const ProfileEdit = (props) => {
  const [editValue, setEditValue] = useState("");
  const [imageURL, setImageURL] = useState("https://via.placeholder.com/150");

  const fileInput = React.createRef();

  useEffect(() => {
    let authUID = props.user.uid;
    orderDatabaseValuesByChild("profileInformation", "userUID", authUID).once(
      "value",
      (snapshot) => {
        if (snapshot.val()) {
          const returnedProfileDescription = Object.values(snapshot.val());
          setEditValue(returnedProfileDescription[0].profileDescription);
        }
      }
    );
    // when component loads, go into profile picture storage pathway for this
    // user and list all of the contents. Retrieve first item in list and get
    // the URL for this picture
    // set the imageURL to this retrieved URL
    listAllStoragePathwayContents("profilePicture/" + authUID).then(
      (response) => {
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
      }
    );
  }, []);

  const uploadProfileImage = (event) => {
    event.preventDefault();
    let authUID = props.user.uid;
    let file = fileInput.current.files[0];
    if (file) {
      // deletes all existing profile pictures for this user
      listAllStoragePathwayContents("profilePicture/" + authUID)
        .then((response) => {
          response.items.forEach((item) => item.delete());
        })
        .catch((error) => console.log(error));
      // adds selected file to user's storage for profile pictures
      putFileInStoragePathway(
        "profilePicture/" + authUID + "/" + file.name,
        file
      )
        .then(() => {
          // retrieves the URL for this file and sets state so
          // component's <img>'s src now refers to this URL
          firebaseStorageRef("profilePicture/" + authUID + "/" + file.name)
            .getDownloadURL()
            .then((url) => {
              setImageURL(url);
            })
            .catch((storageRefDownloadURLError) => {
              console.log(storageRefDownloadURLError);
            });
        })
        .catch((storageRefPutError) => console.log(storageRefPutError));
    } else alert("Please select an image to upload");
  };

  const postProfileInformation = () => {
    let authUID = props.user.uid;
    // check if this user already has posted profileInformation
    orderDatabaseValuesByChild("profileInformation", "userUID", authUID)
      .once("value", (snapshot) => {
        if (snapshot.val()) {
          // if they have already posted it, then update
          // that pathway
          let profileInformationID = Object.keys(snapshot.val())[0];
          // profileInformationID is the obtained post id for
          // the user's existing profile info in database
          updateDatabaseValue("profileInformation/" + profileInformationID, {
            profileDescription: editValue,
          });
        }
        // if they haven't already posted profile info
        // then add a new entry for that user and their
        // profile info
        else
          addDatabaseValue("profileInformation", {
            profileDescription: editValue,
            userUID: authUID,
          });
      })
      .then(() => {
        props.showProfileFinalModeAction();
      });
  };

  return (
    <div className={styles.container}>
      <h1>Profile Page</h1>
      <div>
        <img className={styles.image} src={imageURL} />
        <form onSubmit={uploadProfileImage}>
          <input type="file" accept="image/*" ref={fileInput} />
          <Button buttonText="Upload profile picture" />
        </form>
        <h2 className={styles.username}>Username</h2>
        <form
          className="ui form"
          onSubmit={(event) => {
            event.preventDefault();
            postProfileInformation();
          }}
        >
          <div className="field">
            <label>Edit your bio</label>
            <textarea
              name="edit-profile-description"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          </div>
          <Button buttonText="Update Bio" />
        </form>
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
  showProfileFinalModeAction,
  editProfileAction,
  sendStorageRefAction,
})(ProfileEdit);
