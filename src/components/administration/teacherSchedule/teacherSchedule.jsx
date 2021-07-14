import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Firebase from '../../../database/config';
import { loadingActions } from '../../../store/loading';
import Loader from "../../common/loader/loader";
import Table from '../../common/Tables/table'
import classes from './teacherSchedule.module.css';

const TeacherSchedule = () => {
    const [users, setUsers] = useState([]);
    const [changeSheetTeacherHandler, setChangeSheetTeacherHandler] = useState();
    const isLoadingAdmin = useSelector((state) => state.loader.isLoadingAdmin);
    const [viewSheet, setViewSheet] = useState();
    const dispatch = useDispatch();
    const [tabulationSheets, setTabulationSheets] = useState([]);

    useEffect(() => {
        dispatch(loadingActions.setIsLoadingAdmin(true));
        const db = Firebase.firestore();
        return db.collection('teachers').onSnapshot((snapshot) => {
            const teacherDataSchedule = [];
            snapshot.forEach((doc) => {
                db.collection('users').doc(doc.data().token).get().then((res) => {
                    if (doc.data().token === res.data().token) {
                        teacherDataSchedule.push({ ...doc.data(), ...res.data() })
                    }
                })
            });
            setTabulationSheets(teacherDataSchedule);
            dispatch(loadingActions.setIsLoadingAdmin(false));
        });
    }, [dispatch]);

    useEffect(() => {
        const db = Firebase.firestore();
        return db.collection('users').onSnapshot((snapshot) => {
            const postData = [];
            snapshot.forEach((doc) => {
                if (doc.data().role === 'Teachers') {
                    postData.push({ ...doc.data() })
                }
            });
            setUsers(postData);
        });
    }, []);

    const searchByTeacherName = tabulationSheets.filter((res) => {
        return (res.userName === changeSheetTeacherHandler);
    });

    const columns = React.useMemo(
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
                Header: 'Start it time',
                accessor: 'timeFrom',
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: 'End it time',
                accessor: 'timeTo',
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: 'E-mail Teacher',
                accessor: 'uid',
                Cell: ({ cell: { value } }) => value || "-"
            },
            {
                Header: 'Major Teacher',
                accessor: 'major',
                Cell: ({ cell: { value } }) => value || "-"
            },
        ],
        []
    )

    const onViewSheetHandler = (event) => {
        event.preventDefault();
        setViewSheet(!viewSheet);
    };

    const onChangeSheetTeacherHandler = (event) => {
        setChangeSheetTeacherHandler(event.target.value)
        setViewSheet(!viewSheet)
    };

    return (
        <div className={classes.headerContainer}>
            {isLoadingAdmin && (
                <div className={classes.loaderContainer}>
                    <Loader type="loader" />
                </div>
            )}
            <form onSubmit={onViewSheetHandler}>
                <h1>Tabulation Sheet Of School</h1>
                <div className={classes.sectionTabulation}>
                    <div className={classes.sectionTitle}>Teacher Name</div>
                    <select required className={classes.selectOptionClassTabulation} onChange={onChangeSheetTeacherHandler}>
                        <option></option>
                        {
                            users.map((user, index) => {
                                return (
                                    <option value={user.userName} key={index}>
                                        {user.userName}
                                    </option>
                                );
                            })
                        }
                    </select>
                    <div className={classes.sectionTitle}>Class</div>
                    <select required className={classes.selectOptionClassTabulation} disabled>
                        <option></option>
                        <option value="1st">1st</option>
                        <option value="2st">2st</option>
                        <option value="3st">3st</option>
                        <option value="4st">4st</option>
                    </select>
                    <div className={classes.sectionTitle}>Section</div>
                    <select required className={classes.selectOptionClassTabulation} disabled>
                        <option></option>
                        <option value="English">English</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Math">Math</option>
                        <option value="Pieology">Pieology</option>
                    </select>
                    <div className={classes.actionsContainerViewSheet}>
                        <button className={classes.buttonViewSheet}>
                            {!viewSheet ? 'View Sheet' : 'Hide Sheet'}</button>
                    </div>
                </div>
                {viewSheet &&
                    <div className={classes.headerTabulationSheets}>
                        <h1>Tabulation Sheets</h1>
                        <Table columns={columns} data={searchByTeacherName} />
                    </div>
                }
            </form>
        </div>
    );
};

export default TeacherSchedule;