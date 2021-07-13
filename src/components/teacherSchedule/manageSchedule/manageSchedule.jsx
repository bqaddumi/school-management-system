import React, { useState } from 'react';
import Firebase from '../../../database/config';
import { useSelector } from "react-redux";
import InputField from "../../common/InputField/InputField";
import classes from './manageSchedule.module.css';

const ManageSchedule = () => {
    const database = Firebase.firestore();
    const usersObject = useSelector((state) => state.auth.userInformation);
    const userInformation = JSON.parse(usersObject ? usersObject : false);
    const [timeFromLecture, setTimeFromLecture] = useState("")
    const [timeToLecture, setTimeToLecture] = useState("")
    const [daysLecture, setDaysLecture] = useState()
    const [classLecture, setClassLecture] = useState()

    const successAddingNewLecture = (res) => {
        alert('success Adding New Lecture')
    };

    const errorAddingNewLecture = (error) => {
        alert('error Adding New Lecture')
    };

    const selectTimeFromLecturesHandler = (event) => {
        setTimeFromLecture(event.target.value);
    };

    const selectTimeToLecturesHandler = (event) => {
        setTimeToLecture(event.target.value);
    };

    const selectDaysLecturesHandler = (event) => {
        setDaysLecture(event.target.value);
    };

    const selectClassLecturesHandler = (event) => {
        setClassLecture(event.target.value);
    };

    const onAddingLectureHandler = (event) => {
        let isConflict = ''
        event.preventDefault();
        database
            .collection("teachers")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (timeFromLecture === doc.data().timeFrom &&
                        timeToLecture === doc.data().timeTo &&
                        classLecture === doc.data().class &&
                        daysLecture === doc.data().day) {
                        isConflict = 'conflict'
                    }
                })
            }).then(() => {
                if (!!isConflict) {
                    alert('There is a conflict with a reserve the room at that time, try another time')
                } else {
                    database
                        .collection("teachers")
                        .doc()
                        .set({
                            token: userInformation.token,
                            day: daysLecture,
                            class: classLecture,
                            timeFrom: timeFromLecture,
                            timeTo: timeToLecture,
                        })
                        .then(successAddingNewLecture)
                        .catch(errorAddingNewLecture);
                }
            });
    };

    return (
        <section className={classes.headerContainer}>
            <h1 className={classes.labelTitle}>Manage Schedule</h1>
            <form onSubmit={onAddingLectureHandler}>
                <label className={classes.labelBody}>Days</label>
                <select required className={classes.selectDaysLectures} onChange={selectDaysLecturesHandler}>
                    <option></option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                </select>
                <InputField
                    label="From"
                    onChange={selectTimeFromLecturesHandler}
                    type="time"
                    id="time"
                    placeholder="time"
                    value={timeFromLecture}
                    required={true}
                />
                <InputField
                    label="To"
                    onChange={selectTimeToLecturesHandler}
                    type="time"
                    id="time"
                    placeholder="time"
                    value={timeToLecture}
                    required={true}
                />
                <label className={classes.labelBody}>Class</label>
                <select required className={classes.selectClassLectures} onChange={selectClassLecturesHandler}>
                    <option></option>
                    <option value="1st">1st</option>
                    <option value="2st">2st</option>
                    <option value="3st">3st</option>
                    <option value="4st">4st</option>
                    <option value="5st">5st</option>
                </select>
                <div className={classes.actionsContainerAddingLecture}>
                    <button className={classes.addingLectureButton}>Add Lecture Time</button>
                </div>
            </form>
        </section >
    )
};

export default ManageSchedule;