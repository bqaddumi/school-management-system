import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: "school-management-system-2bb33.firebaseapp.com",
    projectId: "school-management-system-2bb33",
    storageBucket: "school-management-system-2bb33.appspot.com",
    messagingSenderId: "1052910738542",
    appId: process.env.REACT_APP_APPID
});

export default firebaseApp;