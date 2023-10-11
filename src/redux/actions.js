import {
  INCREMENT,
  DECREMENT,
  RESET,
  USER_IS_LOGGED_IN,
  USER_IS_LOGGED_OUT,
  SET_USER,
  UPDATE_MODAL,
  DELETE_BLOG_POST,
  CANCEL_DELETE_BLOG_POST,
  SEND_POST_ID,
  UPDATE_POST,
  CANCEL_UPDATE_POST,
} from "./types";

export const increment = () => {
  return {
    type: INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: DECREMENT,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};

export const userIsLoggedIn = () => {
  return {
    type: USER_IS_LOGGED_IN,
  };
};

export const userIsLoggedOut = () => {
  return {
    type: USER_IS_LOGGED_OUT,
  };
};

export const setUserAction = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export const modalInfoAction = (modalInfo) => {
  return {
    type: UPDATE_MODAL,
    payload: modalInfo,
  };
};

export const deleteBlogPostAction = () => {
  return {
    type: DELETE_BLOG_POST,
  };
};

export const cancelDeleteBlogPostAction = () => {
  return {
    type: CANCEL_DELETE_BLOG_POST,
  };
};

export const sendBlogPostIdAction = (blogPostId) => {
  return {
    type: SEND_POST_ID,
    payload: blogPostId,
  };
};

export const updateBlogPostAction = () => {
  return {
    type: UPDATE_POST,
  };
};

export const cancelUpdateBlogPostAction = () => {
  return {
    type: CANCEL_UPDATE_POST,
  };
};

export const editProfileAction = (profileText) => {
  return {
    type: "EDIT_PROFILE",
    payload: profileText,
  };
};

export const showProfileEditModeAction = () => {
  return {
    type: "SHOW_PROFILE_EDIT_MODE",
  };
};

export const showProfileFinalModeAction = () => {
  return {
    type: "SHOW_PROFILE_FINAL_MODE",
  };
};

export const sendStorageRefAction = (storageRef) => {
  return {
    type: "SEND_STORAGE_REF",
    payload: storageRef,
  };
};
