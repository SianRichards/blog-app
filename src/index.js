import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import { BrowserRouter } from 'react-router-dom';
import { StateInspector } from 'reinspect';

import App from './components/in-and-out-of-app/App';
import { rootReducer } from './redux/reducers';
import Loading from './components/in-and-out-of-app/Loading';

// firebase set-up

const firebaseConfig = {
  apiKey: "AIzaSyDF4gFuhmGNUUaMuZu5qMVg3AmUMnIqKkY",
  authDomain: "my-app-2738f.firebaseapp.com",
  databaseURL: "https://my-app-2738f.firebaseio.com",
  projectId: "my-app-2738f",
  storageBucket: "my-app-2738f.appspot.com",
  messagingSenderId: "474972115438",
  appId: "1:474972115438:web:2d3cb32741212f10cf3eff",
  measurementId: "G-9F2RME6KQW"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
export const database = firebase.database();
export const firebaseStorage = firebase.storage()

// redux devtools set-up

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// redux-persist set-up

const persistConfig = {
  key: 'root',
  storage,
  // preventing the blogPostId from
  // being persisted so user can refresh
  // page after selecting post to update
  // and reverts to normal 'save post'
  blacklist: ['blogPostId']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware())
);

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <BrowserRouter>
          <App auth={firebaseAuth} />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);