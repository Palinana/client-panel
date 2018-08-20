import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//Custome Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
    apiKey: "AIzaSyBQMu9ePNO0004ET6Av-ik3AwC9r7wDVLM",
    authDomain: "clientpanel-bfffe.firebaseapp.com",
    databaseURL: "https://clientpanel-bfffe.firebaseio.com",
    projectId: "clientpanel-bfffe",
    storageBucket: "clientpanel-bfffe.appspot.com",
    messagingSenderId: "997761058504"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) 
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducer,
    settings: settingsReducer 
})

//Check for settings in local storage
if(localStorage.getItem('settings') === null){
    //Default settings
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
    }
    //Set to local storage
    localStorage.setItem('settings', JSON.stringify(defaultSettings)); //fill settings and parse into object

}

//Create initial state
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

//Create store
const store = createStoreWithFirebase(
    rootReducer,
    initialState, 
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;