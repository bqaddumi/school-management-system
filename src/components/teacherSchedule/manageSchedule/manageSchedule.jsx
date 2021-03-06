import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slide from "react-reveal/Slide";
import InputField from "../../common/InputField/InputField";
import BackgroundLogo from "../../common/backgroundLogo/backgroundLogo";
import Footer from "../../common/footer/footer";
import Firebase from "../../../database/config";
import { loadingActions } from "../../../store/loading";
import { toastActions } from "../../../store/notification";
import classes from "./manageSchedule.module.scss";

const ManageSchedule = () => {
  const database = Firebase.firestore();
  const usersObject = useSelector((state) => state.auth.userInformation);
  const userInformation = JSON.parse(usersObject ? usersObject : false);
  const [timeFromLecture, setTimeFromLecture] = useState("");
  const [timeToLecture, setTimeToLecture] = useState("");
  const [daysLecture, setDaysLecture] = useState("Sunday");
  const [classLecture, setClassLecture] = useState("1st");
  const dispatch = useDispatch();

  const successAddingNewLecture = (res) => {
    dispatch(loadingActions.setIsLoading(false));
    dispatch(
      toastActions.toast({
        type: "success",
        message: "Adding new lecture Successfully",
        position: "top",
      })
    );
  };

  const errorAddingNewLecture = (error) => {
    dispatch(loadingActions.setIsLoading(false));
    dispatch(
      toastActions.toast({
        type: "failure",
        message: error,
        position: "top",
      })
    );
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
    let isConflict = "";
    event.preventDefault();
    dispatch(loadingActions.setIsLoading(true));
    database
      .collection("teachers")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (timeFromLecture >= timeToLecture) {
            isConflict = "Please choose correct lecture time";
          } else if (
            (timeFromLecture >= doc.data().timeFrom &&
              timeFromLecture <= doc.data().timeTo &&
              daysLecture === doc.data().day) ||
            (timeToLecture >= doc.data().timeFrom &&
              timeToLecture <= doc.data().timeTo &&
              daysLecture === doc.data().day)
          ) {
            if (userInformation.token === doc.data().token)
              isConflict =
                " You have a lecture on  " +
                daysLecture +
                " at " +
                doc.data().timeFrom +
                " - " +
                doc.data().timeTo +
                " in " +
                doc.data().class;
            else if (classLecture === doc.data().class) {
              isConflict =
                " Classroom has a reserved on " +
                daysLecture +
                " at " +
                doc.data().timeFrom +
                " - " +
                doc.data().timeTo;
            }
          }
        });
      })
      .then(() => {
        if (!!isConflict) {
          dispatch(loadingActions.setIsLoading(false));
          dispatch(
            toastActions.toast({
              type: "failure",
              message: isConflict,
              position: "top",
            })
          );
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
    <>
      <BackgroundLogo title={"Manage Schedule"} />
      <section className={classes.sectionContainer}>
        <Slide left>
          <p className={classes.instruction}>
            Mange your Lecture by set day, Time and class #{" "}
          </p>
        </Slide>
        <form onSubmit={onAddingLectureHandler}>
          <select
            required
            className={classes.selectDaysLectures}
            onChange={selectDaysLecturesHandler}
            defaultValue={"Sunday"}
          >
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
          <select
            required
            className={classes.selectClassLectures}
            onChange={selectClassLecturesHandler}
            defaultValue={"1st"}
          >
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
          </select>
          <div className={classes.actionsContainerAddingLecture}>
            <button className={classes.addingLectureButton}>
              Add Lecture Time
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default ManageSchedule;
