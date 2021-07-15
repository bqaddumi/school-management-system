import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../../store/loading";
import Firebase from '../../../database/config';
import Table from '../../common/Tables/table'
import Loader from "../../common/loader/loader";
import classes from './classSchedule.module.scss';

const ClassSchedule = () => {
    const [users, setUsers] = useState([]);
    const isLoadingAdmin = useSelector((state) => state.loader.isLoadingAdmin);
    const dispatch = useDispatch();
    const currentUserRole = (useSelector((state) => state.auth.userInformation));
    const userInformation = JSON.parse(currentUserRole ? currentUserRole : false);

    const usersExceptCurrent = users.filter((user) => {
        return (user.token === userInformation.token);
    });

    useEffect(() => {
        dispatch(loadingActions.setIsLoadingAdmin(true));
        const db = Firebase.firestore();
        return db.collection('teachers').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => postData.push({ ...doc.data() }));
            setUsers(postData);
            dispatch(loadingActions.setIsLoadingAdmin(false));
        });
    }, [dispatch]);

    const columns = useMemo(
        () => [
            {
                Header: 'ClassRoom',
                accessor: 'class',
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: 'Days',
                accessor: 'day',
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: 'Time From',
                accessor: 'timeFrom',
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: 'Time To',
                accessor: 'timeTo',
                Cell: ({ cell: { value } }) => value || "-"
            },
        ],
        []
    )

    return (
        <div className={classes.headerContainer}>
            {isLoadingAdmin && (
                <div className={classes.loaderContainer}>
                    <Loader type="loader" />
                </div>
            )}
            <h1><center>Class Schedule</center></h1>
            <Table columns={columns} data={usersExceptCurrent} />
        </div>
    );
}

export default ClassSchedule;