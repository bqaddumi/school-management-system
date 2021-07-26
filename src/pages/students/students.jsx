import React, { useEffect, useState } from "react";
import Table from "../../components/common/Tables/table";
import BackgroundLogo from "../../components/common/backgroundLogo/backgroundLogo";
import Footer from "../../components/common/footer/footer";
import classes from "./studentsPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Firebase from "../../database/config";
import { loadingActions } from "../../store/loading";

const Students = () => {
    const usersObject = useSelector((state) => state.auth.userInformation);
    const userInformation = JSON.parse(usersObject ? usersObject : false);
    const [information, setInformations] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const db = Firebase.firestore();
        dispatch(loadingActions.setIsLoading(true));
        return (
            db.collection("teachers").onSnapshot((snapshot) => {
                const postData = [];
                snapshot.forEach((doc) => {
                    return (
                        db.collection("users")
                            .doc(doc.data().token)
                            .get()
                            .then((response) => {
                                return (
                                    db.collection("classes")
                                        .doc(userInformation.token)
                                        .get()
                                        .then((res) => {
                                            if (doc.data().class === res.data().classNumber) {
                                                postData.push({ ...doc.data(), ...response.data() });
                                            }
                                        })
                                );
                            })
                    );
                });
                setInformations(postData);
                dispatch(loadingActions.setIsLoading(false));
            })
        );
    }, [userInformation.token, dispatch]);

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
            <BackgroundLogo title="Students Classes Time" />
            <section className={classes.sectionContainer}>
                <div className={classes.headerInformation}>
                    <Table columns={columns} data={information} />
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Students;
