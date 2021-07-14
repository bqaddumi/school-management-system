import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../../store/loading";
import { toastActions } from "../../../store/notification";
import Firebase from "../../../database/config";
import Table from "./tableContainer";
import Loader from "../../../components/common/loader/loader";
import BackgroundLogo from "../../../components/common/backgroundLogo/backgroundLogo.jsx";
import Footer from "../../../components/common/footer/footer";
import classes from "./tableContainer.module.css";

const Users = () => {
  const [dataAuth, setDataAuth] = useState([]);
  const isLoadingAdmin = useSelector((state) => state.loader.isLoadingAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingActions.setIsLoadingAdmin(true));
    const db = Firebase.firestore();
    return db.collection("users").onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      setDataAuth(postData);
      dispatch(loadingActions.setIsLoadingAdmin(false));
    });
  }, [dispatch]);

  const handleClickEditRow = (rowIndex, change) => {
    const db = Firebase.firestore();
    db.collection("users")
      .doc(rowIndex.row.original.id)
      .update({
        role: change.target.value,
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
  };

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
        Header: "Users Role",
        accessor: "Editing",
        Cell: (cellObj) => (
          <select
            required
            onChange={(change) => handleClickEditRow(cellObj, change)}
            className={classes.select}
          >
            <option></option>
            <option value="Students">Students</option>
            <option value="Teachers">Teachers</option>
            <option value="Administration">Administration</option>
          </select>
        ),
      },
      // {
      //   Header: "Role",
      //   accessor: "role",
      //   Cell: ({ cell: { value } }) => value || "-",
      // },
    ],
    []
  );

  const saveButtonHanler = () => {};

  return (
    <>
      <BackgroundLogo title="Users Table" />
      <section className={classes.usersSection}>
        <div className={classes.App}>
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
          <Table columns={columns} data={dataAuth} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Users;
