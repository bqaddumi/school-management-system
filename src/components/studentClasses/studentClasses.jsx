import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Firebase from "../../database/config";
import { loadingActions } from "../../store/loading";
import { toastActions } from "../../store/notification";
import Table from "../common/Tables/table";
import BackgroundLogo from "../common/backgroundLogo/backgroundLogo";
import Footer from "../common/footer/footer";
import classes from "./studentClasses.module.scss";

const StudentClasses = () => {
  const usersObject = useSelector((state) => state.auth.userInformation);
  const userInformation = JSON.parse(usersObject ? usersObject : false);
  const [information, setInformations] = useState([{ class: "", uid: "" }]);
  const dispatch = useDispatch();

  dispatch(
    toastActions.toast({
      type: "",
      message: "",
      position: "",
    })
  );

  useEffect(() => {
    async function fetchData() {
      dispatch(loadingActions.setIsLoading(true));
      const db = Firebase.firestore();
      const postData = [];
      await db
        .collection("classes")
        .doc(userInformation.token)
        .get()
        .then(async (classes) => {
          await db
            .collection("teachers")
            .where("class", "==", classes.data().classNumber)
            .get()
            .then(async (teachersClasses) => {
              await Promise.all(
                teachersClasses.docs.map(async (teachersClass) => {
                  return await db
                    .collection("teachersInfo")
                    .where("token", "==", teachersClass.data().token)
                    .get()
                    .then(async (teachersInfo) => {
                      await Promise.all(
                        teachersInfo.docs.map((teacherInfo) => {
                          return postData.push(
                            Object.assign(
                              teacherInfo.data(),
                              teachersClass.data()
                            )
                          );
                        })
                      );
                    });
                })
              );
            });
        });
      setInformations(postData);
      dispatch(loadingActions.setIsLoading(false));
    }
    fetchData();
  }, [dispatch, userInformation.token]);

  const columns = React.useMemo(
    () => [
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
        Header: "Teacher Name",
        accessor: "userName",
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

  return (
    <>
      <BackgroundLogo
        title=" Classes Time "
        major={information[0].class + " Class"}
      />
      <section className={classes.sectionContainer}>
        <div className={classes.headerInformation}>
          <Table columns={columns} data={information} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default StudentClasses;
