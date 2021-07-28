import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Firebase from "../../../database/config";
import Table from "../../common/Tables/table";
import BackgroundLogo from "../../common/backgroundLogo/backgroundLogo";
import Footer from "../../common/footer/footer";
import classes from "./teacherClasses.module.scss";

const TeacherClasses = () => {
  const [users, setUsers] = useState([]);
  const [changeSheetTeacherHandler, setChangeSheetTeacherHandler] = useState();
  const [viewSheet, setViewSheet] = useState();
  const [teacherClasses, setTeacherClasses] = useState([]);
  const usersObject = useSelector((state) => state.auth.userInformation);
  const userInformation = JSON.parse(usersObject ? usersObject : false);

  useEffect(() => {
    const db = Firebase.firestore();
    return db.collection("teachers").onSnapshot((snapshot) => {
      const teacherDataSchedule = [];
      snapshot.forEach((doc) => {
        db.collection("users")
          .doc(doc.data().token)
          .get()
          .then((res) => {
            if (doc.data().token === res.data().token) {
              teacherDataSchedule.push({ ...doc.data(), ...res.data() });
            }
          });
      });
      setTeacherClasses(teacherDataSchedule);
    });
  }, []);

  useEffect(() => {
    const db = Firebase.firestore();
    return db.collection("users").onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => {
        if (doc.data().role === "Teachers") {
          postData.push({ ...doc.data() });
        }
      });
      setUsers(postData);
    });
  }, []);

  const searchByTeacherName = teacherClasses.filter((res) => {
    return res.userName === changeSheetTeacherHandler;
  });

  const columns = React.useMemo(
    () => [
      {
        Header: "ClassRoom",
        accessor: "class",
        Cell: ({ cell: { value } }) => value || "-",
      },
      {
        Header: "Days",
        accessor: "day",
        Cell: ({ cell: { value } }) => value || "-",
      },
      {
        Header: "Start it time",
        accessor: "timeFrom",
        Cell: ({ cell: { value } }) => value || "-",
      },
      {
        Header: "End it time",
        accessor: "timeTo",
        Cell: ({ cell: { value } }) => value || "-",
      },
      {
        Header: "E-mail Teacher",
        accessor: "uid",
        Cell: ({ cell: { value } }) => value || "-",
      },
      {
        Header: "Major Teacher",
        accessor: "major",
        Cell: ({ cell: { value } }) => value || "-",
      },
    ],
    []
  );

  const onViewSheetHandler = (event) => {
    event.preventDefault();
    setViewSheet(!viewSheet);
  };

  const onChangeSheetTeacherHandler = (event) => {
    setChangeSheetTeacherHandler(event.target.value);
    setViewSheet(!viewSheet);
  };

  console.log(teacherClasses);
  return (
    <>
      {!!(searchByTeacherName[0])? (
        <BackgroundLogo
          title={"Teacher Classes Time " + searchByTeacherName[0]?.uid}
          major={searchByTeacherName[0]?.major}
        />
      ) : (
        <BackgroundLogo title={"Teacher Classes Time "} />
      )}

      <section className={classes.seactionConatainer}>
        <form onSubmit={onViewSheetHandler}>
          <div className={classes.classesTime}>
            <div className={classes.teachers}>
              <div className={classes.labelName}>Teacher Name</div>
              <select
                required
                className={classes.selectTeachersName}
                onChange={onChangeSheetTeacherHandler}
              >
                <option></option>
                {users.map((user, index) => {
                  return (
                    <option value={user.userName} key={index}>
                      {user.userName}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className={classes.viewClasses}>
              {!viewSheet ? "View Classes " : "Hide Classes "}
            </button>
          </div>
          {viewSheet && (
            <div className={classes.headerClassesTime}>
              <Table columns={columns} data={searchByTeacherName} />
            </div>
          )}
        </form>
      </section>
      <Footer />
    </>
  );
};

export default TeacherClasses;
