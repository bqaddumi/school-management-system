import { useRef } from 'react';
import classes from './signupPageForm.module.css';

const SignupPageForm = () => {
    const userNameInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredUserName = userNameInputRef.current.value;
    };

    return (
        <section className={classes.auth}>
            <h1>Signup</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor='userName'>User Name</label>
                    <input type='text' id='userName' required ref={userNameInputRef} placeholder='User Name'/>
                </div>
                <div className={classes.actions}>
                    <button>Login</button>
                </div>
            </form>
        </section>
    );
};

export default SignupPageForm;