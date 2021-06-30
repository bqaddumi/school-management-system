import firebaseApp from './config';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import classes from './invalidAccount.module.css';

const CreateAccount = (props) => {
    const email = props.email;
    const password = props.password;
    const userName = props.name;
    const history = useHistory();
    const database = firebaseApp.firestore();
    const [error, setError] = useState('');

    const informationDataAccount = {
        uid: email,
        userName: userName,
    };

    const errorCreateAccount = (error) => {
        setError(error.message);
    };

    const successCreateAccountInformation = () => {
        history.push("/home");
    };

    const errorCreateAccountInformation = (error) => {
        setError(error);
    };

    const successCreateAccount = () => {
        database.collection("users")
            .doc(informationDataAccount.uid.toString())
            .set(informationDataAccount)
            .then(successCreateAccountInformation)
            .catch(errorCreateAccountInformation);
    };

    const handleSignup = () => {
        firebaseApp
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(successCreateAccount)
            .catch(errorCreateAccount);
    };
    { handleSignup() }

    return (
        <p className={classes.errorMessage}>{error}</p>
    );
};

export default CreateAccount;