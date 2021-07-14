import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../../store/loading";
import { toastActions } from "../../../store/notification";
import Firebase from "../../../database/config";
import Table from "../../common/Tables/table";
import Loader from "../../common/loader/loader";
import BackgroundLogo from "../../common/backgroundLogo/backgroundLogo.jsx";
import Footer from "../../common/footer/footer";
import classes from "./usersTable.module.css";
import Select from "react-select";

const Users = () => {
  const [users, setUsers] = useState([]);
  const isLoadingAdmin = useSelector((state) => state.loader.isLoadingAdmin);
  const userRole = useSelector((state) => state.auth.userRole);
  const dispatch = useDispatch();
  const currentUserRole = useSelector((state) => state.auth.userInformation);
  const userInformation = JSON.parse(currentUserRole ? currentUserRole : false);

  const usersExceptCurrent = users.filter((user) => {
    return user.id !== userInformation.token;
  });

  useEffect(() => {
    dispatch(loadingActions.setIsLoadingAdmin(true));
    const db = Firebase.firestore();
    return db.collection("users").onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      setUsers(postData);
      dispatch(loadingActions.setIsLoadingAdmin(false));
    });
  }, [dispatch]);

  const handleClickEditRow = useCallback(
    (rowIndex, change) => {
      const db = Firebase.firestore();
      db.collection("users")
        .doc(rowIndex.row.original.id)
        .update({
          role: change.value,
        })
        .then(() => {
          dispatch(
            toastActions.toast({
              type: "success",
              message: "Successfully Modifying",
              position: "top",
            })
          );
        });
    },
    [dispatch]
  );

  const options =
    [
      { value: userRole.students, label: userRole.students },
      { value: userRole.teacher, label: userRole.teacher },
      { value: userRole.admin, label: userRole.admin },
    ];

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "userName",
      },
      {
        Header: "Email",
        accessor: "uid",
      },
      {
        Header: "Role",
        accessor: "Editing",
        Cell: (cellObj) => (
          <Select
            onChange={(change) => handleClickEditRow(cellObj, change)}
            options={options}
            placeholder={cellObj.row.original.role}
          />
        )
      }
    ],
    [userRole.students, userRole.teacher, userRole.admin, handleClickEditRow]
  );

  const saveButtonHanler = () => { };

  return (
    <>
      <BackgroundLogo title="Users Table" />
      <section className={classes.usersSection}>
        <div className={classes.headerContainer}>
          {isLoadingAdmin && (
            <div className={classes.loaderContainer}>
              <Loader type="loader" />
            </div>
          )}
          <div className={classes.actions}>
            <button className={classes.saveButton} onClick={saveButtonHanler}>
              Save
            </button>
          </div>
          <Table columns={columns} data={usersExceptCurrent} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Users;
