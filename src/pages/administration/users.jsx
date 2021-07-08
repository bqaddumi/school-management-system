import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../store/loading";
import Firebase from '../../database/config';
import Table from './tableContainer'
import Loader from "../../components/common/loader/loader";
import classes from './tableContainer.module.css';

const Users = () => {
  const [dataAuth, setDataAuth] = useState([]);
  const isLoading = useSelector((state) => state.loader.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingActions.setIsLoading(true));
    const db = Firebase.firestore();
    return db.collection('users').onSnapshot((snapshot) => {
      const postData = [];
      snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
      setDataAuth(postData);
      dispatch(loadingActions.setIsLoading(false));
    });
  }, [dispatch]);

  const handleClickEditRow = (rowIndex, change) => {
    const db = Firebase.firestore();
    db
      .collection("users")
      .doc(rowIndex.row.original.id)
      .update({
        role: change.target.value,
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
            <option value="Owner">Owner</option>
            <option value="Administration">Administration</option>
          </select>
        )
      },
    ],
    []
  )

  return (
    <div className={classes.App}>
      {isLoading && (
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