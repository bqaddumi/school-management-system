import firebase from "firebase";

const Firebase = firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  appId: process.env.REACT_APP_APPID,
  authDomain: "school-management-system-2bb33.firebaseapp.com",
  projectId: "school-management-system-2bb33",
  storageBucket: "school-management-system-2bb33.appspot.com",
  messagingSenderId: "1052910738542",
});

export default Firebase;
