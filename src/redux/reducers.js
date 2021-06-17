import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import { INCREMENT, DECREMENT, RESET, USER_IS_LOGGED_IN, USER_IS_LOGGED_OUT, SET_USER, UPDATE_MODAL, DELETE_BLOG_POST, CANCEL_DELETE_BLOG_POST, SEND_POST_ID, UPDATE_POST, CANCEL_UPDATE_POST } from './types';

export const initialState = {
    score: 0,
    isLoggedIn: false,
    user: {},
    modalInfo: {},
    deleteBlogPost: false,
    updateBlogPost: false,
    blogPostId: '',
    profileText: '',
    showProfileEditMode: false,
    storageRef: {}
};

export const scoreReducer = (state = initialState.score, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1
        case DECREMENT:
            return state - 1
        case RESET:
            return 0
        default:
            return state;
    }
};

export const loggedInOutReducer = (state = initialState.isLoggedIn, action) => {
    switch (action.type) {
        case USER_IS_LOGGED_IN:
            return true
        default:
            return state;
    }
};

export const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case SET_USER:
            return action.payload
        default:
            return state;
    }
};

export const modalInfoReducer = (state = initialState.modalInfo, action) => {
    switch (action.type) {
        case UPDATE_MODAL:
            return action.payload
        default:
            return state;
    }
};

export const deleteBlogPostReducer = (state = initialState.deleteBlogPost, action) => {
    switch (action.type) {
        case DELETE_BLOG_POST:
            return true
        case CANCEL_DELETE_BLOG_POST:
            return false
        default:
            return state;
    }
};

export const updateBlogPostReducer = (state = initialState.updateBlogPost, action) => {
    switch (action.type) {
        case UPDATE_POST:
            return true
        case CANCEL_UPDATE_POST:
            return false
        default:
            return state;
    }
};

export const postIdReducer = (state = initialState.blogPostId, action) => {
    switch (action.type) {
        case SEND_POST_ID:
            return action.payload
        default:
            return state;
    }
};

export const editProfileReducer = (state = initialState.profileText, action) => {
    switch (action.type) {
        case 'EDIT_PROFILE':
            return action.payload
        default:
            return state;
    }
};

export const showProfileEditModeReducer = (state = initialState.showProfileEditMode, action) => {
    switch (action.type) {
        case 'SHOW_PROFILE_EDIT_MODE':
            return true
        case 'SHOW_PROFILE_FINAL_MODE':
            return false
        default:
            return state;
    }
};

export const sendStorageRefReducer = (state = initialState.storageRef, action) => {
    switch (action.type) {
        case 'SEND_STORAGE_REF':
            return action.payload
        default:
            return state
    }
};

export const appReducer = combineReducers({
    score: scoreReducer,
    isLoggedIn: loggedInOutReducer,
    user: userReducer,
    modalInfo: modalInfoReducer,
    deleteBlogPost: deleteBlogPostReducer,
    blogPostId: postIdReducer,
    updateBlogPost: updateBlogPostReducer,
    profileText: editProfileReducer,
    showProfileEditMode: showProfileEditModeReducer,
    storageRef: sendStorageRefReducer
});

// if the user is logged out, then 
// set redux store back to initial
// state
export const rootReducer = (state, action) => {
    if (action.type === USER_IS_LOGGED_OUT) {
        storage.removeItem('persist:root')
        state = undefined
    }
    return appReducer(state, action)
};



