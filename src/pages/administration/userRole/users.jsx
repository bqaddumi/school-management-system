import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../../store/loading";
import NotifiactionBar from "../../../components/common/notificatioBar/notifiactionBar";
import Firebase from '../../../database/config';
import Table from './tableContainer'
import Loader from "../../../components/common/loader/loader";
import classes from './tableContainer.module.css';
import { toastActions } from "../../../store/notification";

const Users = () => {
  const [dataAuth, setDataAuth] = useState([]);
  const isLoadingAdmin = useSelector((state) => state.loader.isLoadingAdmin);
  const dispatch = useDispatch();
  const type = useSelector((state) => state.toast.type);
  const message = useSelector((state) => state.toast.message);
  const position = useSelector((state) => state.toast.position);
  const [state, setstate] = useState(false)

  useEffect(() => {
    dispatch(loadingActions.setIsLoadingAdmin(true));
    const db = Firebase.firestore();
    return db.collection('users').onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      setDataAuth(postData);
      dispatch(loadingActions.setIsLoadingAdmin(false));
    });
  }, [dispatch]);

  const handleClickEditRow = (rowIndex, change) => {
    const db = Firebase.firestore();
    db
      .collection("users")
      .doc(rowIndex.row.original.id)
      .update({
        role: change.target.value,
      }).then(() => {
        setstate(true);
        dispatch(
          toastActions.toast({
            type: "success",
            message: "Successfully Modifying",
            position: "top",
          })
        );
        setstate(false);
      });
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'userName',
      },
      {
        Header: 'Email',
        accessor: 'uid',
      },
      {
        Header: 'Role',
        accessor: 'role',
        Cell: ({ cell: { value } }) => value || "-"
      },
      {
        Header: 'Add Role to Users',
        accessor: 'Editing',
        Cell: (cellObj) => (
          <select required onChange={(change) => handleClickEditRow(cellObj, change)} className={classes.select}>
            <option></option>
            <option value="Students">Students</option>
            <option value="Teachers">Teachers</option>
            <option value="Administration">Administration</option>
          </select>
        )
      },
    ],
    []
  )

  return (
    <div className={classes.App}>
      {isLoadingAdmin && (
        <div className={classes.loaderContainer}>
          <Loader type="loader" />
        </div>
      )}
      <h1><center>Users Table</center></h1>
      <Table columns={columns} data={dataAuth} />
    </div>
  );
}

export default Users;