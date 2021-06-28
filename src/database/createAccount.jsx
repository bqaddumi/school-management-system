import React from 'react';
import firebase from 'firebase/app';
import FirebaseApp from './config';
import firebaseApp from './config';

const createAccount = (props) => {
    const email = props.email;
    const password = props.password;
    const userName = props.userName;

    const informationDataAccount = {
        uid: email,
        userName: userName,
    };

    const errorCreateAccount = () => {
        
    };

    const successCreateAccount = () => {

    };

    firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(successCreateAccount)
        .catch(errorCreateAccount);

};

export default createAccount;