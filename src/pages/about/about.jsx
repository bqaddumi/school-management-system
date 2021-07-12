import React from 'react';
import classes from './about.module.css';

const About = () => {
    return (
        <>
            <div className={classes.aboutSection}>
                <h1>About Us Page</h1>
                <p>Some text about who we are and what we do.</p>
                <p>Resize the browser window to see that this page is responsive by the way.</p>
            </div>
            <h2 className={classes.bodyTitle}>Our Team</h2>
            <div className={classes.cardsContainer}>
                <div className={classes.cardContainer}>
                    <div className={classes.cardDescription}>
                        <img src="#" alt="Ibrahem" />
                        <div className={classes.container}>
                            <h2>Ibrahem Zablah</h2>
                            <p className={classes.title}>Wix Trainee</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>Izablah@asaltech.com</p>
                            <p><button className={classes.buttonContact}>Contact</button></p>
                        </div>
                    </div>
                </div>
                <div className={classes.cardContainer}>
                    <div className={classes.cardDescription}>
                        <img src="#" alt="Taima" />
                        <div className={classes.container}>
                            <h2>Taima Awaad</h2>
                            <p className={classes.title}>Wix Trainee</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>tawwad@asaltech.com</p>
                            <p><button className={classes.buttonContact}>Contact</button></p>
                        </div>
                    </div>
                </div>
                <div className={classes.cardContainer}>
                    <div className={classes.cardDescription}>
                        <img src="#" alt="Bashar" />
                        <div className={classes.container}>
                            <h2>Bashar Qadomi</h2>
                            <p className={classes.title}>Software Engineer</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>bqaddumi@asaltech.com</p>
                            <p><button className={classes.buttonContact}>Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.footerBody}>
                <h3>It is with great pleasure I would like to share with you my successful completion website. Special thanks to Asal which Asal tech provided all needed resources and information.</h3>
            </div>
        </>
    );
};

export default About;